// Formatação compartilhada entre o build (Node) e o navegador.

/** "R$ 24" para inteiros, "R$ 31,90" com centavos. Mesmo formato em PT e ES (preço sempre em R$, RNF-08). */
export function reais(valor) {
  const inteiro = Number.isInteger(valor);
  const texto = inteiro
    ? String(valor)
    : valor.toFixed(2).replace('.', ',');
  return `R$ ${texto}`;
}

/** "90 a 110 mg" / "90 a 110 mg" (es usa "a" também). */
export function faixaMg([min, max], lang = 'pt') {
  return lang === 'es' ? `${min} a ${max} mg` : `${min} a ${max} mg`;
}

/** Escapa texto para HTML (usado em todo conteúdo interpolado nas páginas). */
export function esc(texto) {
  return String(texto ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

/** Junta itens com vírgula e "e"/"y" no último: "mel, paçoca e canela". */
export function listaNatural(itens, lang = 'pt') {
  const e = lang === 'es' ? 'y' : 'e';
  if (itens.length <= 1) return itens.join('');
  return `${itens.slice(0, -1).join(', ')} ${e} ${itens.at(-1)}`;
}
