import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  validarCopo, normalizarCopo, precoCopo, cafeinaCopo, codigoCopo, totalPedido,
  descontoPermitido, turboDisponivel, precoMinimo
} from '../src/lib/cardapio.mjs';
import { adicionais, modosAdicional } from '../conteudo/cardapio.mjs';

const copo = (extra = {}) => ({ sabor: 'T', ml: 500, turbo: false, docura: 'normal', adicionais: [], ...extra });

test('RN-01 o preço é o mesmo para os três sabores em cada tamanho', () => {
  for (const ml of [300, 500, 700]) {
    const precos = ['T', 'A', 'B'].map((sabor) => precoCopo(copo({ sabor, ml })));
    assert.equal(new Set(precos).size, 1, `${ml} ml`);
  }
  assert.equal(precoCopo(copo({ ml: 300 })), 17);
  assert.equal(precoCopo(copo({ ml: 500 })), 24);
  assert.equal(precoCopo(copo({ ml: 700 })), 33);
});

test('RN-02 Turbo só em 300 e 500 ml', () => {
  assert.equal(turboDisponivel(300), true);
  assert.equal(turboDisponivel(500), true);
  assert.equal(turboDisponivel(700), false);
  assert.deepEqual(validarCopo(copo({ ml: 700, turbo: true })), ['RN-02']);
  assert.equal(precoCopo(copo({ ml: 300, turbo: true })), 21);
  assert.equal(precoCopo(copo({ ml: 500, turbo: true })), 28);
  assert.throws(() => precoCopo(copo({ ml: 700, turbo: true })));
});

test('RN-02 trocar para 700 ml desliga o Turbo', () => {
  assert.equal(normalizarCopo(copo({ ml: 700, turbo: true })).turbo, false);
});

test('RN-03 doçura é obrigatória, grátis e só existem três', () => {
  for (const docura of ['menos', 'normal', 'mais']) {
    assert.equal(precoCopo(copo({ docura })), 24);
  }
  assert.deepEqual(validarCopo(copo({ docura: 'zero' })), ['RN-03']);
});

test('RN-04 até 3 adicionais, cada um uma vez', () => {
  assert.equal(precoCopo(copo({ adicionais: ['MEL', 'PAC', 'CAN'] })), 24 + 3 + 3 + 1);
  assert.deepEqual(validarCopo(copo({ adicionais: ['MEL', 'PAC', 'CAN', 'AMD'] })), ['RN-04']);
  assert.deepEqual(validarCopo(copo({ adicionais: ['MEL', 'MEL'] })), ['RN-04']);
  assert.deepEqual(normalizarCopo(copo({ adicionais: ['MEL', 'MEL', 'PAC', 'CAN', 'AMD'] })).adicionais, ['MEL', 'PAC', 'CAN']);
});

test('RN-05 e RN-06 não existe versão sem leite, sem amendoim nem com ingrediente ácido', () => {
  assert.deepEqual(validarCopo(copo({ adicionais: ['SEM-AMENDOIM'] })), ['adicional-invalido']);
  assert.deepEqual(validarCopo(copo({ adicionais: ['LIMAO'] })), ['adicional-invalido']);
});

test('RN-07 sabor ou adicional esgotado não pode ser pedido', () => {
  assert.deepEqual(validarCopo(copo({ sabor: 'A' }), { listaEsgotados: ['A'] }), ['RN-07']);
  assert.deepEqual(validarCopo(copo({ adicionais: ['PAC'] }), { listaEsgotados: ['PAC'] }), ['RN-07']);
});

test('RN-08 combo de casal: 2 copos de 500 ml por R$ 44', () => {
  assert.equal(totalPedido([copo(), copo({ sabor: 'B' })]), 44);
  assert.equal(totalPedido([copo(), copo(), copo()]), 44 + 24);
  assert.equal(totalPedido([copo(), copo({ ml: 300 })]), 24 + 17);
});

test('RN-09 nenhum desconto acima de 15%', () => {
  assert.equal(descontoPermitido(0.15), true);
  assert.equal(descontoPermitido(0.16), false);
});

test('código de produção da etiqueta', () => {
  assert.equal(codigoCopo(copo({ sabor: 'B', turbo: true, docura: 'mais', adicionais: ['MEL', 'PAC'] })), 'B5X+ MEL PAC');
  assert.equal(codigoCopo(copo({ sabor: 'A', ml: 300, docura: 'menos' })), 'A3−');
  assert.equal(codigoCopo(copo({ ml: 700 })), 'T7');
});

test('cafeína estimada por copo, Turbo nunca passa de 200 mg', () => {
  assert.deepEqual(cafeinaCopo(copo({ ml: 300 })), [60, 70]);
  assert.deepEqual(cafeinaCopo(copo({ ml: 500, turbo: true })), [150, 185]);
  assert.deepEqual(cafeinaCopo(copo({ ml: 700 })), [125, 155]);
  for (const ml of [300, 500]) assert.ok(cafeinaCopo(copo({ ml, turbo: true }))[1] < 200);
});

test('"a partir de" usa o menor preço', () => {
  assert.equal(precoMinimo(), 17);
});

test('RN-04 caldas de doce de leite e de chocolate custam R$ 3 e contam no limite de 3', () => {
  assert.equal(precoCopo(copo({ adicionais: ['DDL', 'CHO'] })), 24 + 3 + 3);
  assert.deepEqual(validarCopo(copo({ adicionais: ['DDL', 'CHO', 'PAC', 'CAN'] })), ['RN-04']);
  assert.equal(codigoCopo(copo({ sabor: 'B', adicionais: ['PAC', 'DDL'] })), 'B5 PAC DDL');
});

test('RN-13 todo adicional tem um jeito de ir no copo, e as caldas vão na parede', () => {
  for (const a of adicionais) assert.ok(modosAdicional.includes(a.modo), `${a.id} sem modo válido`);
  assert.deepEqual(adicionais.filter((a) => a.modo === 'parede').map((a) => a.id), ['DDL', 'CHO']);
  assert.deepEqual(adicionais.filter((a) => a.modo === 'topo').map((a) => a.id), ['CAN']);
});
