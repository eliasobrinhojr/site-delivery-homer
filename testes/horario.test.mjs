import { test } from 'node:test';
import assert from 'node:assert/strict';
import { estadoLoja, textoEstado, horaLocal, resumoHorarios } from '../src/lib/horario.mjs';

const loja = {
  fuso: 'America/Sao_Paulo',
  inauguracao: '2026-11-28',
  horarios: { 4: ['13:00', '20:00'], 5: ['13:00', '20:00'], 6: ['13:00', '20:00'], 0: ['13:00', '20:00'] }
};
// São Paulo é UTC-3 o ano todo desde 2019.
const sp = (iso) => new Date(`${iso}-03:00`);

test('RF-07 antes da inauguração mostra a data', () => {
  const estado = estadoLoja(sp('2026-11-20T15:00:00'), loja);
  assert.equal(estado.tipo, 'pre-inauguracao');
  assert.equal(textoEstado(estado), 'Inauguração em 28 de novembro');
  assert.equal(textoEstado(estado, 'es'), 'Inauguramos el 28 de noviembre');
});

test('RF-07 inauguração sem data: "em breve" bloqueia pedidos e não mostra data', () => {
  const estado = estadoLoja(sp('2027-03-06T15:00:00'), { ...loja, inauguracao: 'em-breve' });
  assert.deepEqual(estado, { tipo: 'pre-inauguracao', data: null });
  assert.equal(textoEstado(estado), 'Inauguração em breve');
  assert.equal(textoEstado(estado, 'es'), 'Inauguramos pronto');
});

test('RF-07 sábado 15h está aberto até 20h', () => {
  const estado = estadoLoja(sp('2026-11-28T15:00:00'), loja);
  assert.deepEqual(estado, { tipo: 'aberto', fecha: '20:00' });
  assert.equal(textoEstado(estado), 'Aberto agora · até 20h');
});

test('RF-07 domingo 10h abre hoje às 13h', () => {
  const estado = estadoLoja(sp('2026-11-29T10:00:00'), loja);
  assert.equal(textoEstado(estado), 'Fechado agora · abrimos hoje às 13h');
});

test('RF-07 domingo 20h fecha e a próxima abertura é quinta', () => {
  const estado = estadoLoja(sp('2026-11-29T20:00:00'), loja);
  assert.equal(estado.tipo, 'fechado');
  assert.equal(textoEstado(estado), 'Fechado agora · abrimos quinta às 13h');
  assert.equal(textoEstado(estado, 'es'), 'Cerrado ahora · abrimos el jueves a las 13h');
});

test('RF-07 quarta à noite abre amanhã', () => {
  const estado = estadoLoja(sp('2026-12-02T21:00:00'), loja);
  assert.equal(textoEstado(estado), 'Fechado agora · abrimos amanhã às 13h');
});

test('RF-07 usa o fuso de São Paulo mesmo com o visitante em outro fuso', () => {
  // 23h30 em São Paulo de sábado = 02h30 de domingo em UTC.
  const local = horaLocal(new Date('2026-11-29T02:30:00Z'), 'America/Sao_Paulo');
  assert.equal(local.dia, 6);
  assert.equal(local.minutos, 23 * 60 + 30);
});

test('resumo dos horários para rodapé e textos', () => {
  assert.equal(resumoHorarios(loja.horarios), 'quinta a domingo, das 13h às 20h');
  assert.equal(resumoHorarios(loja.horarios, 'es'), 'de jueves a domingo, de 13h a 20h');
});
