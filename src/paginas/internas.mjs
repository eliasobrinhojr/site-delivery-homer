import { esc, icone, rotulo, botaoWhatsapp, botaoIfood, monteSeuCopo, reais, faixaMg, avisoAlergenicos, copoSvg, seloTurbo, seloOrigem } from '../componentes.mjs';
import { cardapioPagina, guaranaPagina, sobrePagina, comoPedirPagina, diretoPagina, eventosPagina, privacidadePagina, erroPagina } from '../../conteudo/textos/paginas.mjs';
import { perguntas } from '../../conteudo/textos/perguntas.mjs';
import { comum } from '../../conteudo/textos/comum.mjs';
import { sabores, tamanhos, adicionais, regras } from '../../conteudo/cardapio.mjs';
import { loja } from '../../conteudo/loja.mjs';
import { caminho } from '../rotas.mjs';
import { resumoHorarios } from '../lib/horario.mjs';
import { passosHtml, faqHtml } from './inicio.mjs';
import { schemaLoja, schemaFaq } from './schemas.mjs';

const topo = (t, { extra = '' } = {}) => `<section class="topo-pagina" aria-labelledby="h1">
<div class="gh-container">
${rotulo(t.rotulo)}
<h1 class="gh-titulo-lg" id="h1">${esc(t.h1)}</h1>
${t.lead ? `<p class="topo-pagina__lead">${esc(t.lead)}</p>` : ''}
${extra}
</div>
</section>`;

const secao = (conteudo, classe = '') => `<section class="gh-secao ${classe}"><div class="gh-container">${conteudo}</div></section>`;
const maiuscula = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export function paginaCardapio(lang) {
  const t = cardapioPagina[lang];
  const c = comum[lang];
  const cartoes = sabores.map((s) => `<article class="sabor">
<div class="sabor__foto">${copoSvg({ sabor: s.id, rotulo: s.titulo[lang] })}</div>
<div class="sabor__corpo"><h3 class="sabor__nome">${esc(s.titulo[lang])}</h3><p>${esc(s.desc[lang])}</p><p class="sabor__preco">${esc(c.aPartirDe)} <strong>${esc(reais(tamanhos[0].preco))}</strong></p></div>
</article>`).join('');
  const linhasPreco = tamanhos.map((tm) => `<tr><th scope="row">${tm.ml} ml</th><td>${esc(reais(tm.preco))}</td><td>${tm.precoTurbo ? esc(reais(tm.precoTurbo)) : `<span class="gh-texto-suave">${esc(t.naoExiste)}</span>`}</td></tr>`).join('');
  const linhasAdd = adicionais.map((a) => `<tr><th scope="row">${esc(a.nome[lang])}</th><td>+ ${esc(reais(a.preco))}</td></tr>`).join('');
  const linhasCafeina = tamanhos.flatMap((tm) => [
    `<tr><th scope="row">${tm.ml} ml</th><td>${esc(faixaMg(tm.cafeina, lang))}</td></tr>`,
    ...(tm.cafeinaTurbo ? [`<tr><th scope="row">${esc(c.modoTurbo)} ${tm.ml} ml</th><td>${esc(faixaMg(tm.cafeinaTurbo, lang))}</td></tr>`] : [])
  ]).join('');
  const corpo = [
    topo(t, { extra: `<div class="acoes">${botaoWhatsapp({ origem: 'cardapio', lang, texto: c.pedirWhatsapp })}${botaoIfood(lang)}</div>` }),
    secao(`<h2 class="gh-titulo-md">${esc(t.saboresTitulo)}</h2><div class="sabores">${cartoes}</div>`),
    secao(`<div class="cardapio__grade">
<div class="gh-cartao"><h2 class="gh-titulo-sm">${esc(t.precosTitulo)}</h2><div class="gh-tabela-rolagem"><table class="gh-tabela"><thead><tr><th scope="col">${esc(t.colTamanho)}</th><th scope="col">${esc(t.colSabores)}</th><th scope="col">${esc(t.colTurbo)}</th></tr></thead><tbody>${linhasPreco}</tbody></table></div>
<p class="cardapio__combo"><strong>${esc(t.comboTitulo)}:</strong> ${esc(t.comboTexto)}</p></div>
<div class="gh-cartao gh-cartao--turbo">${seloTurbo(lang)}<h2 class="gh-titulo-sm">${esc(t.turboTitulo)}</h2><p>${esc(t.turboTexto)}</p></div>
<div class="gh-cartao"><h2 class="gh-titulo-sm">${esc(t.docuraTitulo)}</h2><p>${esc(t.docuraTexto)}</p></div>
<div class="gh-cartao"><h2 class="gh-titulo-sm">${esc(t.adicionaisTitulo)}</h2><p>${esc(t.adicionaisTexto)}</p><div class="gh-tabela-rolagem"><table class="gh-tabela"><thead><tr><th scope="col">${esc(t.colAdicional)}</th><th scope="col">${esc(t.colPreco)}</th></tr></thead><tbody>${linhasAdd}</tbody></table></div></div>
<div class="gh-cartao cardapio__cafeina"><h2 class="gh-titulo-sm">${esc(t.cafeinaTitulo)}</h2><div class="gh-tabela-rolagem"><table class="gh-tabela"><thead><tr><th scope="col">${esc(t.colCopo)}</th><th scope="col">${esc(t.colCafeina)}</th></tr></thead><tbody>${linhasCafeina}</tbody></table></div><p class="gh-texto-suave nota-pequena">${esc(t.cafeinaTexto)}</p></div>
</div>
<div class="avisos">${avisoAlergenicos(lang, { turbo: true })}</div>`, 'cardapio'),
    monteSeuCopo(lang, { id: 'monte' })
  ].join('\n');
  return { rotaId: 'cardapio', titulo: t.titulo, descricao: t.descricao, corpo, schemas: [schemaLoja(lang)], scripts: ['monte.mjs'] };
}

