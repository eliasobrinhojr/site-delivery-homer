import { esc, icone, rotulo, botaoWhatsapp, botaoPedido, botaoIfood, monteSeuCopo, pontos, reais, seloOrigem } from '../componentes.mjs';
import { inicio } from '../../conteudo/textos/inicio.mjs';
import { perguntas } from '../../conteudo/textos/perguntas.mjs';
import { comum } from '../../conteudo/textos/comum.mjs';
import { loja } from '../../conteudo/loja.mjs';
import { caminho } from '../rotas.mjs';
import { precoMinimo } from '../lib/cardapio.mjs';
import { schemaLoja, schemaSite } from './schemas.mjs';

function hero(lang) {
  const t = inicio[lang].hero;
  const [a1, a2, a3] = t.anotacoes;
  return `<section class="hero" aria-labelledby="hero-titulo">
<div class="gh-container hero__grade">
<div class="hero__texto">
${rotulo(t.rotulo)}
<h1 class="gh-titulo-lg hero__titulo" id="hero-titulo">${esc(t.titulo)} <em>${esc(t.destaque)}</em></h1>
<p class="hero__lead">${esc(t.lead)}</p>
<div class="acoes">
${botaoPedido({ origem: 'provar', lang, texto: t.provar })}
<a class="gh-botao gh-botao--contorno" href="${caminho(lang, 'cardapio')}">${esc(t.verCardapio)}</a>
</div>
<p class="hero__preco">${esc(t.precoAntes)} <strong>${esc(reais(precoMinimo()))}</strong> · ${esc(t.precoDepois)}</p>
</div>
<div class="hero__painel">
${seloOrigem(lang)}
<img class="hero__copo" src="/marca/copo-provisorio.svg" alt="${esc(t.altCopo)}" width="200" height="300" fetchpriority="high">
<p class="anot anot--1">${esc(a1.nome)}<span>${esc(a1.sub)}</span></p>
<svg class="seta seta--1" viewBox="0 0 110 60" aria-hidden="true"><path d="M4 6 C 40 2, 78 14, 100 48"></path><path d="M92 44 L101 50 L102 39"></path></svg>
<p class="anot anot--2">${esc(a2.nome)}<span>${esc(a2.sub)}</span></p>
<svg class="seta seta--2" viewBox="0 0 90 40" aria-hidden="true"><path d="M86 8 C 60 2, 26 10, 6 30"></path><path d="M6 20 L5 31 L15 30"></path></svg>
<p class="anot anot--3">${esc(a3.nome)}<span>${esc(a3.sub)}</span></p>
<svg class="seta seta--3" viewBox="0 0 110 50" aria-hidden="true"><path d="M4 40 C 34 46, 74 34, 104 8"></path><path d="M94 9 L105 7 L103 18"></path></svg>
<p class="carimbo" aria-hidden="true">${t.carimbo.map(esc).join('<br>')}</p>
</div>
</div>
</section>`;
}

function prova(lang) {
  const t = inicio[lang].prova;
  const notas = t.notas.map((n) => `<div class="nota"><h3>${esc(n.nome)}</h3>${pontos(n.nota, `${n.nota} ${t.notaDe}`)}<p>${esc(n.texto)}</p></div>`).join('');
  return `<section class="gh-secao prova" aria-labelledby="prova-titulo">
<div class="gh-container prova__grade">
<div>
${rotulo(t.rotulo)}
<h2 class="gh-titulo-md" id="prova-titulo">${esc(t.titulo)}</h2>
<p>${esc(t.p1)}</p>
<p>${esc(t.p2)}</p>
</div>
<div class="ficha">
<div class="ficha__topo"><p class="ficha__titulo">${esc(t.fichaTitulo)}</p><p class="ficha__sub">${esc(t.fichaSub)}</p></div>
${notas}
<p class="ficha__cafeina">${icone('alerta', { tamanho: 20 })}<span>${esc(t.cafeina)}</span></p>
</div>
</div>
</section>`;
}

