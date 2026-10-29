// Textos das páginas internas. Os preços vêm de conteudo/cardapio.mjs; aqui ficam só as palavras.

export const cardapioPagina = {
  pt: {
    titulo: 'Cardápio · Guaraná do Homer',
    descricao: 'Guaraná batido Tradicional, de Abacate ou de Banana, em 300, 500 e 700 ml. Modo Turbo, doçura grátis e adicionais. Preço direto a partir de R$ 17.',
    rotulo: 'Cardápio',
    h1: 'Um guaraná, três sabores',
    lead: 'Escolha o sabor, o tamanho e a doçura. Pedindo pelo site ou pelo WhatsApp você paga o preço da casa.',
    saboresTitulo: 'Os sabores',
    precosTitulo: 'Preços',
    colTamanho: 'Tamanho',
    colSabores: 'Tradicional, Abacate ou Banana',
    colTurbo: 'Modo Turbo',
    naoExiste: 'não existe',
    turboTitulo: 'Modo Turbo',
    turboTexto: 'Qualquer sabor com uma dose extra de guaraná em pó do Amazonas: o guaraná mais intenso da casa, com mais cafeína. Só nos copos de 300 e 500 ml.',
    docuraTitulo: 'Doçura, sem custo',
    docuraTexto: 'Menos doce, normal ou mais doce. O doce vem do xarope de guaraná, e a gente ajusta na hora.',
    adicionaisTitulo: 'Por cima',
    adicionaisTexto: 'Até 3 por copo. Vão por cima, para você ver o que pediu.',
    colAdicional: 'Adicional',
    colPreco: 'Preço',
    cafeinaTitulo: 'Cafeína em cada copo',
    cafeinaTexto: 'Estimativa pelo teor de cafeína do guaraná em pó (2,3% a 2,8%, segundo a Embrapa). Não inclui a pequena parte que vem do xarope.',
    colCopo: 'Copo',
    colCafeina: 'Cafeína estimada',
    comboTitulo: 'Combo de casal',
    comboTexto: '2 copos de 500 ml por R$ 44, pedindo direto.'
  },
  es: {
    titulo: 'Menú · Guaraná do Homer',
    descricao: 'Guaraná batido Tradicional, de Palta o de Banana, en 300, 500 y 700 ml. Modo Turbo, dulzor sin costo y extras. Precio directo desde R$ 17.',
    rotulo: 'Menú',
    h1: 'Un guaraná, tres sabores',
    lead: 'Elegí el sabor, el tamaño y el dulzor. Pidiendo por el sitio o por WhatsApp pagás el precio de la casa.',
    saboresTitulo: 'Los sabores',
    precosTitulo: 'Precios',
    colTamanho: 'Tamaño',
    colSabores: 'Tradicional, Palta o Banana',
    colTurbo: 'Modo Turbo',
    naoExiste: 'no existe',
    turboTitulo: 'Modo Turbo',
    turboTexto: 'Cualquier sabor con una dosis extra de guaraná en polvo del Amazonas: el guaraná más intenso de la casa, con más cafeína. Solo en los vasos de 300 y 500 ml.',
    docuraTitulo: 'Dulzor, sin costo',
    docuraTexto: 'Menos dulce, normal o más dulce. El dulce viene del jarabe de guaraná y lo ajustamos en el momento.',
    adicionaisTitulo: 'Por encima',
    adicionaisTexto: 'Hasta 3 por vaso. Van por encima, para que veas lo que pediste.',
    colAdicional: 'Extra',
    colPreco: 'Precio',
    cafeinaTitulo: 'Cafeína en cada vaso',
    cafeinaTexto: 'Estimación según el contenido de cafeína del guaraná en polvo (2,3% a 2,8%, según Embrapa). No incluye la pequeña parte que viene del jarabe.',
    colCopo: 'Vaso',
    colCafeina: 'Cafeína estimada',
    comboTitulo: 'Combo para dos',
    comboTexto: '2 vasos de 500 ml por R$ 44, pidiendo directo.'
  }
};

