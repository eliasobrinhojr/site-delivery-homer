import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loja } from '../conteudo/loja.mjs';
import { cnpjValido, soDigitos } from '../src/lib/formato.mjs';

test('RF-14 o CNPJ da loja tem dígitos verificadores válidos', () => {
  assert.ok(cnpjValido(loja.cnpj), `CNPJ inválido em conteudo/loja.mjs: ${loja.cnpj}`);
  assert.match(loja.cnpj, /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'use o formato 00.000.000/0000-00');
});

test('cnpjValido recusa erro de digitação e sequências repetidas', () => {
  assert.equal(cnpjValido('69.883.553/0001-36'), true);
  assert.equal(cnpjValido('69.883.553/0001-63'), false);
  assert.equal(cnpjValido('11.111.111/1111-11'), false);
  assert.equal(cnpjValido('123'), false);
  assert.equal(soDigitos('69.883.553/0001-36'), '69883553000136');
});

test('RF-14 o nome empresarial, quando preenchido, começa pela raiz do CNPJ (padrão da Receita para MEI)', () => {
  if (!loja.nomeEmpresarial) return;
  const raiz = loja.cnpj.slice(0, 10);
  assert.ok(loja.nomeEmpresarial.startsWith(raiz), `esperado "${raiz} NOME DO TITULAR"`);
});
