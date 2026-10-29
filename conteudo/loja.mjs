// Dados da loja. Mudar um horário, um bairro ou um link é editar este arquivo e publicar (RF-03).
// Valores null ficam escondidos no site até serem preenchidos.

export const loja = {
  nome: 'Guaraná do Homer',
  dominio: 'https://guaranadohomer.com.br',

  // WhatsApp que recebe os pedidos: só números, com 55 + DDD.
  // Hoje é o número pessoal do pai; na inauguração ele troca por um número só da loja.
  whatsapp: '5592992594820',

  // Preencher quando existirem (o botão ou link correspondente aparece sozinho).
  ifood: null, // ex.: 'https://www.ifood.com.br/delivery/florianopolis-sc/guarana-do-homer-...'
  instagram: null, // ex.: 'https://www.instagram.com/guaranadohomer/'
  cnpj: null, // ex.: '00.000.000/0001-00'
  emailContato: null, // ex.: 'contato@guaranadohomer.com.br'

  // Antes desta data o site convida para a inauguração em vez de aceitar pedidos.
  inauguracao: '2026-11-28',
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
