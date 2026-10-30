// Cardápio oficial (canal direto: site e WhatsApp). Fonte: Cardápio Cliente e Cardápio Produção, 28/10/2026.
// O preço do iFood só aparece na página /direto (RF-04, RN-10).

export const sabores = [
  {
    id: 'T',
    slug: 'tradicional',
    nome: { pt: 'Tradicional', es: 'Tradicional' },
    titulo: { pt: 'Homer Tradicional', es: 'Homer Tradicional' },
    desc: {
      pt: 'A receita da casa: guaraná em pó, amendoim e castanha de caju, batidos até virar creme.',
      es: 'La receta de la casa: guaraná en polvo, maní y castaña de cajú, batidos hasta volverse crema.'
    },
    curta: { pt: 'a receita da casa', es: 'la receta de la casa' }
  },
  {
    id: 'A',
    slug: 'abacate',
    nome: { pt: 'Abacate', es: 'Palta' },
    titulo: { pt: 'Homer de Abacate', es: 'Homer de Palta' },
    desc: {
      pt: 'O Tradicional batido com abacate maduro: mais aveludado.',
      es: 'El Tradicional batido con palta madura: más aterciopelado.'
    },
    curta: { pt: 'mais aveludado', es: 'más aterciopelado' }
  },
  {
    id: 'B',
    slug: 'banana',
    nome: { pt: 'Banana', es: 'Banana' },
    titulo: { pt: 'Homer de Banana', es: 'Homer de Banana' },
    desc: {
      pt: 'O Tradicional batido com banana: docinho e encorpado.',
      es: 'El Tradicional batido con banana: dulcecito y con cuerpo.'
    },
    curta: { pt: 'docinho e encorpado', es: 'dulcecito y con cuerpo' }
  }
];

// Preços em reais. precoTurbo null = Turbo não existe nesse tamanho (RN-02).
// Cafeína estimada em mg (Embrapa: 2,3% a 2,8% no guaraná em pó; não conta o xarope).
export const tamanhos = [
  { ml: 300, cod: 3, preco: 17, precoTurbo: 21, precoIfood: 22.9, precoIfoodTurbo: 27.9, cafeina: [60, 70], cafeinaTurbo: [90, 110] },
  { ml: 500, cod: 5, preco: 24, precoTurbo: 28, precoIfood: 31.9, precoIfoodTurbo: 36.9, cafeina: [90, 110], cafeinaTurbo: [150, 185] },
  { ml: 700, cod: 7, preco: 33, precoTurbo: null, precoIfood: 42.9, precoIfoodTurbo: null, cafeina: [125, 155], cafeinaTurbo: null }
];

// Doçura: grátis e obrigatória, normal é o padrão (RN-03).
export const docuras = [
  { id: 'menos', cod: '−', nome: { pt: 'Menos doce', es: 'Menos dulce' } },
  { id: 'normal', cod: '', nome: { pt: 'Normal', es: 'Normal' } },
  { id: 'mais', cod: '+', nome: { pt: 'Mais doce', es: 'Más dulce' } }
];

// Até 3 por copo, cada um uma vez (RN-04). Cada um tem um jeito fixo de ir no copo (RN-13):
// 'batido' = no liquidificador; 'parede' = calda passada por dentro do copo antes de servir; 'topo' = por cima.
export const adicionais = [
  { id: 'AMD', modo: 'batido', nome: { pt: 'Amendoim extra', es: 'Maní extra' }, preco: 2 },
  { id: 'PAC', modo: 'batido', nome: { pt: 'Paçoca', es: 'Paçoca (dulce de maní)' }, preco: 3 },
  { id: 'MEL', modo: 'batido', nome: { pt: 'Mel', es: 'Miel' }, preco: 3 },
  { id: 'LC', modo: 'batido', nome: { pt: 'Leite condensado', es: 'Leche condensada' }, preco: 3 },
  { id: 'DDL', modo: 'parede', nome: { pt: 'Calda de doce de leite', es: 'Dulce de leche' }, preco: 3 },
  { id: 'CHO', modo: 'parede', nome: { pt: 'Calda de chocolate', es: 'Salsa de chocolate' }, preco: 3 },
  { id: 'CAN', modo: 'topo', nome: { pt: 'Canela', es: 'Canela' }, preco: 1 }
];

// Ordem em que os jeitos aparecem no site (RN-13).
export const modosAdicional = ['batido', 'parede', 'topo'];

export const regras = {
  maxAdicionais: 3,
  descontoMaximo: 0.15, // RN-09: nenhuma promoção acima de 15% na primeira temporada
  combo: { quantidade: 2, ml: 500, preco: 44 } // RN-08: combo de casal no canal direto
};

// RN-07: ids de sabores ou adicionais esgotados hoje (ex.: ['A'] ou ['PAC']). Somem do "monte o seu".
export const esgotados = [];
