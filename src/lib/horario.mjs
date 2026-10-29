// RF-07: aberto ou fechado agora, sempre no fuso de São Paulo, qualquer que seja o fuso do visitante.

const DIAS = {
  pt: ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'],
  es: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
};

export const nomeDia = (dia, lang = 'pt') => DIAS[lang][dia];

/** "13:00" → 780 minutos. */
export const paraMinutos = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/** "13:00" → "13h"; "13:30" → "13h30". */
export const horaCurta = (hhmm) => {
  const [h, m] = hhmm.split(':');
  return m === '00' ? `${Number(h)}h` : `${Number(h)}h${m}`;
};

/** Data e hora locais no fuso indicado: { data: 'AAAA-MM-DD', dia: 0-6, minutos }. */
export function horaLocal(agora, fuso) {
  const partes = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: fuso,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hourCycle: 'h23', weekday: 'short'
    }).formatToParts(agora).map((p) => [p.type, p.value])
  );
  const dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return {
    data: `${partes.year}-${partes.month}-${partes.day}`,
    dia: dias[partes.weekday],
    minutos: Number(partes.hour) * 60 + Number(partes.minute)
  };
}

/**
 * Estado da loja agora.
 * - { tipo: 'pre-inauguracao', data }
 * - { tipo: 'aberto', fecha: '20:00' }
 * - { tipo: 'fechado', abreDia: 0-6, abre: '13:00', quando: 'hoje' | 'amanha' | 'dia' }
 */
export function estadoLoja(agora, { horarios, fuso, inauguracao }) {
  const local = horaLocal(agora, fuso);
  if (inauguracao && local.data < inauguracao) return { tipo: 'pre-inauguracao', data: inauguracao };

  const hoje = horarios[local.dia];
  if (hoje && local.minutos >= paraMinutos(hoje[0]) && local.minutos < paraMinutos(hoje[1])) {
    return { tipo: 'aberto', fecha: hoje[1] };
  }
  if (hoje && local.minutos < paraMinutos(hoje[0])) {
    return { tipo: 'fechado', abreDia: local.dia, abre: hoje[0], quando: 'hoje' };
  }
  for (let passo = 1; passo <= 7; passo += 1) {
    const dia = (local.dia + passo) % 7;
    if (horarios[dia]) {
      return { tipo: 'fechado', abreDia: dia, abre: horarios[dia][0], quando: passo === 1 ? 'amanha' : 'dia' };
    }
  }
  return { tipo: 'fechado', abreDia: null, abre: null, quando: 'sem-horario' };
}

/** Texto curto do estado para a faixa do topo. */
export function textoEstado(estado, lang = 'pt') {
  const es = lang === 'es';
  if (estado.tipo === 'pre-inauguracao') {
    const [, mes, dia] = estado.data.split('-').map(Number);
    const meses = es
      ? ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
      : ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    return es ? `Inauguramos el ${dia} de ${meses[mes - 1]}` : `Inauguração em ${dia} de ${meses[mes - 1]}`;
  }
  if (estado.tipo === 'aberto') {
    return es ? `Abierto ahora · hasta las ${horaCurta(estado.fecha)}` : `Aberto agora · até ${horaCurta(estado.fecha)}`;
  }
  if (estado.quando === 'sem-horario') return es ? 'Cerrado por ahora' : 'Fechado por enquanto';
  const hora = horaCurta(estado.abre);
  if (estado.quando === 'hoje') return es ? `Cerrado ahora · abrimos hoy a las ${hora}` : `Fechado agora · abrimos hoje às ${hora}`;
  if (estado.quando === 'amanha') return es ? `Cerrado ahora · abrimos mañana a las ${hora}` : `Fechado agora · abrimos amanhã às ${hora}`;
  const dia = nomeDia(estado.abreDia, lang);
  return es ? `Cerrado ahora · abrimos el ${dia} a las ${hora}` : `Fechado agora · abrimos ${dia} às ${hora}`;
}

/** "quinta a domingo, das 13h às 20h" a partir da tabela de horários (assume dias seguidos com o mesmo horário). */
export function resumoHorarios(horarios, lang = 'pt') {
  const ordem = [1, 2, 3, 4, 5, 6, 0];
  const abertos = ordem.filter((d) => horarios[d]);
  if (!abertos.length) return '';
  const [abre, fecha] = horarios[abertos[0]];
  const primeiro = nomeDia(abertos[0], lang);
  const ultimo = nomeDia(abertos.at(-1), lang);
  return lang === 'es'
    ? `de ${primeiro} a ${ultimo}, de ${horaCurta(abre)} a ${horaCurta(fecha)}`
    : `${primeiro} a ${ultimo}, das ${horaCurta(abre)} às ${horaCurta(fecha)}`;
}