export const guaranaPagina = {
  pt: {
    titulo: 'O guaraná batido · Guaraná do Homer',
    descricao: 'O que é guaraná batido, o que vai no copo e de onde vem o nosso guaraná em pó: Maués, no interior do Amazonas.',
    rotulo: 'O guaraná',
    h1: 'Um copo do Amazonas, batido aqui na Ilha',
    lead: 'Guaraná batido é tradição no Amazonas e no Norte do Brasil. Aqui está o que vai no copo, de onde vem e como a gente bate.',
    origemTitulo: 'Do Amazonas para os Ingleses',
    origemTexto: [
      'O guaraná é o fruto de uma planta nativa da Amazônia. Ele nasce no interior do Amazonas, em Maués, onde o povo Sateré-Mawé cultiva a planta há gerações. É de lá que vem o guaraná em pó do nosso copo.',
      'Em Manaus, a capital, o guaraná batido se compra nas lanchonetes e em carrinhos de rua que só vendem ele. É esse copo que a gente trouxe para a Ilha.',
      'O pó é feito da semente torrada e moída. É ele que dá o sabor de guaraná de verdade, com aquele amarguinho no fim, e a cafeína do copo.'
    ],
    copoTitulo: 'O que vai no copo',
    copoTexto: 'Tudo é pesado ou medido, nada no olho. A receita é a mesma para quem prepara.',
    ingredientes: [
      { nome: 'Xarope de guaraná', texto: 'adoça e dá o sabor de base' },
      { nome: 'Guaraná em pó do Amazonas', texto: 'o sabor intenso e a cafeína' },
      { nome: 'Amendoim torrado', texto: 'o corpo e o gosto de paçoca' },
      { nome: 'Castanha de caju', texto: 'a cremosidade' },
      { nome: 'Leite em pó integral', texto: 'deixa tudo liso' },
      { nome: 'Gelo', texto: 'batido até virar creme' },
      { nome: 'Abacate ou banana', texto: 'só nos sabores de Abacate e de Banana' }
    ],
    ligaNota: 'Também vai uma pitada de liga neutra, que segura a textura cremosa até chegar na sua casa.',
    preparoTitulo: 'Como a gente bate',
    preparo: [
      'O liquidificador só liga quando o seu pedido chega.',
      'Xarope no fundo, depois o mix seco, a fruta e o gelo por cima.',
      'De 40 a 60 segundos na velocidade máxima, até ficar liso.',
      'Copo lacrado e etiquetado com o código e o horário em que foi batido.'
    ],
    ritualTitulo: 'Como se toma',
    ritualTexto: 'Gelado, de canudo grosso, no fim da tarde ou depois da praia. Se for esperar, guarde na geladeira e sacuda o copo fechado antes de abrir.',
    turboTitulo: 'E o Modo Turbo?',
    turboTexto: 'É o mesmo copo com uma dose extra de guaraná em pó: mais sabor de guaraná e mais cafeína. Por isso ele tem selo próprio, aviso de cafeína e só existe até 500 ml.'
  },
  es: {
    titulo: 'El guaraná batido · Guaraná do Homer',
    descricao: 'Qué es el guaraná batido, qué lleva el vaso y de dónde viene nuestro guaraná en polvo: Maués, en el interior del Amazonas.',
    rotulo: 'El guaraná',
    h1: 'Un vaso del Amazonas, batido acá en la Isla',
    lead: 'El guaraná batido es tradición en el Amazonas y el norte de Brasil. Acá te contamos qué lleva el vaso, de dónde viene y cómo lo batimos.',
    origemTitulo: 'Del Amazonas a Ingleses',
    origemTexto: [
      'El guaraná es el fruto de una planta nativa de la Amazonia. Nace en el interior del Amazonas, en Maués, donde el pueblo sateré-mawé cultiva la planta hace generaciones. De ahí viene el guaraná en polvo de nuestro vaso.',
      'En Manaos, la capital, el guaraná batido se compra en cafeterías y en carritos callejeros que venden solo eso. Ese es el vaso que trajimos a la Isla.',
      'El polvo se hace con la semilla tostada y molida. Es lo que le da el sabor de guaraná de verdad, con ese amarguito al final, y la cafeína del vaso.'
    ],
    copoTitulo: 'Qué lleva el vaso',
    copoTexto: 'Todo se pesa o se mide, nada a ojo. La receta es la misma para quien lo prepare.',
    ingredientes: [
      { nome: 'Jarabe de guaraná', texto: 'endulza y da el sabor de base' },
      { nome: 'Guaraná en polvo del Amazonas', texto: 'el sabor intenso y la cafeína' },
      { nome: 'Maní tostado', texto: 'el cuerpo y el gusto a paçoca' },
      { nome: 'Castaña de cajú', texto: 'la cremosidad' },
      { nome: 'Leche en polvo entera', texto: 'deja todo liso' },
      { nome: 'Hielo', texto: 'batido hasta volverse crema' },
      { nome: 'Palta o banana', texto: 'solo en los sabores de Palta y de Banana' }
    ],
    ligaNota: 'También lleva una pizca de estabilizante neutro, que mantiene la textura cremosa hasta que llega a tu casa.',
    preparoTitulo: 'Cómo lo batimos',
    preparo: [
      'La licuadora se enciende solo cuando llega tu pedido.',
      'Jarabe en el fondo, después la mezcla seca, la fruta y el hielo arriba.',
      'De 40 a 60 segundos a velocidad máxima, hasta que quede liso.',
      'Vaso sellado y etiquetado con el código y la hora en que se batió.'
    ],
    ritualTitulo: 'Cómo se toma',
    ritualTexto: 'Helado, con sorbete grueso, al final de la tarde o después de la playa. Si vas a esperar, guardalo en la heladera y agitá el vaso cerrado antes de abrirlo.',
    turboTitulo: '¿Y el Modo Turbo?',
    turboTexto: 'Es el mismo vaso con una dosis extra de guaraná en polvo: más sabor a guaraná y más cafeína. Por eso tiene sello propio, aviso de cafeína y solo existe hasta 500 ml.'
  }
};

