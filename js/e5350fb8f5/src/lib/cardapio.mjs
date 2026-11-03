// Regras do cardápio (RN-01 a RN-10). Puro: roda no Node (testes e build) e no navegador.
import { sabores, tamanhos, docuras, adicionais, regras, esgotados } from '../../conteudo/cardapio.mjs';

export const COPO_PADRAO = Object.freeze({ sabor: 'T', ml: 500, turbo: false, docura: 'normal', adicionais: [] });

export const buscarSabor = (id) => sabores.find((s) => s.id === id);
export const buscarTamanho = (ml) => tamanhos.find((t) => t.ml === Number(ml));
export const buscarDocura = (id) => docuras.find((d) => d.id === id);
export const buscarAdicional = (id) => adicionais.find((a) => a.id === id);

export const estaEsgotado = (id, lista = esgotados) => lista.includes(id);

/** RN-02: Turbo só existe em 300 e 500 ml. */
export const turboDisponivel = (ml) => buscarTamanho(ml)?.precoTurbo != null;

/**
 * Valida um copo. Devolve a lista de códigos de regra quebrados (vazia = copo válido).
 * @param {{sabor:string, ml:number, turbo:boolean, docura:string, adicionais:string[]}} copo
 */
export function validarCopo(copo, { listaEsgotados = esgotados } = {}) {
  const erros = [];
  const sabor = buscarSabor(copo.sabor);
  if (!sabor) erros.push('sabor-invalido');
  else if (estaEsgotado(sabor.id, listaEsgotados)) erros.push('RN-07');
  if (!buscarTamanho(copo.ml)) erros.push('tamanho-invalido');
  if (copo.turbo && !turboDisponivel(copo.ml)) erros.push('RN-02');
  if (!buscarDocura(copo.docura)) erros.push('RN-03');
  const adds = copo.adicionais ?? [];
  if (adds.length > regras.maxAdicionais) erros.push('RN-04');
  if (new Set(adds).size !== adds.length) erros.push('RN-04');
  for (const id of adds) {
    if (!buscarAdicional(id)) erros.push('adicional-invalido');
    else if (estaEsgotado(id, listaEsgotados)) erros.push('RN-07');
  }
  return [...new Set(erros)];
}

/** Ajusta um copo para ficar válido (usado pelo "monte o seu" quando o cliente troca de tamanho). */
export function normalizarCopo(copo) {
  const ml = buscarTamanho(copo.ml) ? Number(copo.ml) : COPO_PADRAO.ml;
  const turbo = Boolean(copo.turbo) && turboDisponivel(ml);
  const docura = buscarDocura(copo.docura) ? copo.docura : COPO_PADRAO.docura;
  const sabor = buscarSabor(copo.sabor) ? copo.sabor : COPO_PADRAO.sabor;
  const vistos = new Set();
  const adds = (copo.adicionais ?? [])
    .filter((id) => buscarAdicional(id) && !vistos.has(id) && vistos.add(id))
    .slice(0, regras.maxAdicionais);
  return { sabor, ml, turbo, docura, adicionais: adds };
}

/** RN-01: o preço do copo não depende do sabor. Soma tamanho (ou Turbo) + adicionais. */
export function precoCopo(copo) {
  const erros = validarCopo(copo, { listaEsgotados: [] });
  if (erros.length) throw new Error(`Copo inválido: ${erros.join(', ')}`);
  const tamanho = buscarTamanho(copo.ml);
  const base = copo.turbo ? tamanho.precoTurbo : tamanho.preco;
  return base + copo.adicionais.reduce((total, id) => total + buscarAdicional(id).preco, 0);
}

/** Cafeína estimada do copo em mg: [mínimo, máximo]. */
export function cafeinaCopo(copo) {
  const tamanho = buscarTamanho(copo.ml);
  return copo.turbo && turboDisponivel(copo.ml) ? tamanho.cafeinaTurbo : tamanho.cafeina;
}

/**
 * Código de produção que vai na etiqueta: sabor + tamanho + X (Turbo) + doçura + adicionais.
 * Ex.: { B, 500, turbo, mais, [MEL, PAC] } → "B5X+ MEL PAC".
 */
export function codigoCopo(copo) {
  const tamanho = buscarTamanho(copo.ml);
  const docura = buscarDocura(copo.docura);
  const base = `${copo.sabor}${tamanho.cod}${copo.turbo ? 'X' : ''}${docura.cod}`;
  return copo.adicionais.length ? `${base} ${copo.adicionais.join(' ')}` : base;
}

/** RN-08: total de uma lista de copos aplicando o combo de casal (2 copos de 500 ml sem Turbo nem adicionais). */
export function totalPedido(copos) {
  const { quantidade, ml, preco } = regras.combo;
  const elegiveis = copos.filter((c) => c.ml === ml && !c.turbo && c.adicionais.length === 0);
  const combos = Math.floor(elegiveis.length / quantidade);
  const desconto = combos * (quantidade * buscarTamanho(ml).preco - preco);
  return copos.reduce((t, c) => t + precoCopo(c), 0) - desconto;
}

/** RN-09: um desconto (0 a 1) passa do teto da temporada? */
export const descontoPermitido = (fracao) => fracao >= 0 && fracao <= regras.descontoMaximo;

/** Menor preço do cardápio, para o "a partir de". */
export const precoMinimo = () => Math.min(...tamanhos.map((t) => t.preco));