export function paginaGuarana(lang) {
  const t = guaranaPagina[lang];
  const c = comum[lang];
  const ingredientes = t.ingredientes.map((i) => `<li><strong>${esc(i.nome)}</strong><span>${esc(i.texto)}</span></li>`).join('');
  const preparo = t.preparo.map((p) => `<li>${esc(p)}</li>`).join('');
  const corpo = [
    topo(t, { extra: seloOrigem(lang) }),
    secao(`<div class="duas-colunas">
<div><h2 class="gh-titulo-md">${esc(t.origemTitulo)}</h2>${t.origemTexto.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
<div class="painel-vermelho"><img src="/marca/copo-provisorio.svg" alt="" width="200" height="300" loading="lazy"></div>
</div>`),
    secao(`<h2 class="gh-titulo-md">${esc(t.copoTitulo)}</h2><p>${esc(t.copoTexto)}</p><ul class="ingredientes">${ingredientes}</ul><p class="gh-texto-suave">${esc(t.ligaNota)}</p>`, 'fundo-polpa'),
    secao(`<div class="duas-colunas">
<div><h2 class="gh-titulo-md">${esc(t.preparoTitulo)}</h2><ol class="lista-numerada">${preparo}</ol></div>
<div><h2 class="gh-titulo-md">${esc(t.ritualTitulo)}</h2><p>${esc(t.ritualTexto)}</p>
<div class="gh-cartao gh-cartao--turbo">${seloTurbo(lang)}<h3 class="gh-titulo-sm">${esc(t.turboTitulo)}</h3><p>${esc(t.turboTexto)}</p></div></div>
</div>
<div class="avisos">${avisoAlergenicos(lang, { turbo: true })}</div>
<div class="acoes acoes--centro">${botaoWhatsapp({ origem: 'provar', lang, texto: c.pedirWhatsapp })}<a class="gh-botao gh-botao--contorno" href="${caminho(lang, 'cardapio')}">${esc(c.nav.cardapio)}</a></div>`)
  ].join('\n');
  return { rotaId: 'guarana', titulo: t.titulo, descricao: t.descricao, corpo };
}

