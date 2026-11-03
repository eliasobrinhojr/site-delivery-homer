// "Monte o seu copo": atualiza copo, código, cafeína, preço e a mensagem do WhatsApp (RF-20, RF-25, RF-26).
import { loja } from '../../conteudo/loja.mjs';
import { regras } from '../../conteudo/cardapio.mjs';
import { monte as textos } from '../../conteudo/textos/monte.mjs';
import { normalizarCopo, precoCopo, codigoCopo, cafeinaCopo, turboDisponivel, buscarTamanho } from '../lib/cardapio.mjs';
import { linkWhatsApp, mensagemPedido, descreverCopo } from '../lib/whatsapp.mjs';
import { reais, faixaMg } from '../lib/formato.mjs';
import { estadoLoja, textoEstado } from '../lib/horario.mjs';
import { equipeAtiva, lerRegistro, paraTeste } from '../lib/equipe.mjs';

const lang = document.documentElement.lang.startsWith('es') ? 'es' : 'pt';
const t = textos[lang];
const bairros = loja.bairros.map((b) => b.nome);
const lerArmazenamento = () => { try { return localStorage; } catch { return null; } };

function lerCopo(form) {
  const dados = new FormData(form);
  return normalizarCopo({
    sabor: dados.get('sabor'),
    ml: Number(dados.get('ml')),
    turbo: dados.get('turbo') === 'sim',
    docura: dados.get('docura'),
    adicionais: dados.getAll('adicional')
  });
}

function iniciar(secao) {
  const form = secao.querySelector('[data-monte-form]');
  const copoSvg = secao.querySelector('svg.copo');
  const saida = (nome) => secao.querySelector(`[data-saida="${nome}"]`);
  const turbo = form.querySelector('[data-turbo]');
  const notaTurbo = secao.querySelector('[data-nota-turbo]');

  function render() {
    const copo = lerCopo(form);
    // RN-02: no 700 ml o Turbo some.
    const podeTurbo = turboDisponivel(copo.ml);
    turbo.disabled = !podeTurbo;
    if (!podeTurbo) turbo.checked = false;
    turbo.closest('.gh-chip').classList.toggle('gh-chip--off', !podeTurbo);
    notaTurbo.hidden = podeTurbo;

    // RN-04: com 3 adicionais, os outros ficam bloqueados.
    const marcados = form.querySelectorAll('input[name="adicional"]:checked').length;
    for (const caixa of form.querySelectorAll('input[name="adicional"]')) {
      if (caixa.dataset.esgotado) continue;
      caixa.disabled = !caixa.checked && marcados >= regras.maxAdicionais;
      caixa.closest('.gh-chip').classList.toggle('gh-chip--off', caixa.disabled);
    }

    // Preço de cada tamanho acompanha o Turbo.
    for (const rotuloPreco of form.querySelectorAll('[data-preco-ml]')) {
      const tm = buscarTamanho(rotuloPreco.dataset.precoMl);
      rotuloPreco.textContent = reais(copo.turbo && tm.precoTurbo ? tm.precoTurbo : tm.preco);
    }

    copoSvg.dataset.sabor = copo.sabor;
    copoSvg.dataset.turbo = copo.turbo ? 'sim' : 'nao';
    copoSvg.setAttribute('aria-label', descreverCopo(copo, lang));
    saida('codigo').textContent = codigoCopo(copo);
    saida('nome').textContent = descreverCopo(copo, lang);
    saida('cafeina').textContent = faixaMg(cafeinaCopo(copo), lang);
    saida('total').textContent = reais(precoCopo(copo));

    // RF-26: fora do horário o envio fica bloqueado; antes da inauguração vira convite.
    // RF-29: no modo equipe o pedido sai a qualquer hora, marcado como [TESTE].
    const equipe = equipeAtiva(lerRegistro(lerArmazenamento()), loja.equipe);
    const estado = equipe ? { tipo: 'aberto' } : estadoLoja(new Date(), loja);
    const link = saida('link');
    const aviso = saida('estado');
    if (estado.tipo === 'fechado') {
      link.removeAttribute('href');
      link.setAttribute('aria-disabled', 'true');
      link.classList.add('gh-botao--bloqueado');
      saida('botao').textContent = textoEstado(estado, lang);
      aviso.hidden = true;
    } else {
      const pre = estado.tipo === 'pre-inauguracao';
      const recebimento = form.querySelector('input[name="recebimento"]:checked')?.value ?? 'entrega';
      const pagamento = form.querySelector('input[name="pagamento"]:checked')?.value ?? 'pix';
      const texto = mensagemPedido(copo, lang, { preInauguracao: pre, bairros, recebimento, pagamento });
      link.href = linkWhatsApp(loja.whatsapp, equipe ? paraTeste(texto) : texto);
      link.removeAttribute('aria-disabled');
      link.classList.remove('gh-botao--bloqueado');
      saida('botao').textContent = pre ? t.preInauguracao : t.pedir;
      aviso.hidden = !pre;
      if (pre) aviso.textContent = textoEstado(estado, lang);
    }
  }

  for (const caixa of form.querySelectorAll('input:disabled')) caixa.dataset.esgotado = '1';
  form.addEventListener('change', render);
  form.addEventListener('submit', (e) => e.preventDefault());
  render();
  setInterval(render, 60_000);
}

document.querySelectorAll('[data-monte]').forEach(iniciar);
