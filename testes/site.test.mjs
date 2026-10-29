import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { construir } from '../scripts/build.mjs';
import { verificar } from '../scripts/verificar.mjs';

const { paginas } = await construir();
const ler = (caminho) => readFile(new URL(`../dist${caminho}`, import.meta.url), 'utf8');

test('o build gera as 9 páginas nos dois idiomas (RF-08)', () => {
  assert.equal(paginas.length, 18);
  assert.ok(paginas.includes('/index.html'));
  assert.ok(paginas.includes('/es/cardapio/index.html'));
});

test('o site gerado passa na verificação (SEO, CSP, links, regras da marca, RF-04)', async () => {
  const { problemas } = await verificar();
  assert.deepEqual(problemas, []);
});

test('RF-01 todo HTML tem o botão de pedir fixo com o WhatsApp da loja', async () => {
  for (const p of paginas) {
    const html = await ler(p);
    assert.match(html, /gh-botao-fixo/, p);
    assert.match(html, /https:\/\/wa\.me\/5592992594820\?text=/, p);
  }
});

test('RF-04 o preço do iFood aparece na página /direto', async () => {
  assert.match(await ler('/direto/index.html'), /R\$ 31,90/);
});

test('RF-14 todo HTML identifica a empresa no rodapé (nome, MEI e CNPJ)', async () => {
  for (const p of paginas) {
    assert.match(await ler(p), /class="rodape__empresa">Guaraná do Homer · MEI · CNPJ 69\.883\.553\/0001-36 ·&nbsp;©&nbsp;2026</, p);
  }
});

test('RF-14 os dados do Google trazem o CNPJ só com dígitos (taxID)', async () => {
  assert.match(await ler('/index.html'), /"taxID":"69883553000136"/);
});

test('RF-14 privacidade e eventos mostram quem é a empresa', async () => {
  assert.match(await ler('/privacidade/index.html'), /Responsável pelos dados \(controlador\):<\/strong> Guaraná do Homer · MEI · CNPJ 69\.883\.553\/0001-36/);
  assert.match(await ler('/es/privacidade/index.html'), /CNPJ 69\.883\.553\/0001-36/);
  assert.match(await ler('/eventos/index.html'), /cadastro de fornecedor: Guaraná do Homer · MEI · CNPJ 69\.883\.553\/0001-36/);
});

test('a área de entrega é Ingleses e Santinho', async () => {
  const html = await ler('/como-pedir/index.html');
  assert.match(html, /Ingleses/);
  assert.match(html, /Santinho/);
});

test('o idioma alterna para a mesma página no outro idioma', async () => {
  assert.match(await ler('/cardapio/index.html'), /class="nav__idioma" href="\/es\/cardapio\/"/);
  assert.match(await ler('/es/cardapio/index.html'), /class="nav__idioma" href="\/cardapio\/"/);
});
