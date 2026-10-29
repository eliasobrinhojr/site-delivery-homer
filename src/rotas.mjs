// Mapa do site (especificação, fase 1). Os mesmos endereços em espanhol ganham o prefixo /es (RF-08).

export const IDIOMAS = ['pt', 'es'];

export const rotas = [
  { id: 'inicio', slug: '', og: 'inicio', prioridade: '1.0' },
  { id: 'cardapio', slug: 'cardapio', og: 'cardapio', prioridade: '0.9' },
  { id: 'guarana', slug: 'o-guarana', og: 'o-guarana', prioridade: '0.7' },
  { id: 'sobre', slug: 'sobre', og: 'sobre', prioridade: '0.6' },
  { id: 'comoPedir', slug: 'como-pedir', og: 'como-pedir', prioridade: '0.8' },
  { id: 'direto', slug: 'direto', og: 'direto', prioridade: '0.6' },
  { id: 'eventos', slug: 'eventos', og: 'eventos', prioridade: '0.5' },
  { id: 'perguntas', slug: 'perguntas', og: 'perguntas', prioridade: '0.7' },
  { id: 'privacidade', slug: 'privacidade', og: 'privacidade', prioridade: '0.2' }
];

export const rota = (id) => rotas.find((r) => r.id === id);

/** Caminho público: /cardapio/ ou /es/cardapio/. */
export function caminho(lang, idOuSlug) {
  const r = rota(idOuSlug);
  const slug = r ? r.slug : idOuSlug;
  const prefixo = lang === 'es' ? '/es' : '';
  return slug ? `${prefixo}/${slug}/` : `${prefixo}/`;
}

export const outroIdioma = (lang) => (lang === 'es' ? 'pt' : 'es');
