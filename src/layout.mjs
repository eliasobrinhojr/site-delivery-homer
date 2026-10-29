// Estrutura comum de todas as páginas: <head> com SEO e compartilhamento, cabeçalho, faixas, rodapé.
import { esc, icone, wa, botaoWhatsapp, linhaEmpresa } from './componentes.mjs';
import { comum } from '../conteudo/textos/comum.mjs';
import { loja } from '../conteudo/loja.mjs';
import { caminho, outroIdioma, rota } from './rotas.mjs';
import { resumoHorarios } from './lib/horario.mjs';

const NAV = ['cardapio', 'guarana', 'sobre', 'comoPedir'];

function cabecaHtml({ lang, rotaId, titulo, descricao, ativos, schemas, noindex, ogNome }) {
  const c = comum[lang];
  const url = loja.dominio + caminho(lang, rotaId);
  const urlPt = loja.dominio + caminho('pt', rotaId);
  const urlEs = loja.dominio + caminho('es', rotaId);
  const og = `${loja.dominio}/og/og-${ogNome}-${lang}.png`;
  const jsonLd = (schemas ?? [])
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s).replaceAll('<', '\\u003c')}</script>`)
    .join('\n');
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${esc(url)}">
<link rel="alternate" hreflang="pt-BR" href="${esc(urlPt)}">
<link rel="alternate" hreflang="es" href="${esc(urlEs)}">
<link rel="alternate" hreflang="x-default" href="${esc(urlPt)}">`}
<meta name="theme-color" content="#B5252B">
<meta name="format-detection" content="telephone=no">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/fontes/baloo2-800.woff" as="font" type="font/woff" crossorigin>
<link rel="preload" href="/fontes/nunitosans-400.woff" as="font" type="font/woff" crossorigin>
<link rel="stylesheet" href="${esc(ativos.css)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Guaraná do Homer">
<meta property="og:locale" content="${c.ogLocale}">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(og)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(titulo)}">
<meta name="twitter:card" content="summary_large_image">
<script type="module" src="${esc(ativos.js)}/src/cliente/site.mjs"></script>
${jsonLd}`;
}

function cabecalhoHtml({ lang, rotaId }) {
  const c = comum[lang];
  const outro = outroIdioma(lang);
  const navLinks = NAV.map((id) => {
    const atual = id === rotaId ? ' aria-current="page"' : '';
    return `<li><a href="${caminho(lang, id)}"${atual}>${esc(c.nav[id])}</a></li>`;
  }).join('');
  return `<header class="gh-cabecalho">
<div class="gh-container gh-cabecalho__barra">
<a class="gh-cabecalho__logo" href="${caminho(lang, 'inicio')}" aria-label="Guaraná do Homer, ${esc(c.nav.inicio)}">
<img class="logo-celular" src="/marca/logo-texto.svg" alt="Guaraná do Homer" width="610" height="120">
<img class="logo-tela" src="/marca/logo-linha.svg" alt="Guaraná do Homer" width="742" height="120">
</a>
<nav class="nav" aria-label="${esc(c.navPrincipal)}">
<ul class="nav__lista nav__lista--tela">${navLinks}</ul>
<details class="nav__menu">
<summary class="nav__abrir">${icone('menu', { tamanho: 22 })}<span>${esc(c.menu)}</span></summary>
<ul class="nav__lista nav__lista--menu">${navLinks}</ul>
</details>
<a class="nav__idioma" href="${caminho(outro, rota(rotaId) ? rotaId : 'inicio')}" hreflang="${comum[outro].lang}" lang="${comum[outro].lang}" data-idioma="${outro}">${icone('idioma', { tamanho: 18 })}<span>${outro.toUpperCase()}</span><span class="sr-only"> · ${esc(c.trocarIdioma)}</span></a>
<a class="gh-botao nav__pedir" href="${esc(wa('provar', lang))}" target="_blank" rel="noopener" data-origem="cabecalho">${esc(c.pedir)}</a>
</nav>
</div>
</header>`;
}

function faixasHtml({ lang }) {
  const c = comum[lang];
  const aviso = loja.aviso?.[lang] ? `<p class="gh-faixa-aviso" role="note">${esc(loja.aviso[lang])}</p>` : '';
  const padrao = `${resumoHorarios(loja.horarios, lang)} · ${c.areaCurta}`;
  return `${aviso}<p class="gh-faixa-status" data-status data-estado="neutro"><span data-status-texto>${esc(padrao.charAt(0).toUpperCase() + padrao.slice(1))}</span></p>`;
}

function rodapeHtml({ lang }) {
  const c = comum[lang];
  const r = c.rodape;
  const links = (ids) => ids.map((id) => `<li><a href="${caminho(lang, id)}">${esc(c.nav[id])}</a></li>`).join('');
  const peca = [
    `<li><a href="${esc(wa('cardapio', lang))}" target="_blank" rel="noopener" data-origem="rodape">WhatsApp</a></li>`,
    loja.ifood ? `<li><a href="${esc(loja.ifood)}" target="_blank" rel="noopener">iFood</a></li>` : '',
    loja.instagram ? `<li><a href="${esc(loja.instagram)}" target="_blank" rel="noopener">Instagram</a></li>` : '',
    `<li><a href="${caminho(lang, 'direto')}">${esc(c.nav.direto)}</a></li>`
  ].join('');
  const horario = resumoHorarios(loja.horarios, lang);
  return `<footer class="gh-rodape">
