// Pedaços de HTML reaproveitados nas páginas. Todo texto passa por esc().
import { esc, reais, faixaMg } from './lib/formato.mjs';
import { linkWhatsApp, mensagem } from './lib/whatsapp.mjs';
import { loja } from '../conteudo/loja.mjs';
import { sabores, tamanhos, docuras, adicionais, esgotados } from '../conteudo/cardapio.mjs';
import { monte as textosMonte } from '../conteudo/textos/monte.mjs';
import { comum } from '../conteudo/textos/comum.mjs';
import { COPO_PADRAO, precoCopo, codigoCopo, cafeinaCopo } from './lib/cardapio.mjs';
import { descreverCopo } from './lib/whatsapp.mjs';

export const icone = (nome, { tamanho = 20, classe = '' } = {}) =>
  `<svg class="icone ${classe}" width="${tamanho}" height="${tamanho}" aria-hidden="true" focusable="false"><use href="/marca/icones.svg#i-${nome}"></use></svg>`;

/** Link do WhatsApp com a mensagem da origem (RF-02). */
export const wa = (origem, lang) => linkWhatsApp(loja.whatsapp, mensagem(origem, lang));

/** "Guaraná do Homer · MEI · CNPJ 69.883.553/0001-36" (RF-14). Vazio enquanto não houver CNPJ. */
export function linhaEmpresa(lang) {
  if (!loja.cnpj) return '';
  const r = comum[lang].rodape;
  return [loja.nome, loja.nomeEmpresarial, r.mei, `${r.cnpj} ${loja.cnpj}`].filter(Boolean).join(' · ');
}

/** Chave Pix = CNPJ, com aviso contra Pix falso (RF-14). Vazio se a chave não for o CNPJ. */
export function avisoPix(lang) {
  if (!loja.pixNoCnpj || !loja.cnpj) return '';
  const p = comum[lang].pix;
  const nome = loja.nomeEmpresarial ? ` ${p.nome} <strong>${esc(loja.nomeEmpresarial)}</strong>.` : '';
  return `<div class="gh-aviso aviso-pix">${icone('alerta', { tamanho: 24 })}<div><h2 class="gh-titulo-sm">${esc(p.titulo)}</h2><p>${esc(p.chave)} <strong class="aviso-pix__chave">${esc(loja.cnpj)}</strong>.${nome}</p><p>${esc(p.golpe)}</p></div></div>`;
}

export function botaoWhatsapp({ origem, lang, texto, classe = '', variante = '' }) {
  const v = variante ? ` gh-botao--${variante}` : '';
  return `<a class="gh-botao${v} ${classe}" href="${esc(wa(origem, lang))}" target="_blank" rel="noopener" data-origem="${esc(origem)}">${icone('conversa')}<span>${esc(texto)}</span></a>`;
}

export function botaoIfood(lang, { classe = '', variante = 'contorno' } = {}) {
  if (!loja.ifood) return '';
  return `<a class="gh-botao gh-botao--${variante} ${classe}" href="${esc(loja.ifood)}" target="_blank" rel="noopener" data-origem="ifood">${esc(comum[lang].pedirIfood)}</a>`;
}

export const rotulo = (texto) => `<p class="gh-rotulo">${esc(texto)}</p>`;

export function avisoAlergenicos(lang, { turbo = false } = {}) {
  const c = comum[lang];
  const base = `<p class="gh-aviso">${icone('alerta', { tamanho: 22 })}<span>${esc(c.avisoTodos)}</span></p>`;
  if (!turbo) return base;
  return `${base}<p class="gh-aviso gh-aviso--turbo">${icone('raio', { tamanho: 22 })}<span>${esc(c.avisoTurbo)}</span></p>`;
}

export const seloOrigem = (lang) => `<span class="gh-selo-origem">${icone('folha', { tamanho: 16 })}${esc(comum[lang].deMaues)}</span>`;
export const seloTurbo = (lang) => `<span class="gh-selo-turbo">${icone('raio', { tamanho: 16 })}${esc(comum[lang].modoTurbo)}</span>`;

/** Copo ilustrado (provisório até as fotos de 14–15/11). Cores do líquido vêm do CSS por sabor. */
export function copoSvg({ sabor = 'T', turbo = false, rotulo: alt = '' } = {}) {
  return `<svg class="copo" viewBox="0 0 200 300" data-sabor="${esc(sabor)}" data-turbo="${turbo ? 'sim' : 'nao'}" ${alt ? `role="img" aria-label="${esc(alt)}"` : 'aria-hidden="true"'}>
<path d="M124 4L106 122" class="copo-canudo-base"></path><path d="M124 4L106 122" class="copo-canudo-listra"></path>
<path d="M36 90Q100 40 164 90Z" class="copo-tampa"></path><rect x="30" y="86" width="140" height="12" rx="6" class="copo-aro"></rect>
<path d="M40 98H160L146 284Q145 292 137 292H63Q55 292 54 284Z" class="copo-liquido"></path>
<path d="M40 98H160L157 140H43Z" class="copo-espuma"></path>
<path d="M58 150L66 272" class="copo-brilho"></path>
<circle cx="100" cy="206" r="36" class="copo-etiqueta"></circle>
<image href="/marca/selo-h.svg" x="70" y="176" width="60" height="60"></image>
<g class="copo-faixa-turbo"><rect x="56" y="250" width="88" height="22" rx="11"></rect><text x="100" y="266" text-anchor="middle">TURBO</text></g>
</svg>`;
}