function norte(lang) {
  const t = inicio[lang].norte;
  const r = t.rota;
  return `<section class="gh-secao gh-secao--vermelha norte" aria-labelledby="norte-titulo">
<div class="gh-container norte__grade">
<div>
${rotulo(t.rotulo)}
<h2 class="gh-titulo-md" id="norte-titulo">${esc(t.titulo)}</h2>
<p>${esc(t.p1)}</p>
<p>${esc(t.p2)}</p>
</div>
<figure class="rota">
<svg viewBox="0 0 460 320" role="img" aria-label="${esc(r.alt)}">
<path class="rota__linha" d="M48 48 C 52 190, 250 248, 410 248"></path>
<circle class="rota__ponto" cx="48" cy="48" r="9"></circle><circle class="rota__halo" cx="48" cy="48" r="18"></circle>
<circle class="rota__ponto" cx="410" cy="248" r="9"></circle><circle class="rota__halo" cx="410" cy="248" r="18"></circle>
<text class="rota__nome" x="78" y="46">${esc(r.origem)}</text>
<text class="rota__sub" x="78" y="68">${esc(r.origemSub)}</text>
<text class="rota__distancia" x="430" y="150" text-anchor="end">${esc(r.distancia)}</text>
<text class="rota__nome" x="410" y="292" text-anchor="end">${esc(r.destino)}</text>
<text class="rota__sub" x="410" y="314" text-anchor="end">${esc(r.destinoSub)}</text>
</svg>
</figure>
</div>
</section>`;
}

function assinatura(lang) {
  const t = inicio[lang].assinatura;
  return `<section class="gh-secao assinatura" aria-labelledby="assinatura-titulo">
<div class="gh-container assinatura__conteudo">
<h2 class="sr-only" id="assinatura-titulo">${esc(t.titulo)}</h2>
<img class="assinatura__logo" src="/marca/logo-principal.svg" alt="${esc(t.altLogo)}" width="667" height="410" loading="lazy">
<p>${esc(t.texto)}</p>
<a class="gh-botao gh-botao--contorno" href="${caminho(lang, 'sobre')}">${esc(t.cta)}</a>
</div>
</section>`;
}

export function passosHtml(lang, { nivel = 'h3' } = {}) {
  const t = inicio[lang].comoPedir;
  return `<ol class="passos">${t.passos.map((p, i) => `<li><span class="passos__num" aria-hidden="true">${i + 1}</span><${nivel}>${esc(p.titulo)}</${nivel}><p>${esc(p.texto)}</p><span class="passos__tempo">${esc(p.tempo)}</span></li>`).join('')}</ol>`;
}

function comoPedir(lang) {
  const t = inicio[lang].comoPedir;
  const c = comum[lang];
  return `<section class="gh-secao ritual" aria-labelledby="ritual-titulo">
<div class="gh-container">
${rotulo(t.rotulo)}
<h2 class="gh-titulo-md" id="ritual-titulo">${esc(t.titulo)}</h2>
${passosHtml(lang)}
<div class="direto-faixa">
<div><h3 class="direto-faixa__titulo">${esc(t.diretoTitulo)}</h3><p>${esc(t.diretoTexto)}${loja.ifood ? ` ${esc(t.diretoIfood)}` : ''}</p></div>
<div class="acoes">${botaoPedido({ origem: 'cardapio', lang, texto: c.pedirWhatsapp })}${botaoIfood(lang, { variante: 'polpa' })}</div>
</div>
</div>
</section>`;
}

export function faqHtml(lang, itens, { abrirPrimeira = true } = {}) {
  return itens.map((q, i) => `<details class="faq"${abrirPrimeira && i === 0 ? ' open' : ''}><summary>${esc(q.p)}</summary><p>${esc(q.r)}</p></details>`).join('');
}

function duvidas(lang) {
  const t = inicio[lang].duvidas;
  const itens = perguntas[lang].itens.filter((q) => q.inicio);
  return `<section class="gh-secao duvidas" aria-labelledby="duvidas-titulo">
<div class="gh-container duvidas__grade">
<div>
${rotulo(t.rotulo)}
<h2 class="gh-titulo-md" id="duvidas-titulo">${esc(t.titulo)}</h2>
<p class="gh-texto-suave">${esc(t.sub)}</p>
<p><a class="link-seta" href="${caminho(lang, 'perguntas')}">${esc(t.todas)} ${icone('seta-direita', { tamanho: 18 })}</a></p>
</div>
<div>
${faqHtml(lang, itens)}
<div class="eventos-faixa">
<div><h3>${esc(t.eventosTitulo)}</h3><p>${esc(t.eventosTexto)}</p></div>
<a class="gh-botao gh-botao--contorno" href="${caminho(lang, 'eventos')}">${esc(t.eventosCta)}</a>
</div>
</div>
</div>
</section>`;
}

export function paginaInicio(lang) {
  const t = inicio[lang];
  return {
    rotaId: 'inicio',
    titulo: t.titulo,
    descricao: t.descricao,
    schemas: [schemaSite(lang), schemaLoja(lang)],
    scripts: ['monte.mjs'],
    corpo: [hero(lang), prova(lang), norte(lang), assinatura(lang), monteSeuCopo(lang, { id: 'monte' }), comoPedir(lang), duvidas(lang)].join('\n')
  };
}