export const sobrePagina = {
  pt: {
    titulo: 'Nossa história · Guaraná do Homer',
    descricao: 'Homer é o apelido que os amigos da rua deram pro meu pai, em Manaus. A receita, a assinatura no copo e o que a gente acredita.',
    rotulo: 'Nossa história',
    h1: 'Homer é o meu pai',
    lead: 'Homer é o apelido que os amigos da rua deram pro meu pai, lá em Manaus. Agora é ele quem bate o seu guaraná, na hora.',
    assinaturaTitulo: 'O nome no copo é a letra dele',
    assinaturaTexto: 'O "HOMER" do nosso logo não é uma fonte de computador. É a letra de forma do meu pai, escrita à mão e passada para o desenho da marca. Cada copo sai com a assinatura de quem bateu.',
    missaoTitulo: 'Missão',
    missao: 'Levar o guaraná batido do Amazonas para a Ilha, feito na hora, com ingrediente de verdade e tudo o que tem no copo à vista.',
    visaoTitulo: 'Visão',
    visao: 'Ser o guaraná batido que todo mundo do Norte da Ilha conhece pelo nome até o verão de 2028, com metade dos pedidos vindo direto do cliente.',
    valoresTitulo: 'O que a gente não abre mão',
    valores: [
      { nome: 'Feito na hora', texto: 'Nenhum copo fica esperando. O liquidificador liga quando o seu pedido chega.' },
      { nome: 'Origem', texto: 'Guaraná em pó do interior do Amazonas, de Maués, e a receita do pai, de Manaus.' },
      { nome: 'Transparência', texto: 'Cafeína, alergênicos e preço ditos com números, sem letra miúda.' },
      { nome: 'Bom humor da Ilha', texto: 'Papo de vizinho que mora perto da praia, nunca de vendedor.' },
      { nome: 'Palavra cumprida', texto: 'Copo lacrado, no tamanho certo, no prazo prometido.' }
    ],
    fotoPendente: 'A foto do meu pai no balcão entra aqui depois da sessão de fotos.'
  },
  es: {
    titulo: 'Nuestra historia · Guaraná do Homer',
    descricao: 'Homer es el apodo que le pusieron a mi papá los amigos del barrio, en Manaos. La receta, la firma en el vaso y lo que creemos.',
    rotulo: 'Nuestra historia',
    h1: 'Homer es mi papá',
    lead: 'Homer es el apodo que le pusieron a mi papá los amigos del barrio, allá en Manaos. Ahora es él quien bate tu guaraná, en el momento.',
    assinaturaTitulo: 'El nombre en el vaso es su letra',
    assinaturaTexto: 'El "HOMER" de nuestro logo no es una tipografía de computadora. Es la letra de imprenta de mi papá, escrita a mano y pasada al diseño de la marca. Cada vaso sale con la firma de quien lo batió.',
    missaoTitulo: 'Misión',
    missao: 'Llevar el guaraná batido del Amazonas a la Isla, hecho en el momento, con ingredientes de verdad y todo lo que lleva el vaso a la vista.',
    visaoTitulo: 'Visión',
    visao: 'Ser el guaraná batido que todo el norte de la Isla conoce por su nombre para el verano de 2028, con la mitad de los pedidos llegando directo del cliente.',
    valoresTitulo: 'Lo que no negociamos',
    valores: [
      { nome: 'Hecho en el momento', texto: 'Ningún vaso queda esperando. La licuadora se enciende cuando llega tu pedido.' },
      { nome: 'Origen', texto: 'Guaraná en polvo del interior del Amazonas, de Maués, y la receta del papá, de Manaos.' },
      { nome: 'Transparencia', texto: 'Cafeína, alérgenos y precio dichos con números, sin letra chica.' },
      { nome: 'Buen humor de la Isla', texto: 'Charla de vecino que vive cerca de la playa, nunca de vendedor.' },
      { nome: 'Palabra cumplida', texto: 'Vaso sellado, del tamaño correcto, en el tiempo prometido.' }
    ],
    fotoPendente: 'La foto de mi papá en el mostrador va acá después de la sesión de fotos.'
  }
};

