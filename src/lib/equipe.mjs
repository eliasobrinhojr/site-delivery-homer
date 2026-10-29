// RF-29: modo equipe. Funções puras, usadas no navegador e nos testes.
// Proteção leve: evita pedido por engano antes da inauguração. Não é controle de acesso (o site é estático).

export const CHAVE_EQUIPE = 'gh-equipe';
export const PREFIXO_TESTE = '[TESTE] ';

/** Normaliza a frase (espaços nas pontas, maiúsculas, acentos compostos) antes do hash. */
export const normalizarFrase = (frase) => String(frase ?? '').normalize('NFC').trim().toLowerCase();

/** SHA-256 em hexadecimal de "gh-equipe:<frase normalizada>". Usa Web Crypto (navegador e Node 22). */
export async function hashFrase(frase) {
  const dados = new TextEncoder().encode(`gh-equipe:${normalizarFrase(frase)}`);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', dados);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Registro gravado no aparelho depois da frase certa. */
export function registroEquipe(hash, validadeDias, agora = Date.now()) {
  return { hash, ate: agora + validadeDias * 24 * 60 * 60 * 1000 };
}

/** O aparelho está no modo equipe? Precisa do hash atual da loja e estar dentro da validade. */
export function equipeAtiva(registro, configEquipe, agora = Date.now()) {
  if (!registro || !configEquipe?.hash) return false;
  return registro.hash === configEquipe.hash && Number(registro.ate) > agora;
}

/** Lê o registro do armazenamento do navegador sem quebrar em navegação privada. */
export function lerRegistro(armazenamento) {
  try {
    const bruto = armazenamento?.getItem(CHAVE_EQUIPE);
    return bruto ? JSON.parse(bruto) : null;
  } catch {
    return null;
  }
}

/** Mensagem de pedido marcada como teste. */
export const paraTeste = (texto) => (texto.startsWith(PREFIXO_TESTE) ? texto : PREFIXO_TESTE + texto);