/** "Monte o seu copo" (RF-20/RF-25). Funciona com JS; sem JS mostra o aviso e o botão do WhatsApp. */
export function monteSeuCopo(lang, { id = 'monte', comTitulo = true, nivel = 'h2' } = {}) {
  const t = textosMonte[lang];
  const c = COPO_PADRAO;
  const opcao = (nome, valor, rotuloHtml, { marcado = false, desativado = false, tipo = 'radio', extra = '' } = {}) =>
    `<label class="gh-chip${desativado ? ' gh-chip--off' : ''}"><input type="${tipo}" name="${nome}" value="${esc(valor)}"${marcado ? ' checked' : ''}${desativado ? ' disabled' : ''}${extra}><span>${rotuloHtml}</span></label>`;

  const saboresHtml = sabores.map((s) => {
    const off = esgotados.includes(s.id);
    return opcao('sabor', s.id, `${esc(s.nome[lang])}<small>${esc(off ? t.esgotado : s.curta[lang])}</small>`, { marcado: s.id === c.sabor && !off, desativado: off });
  }).join('');
  const tamanhosHtml = tamanhos.map((tm) =>
    opcao('ml', tm.ml, `${tm.ml} ml<small data-preco-ml="${tm.ml}">${esc(reais(tm.preco))}</small>`, { marcado: tm.ml === c.ml })
  ).join('');
  const docurasHtml = docuras.map((d) => opcao('docura', d.id, esc(d.nome[lang]), { marcado: d.id === c.docura })).join('');
  const adicionaisHtml = adicionais.map((a) => {
    const off = esgotados.includes(a.id);
    return opcao('adicional', a.id, `${esc(a.nome[lang])}<small>${esc(off ? t.esgotado : `+ ${reais(a.preco)}`)}</small>`, { tipo: 'checkbox', desativado: off });
  }).join('');
  const turboHtml = opcao('turbo', 'sim', `${esc(t.turboOpcao)}<small>${esc(t.turboSub)}</small>`, { tipo: 'checkbox', extra: ' data-turbo' });

  const Hn = nivel;
  return `<section class="monte gh-secao" id="${esc(id)}" aria-labelledby="${esc(id)}-titulo" data-monte data-lang="${lang}">
<div class="gh-container monte__grade">
<div class="monte__vitrine">
${copoSvg({ sabor: c.sabor, rotulo: t.altCopo })}
<p class="monte__codigo" aria-live="polite"><span data-saida="codigo">${esc(codigoCopo(c))}</span></p>
<p class="monte__codigo-legenda">${esc(t.codigoLegenda)}</p>
</div>
<div class="monte__painel">
${comTitulo ? `${rotulo(t.rotulo)}<${Hn} class="gh-titulo-md" id="${esc(id)}-titulo">${esc(t.titulo)}</${Hn}>` : `<${Hn} class="sr-only" id="${esc(id)}-titulo">${esc(t.titulo)}</${Hn}>`}
<p class="monte__intro">${esc(t.intro)}</p>
<form class="monte__form" data-monte-form>
<fieldset class="monte__campo"><legend>${esc(t.sabor)}</legend><div class="gh-chips">${saboresHtml}</div></fieldset>
<fieldset class="monte__campo"><legend>${esc(t.tamanho)}</legend><div class="gh-chips">${tamanhosHtml}</div></fieldset>
<fieldset class="monte__campo"><legend>${esc(t.turbo)} <span>· ${esc(t.turboLegenda)}</span></legend><div class="gh-chips gh-chips--turbo">${turboHtml}</div><p class="monte__nota" data-nota-turbo hidden>${esc(t.turbo700)}</p></fieldset>
<fieldset class="monte__campo"><legend>${esc(t.docura)} <span>· ${esc(t.docuraLegenda)}</span></legend><div class="gh-chips">${docurasHtml}</div></fieldset>
<fieldset class="monte__campo"><legend>${esc(t.adicionais)} <span>· ${esc(t.adicionaisLegenda)}</span></legend><div class="gh-chips">${adicionaisHtml}</div></fieldset>
</form>
<div class="monte__resumo" aria-live="polite">
<div class="monte__resumo-linha">
<div><p class="monte__nome" data-saida="nome">${esc(descreverCopo(c, lang))}</p><p class="monte__cafeina">${esc(t.cafeina)}: <span data-saida="cafeina">${esc(faixaMg(cafeinaCopo(c), lang))}</span></p></div>
<p class="monte__total" data-saida="total">${esc(reais(precoCopo(c)))}</p>
</div>
<a class="gh-botao monte__pedir" href="${esc(wa('cardapio', lang))}" target="_blank" rel="noopener" data-saida="link" data-origem="monte">${icone('conversa')}<span data-saida="botao">${esc(t.pedir)}</span></a>
<p class="monte__estado" data-saida="estado" hidden></p>
<noscript><p class="monte__semjs">${esc(t.semJs)}</p></noscript>
<p class="monte__aviso">${esc(t.aviso)}</p>
</div>
</div>
</div>
</section>`;
}

/** Linha de pontos da ficha de prova: 5 círculos, n cheios. */
export function pontos(n, rotuloTexto) {
  const itens = Array.from({ length: 5 }, (_, i) => `<i class="${i < n ? 'cheio' : ''}"></i>`).join('');
  return `<span class="pontos" role="img" aria-label="${esc(rotuloTexto)}">${itens}</span>`;
}

export { esc, reais, faixaMg };
