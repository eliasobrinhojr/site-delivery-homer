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

test('RF-14 Como pedir e /direto mostram a chave Pix (CNPJ) com o aviso contra Pix falso, em PT e ES', async () => {
  for (const p of ['/como-pedir/index.html', '/direto/index.html']) {
    const html = await ler(p);
    assert.match(html, /Chave Pix<\/h2><p>A chave é sempre o CNPJ da loja: <strong class="aviso-pix__chave">69\.883\.553\/0001-36<\/strong>/, p);
    assert.match(html, /Não pague e chame a gente no WhatsApp/, p);
  }
  assert.match(await ler('/es/como-pedir/index.html'), /Clave Pix<\/h2>.*69\.883\.553\/0001-36.*No pagues/s);
});

test('RF-29 antes da inauguração nenhum botão de pedido faz pedido: todos dizem "Abrimos em breve"', async () => {
  for (const p of ['/index.html', '/cardapio/index.html', '/como-pedir/index.html', '/direto/index.html', '/es/index.html']) {
    const html = await ler(p);
    const botoes = html.match(/<a [^>]*data-pedido="[^"]+"[^>]*>[\s\S]*?<\/a>/g) ?? [];
    assert.ok(botoes.length > 0, `${p} sem botões de pedido`);
    for (const b of botoes) {
      assert.match(b, /data-origem="inauguracao"/, p);
      assert.match(b, /text=(Oi|%C2%A1Hola)/, p);
      assert.doesNotMatch(b, /quero%20fazer%20um%20pedido|quiero%20hacer%20un%20pedido/i, p);
      if (/class="gh-botao/.test(b)) {
        assert.match(b, /gh-botao--breve/, p);
        assert.match(b, /(Abrimos em breve · me avise|Abrimos pronto · avisame|Em breve|Pronto)<\/span>/, p);
      }
    }
  }
});

