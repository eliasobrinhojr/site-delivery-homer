import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { loja } from '../conteudo/loja.mjs';
import { hashFrase, normalizarFrase, equipeAtiva, registroEquipe, paraTeste, lerRegistro, CHAVE_EQUIPE } from '../src/lib/equipe.mjs';

test('RF-29 o hash da frase é SHA-256 de "gh-equipe:" + frase normalizada', async () => {
  const esperado = createHash('sha256').update('gh-equipe:copo de manaus').digest('hex');
  assert.equal(await hashFrase('  Copo de MANAUS '), esperado);
  assert.equal(normalizarFrase(' Maués '), 'maués');
});

test('RF-29 só o hash fica no código, com validade de 30 dias', () => {
  assert.match(loja.equipe.hash, /^[0-9a-f]{64}$/);
  assert.equal(loja.equipe.validadeDias, 30);
});

test('RF-29 modo equipe exige o hash atual e respeita a validade', () => {
  const agora = Date.UTC(2026, 10, 1);
  const registro = registroEquipe(loja.equipe.hash, 30, agora);
  assert.equal(equipeAtiva(registro, loja.equipe, agora + 1000), true);
  assert.equal(equipeAtiva(registro, loja.equipe, agora + 31 * 24 * 3600 * 1000), false, 'vence em 30 dias');
  assert.equal(equipeAtiva({ ...registro, hash: 'f'.repeat(64) }, loja.equipe, agora), false, 'frase antiga não vale');
  assert.equal(equipeAtiva(null, loja.equipe, agora), false);
});

test('RF-29 lê o registro do aparelho sem quebrar com dado estragado', () => {
  const guardado = (valor) => ({ getItem: (k) => (k === CHAVE_EQUIPE ? valor : null) });
  assert.deepEqual(lerRegistro(guardado('{"hash":"a","ate":1}')), { hash: 'a', ate: 1 });
  assert.equal(lerRegistro(guardado('{quebrado')), null);
  assert.equal(lerRegistro(null), null);
});

test('RF-29 pedido da equipe sai marcado como [TESTE], uma vez só', () => {
  assert.equal(paraTeste('Oi! Quero pedir'), '[TESTE] Oi! Quero pedir');
  assert.equal(paraTeste(paraTeste('Oi!')), '[TESTE] Oi!');
});
