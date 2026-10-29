// Comportamentos comuns a todas as páginas. Tudo é melhoria: sem JavaScript o site continua completo.
import { loja } from '../../conteudo/loja.mjs';
import { estadoLoja, textoEstado } from '../lib/horario.mjs';
import { linkWhatsApp, mensagem } from '../lib/whatsapp.mjs';
import { CHAVE_EQUIPE, equipeAtiva, lerRegistro, paraTeste } from '../lib/equipe.mjs';
import { equipe as textosEquipe } from '../../conteudo/textos/equipe.mjs';

const lang = document.documentElement.lang.startsWith('es') ? 'es' : 'pt';
const CHAVE_IDIOMA = 'gh-idioma';
const CHAVE_COOKIES = 'gh-cookies';

const ler = (chave) => { try { return localStorage.getItem(chave); } catch { return null; } };
const gravar = (chave, valor) => { try { localStorage.setItem(chave, valor); } catch { /* navegação privada */ } };

// RF-08: na primeira visita, navegador em espanhol abre em espanhol. Depois vale a escolha do visitante.
function idiomaInicial() {
  const escolhido = ler(CHAVE_IDIOMA);
  if (escolhido || lang === 'es') return;
  const prefereEs = (navigator.languages ?? [navigator.language]).some((l) => String(l).toLowerCase().startsWith('es'));
  if (!prefereEs) return;
  const link = document.querySelector('[data-idioma="es"]');
  if (link) location.replace(link.getAttribute('href'));
}

function lembrarIdioma() {
  for (const link of document.querySelectorAll('[data-idioma]')) {
    link.addEventListener('click', () => gravar(CHAVE_IDIOMA, link.dataset.idioma));
  }
  if (!ler(CHAVE_IDIOMA)) gravar(CHAVE_IDIOMA, lang);
}

// RF-29: no modo equipe (aparelho ativado em /equipe/), os pedidos funcionam antes da inauguração, como teste.
const lerArmazenamento = () => { try { return localStorage; } catch { return null; } };
export const modoEquipe = () => equipeAtiva(lerRegistro(lerArmazenamento()), loja.equipe);

function faixaEquipe() {
  if (!modoEquipe() || document.querySelector('[data-faixa-equipe]')) return;
  const te = textosEquipe[lang];
  const faixa = document.createElement('div');
  faixa.className = 'faixa-equipe';
  faixa.dataset.faixaEquipe = '';
  const texto = document.createElement('span');
  texto.textContent = te.faixa;
  const sair = document.createElement('button');
  sair.type = 'button';
  sair.className = 'faixa-equipe__sair';
  sair.textContent = te.sair;
  sair.addEventListener('click', () => {
    try { localStorage.removeItem(CHAVE_EQUIPE); } catch { /* navegação privada */ }
    location.reload();
  });
  faixa.append(texto, sair);
  document.body.prepend(faixa);
  document.documentElement.classList.add('modo-equipe');
}

// RF-29: botões de pedido. Antes da inauguração o público vê "Abrimos em breve · me avise";
// quando a loja abre (ou no modo equipe) o mesmo botão vira o pedido de verdade.
function botoesPedido(estado) {
  const equipe = modoEquipe();
  const liberado = equipe || estado.tipo !== 'pre-inauguracao';
  for (const botao of document.querySelectorAll('a[data-pedido]')) {
    const origem = liberado ? botao.dataset.pedido : 'inauguracao';
    const texto = mensagem(origem, lang);
    botao.href = linkWhatsApp(loja.whatsapp, equipe ? paraTeste(texto) : texto);
    botao.dataset.origem = origem;
    if (botao.classList.contains('gh-botao')) botao.classList.toggle('gh-botao--breve', !liberado);
    botao.querySelector('span').textContent = liberado ? botao.dataset.textoPedido : botao.dataset.textoBreve;
    botao.querySelector('use')?.setAttribute('href', `/marca/icones.svg#i-${liberado ? 'conversa' : 'relogio'}`);
  }
}

// RF-07: faixa "Aberto agora · até 20h" / "Fechado agora · abrimos quinta às 13h".
export function atualizarStatus(agora = new Date()) {
  const faixa = document.querySelector('[data-status]');
  if (!faixa) return null;
  const estado = estadoLoja(agora, loja);
  faixa.dataset.estado = estado.tipo;
  faixa.querySelector('[data-status-texto]').textContent = textoEstado(estado, lang);
  document.dispatchEvent(new CustomEvent('gh:estado', { detail: estado }));
  botoesPedido(estado);
  return estado;
}

// Menu do celular: fecha ao escolher um link ou ao tocar fora.
function menu() {
  const detalhes = document.querySelector('.nav__menu');
  if (!detalhes) return;
  detalhes.addEventListener('click', (e) => { if (e.target.closest('a')) detalhes.open = false; });
  document.addEventListener('click', (e) => { if (detalhes.open && !detalhes.contains(e.target)) detalhes.open = false; });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && detalhes.open) { detalhes.open = false; detalhes.querySelector('summary').focus(); } });
}

// RF-11: medição só depois do aceite. Sem IDs configurados, não existe aviso nem script de terceiros.
function carregarMedicao() {
  const { metaPixel, ga4 } = loja.analytics ?? {};
  if (ga4) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4)}`;
    document.head.append(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', ga4);
  }
  if (metaPixel) {
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', metaPixel);
    window.fbq('track', 'PageView');
  }
}

function cookies() {
  const aviso = document.querySelector('[data-cookies]');
  if (!aviso) return;
  const escolha = ler(CHAVE_COOKIES);
  if (escolha === 'sim') { carregarMedicao(); return; }
  if (escolha === 'nao') return;
  aviso.hidden = false;
  aviso.querySelector('[data-cookies-aceitar]').addEventListener('click', () => { gravar(CHAVE_COOKIES, 'sim'); aviso.hidden = true; carregarMedicao(); });
  aviso.querySelector('[data-cookies-recusar]').addEventListener('click', () => { gravar(CHAVE_COOKIES, 'nao'); aviso.hidden = true; });
}

// RF-10: evento de clique em "Pedir" com a origem (só registra se a medição estiver ativa).
function eventosPedido() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-origem]');
    if (!link) return;
    const origem = link.dataset.origem;
    const destino = origem === 'ifood' ? 'Pedir iFood' : (origem === 'eventos' ? 'Orcamento' : 'Pedir WhatsApp');
    if (window.gtag) window.gtag('event', destino, { origem, pagina: document.body.dataset.pagina });
    if (window.fbq) window.fbq('track', 'Contact', { content_name: destino, origem });
  });
}

idiomaInicial();
lembrarIdioma();
faixaEquipe();
atualizarStatus();
setInterval(atualizarStatus, 60_000);
menu();
cookies();
eventosPedido();