export const comoPedirPagina = {
  pt: {
    titulo: 'Como pedir · Guaraná do Homer',
    descricao: 'Peça pelo site ou pelo WhatsApp, pague no Pix e receba em até 40 minutos nos Ingleses e no Santinho.',
    rotulo: 'Como pedir',
    h1: 'Do pedido ao copo gelado em até 40 minutos',
    lead: 'Pedindo direto, pelo site ou pelo WhatsApp, você paga o preço da casa. A entrega é nos Ingleses e no Santinho.',
    whatsappTitulo: 'Pelo site ou pelo WhatsApp',
    whatsappItens: [
      'Monte o copo no site ou mande a mensagem direto no WhatsApp.',
      'A gente confirma o bairro e a taxa de entrega.',
      'O pagamento é por Pix, antes do preparo.',
      'O copo é batido na hora e sai lacrado, em bolsa térmica.'
    ],
    ifoodTitulo: 'Pelo iFood',
    ifoodTexto: 'Também estamos no iFood, com os preços do aplicativo e a entrega feita pelo iFood.',
    horarioTitulo: 'Horário',
    areaTitulo: 'Onde entregamos',
    areaTexto: 'Só nos Ingleses e no Santinho, no Norte da Ilha. É o que garante o copo gelado em até 40 minutos. Mora em outro bairro? Manda uma mensagem: avisamos quando a área crescer.',
    tempoTitulo: 'Tempo',
    tempoTexto: 'Até 5 minutos de preparo e até 35 minutos de entrega.',
    politicaTitulo: 'Se algo der errado',
    politicaTexto: 'Copo errado ou entrega depois de 60 minutos? Fale com a gente no WhatsApp: a gente refaz o pedido ou dá um cupom para o próximo. Pedido cancelado antes do preparo tem o Pix devolvido.'
  },
  es: {
    titulo: 'Cómo pedir · Guaraná do Homer',
    descricao: 'Pedí por el sitio o por WhatsApp, pagá con Pix y recibilo en hasta 40 minutos en Ingleses y Santinho.',
    rotulo: 'Cómo pedir',
    h1: 'Del pedido al vaso helado en hasta 40 minutos',
    lead: 'Pidiendo directo, por el sitio o por WhatsApp, pagás el precio de la casa. Entregamos en Ingleses y Santinho.',
    whatsappTitulo: 'Por el sitio o por WhatsApp',
    whatsappItens: [
      'Armá el vaso en el sitio o mandá el mensaje directo por WhatsApp.',
      'Confirmamos el barrio y la tarifa de envío.',
      'El pago es con Pix, antes de la preparación.',
      'El vaso se bate en el momento y sale sellado, en bolsa térmica.'
    ],
    ifoodTitulo: 'Por iFood',
    ifoodTexto: 'También estamos en iFood, con los precios de la aplicación y la entrega hecha por iFood.',
    horarioTitulo: 'Horario',
    areaTitulo: 'Dónde entregamos',
    areaTexto: 'Solo en Ingleses y Santinho, en el norte de la Isla. Así garantizamos el vaso helado en hasta 40 minutos. ¿Vivís en otro barrio? Mandanos un mensaje: te avisamos cuando la zona crezca.',
    tempoTitulo: 'Tiempo',
    tempoTexto: 'Hasta 5 minutos de preparación y hasta 35 minutos de entrega.',
    politicaTitulo: 'Si algo sale mal',
    politicaTexto: '¿Vaso equivocado o entrega después de 60 minutos? Escribinos por WhatsApp: rehacemos el pedido o te damos un cupón para el próximo. Si cancelás antes de la preparación, te devolvemos el Pix.'
  }
};