export function paginaSobre(lang) {
  const t = sobrePagina[lang];
  const c = comum[lang];
  const valores = t.valores.map((v, i) => `<li><span class="valores__num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><h3>${esc(v.nome)}</h3><p>${esc(v.texto)}</p></li>`).join('');
  const corpo = [
    topo(t),
    `<section class="gh-secao gh-secao--vermelha"><div class="gh-container sobre__assinatura">
<img src="/marca/logo-principal-polpa.svg" alt="Guaraná do Homer" width="667" height="410" loading="lazy">
<div><h2 class="gh-titulo-md">${esc(t.assinaturaTitulo)}</h2><p>${esc(t.assinaturaTexto)}</p><p class="nota-foto">${esc(t.fotoPendente)}</p></div>
</div></section>`,
    secao(`<div class="duas-colunas">
<div><h2 class="gh-titulo-sm">${esc(t.missaoTitulo)}</h2><p class="frase-grande">${esc(t.missao)}</p></div>
<div><h2 class="gh-titulo-sm">${esc(t.visaoTitulo)}</h2><p class="frase-grande">${esc(t.visao)}</p></div>
</div>`),
    secao(`<h2 class="gh-titulo-md">${esc(t.valoresTitulo)}</h2><ol class="valores">${valores}</ol>
<img class="gh-divisor" src="/marca/traco-assinatura.svg" alt="" width="560" height="90" loading="lazy">
<div class="acoes acoes--centro">${botaoWhatsapp({ origem: 'provar', lang, texto: c.pedirWhatsapp })}</div>`, 'fundo-polpa')
  ].join('\n');
  return { rotaId: 'sobre', titulo: t.titulo, descricao: t.descricao, corpo };
}

export function paginaComoPedir(lang) {
  const t = comoPedirPagina[lang];
  const c = comum[lang];
  const itens = t.whatsappItens.map((i) => `<li>${icone('check', { tamanho: 20 })}<span>${esc(i)}</span></li>`).join('');
  const bairros = loja.bairros.map((b) => `<li>${icone('local', { tamanho: 20 })}<span>${esc(b.nome)}${b.taxa != null ? ` · ${esc(reais(b.taxa))}` : ''}</span></li>`).join('');
  const corpo = [
    topo(t),
    secao(passosHtml(lang, { nivel: 'h2' })),
    secao(`<div class="cardapio__grade">
<div class="gh-cartao"><h2 class="gh-titulo-sm">${esc(t.whatsappTitulo)}</h2><ul class="lista-icones">${itens}</ul>${botaoWhatsapp({ origem: 'cardapio', lang, texto: c.pedirWhatsapp })}</div>
${loja.ifood ? `<div class="gh-cartao"><h2 class="gh-titulo-sm">${esc(t.ifoodTitulo)}</h2><p>${esc(t.ifoodTexto)}</p>${botaoIfood(lang)}</div>` : ''}
<div class="gh-cartao"><h2 class="gh-titulo-sm">${esc(t.areaTitulo)}</h2><ul class="lista-icones">${bairros}</ul><p>${esc(t.areaTexto)}</p></div>
<div class="gh-cartao"><h2 class="gh-titulo-sm">${esc(t.horarioTitulo)}</h2><p>${esc(maiuscula(resumoHorarios(loja.horarios, lang)))}.</p><h2 class="gh-titulo-sm">${esc(t.tempoTitulo)}</h2><p>${esc(t.tempoTexto)}</p></div>
<div class="gh-cartao"><h2 class="gh-titulo-sm">${esc(t.politicaTitulo)}</h2><p>${esc(t.politicaTexto)}</p></div>
</div>`, 'fundo-polpa')
  ].join('\n');
  return { rotaId: 'comoPedir', titulo: t.titulo, descricao: t.descricao, corpo };
}

