// Dados da loja. Mudar um horário, um bairro ou um link é editar este arquivo e publicar (RF-03).
// Valores null ficam escondidos no site até serem preenchidos.

export const loja = {
  nome: 'Guaraná do Homer',
  dominio: 'https://dohomer.com.br',

  // WhatsApp que recebe os pedidos: só números, com 55 + DDD.
  // Hoje é o número pessoal do pai; na inauguração ele troca por um número só da loja.
  whatsapp: '5592992594820',

  // Preencher quando existirem (o botão ou link correspondente aparece sozinho).
  ifood: null, // ex.: 'https://www.ifood.com.br/delivery/florianopolis-sc/guarana-do-homer-...'
  instagram: null, // ex.: 'https://www.instagram.com/dohomer/'
  emailContato: null, // ex.: 'contato@dohomer.com.br'

  // Empresa (RF-14). Aparece no rodapé de todas as páginas, na privacidade, em eventos e nos dados do Google.
  cnpj: '69.883.553/0001-36', // MEI; os testes conferem os dígitos verificadores
  // Nome empresarial igual ao do cartão CNPJ. Para MEI, a Receita usa "69.883.553 NOME DO TITULAR".
  // null = o site mostra só "Guaraná do Homer · MEI · CNPJ".
  nomeEmpresarial: null,
  // A chave Pix dos pedidos diretos é o CNPJ (decisão de 29/10/2026). true = Como pedir e /direto mostram a chave
  // com o aviso "chave ou nome diferentes? não pague", contra golpe do Pix falso.
  pixNoCnpj: true,

  // Antes desta data o site convida para a inauguração em vez de aceitar pedidos.
  // 'em-breve' = ainda sem data (decisão de 29/10/2026: primeiro o digital, depois cozinha e treino).
  // Quando a data for definida, troque por 'AAAA-MM-DD'.
  inauguracao: 'em-breve',

  // RF-29: modo equipe. Antes da inauguração, só aparelhos ativados em /equipe/ fazem pedido (de teste).
  // Aqui fica só o hash da frase, nunca a frase. Trocar a frase: npm run senha-equipe -- "frase nova"
  // (todos os aparelhos ativados com a frase antiga saem do modo equipe).
  // RF-30: true = os preços do site são estimativa e podem mudar até a inauguração (avisos em todo lugar com preço).
  // Quando os preços forem definidos, troque para false e tire "(preço estimado)" das descrições e prévias.
  precosEstimados: true,

  equipe: {
    hash: '9b443a2a5d18548ce0f64693ca987bfd3a0528a9be9d5b6a132c006a361a75aa',
    validadeDias: 30
  },
  fuso: 'America/Sao_Paulo',

  // Dias da semana: 0 = domingo, 1 = segunda ... 6 = sábado. Horário de São Paulo.
  horarios: {
    4: ['13:00', '20:00'],
    5: ['13:00', '20:00'],
    6: ['13:00', '20:00'],
    0: ['13:00', '20:00']
  },

  // Área de entrega. Só estes bairros: o tempo de 40 minutos não cabe em áreas maiores.
  // taxa em reais; null = "a taxa é informada no WhatsApp".
  bairros: [
    { nome: 'Ingleses', taxa: null },
    { nome: 'Santinho', taxa: null }
  ],
  tempoMaximoMin: 40,

  // RN-11 / RF-28: retirada (decisão de 29/10/2026). O cliente busca o pedido, sem taxa de entrega e de qualquer bairro.
  // Não é ponto de atendimento: sem salão nem consumo no local. O endereço NÃO vai para o site: segue na confirmação
  // do pedido pelo WhatsApp (no iFood, o próprio app mostra). false = esconde a opção em todo o site.
  retirada: true,

  // RF-13: aviso do dia no topo ("Fechados hoje", "Esgotou o abacate"). Vazio = sem faixa.
  aviso: { pt: '', es: '' },

  // Cupom impresso no cartão da sacola do iFood (página /direto). null = bloco escondido.
  // Nunca acima de 15% na primeira temporada (RN-09).
  cupomSegundaCompra: null, // ex.: { codigo: 'VOLTEI', descricao: { pt: '10% no segundo pedido', es: '10% en el segundo pedido' } }

  // RF-10 / RF-11: só carregam depois do aceite de cookies. null = nada é carregado e não há aviso de cookies.
  // Ao preencher, liberar os domínios na Content-Security-Policy do publico/.htaccess.
  analytics: {
    metaPixel: null,
    ga4: null
  }
};