test('RF-29 a área da equipe existe, fica fora da busca e não guarda a frase', async () => {
  const html = await ler('/equipe/index.html');
  assert.match(html, /<meta name="robots" content="noindex">/);
  assert.match(html, /data-equipe-form/);
  assert.match(html, /src\/cliente\/equipe\.mjs/);
  assert.match(await ler('/robots.txt'), /Disallow: \/equipe\//);
  assert.doesNotMatch(await ler('/sitemap.xml'), /equipe/);
  assert.doesNotMatch(await ler('/index.html'), /href="\/equipe\//, 'sem link público para a área da equipe');
});

test('RF-30 enquanto os preços são estimados, todo lugar com preço avisa', async () => {
  const inicio = await ler('/index.html');
  assert.match(inicio, /class="selo-estimado">preço estimado</);
  assert.match(inicio, /Os preços já são definitivos\?/);
  assert.doesNotMatch(inicio, /"priceRange"/, 'preço estimado não vai para o Google');
  for (const p of ['/cardapio/index.html', '/direto/index.html', '/es/cardapio/index.html']) {
    assert.match(await ler(p), /class="gh-aviso aviso-precos[^"]*"[\s\S]*?(Preços estimados|Precios estimados)/, p);
  }
  assert.match(await ler('/perguntas/index.html'), /Os preços já são definitivos\?/);
});

test('a área de entrega é Ingleses e Santinho', async () => {
  const html = await ler('/como-pedir/index.html');
  assert.match(html, /Ingleses/);
  assert.match(html, /Santinho/);
});

test('RF-28 a retirada aparece em Como pedir, no monte o seu e nas perguntas, em PT e ES', async () => {
  const como = await ler('/como-pedir/index.html');
  assert.match(como, /Prefere buscar\?/);
  assert.match(como, /Sem taxa de entrega, para quem mora em qualquer bairro/);
  assert.match(como, /O endereço vai junto com a confirmação do pedido/);
  assert.match(como, /Vou%20retirar|retirar/);
  assert.match(await ler('/es/como-pedir/index.html'), /¿Preferís retirarlo\?/);
  assert.match(await ler('/cardapio/index.html'), /name="recebimento" value="retirada"/);
  assert.match(await ler('/perguntas/index.html'), /Posso retirar o pedido\?/);
  assert.match(await ler('/es/perguntas/index.html'), /¿Puedo retirar el pedido\?/);
});

test('o idioma alterna para a mesma página no outro idioma', async () => {
  assert.match(await ler('/cardapio/index.html'), /class="nav__idioma" href="\/es\/cardapio\/"/);
  assert.match(await ler('/es/cardapio/index.html'), /class="nav__idioma" href="\/cardapio\/"/);
});

test('RN-13 o cardápio e o monte o seu mostram como cada adicional vai no copo, em PT e ES', async () => {
  const pt = await ler('/cardapio/index.html');
  assert.match(pt, /Calda de doce de leite/);
  assert.match(pt, /Calda de chocolate/);
  assert.match(pt, /<p class="monte__grupo">Na parede do copo<\/p>/);
  assert.match(pt, /<td>No liquidificador<\/td>/);
  assert.doesNotMatch(pt, /Vão por cima, para você ver/);
  const es = await ler('/es/cardapio/index.html');
  assert.match(es, /Dulce de leche/);
  assert.match(es, /En la pared del vaso/);
  assert.match(pt, /Os adicionais estão em teste e podem mudar até a inauguração/);
  assert.match(es, /Los extras están en prueba/);
});

test('RF-31 Nossa história conta a família e o pai no preparo, com missão, visão e valores, sem meta interna', async () => {
  for (const [caminho, termos] of [
    ['/sobre/index.html', ['Eu sou o Homer', 'minha esposa', 'Manaus', 'liquidificador', 'Missão', 'Visão', 'Família']],
    ['/es/sobre/index.html', ['Soy Homer', 'mi esposa', 'Manaos', 'licuadora', 'Misión', 'Visión', 'Familia']]
  ]) {
    const html = await ler(caminho);
    for (const t of termos) assert.ok(html.includes(t), `${caminho}: falta "${t}"`);
    assert.doesNotMatch(html, /nota-foto|metade dos pedidos|mitad de los pedidos/, caminho);
  }
});

test('RF-31 a história é do Homer: nenhuma página fala "meu pai" na voz do filho', async () => {
  for (const p of paginas) assert.doesNotMatch(await ler(p), /\bmeu pai\b|\bmi papá\b|\bvim na frente\b|\bvine adelante\b/i, p);
});

test('RN-12 / RF-32 o site aceita Pix e cartão de crédito ou débito, em PT e ES', async () => {
  for (const [caminho, re] of [
    ['/como-pedir/index.html', /cartão de crédito ou débito/],
    ['/perguntas/index.html', /cartão de crédito ou débito/],
    ['/index.html', /cartão/],
    ['/direto/index.html', /cartão/],
    ['/es/como-pedir/index.html', /tarjeta de crédito o débito/],
    ['/es/perguntas/index.html', /tarjeta de crédito o débito/]
  ]) assert.match(await ler(caminho), re, caminho);
  const monte = await ler('/cardapio/index.html');
  assert.match(monte, /name="pagamento" value="pix"/);
  assert.match(monte, /name="pagamento" value="cartao"/);
  assert.match(await ler('/index.html'), /"paymentAccepted":"Pix, cartão de crédito, cartão de débito"/);
});

test('RF-33 /avise/ leva direto ao WhatsApp com a mensagem pronta, fora da busca', async () => {
  const { linkWhatsApp, mensagem } = await import('../src/lib/whatsapp.mjs');
  const { loja } = await import('../conteudo/loja.mjs');
  const { antesDaInauguracao } = await import('../src/componentes.mjs');
  const html = await ler('/avise/index.html');
  const alvo = linkWhatsApp(loja.whatsapp, mensagem(antesDaInauguracao() ? 'inauguracao' : 'provar', 'pt'));
  assert.ok(html.includes(`<meta http-equiv="refresh" content="0; url=${alvo}">`), 'redirecionamento imediato');
  assert.ok(html.includes(`href="${alvo}"`), 'botão de reserva');
  assert.doesNotMatch(alvo, /%25/, 'mensagem codificada uma vez só');
  assert.match(html, /<meta name="robots" content="noindex">/);
  assert.match(await ler('/robots.txt'), /Disallow: \/avise\//);
  assert.doesNotMatch(await ler('/sitemap.xml'), /\/avise\//);
});