export const diretoPagina = {
  pt: {
    titulo: 'Peça direto e pague menos · Guaraná do Homer',
    descricao: 'Veio pelo cartão da sacola do iFood? Pedindo direto pelo WhatsApp, o copo de 500 ml sai por R$ 24.',
    rotulo: 'Peça direto',
    h1: 'Peça direto e pague menos',
    lead: 'Que bom que você voltou. No aplicativo, o preço inclui a taxa da plataforma. Pedindo direto com a gente, você paga o preço da casa.',
    colTamanho: 'Copo',
    colDireto: 'Direto',
    colIfood: 'No iFood',
    destaqueDireto: 'Aqui · 500 ml',
    destaqueIfood: 'No iFood · 500 ml',
    cupomTitulo: 'Cupom do cartão',
    cupomTexto: 'Use o código abaixo na mensagem:',
    comoTitulo: 'Como funciona',
    comoTexto: 'Toque no botão, a mensagem vai pronta para o WhatsApp. A gente confirma o bairro, manda a chave Pix e bate o seu copo na hora.',
    cta: 'Pedir direto pelo WhatsApp'
  },
  es: {
    titulo: 'Pedí directo y pagá menos · Guaraná do Homer',
    descricao: '¿Llegaste por la tarjeta de la bolsa de iFood? Pidiendo directo por WhatsApp, el vaso de 500 ml sale R$ 24.',
    rotulo: 'Pedí directo',
    h1: 'Pedí directo y pagá menos',
    lead: 'Qué bueno que volviste. En la aplicación, el precio incluye la tarifa de la plataforma. Pidiendo directo con nosotros, pagás el precio de la casa.',
    colTamanho: 'Vaso',
    colDireto: 'Directo',
    colIfood: 'En iFood',
    destaqueDireto: 'Acá · 500 ml',
    destaqueIfood: 'En iFood · 500 ml',
    cupomTitulo: 'Cupón de la tarjeta',
    cupomTexto: 'Usá el código en el mensaje:',
    comoTitulo: 'Cómo funciona',
    comoTexto: 'Tocá el botón y el mensaje va listo a WhatsApp. Confirmamos el barrio, te mandamos la clave Pix y batimos tu vaso en el momento.',
    cta: 'Pedir directo por WhatsApp'
  }
};