<div class="gh-container rodape__grade">
<div class="rodape__marca">
<img src="/marca/logo-horizontal-polpa.svg" alt="Guaraná do Homer" width="505" height="176" loading="lazy">
<p>${esc(r.sobre)}</p>
</div>
<div><h2 class="rodape__titulo">${esc(r.horario)}</h2><p>${esc(horario.charAt(0).toUpperCase() + horario.slice(1))}</p><p>${esc(c.area)}</p></div>
<div><h2 class="rodape__titulo">${esc(r.peca)}</h2><ul>${peca}</ul></div>
<div><h2 class="rodape__titulo">${esc(r.saibaMais)}</h2><ul>${links(['cardapio', 'guarana', 'sobre', 'comoPedir', 'eventos', 'perguntas', 'privacidade'])}</ul></div>
</div>
<div class="gh-container rodape__legal">
<p>${esc(c.avisoTodos)}</p>
<p class="rodape__empresa">${loja.cnpj ? `${esc(linhaEmpresa(lang))} ·&nbsp;©&nbsp;2026` : `© 2026 ${esc(r.direitos)}`}</p>
</div>
</footer>`;
}

function cookiesHtml({ lang }) {
  const temMedicao = Boolean(loja.analytics?.metaPixel || loja.analytics?.ga4);
  if (!temMedicao) return '';
  const k = comum[lang].cookies;
  return `<div class="cookies" data-cookies hidden role="dialog" aria-live="polite" aria-label="Cookies">
<p>${esc(k.texto)} <a href="${caminho(lang, 'privacidade')}">${esc(k.saibaMais)}</a></p>
<div class="cookies__acoes"><button type="button" class="gh-botao gh-botao--contorno" data-cookies-recusar>${esc(k.recusar)}</button><button type="button" class="gh-botao" data-cookies-aceitar>${esc(k.aceitar)}</button></div>
</div>`;
}

/**
 * Página completa.
 * @param {{lang:'pt'|'es', rotaId:string, titulo:string, descricao:string, corpo:string, ativos:{css:string, js:string}, schemas?:object[], noindex?:boolean, scripts?:string[]}} p
 */
export function pagina(p) {
  const c = comum[p.lang];
  const ogNome = rota(p.rotaId)?.og ?? 'padrao';
  const extras = (p.scripts ?? []).map((s) => `<script type="module" src="${esc(p.ativos.js)}/src/cliente/${esc(s)}"></script>`).join('\n');
  return `<!doctype html>
<html lang="${c.lang}">
<head>
${cabecaHtml({ ...p, ogNome })}
${extras}
</head>
<body data-pagina="${esc(p.rotaId)}">
<a class="pular" href="#conteudo">${esc(c.pularConteudo)}</a>
${faixasHtml(p)}
${cabecalhoHtml(p)}
<main id="conteudo" tabindex="-1">
${p.corpo}
</main>
${rodapeHtml(p)}
<div class="gh-botao-fixo-area">${botaoWhatsapp({ origem: 'provar', lang: p.lang, texto: c.pedirWhatsapp, classe: 'gh-botao-fixo' })}</div>
${cookiesHtml(p)}
</body>
</html>
`;
}
