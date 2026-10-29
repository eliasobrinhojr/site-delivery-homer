// RF-29: ativa ou desativa o modo equipe neste aparelho. A frase nunca é guardada: só o hash é comparado.
import { loja } from '../../conteudo/loja.mjs';
import { equipe as textos } from '../../conteudo/textos/equipe.mjs';
import { CHAVE_EQUIPE, hashFrase, equipeAtiva, lerRegistro, registroEquipe } from '../lib/equipe.mjs';

const lang = document.documentElement.lang.startsWith('es') ? 'es' : 'pt';
const t = textos[lang];
const form = document.querySelector('[data-equipe-form]');
const estado = document.querySelector('[data-equipe-estado]');
const sair = document.querySelector('[data-equipe-sair]');
const armazenamento = (() => { try { return localStorage; } catch { return null; } })();

function mostrar() {
  const registro = lerRegistro(armazenamento);
  const ativo = equipeAtiva(registro, loja.equipe);
  const data = ativo ? new Date(registro.ate).toLocaleDateString(lang === 'es' ? 'es-AR' : 'pt-BR') : '';
  estado.textContent = ativo ? `${t.ativo} ${data}.` : t.inativo;
  estado.dataset.ativo = ativo ? 'sim' : 'nao';
  sair.hidden = !ativo;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const campo = form.elements.frase;
  const hash = await hashFrase(campo.value);
  campo.value = '';
  if (hash !== loja.equipe?.hash) {
    estado.textContent = t.errada;
    estado.dataset.ativo = 'erro';
    campo.focus();
    return;
  }
  try { armazenamento?.setItem(CHAVE_EQUIPE, JSON.stringify(registroEquipe(hash, loja.equipe.validadeDias))); } catch { /* navegação privada */ }
  mostrar();
});

sair.addEventListener('click', () => {
  try { armazenamento?.removeItem(CHAVE_EQUIPE); } catch { /* navegação privada */ }
  mostrar();
});

mostrar();