export const eventosPagina = {
  pt: {
    titulo: 'Eventos e empresas · Guaraná do Homer',
    descricao: 'Guaraná batido para festas, academias, pousadas e casas de temporada nos Ingleses e no Santinho. Pedido grande, reserva com sinal e nota fiscal para empresas.',
    rotulo: 'Eventos e empresas',
    h1: 'Guaraná batido para muita gente',
    lead: 'Festa de aniversário, treino na academia, recepção de pousada ou casa de temporada cheia: a gente prepara pedido grande, com hora marcada.',
    paraQuem: [
      { nome: 'Festas e aniversários', texto: 'Copos de 300 ml para servir a todos, entregues na hora combinada.' },
      { nome: 'Academias e estúdios', texto: 'Entrega em lote no horário do treino.' },
      { nome: 'Pousadas e casas de temporada', texto: 'Uma novidade da Ilha para receber os hóspedes.' }
    ],
    comoTitulo: 'Como funciona',
    como: [
      'Conte a data, o número de pessoas e o endereço.',
      'A gente manda o orçamento pelo WhatsApp.',
      'A reserva é confirmada com sinal de 50%.',
      'Para empresas, emitimos nota fiscal.'
    ],
    fornecedor: 'Dados para o cadastro de fornecedor:',
    areaNota: 'Atendemos os Ingleses e o Santinho. Para outro endereço, consulte: depende da data e do tamanho do pedido.',
    cta: 'Pedir orçamento pelo WhatsApp'
  },
  es: {
    titulo: 'Eventos y empresas · Guaraná do Homer',
    descricao: 'Guaraná batido para fiestas, gimnasios, posadas y casas de alquiler en Ingleses y Santinho. Pedidos grandes, reserva con seña y factura para empresas.',
    rotulo: 'Eventos y empresas',
    h1: 'Guaraná batido para mucha gente',
    lead: 'Cumpleaños, entrenamiento en el gimnasio, recepción de una posada o casa de alquiler llena: preparamos pedidos grandes, con horario acordado.',
    paraQuem: [
      { nome: 'Fiestas y cumpleaños', texto: 'Vasos de 300 ml para servir a todos, entregados a la hora acordada.' },
      { nome: 'Gimnasios y estudios', texto: 'Entrega en lote en el horario del entrenamiento.' },
      { nome: 'Posadas y casas de alquiler', texto: 'Una novedad de la Isla para recibir a los huéspedes.' }
    ],
    comoTitulo: 'Cómo funciona',
    como: [
      'Contanos la fecha, la cantidad de personas y la dirección.',
      'Te mandamos el presupuesto por WhatsApp.',
      'La reserva se confirma con una seña del 50%.',
      'Para empresas, emitimos factura.'
    ],
    fornecedor: 'Datos para el alta de proveedor:',
    areaNota: 'Atendemos Ingleses y Santinho. Para otra dirección, consultanos: depende de la fecha y del tamaño del pedido.',
    cta: 'Pedir presupuesto por WhatsApp'
  }
};

