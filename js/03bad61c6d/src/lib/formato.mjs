// Formatação compartilhada entre o build (Node) e o navegador.

/** "R$ 24" para inteiros, "R$ 31,90" com centavos. Mesmo formato em PT e ES (preço sempre em R$, RNF-08). */
export function reais(valor) {
  const inteiro = Number.isInteger(valor);
  const texto = inteiro
    ? String(valor)
    : valor.toFixed(2).replace('.', ',');
  return `R$ ${texto}`;
}

/** "90 a 110 mg" / "90 a 110 mg" (es usa "a" também). */
export function faixaMg([min, max], lang = 'pt') {
  return lang === 'es' ? `${min} a ${max} mg` : `${min} a ${max} mg`;
}

/** Escapa texto para HTML (usado em todo conteúdo interpolado nas páginas). */
export function esc(texto) {
  return String(texto ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

/** Junta itens com vírgula e "e"/"y" no último: "mel, paçoca e canela". */
export function listaNatural(itens, lang = 'pt') {
  const e = lang === 'es' ? 'y' : 'e';
  if (itens.length <= 1) return itens.join('');
  return `${itens.slice(0, -1).join(', ')} ${e} ${itens.at(-1)}`;
}

/** Só os dígitos: "69.883.553/0001-36" → "69883553000136". */
export function soDigitos(texto) {
  return String(texto ?? '').replace(/\D/g, '');
}

/** Confere os dois dígitos verificadores do CNPJ (pega erro de digitação antes de publicar). */
export function cnpjValido(cnpj) {
  const d = soDigitos(cnpj);
  if (d.length !== 14 || /^(\d)\1+$/.test(d)) return false;
  const digito = (base) => {
    const pesos = base.length === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const resto = [...base].reduce((soma, n, i) => soma + Number(n) * pesos[i], 0) % 11;
    return resto < 2 ? 0 : 11 - resto;
  };
  const d1 = digito(d.slice(0, 12));
  const d2 = digito(d.slice(0, 12) + d1);
  return d.endsWith(`${d1}${d2}`);
}
