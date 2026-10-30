import { test } from 'node:test';
import assert from 'node:assert/strict';
import { linkWhatsApp, mensagem, mensagemPedido, descreverCopo, MENSAGENS } from '../src/lib/whatsapp.mjs';
import { loja } from '../conteudo/loja.mjs';

const copo = { sabor: 'B', ml: 500, turbo: true, docura: 'mais', adicionais: ['MEL', 'PAC'] };

test('RF-01 o link abre o WhatsApp da loja com a mensagem escrita', () => {
  const link = linkWhatsApp(loja.whatsapp, 'Oi! Tudo bem?');
  assert.equal(link, 'https://wa.me/5592992594820?text=Oi!%20Tudo%20bem%3F');
});

test('o número precisa ter 55 + DDD', () => {
  assert.throws(() => linkWhatsApp('92992594820', 'x'));
});

test('RF-02 cada origem tem mensagem própria, em PT e ES', () => {
  const origens = Object.keys(MENSAGENS.pt);
  assert.deepEqual(Object.keys(MENSAGENS.es), origens);
  const textos = origens.map((o) => mensagem(o));
  assert.equal(new Set(textos).size, origens.length);
});

test('o botão "Quero provar o primeiro" pede indicação para a primeira vez', () => {
  assert.match(mensagem('provar'), /primeira vez/);
});

test('RF-25 mensagem do pedido leva o código de produção e o preço', () => {
  const texto = mensagemPedido(copo, 'pt', { bairros: ['Ingleses', 'Santinho'] });
  assert.match(texto, /Homer de Banana 500 ml, Modo Turbo, mais doce, com mel e paçoca/);
  assert.match(texto, /\(B5X\+ MEL PAC\) · R\$ 34/);
  assert.match(texto, /Meu bairro \(Ingleses ou Santinho\)/);
  assert.match(texto, /Pix antes do preparo/);
});

test('mensagem do pedido em espanhol', () => {
  assert.equal(descreverCopo(copo, 'es'), 'Homer de Banana 500 ml, Modo Turbo, más dulce, con miel y paçoca (dulce de maní)');
  assert.match(mensagemPedido(copo, 'es', { bairros: ['Ingleses', 'Santinho'] }), /Mi barrio \(Ingleses o Santinho\)/);
});

test('RN-11 / RF-28 na retirada a mensagem não pede bairro e avisa que é sem taxa', () => {
  const texto = mensagemPedido(copo, 'pt', { bairros: ['Ingleses', 'Santinho'], recebimento: 'retirada' });
  assert.match(texto, /\(B5X\+ MEL PAC\) · R\$ 34/);
  assert.match(texto, /Vou retirar \(sem taxa de entrega\)/);
  assert.doesNotMatch(texto, /bairro/);
  assert.match(texto, /Pix antes do preparo/);
  assert.match(mensagemPedido(copo, 'es', { recebimento: 'retirada' }), /Voy a retirar \(sin tarifa de envío\)/);
});

test('antes da inauguração a mensagem vira convite', () => {
  assert.match(mensagemPedido(copo, 'pt', { preInauguracao: true }), /Quero provar quando vocês abrirem/);
});

test('RN-12 / RF-32 pagamento no cartão: a mensagem diz que paga no cartão, na entrega ou na retirada', () => {
  const entrega = mensagemPedido(copo, 'pt', { bairros: ['Ingleses', 'Santinho'], pagamento: 'cartao' });
  assert.match(entrega, /Vou pagar no cartão \(crédito ou débito\) na entrega\./);
  assert.doesNotMatch(entrega, /Pix/);
  const retirada = mensagemPedido(copo, 'pt', { recebimento: 'retirada', pagamento: 'cartao' });
  assert.match(retirada, /Vou pagar no cartão \(crédito ou débito\) na retirada\./);
  assert.match(retirada, /Aviso quando estiver a caminho/);
  assert.match(mensagemPedido(copo, 'es', { pagamento: 'cartao' }), /Pago con tarjeta \(crédito o débito\) al recibirlo\./);
  assert.match(mensagemPedido(copo, 'pt', {}), /Pago no Pix antes do preparo\./);
});