export const privacidadePagina = {
  pt: {
    titulo: 'Privacidade · Guaraná do Homer',
    descricao: 'Como a Guaraná do Homer trata os seus dados no site e no WhatsApp (LGPD).',
    rotulo: 'Privacidade',
    h1: 'Política de privacidade',
    atualizada: 'Atualizada em 29 de outubro de 2026.',
    responsavel: 'Responsável pelos dados (controlador):',
    secoes: [
      { titulo: 'Quem somos', texto: ['A Guaraná do Homer vende guaraná batido por delivery nos Ingleses e no Santinho, em Florianópolis (SC). Somos os responsáveis pelos dados tratados neste site e nas conversas de pedido.'] },
      { titulo: 'O que o site guarda', texto: ['O site não tem cadastro nem formulário. Ele não guarda o seu nome, telefone ou endereço.', 'No seu próprio navegador, o site guarda só o idioma que você escolheu, para abrir no mesmo idioma da próxima vez.'] },
      { titulo: 'Pedidos pelo WhatsApp', texto: ['Quando você pede pelo WhatsApp, usamos o seu nome, telefone e endereço só para preparar e entregar o pedido e para falar com você sobre ele.', 'Mensagens de promoção só são enviadas se você pedir ou autorizar, e você pode pedir para parar quando quiser.'] },
      { titulo: 'Cookies de medição', texto: ['Se um dia usarmos ferramentas de medição de anúncios (como o pixel da Meta ou o Google Analytics), elas só serão ativadas depois que você aceitar no aviso de cookies. Recusar não muda nada no uso do site.'] },
      { titulo: 'Com quem compartilhamos', texto: ['Com o entregador, só o necessário para a entrega (nome, endereço e telefone). Com o iFood, quando o pedido é feito pelo aplicativo, segundo a política do próprio iFood. Não vendemos dados.'] },
      { titulo: 'Seus direitos', texto: ['Você pode pedir para saber quais dados temos, corrigir ou apagar, pelo mesmo WhatsApp dos pedidos. Respondemos em até 15 dias.'] }
    ]
  },
  es: {
    titulo: 'Privacidad · Guaraná do Homer',
    descricao: 'Cómo Guaraná do Homer trata tus datos en el sitio y en WhatsApp (LGPD).',
    rotulo: 'Privacidad',
    h1: 'Política de privacidad',
    atualizada: 'Actualizada el 29 de octubre de 2026.',
    responsavel: 'Responsable de los datos:',
    secoes: [
      { titulo: 'Quiénes somos', texto: ['Guaraná do Homer vende guaraná batido con delivery en Ingleses y Santinho, en Florianópolis (SC). Somos responsables de los datos tratados en este sitio y en las conversaciones de pedido.'] },
      { titulo: 'Qué guarda el sitio', texto: ['El sitio no tiene registro ni formularios. No guarda tu nombre, teléfono ni dirección.', 'En tu propio navegador, el sitio guarda solo el idioma que elegiste, para abrir en el mismo idioma la próxima vez.'] },
      { titulo: 'Pedidos por WhatsApp', texto: ['Cuando pedís por WhatsApp, usamos tu nombre, teléfono y dirección solo para preparar y entregar el pedido y para hablar con vos sobre él.', 'Los mensajes de promoción solo se envían si los pedís o los autorizás, y podés pedir que paremos cuando quieras.'] },
      { titulo: 'Cookies de medición', texto: ['Si algún día usamos herramientas de medición de anuncios (como el píxel de Meta o Google Analytics), solo se activarán después de que aceptes en el aviso de cookies. Rechazar no cambia nada en el uso del sitio.'] },
      { titulo: 'Con quién compartimos', texto: ['Con el repartidor, solo lo necesario para la entrega (nombre, dirección y teléfono). Con iFood, cuando el pedido se hace por la aplicación, según la política de iFood. No vendemos datos.'] },
      { titulo: 'Tus derechos', texto: ['Podés pedir saber qué datos tenemos, corregirlos o borrarlos, por el mismo WhatsApp de los pedidos. Respondemos en hasta 15 días.'] }
    ]
  }
};

export const erroPagina = {
  pt: {
    titulo: 'Página não encontrada · Guaraná do Homer',
    descricao: 'Essa página não existe. Veja o cardápio de guaraná batido ou peça pelo WhatsApp.',
    h1: 'Esse copo está vazio',
    texto: 'A página que você procurou não existe ou mudou de endereço.',
    voltar: 'Voltar para o início',
    alt: 'Copo vazio'
  },
  es: {
    titulo: 'Página no encontrada · Guaraná do Homer',
    descricao: 'Esta página no existe. Mirá el menú de guaraná batido o pedí por WhatsApp.',
    h1: 'Este vaso está vacío',
    texto: 'La página que buscaste no existe o cambió de dirección.',
    voltar: 'Volver al inicio',
    alt: 'Vaso vacío'
  }
};
