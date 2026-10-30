// RF-01, RF-02 e RF-25: links e mensagens prontas do WhatsApp.
import { buscarSabor, buscarDocura, buscarAdicional, precoCopo, codigoCopo } from './cardapio.mjs';
import { reais, listaNatural } from './formato.mjs';

/** Link wa.me com a mensagem já escrita. */
export function linkWhatsApp(numero, texto) {
  const so = String(numero).replace(/\D/g, '');
  if (!/^55\d{10,11}$/.test(so)) throw new Error('Número de WhatsApp deve ter 55 + DDD + número');
  return `https://wa.me/${so}?text=${encodeURIComponent(texto)}`;
}

/**
 * RF-02: cada botão manda uma mensagem diferente, para saber de onde veio o pedido.
 * Chaves: provar, cardapio, direto, eventos, duvida, retirada, inauguracao.
 */
export const MENSAGENS = {
  pt: {
    provar: 'Oi! Nunca tomei guaraná batido. Qual vocês indicam pra primeira vez?',
    cardapio: 'Oi! Vi o cardápio no site e quero fazer um pedido.',
    direto: 'Oi! Vim pelo cartão da sacola do iFood e quero pedir direto.',
    eventos: 'Oi! Quero um orçamento de guaraná batido para um evento.',
    duvida: 'Oi! Tenho uma dúvida sobre o guaraná batido.',
    retirada: 'Oi! Quero fazer um pedido para retirar.',
    inauguracao: 'Oi! Quero provar o guaraná batido quando vocês abrirem. Me avisa?'
  },
  es: {
    provar: '¡Hola! Nunca probé el guaraná batido. ¿Cuál me recomiendan para la primera vez?',
    cardapio: '¡Hola! Vi el menú en el sitio y quiero hacer un pedido.',
    direto: '¡Hola! Vengo por la tarjeta de la bolsa de iFood y quiero pedir directo.',
    eventos: '¡Hola! Quiero un presupuesto de guaraná batido para un evento.',
    duvida: '¡Hola! Tengo una duda sobre el guaraná batido.',
    retirada: '¡Hola! Quiero hacer un pedido para retirar.',
    inauguracao: '¡Hola! Quiero probar el guaraná batido cuando abran. ¿Me avisan?'
  }
};

export function mensagem(origem, lang = 'pt') {
  const texto = MENSAGENS[lang]?.[origem];
  if (!texto) throw new Error(`Mensagem desconhecida: ${origem}`);
  return texto;
}

/** Descrição de um copo por extenso: "Homer de Banana 500 ml, Modo Turbo, mais doce, com mel e paçoca". */
export function descreverCopo(copo, lang = 'pt') {
  const es = lang === 'es';
  const partes = [`${buscarSabor(copo.sabor).titulo[lang]} ${copo.ml} ml`];
  if (copo.turbo) partes.push('Modo Turbo');
  partes.push(buscarDocura(copo.docura).nome[lang].toLowerCase());
  if (copo.adicionais.length) {
    const nomes = copo.adicionais.map((id) => buscarAdicional(id).nome[lang].toLowerCase());
    partes.push(`${es ? 'con' : 'com'} ${listaNatural(nomes, lang)}`);
  }
  return partes.join(', ');
}

/**
 * RF-25: mensagem do pedido com o código de produção e o preço.
 * A entrega (ou a retirada, RN-11) e o pagamento (Pix ou cartão, RN-12) são combinados na conversa (fase 2 sem backend).
 */
export function mensagemPedido(copo, lang = 'pt', { preInauguracao = false, bairros = [], recebimento = 'entrega', pagamento = 'pix' } = {}) {
  const es = lang === 'es';
  const retira = recebimento === 'retirada';
  // RN-12: Pix antes do preparo ou cartão (crédito ou débito) na maquininha, na entrega ou na retirada.
  const paga = pagamento === 'cartao'
    ? (es
      ? `Pago con tarjeta (crédito o débito) ${retira ? 'al retirarlo' : 'al recibirlo'}.${retira ? ' Aviso cuando esté en camino.' : ''}`
      : `Vou pagar no cartão (crédito ou débito) ${retira ? 'na retirada' : 'na entrega'}.${retira ? ' Aviso quando estiver a caminho.' : ''}`)
    : (es ? 'Pago con Pix antes de la preparación.' : 'Pago no Pix antes do preparo.');
  const linha = `1 × ${descreverCopo(copo, lang)} (${codigoCopo(copo)}) · ${reais(precoCopo(copo))}`;
  if (preInauguracao) {
    return es
      ? `¡Hola! Armé mi vaso en el sitio:\n${linha}\nQuiero probarlo cuando abran. ¿Me avisan?`
      : `Oi! Montei o meu copo no site:\n${linha}\nQuero provar quando vocês abrirem. Me avisa?`;
  }
  if (retira) {
    return es
      ? `¡Hola! Quiero pedir:\n${linha}\nVoy a retirar (sin tarifa de envío). ¿A qué hora puedo pasar?\n${paga}`
      : `Oi! Quero pedir:\n${linha}\nVou retirar (sem taxa de entrega). Que horas posso passar?\n${paga}`;
  }
  const opcoes = bairros.length ? ` (${listaNatural(bairros, lang).replace(/ (e|y) /, es ? ' o ' : ' ou ')})` : '';
  return es
    ? `¡Hola! Quiero pedir:\n${linha}\nMi barrio${opcoes}: \n${paga}`
    : `Oi! Quero pedir:\n${linha}\nMeu bairro${opcoes}: \n${paga}`;
}