export function paginaDireto(lang) {
  const t = diretoPagina[lang];
  const quinhentos = tamanhos.find((tm) => tm.ml === 500);
  // RF-04: esta é a única página com o preço do iFood.
  const linhas = tamanhos.flatMap((tm) => [
    `<tr><th scope="row">${tm.ml} ml</th><td>${esc(reais(tm.preco))}</td><td>${esc(reais(tm.precoIfood))}</td></tr>`,
    ...(tm.precoTurbo ? [`<tr><th scope="row">${esc(comum[lang].modoTurbo)} ${tm.ml} ml</th><td>${esc(reais(tm.precoTurbo))}</td><td>${esc(reais(tm.precoIfoodTurbo))}</td></tr>`] : [])
  ]).join('');
  const cupom = loja.cupomSegundaCompra
    ? `<div class="gh-cartao cupom">${icone('cupom', { tamanho: 24 })}<h2 class="gh-titulo-sm">${esc(t.cupomTitulo)}</h2><p>${esc(t.cupomTexto)}</p><p class="cupom__codigo">${esc(loja.cupomSegundaCompra.codigo)}</p><p>${esc(loja.cupomSegundaCompra.descricao[lang])}</p></div>`
    : '';
  const corpo = [
    topo(t),
    secao(`<div class="compara">
<div class="compara__aqui"><p>${esc(t.destaqueDireto)}</p><p class="compara__valor">${esc(reais(quinhentos.preco))}</p></div>
<div class="compara__app"><p>${esc(t.destaqueIfood)}</p><p class="compara__valor">${esc(reais(quinhentos.precoIfood))}</p></div>
</div>
<div class="acoes acoes--centro">${botaoWhatsapp({ origem: 'direto', lang, texto: t.cta })}</div>`),
    secao(`<div class="cardapio__grade">
<div class="gh-cartao"><div class="gh-tabela-rolagem"><table class="gh-tabela"><thead><tr><th scope="col">${esc(t.colTamanho)}</th><th scope="col">${esc(t.colDireto)}</th><th scope="col">${esc(t.colIfood)}</th></tr></thead><tbody>${linhas}</tbody></table></div></div>
${cupom}
<div class="gh-cartao"><h2 class="gh-titulo-sm">${esc(t.comoTitulo)}</h2><p>${esc(t.comoTexto)}</p></div>
</div>`, 'fundo-polpa')
  ].join('\n');
  return { rotaId: 'direto', titulo: t.titulo, descricao: t.descricao, corpo };
}

export function paginaEventos(lang) {
  const t = eventosPagina[lang];
  const cartoes = t.paraQuem.map((p) => `<div class="gh-cartao"><h2 class="gh-titulo-sm">${esc(p.nome)}</h2><p>${esc(p.texto)}</p></div>`).join('');
  const como = t.como.map((p) => `<li>${esc(p)}</li>`).join('');
  const corpo = [
    topo(t, { extra: `<div class="acoes">${botaoWhatsapp({ origem: 'eventos', lang, texto: t.cta })}</div>` }),
    secao(`<div class="tres-colunas">${cartoes}</div>`),
    secao(`<div class="duas-colunas"><div><h2 class="gh-titulo-md">${esc(t.comoTitulo)}</h2><ol class="lista-numerada">${como}</ol></div><div><p class="frase-grande">${esc(t.areaNota)}</p>${botaoWhatsapp({ origem: 'eventos', lang, texto: t.cta })}</div></div>`, 'fundo-polpa')
  ].join('\n');
  return { rotaId: 'eventos', titulo: t.titulo, descricao: t.descricao, corpo };
}

export function paginaPerguntas(lang) {
  const t = perguntas[lang];
  const c = comum[lang];
  const corpo = [
    topo(t),
    secao(`<div class="faq-lista">${faqHtml(lang, t.itens, { abrirPrimeira: false })}</div>
<div class="avisos">${avisoAlergenicos(lang, { turbo: true })}</div>
<div class="acoes acoes--centro">${botaoWhatsapp({ origem: 'duvida', lang, texto: c.pedirWhatsapp })}</div>`)
  ].join('\n');
  return { rotaId: 'perguntas', titulo: t.titulo, descricao: t.descricao, corpo, schemas: [schemaFaq(t.itens)] };
}

export function paginaPrivacidade(lang) {
  const t = privacidadePagina[lang];
  const secoes = t.secoes.map((s) => `<h2 class="gh-titulo-sm">${esc(s.titulo)}</h2>${s.texto.map((p) => `<p>${esc(p)}</p>`).join('')}`).join('');
  const corpo = [topo(t), secao(`<div class="texto-longo">${secoes}<p class="gh-texto-suave">${esc(t.atualizada)}</p></div>`)].join('\n');
  return { rotaId: 'privacidade', titulo: t.titulo, descricao: t.descricao, corpo };
}

export function paginaErro(lang) {
  const t = erroPagina[lang];
  const corpo = `<section class="gh-secao erro"><div class="gh-container erro__conteudo">
<img src="/marca/copo-vazio-404.svg" alt="${esc(t.alt)}" width="200" height="300">
<h1 class="gh-titulo-lg">${esc(t.h1)}</h1>
<p>${esc(t.texto)}</p>
<a class="gh-botao" href="${caminho(lang, 'inicio')}">${esc(t.voltar)}</a>
</div></section>`;
  return { rotaId: 'erro', titulo: t.titulo, descricao: t.descricao, corpo, noindex: true };
}
