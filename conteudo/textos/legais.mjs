// Páginas legais: privacidade (RF-36), termos de venda (RF-34) e cancelamento e reembolso (RF-35, RN-14, RN-15).
// Marcas que o código troca: {contato} = WhatsApp (e e-mail, quando houver) e {horario} = dias e horário da loja.
// Cada seção: { titulo, texto: [parágrafos], link?: { texto, para: id da rota } }.

export const privacidadePagina = {
  pt: {
    titulo: 'Privacidade · Guaraná do Homer',
    descricao: 'Como a Guaraná do Homer trata os seus dados no site, no WhatsApp e no pagamento (LGPD).',
    rotulo: 'Privacidade',
    h1: 'Política de privacidade',
    atualizada: 'Atualizada em 2 de novembro de 2026.',
    responsavel: 'Responsável pelos dados (controlador):',
    secoes: [
      { titulo: 'Quem somos', texto: ['A Guaraná do Homer vende guaraná batido por delivery nos Ingleses e no Santinho, em Florianópolis (SC). Somos os responsáveis pelos dados tratados neste site, nas conversas de pedido e no pagamento.'] },
      { titulo: 'Que dados usamos e para quê', texto: [
        'No pedido: nome, telefone e, na entrega, o endereço. Usamos para preparar, entregar e falar com você sobre o pedido. A base legal é a execução do contrato de compra (LGPD, art. 7º, V).',
        'No pagamento: no Pix, o banco nos mostra o nome de quem pagou; no cartão, a maquininha registra a transação, sem o número completo do cartão. Usamos para conferir o pagamento e cumprir as obrigações fiscais e contábeis (art. 7º, II e V).',
        'Promoções: só mandamos se você pedir ou autorizar, e você pode retirar a autorização quando quiser (art. 7º, I).'
      ] },
      { titulo: 'O que o site guarda', texto: [
        'O site não tem cadastro nem formulário e não guarda o seu nome, telefone ou endereço.',
        'No seu próprio navegador, ele guarda o idioma que você escolheu e, se houver aviso de cookies, a sua resposta a ele. Isso fica só no seu aparelho; para apagar, limpe os dados do site no navegador.',
        'A hospedagem do site registra, como em todo site, o endereço IP e a data e a hora de cada acesso. A lei manda guardar esse registro por 6 meses (Marco Civil da Internet, art. 15); não usamos ele para identificar ninguém.'
      ] },
      { titulo: 'Cookies de medição', texto: ['Se um dia usarmos ferramentas de medição de anúncios (como o pixel da Meta ou o Google Analytics), elas só serão ativadas depois que você aceitar no aviso de cookies, e você poderá mudar a escolha no rodapé do site. Recusar não muda nada no uso do site.'] },
      { titulo: 'Com quem compartilhamos', texto: [
        'Com o entregador, só o necessário para a entrega: nome, endereço e telefone.',
        'Com o WhatsApp (Meta), por onde passam as conversas de pedido. Ele guarda dados também em servidores fora do Brasil, segundo a política do próprio WhatsApp.',
        'Com o banco do Pix e a empresa da maquininha, no pagamento; com o contador, os registros de venda; com a hospedagem do site (Hostinger), o registro de acesso; e com o iFood, quando o pedido é feito pelo aplicativo, segundo a política do iFood.',
        'Não vendemos dados.'
      ] },
      { titulo: 'Por quanto tempo guardamos', texto: [
        'Conversas e dados de pedido: até 6 meses depois do pedido. Registros de venda e documentos fiscais: pelo prazo da lei fiscal, em geral 5 anos. Registro de acesso ao site: 6 meses. Autorização para promoções: até você retirar.'
      ] },
      { titulo: 'Segurança', texto: [
        'Só quem prepara e entrega o pedido vê os seus dados. O site usa conexão segura (HTTPS) e não carrega programas de outras empresas. Se acontecer um incidente que possa trazer risco a você, avisamos você e a Autoridade Nacional de Proteção de Dados (ANPD).'
      ] },
      { titulo: 'Crianças', texto: ['Nossos copos têm cafeína e não são indicados para crianças. Não coletamos dados de crianças de propósito.'] },
      { titulo: 'Seus direitos', texto: [
        'Pela LGPD (art. 18), você pode: confirmar se tratamos os seus dados e ter acesso a eles; corrigir; pedir anonimização, bloqueio ou exclusão do que for desnecessário; pedir a portabilidade; saber com quem compartilhamos; retirar a autorização de promoções; e reclamar à ANPD.',
        'Para pedir, use {contato}. Respondemos em até 15 dias.'
      ] },
      { titulo: 'Encarregado de dados', texto: ['Como microempreendedor individual, somos dispensados de nomear encarregado (Resolução CD/ANPD nº 2/2022). Para qualquer assunto sobre os seus dados, use {contato}.'] }
    ]
  },
  es: {
    titulo: 'Privacidad · Guaraná do Homer',
    descricao: 'Cómo Guaraná do Homer trata tus datos en el sitio, en WhatsApp y en el pago (LGPD).',
    rotulo: 'Privacidad',
    h1: 'Política de privacidad',
    atualizada: 'Actualizada el 2 de noviembre de 2026.',
    responsavel: 'Responsable de los datos:',
    secoes: [
      { titulo: 'Quiénes somos', texto: ['Guaraná do Homer vende guaraná batido con delivery en Ingleses y Santinho, en Florianópolis (SC). Somos responsables de los datos tratados en este sitio, en las conversaciones de pedido y en el pago.'] },
      { titulo: 'Qué datos usamos y para qué', texto: [
        'En el pedido: nombre, teléfono y, si es envío, la dirección. Los usamos para preparar, entregar y hablar con vos sobre el pedido. La base legal es la ejecución del contrato de compra (LGPD, art. 7º, V).',
        'En el pago: con Pix, el banco nos muestra el nombre de quien pagó; con tarjeta, el posnet registra la transacción, sin el número completo de la tarjeta. Los usamos para verificar el pago y cumplir las obligaciones fiscales y contables (art. 7º, II y V).',
        'Promociones: solo las mandamos si las pedís o las autorizás, y podés retirar la autorización cuando quieras (art. 7º, I).'
      ] },
      { titulo: 'Qué guarda el sitio', texto: [
        'El sitio no tiene registro ni formularios y no guarda tu nombre, teléfono ni dirección.',
        'En tu propio navegador, guarda el idioma que elegiste y, si hay aviso de cookies, tu respuesta. Eso queda solo en tu dispositivo; para borrarlo, limpiá los datos del sitio en el navegador.',
        'El hosting del sitio registra, como en todo sitio, la dirección IP y la fecha y hora de cada acceso. La ley brasileña obliga a guardar ese registro por 6 meses (Marco Civil da Internet, art. 15); no lo usamos para identificar a nadie.'
      ] },
      { titulo: 'Cookies de medición', texto: ['Si algún día usamos herramientas de medición de anuncios (como el píxel de Meta o Google Analytics), solo se activarán después de que aceptes en el aviso de cookies, y vas a poder cambiar tu elección en el pie del sitio. Rechazar no cambia nada en el uso del sitio.'] },
      { titulo: 'Con quién compartimos', texto: [
        'Con el repartidor, solo lo necesario para la entrega: nombre, dirección y teléfono.',
        'Con WhatsApp (Meta), por donde pasan las conversaciones de pedido. Guarda datos también en servidores fuera de Brasil, según la política de WhatsApp.',
        'Con el banco del Pix y la empresa del posnet, en el pago; con el contador, los registros de venta; con el hosting del sitio (Hostinger), el registro de acceso; y con iFood, cuando el pedido se hace por la aplicación, según la política de iFood.',
        'No vendemos datos.'
      ] },
      { titulo: 'Por cuánto tiempo guardamos', texto: [
        'Conversaciones y datos de pedido: hasta 6 meses después del pedido. Registros de venta y documentos fiscales: por el plazo de la ley fiscal, en general 5 años. Registro de acceso al sitio: 6 meses. Autorización para promociones: hasta que la retires.'
      ] },
      { titulo: 'Seguridad', texto: [
        'Solo quien prepara y entrega el pedido ve tus datos. El sitio usa conexión segura (HTTPS) y no carga programas de otras empresas. Si ocurre un incidente que pueda ponerte en riesgo, te avisamos a vos y a la Autoridad Nacional de Protección de Datos de Brasil (ANPD).'
      ] },
      { titulo: 'Niños', texto: ['Nuestros vasos tienen cafeína y no son recomendados para niños. No recolectamos datos de niños a propósito.'] },
      { titulo: 'Tus derechos', texto: [
        'Por la LGPD (art. 18), podés: confirmar si tratamos tus datos y acceder a ellos; corregirlos; pedir anonimización, bloqueo o eliminación de lo que no sea necesario; pedir la portabilidad; saber con quién compartimos; retirar la autorización de promociones; y reclamar ante la ANPD.',
        'Para pedirlo, usá {contato}. Respondemos en hasta 15 días.'
      ] },
      { titulo: 'Encargado de datos', texto: ['Como microemprendedor individual, estamos dispensados de nombrar un encargado (Resolución CD/ANPD nº 2/2022). Para cualquier tema sobre tus datos, usá {contato}.'] }
    ]
  }
};

export const termosPagina = {
  pt: {
    titulo: 'Termos de venda · Guaraná do Homer',
    descricao: 'Condições de venda da Guaraná do Homer: área de entrega, preços, pagamento, prazos e atendimento.',
    rotulo: 'Termos',
    h1: 'Termos e condições de venda',
    atualizada: 'Atualizados em 2 de novembro de 2026.',
    responsavel: 'Empresa:',
    secoes: [
      { titulo: 'Quem vende', texto: ['A Guaraná do Homer, de Florianópolis (SC). Fale com a gente por {contato}.'] },
      { titulo: 'O produto', texto: [
        'Guaraná batido feito na hora, com guaraná em pó, xarope de guaraná, amendoim, castanha de caju, leite e gelo.',
        'Todo copo contém leite, amendoim, castanha de caju e cafeína e não é indicado para crianças, gestantes, lactantes e pessoas sensíveis à cafeína. O Modo Turbo tem mais cafeína e não é indicado para menores de 18 anos.'
      ] },
      { titulo: 'Onde e quando', texto: ['Entregamos só nos Ingleses e no Santinho, {horario}. A retirada é sem taxa de entrega, para quem mora em qualquer bairro; o endereço vai na confirmação do pedido.'] },
      { titulo: 'Preços e taxa de entrega', texto: [
        'Valem os preços do cardápio do site no momento do pedido, para pedidos pelo site e pelo WhatsApp. O iFood tem preços próprios. Enquanto o site mostrar "preço estimado", vale o valor confirmado na mensagem do pedido, antes do pagamento.',
        'A taxa de entrega é informada na confirmação do pedido, antes do pagamento. Na retirada, não há taxa.'
      ] },
      { titulo: 'Pagamento', texto: ['Pix antes do preparo (a chave é o CNPJ da loja; confira antes de pagar) ou cartão de crédito ou débito na maquininha, na entrega ou na retirada, sem acréscimo. No crédito, só à vista. Nenhum pagamento é feito no site.'] },
      { titulo: 'Como o pedido é fechado', texto: [
        'Você monta o pedido no site ou fala direto no WhatsApp. Antes de pagar, mandamos pelo WhatsApp o resumo: itens, valor, taxa, forma de pagamento e previsão. O pedido só vale depois que você confirma.',
        'Guarde essa conversa: ela é o comprovante do pedido.'
      ] },
      { titulo: 'Prazo', texto: ['A previsão é de cerca de 40 minutos na entrega e de cerca de 10 minutos na retirada, contados da confirmação do pagamento (no cartão, da confirmação do pedido). É uma previsão: chuva, trânsito e movimento podem mudar o tempo, e avisamos se isso acontecer.'] },
      { titulo: 'Cancelamento, problemas e reembolso', texto: ['Antes do preparo, você cancela sem custo. Se algo der errado, você escolhe entre refazer, devolver o valor ou ter um abatimento. As regras completas estão na página de cancelamento e reembolso.'], link: { texto: 'Ver cancelamento e reembolso', para: 'cancelamento' } },
      { titulo: 'Atendimento e reclamações', texto: ['Fale com a gente por {contato}. Confirmamos o recebimento da mensagem no horário de funcionamento e respondemos reclamações em até 5 dias. Se não resolvermos, você pode procurar o Procon ou o consumidor.gov.br.'] },
      { titulo: 'Uso do site', texto: ['O site apresenta a loja e leva o pedido para o WhatsApp. Textos, marca e imagens são da Guaraná do Homer e não podem ser usados sem autorização.'] },
      { titulo: 'Mudanças nestes termos', texto: ['Podemos atualizar estes termos. Vale a versão publicada no dia do pedido.'] }
    ]
  },
  es: {
    titulo: 'Términos de venta · Guaraná do Homer',
    descricao: 'Condiciones de venta de Guaraná do Homer: zona de envío, precios, pago, plazos y atención.',
    rotulo: 'Términos',
    h1: 'Términos y condiciones de venta',
    atualizada: 'Actualizados el 2 de noviembre de 2026.',
    responsavel: 'Empresa:',
    secoes: [
      { titulo: 'Quién vende', texto: ['Guaraná do Homer, de Florianópolis (SC). Escribinos por {contato}.'] },
      { titulo: 'El producto', texto: [
        'Guaraná batido hecho en el momento, con guaraná en polvo, jarabe de guaraná, maní, castaña de cajú, leche y hielo.',
        'Todos los vasos contienen leche, maní, castaña de cajú y cafeína y no son recomendados para niños, embarazadas, mujeres en lactancia y personas sensibles a la cafeína. El Modo Turbo tiene más cafeína y no es recomendado para menores de 18 años.'
      ] },
      { titulo: 'Dónde y cuándo', texto: ['Entregamos solo en Ingleses y Santinho, {horario}. El retiro es sin tarifa de envío, para quien viva en cualquier barrio; la dirección va en la confirmación del pedido.'] },
      { titulo: 'Precios y tarifa de envío', texto: [
        'Valen los precios del menú del sitio en el momento del pedido, para pedidos por el sitio y por WhatsApp. iFood tiene precios propios. Mientras el sitio muestre "precio estimado", vale el valor confirmado en el mensaje del pedido, antes del pago.',
        'La tarifa de envío se informa en la confirmación del pedido, antes del pago. Si lo retirás, no hay tarifa.'
      ] },
      { titulo: 'Pago', texto: ['Pix antes de la preparación (la clave es el CNPJ del local; verificala antes de pagar) o tarjeta de crédito o débito en el posnet, al recibir o al retirar, sin recargo. Con crédito, solo en un pago. Ningún pago se hace en el sitio.'] },
      { titulo: 'Cómo se cierra el pedido', texto: [
        'Armás el pedido en el sitio o escribís directo por WhatsApp. Antes de pagar, te mandamos por WhatsApp el resumen: productos, valor, tarifa, forma de pago y previsión. El pedido vale recién cuando lo confirmás.',
        'Guardá esa conversación: es el comprobante del pedido.'
      ] },
      { titulo: 'Plazo', texto: ['La previsión es de unos 40 minutos para el envío y de unos 10 minutos para el retiro, contados desde la confirmación del pago (con tarjeta, desde la confirmación del pedido). Es una previsión: lluvia, tránsito y demanda pueden cambiar el tiempo, y te avisamos si pasa.'] },
      { titulo: 'Cancelación, problemas y reembolso', texto: ['Antes de la preparación, cancelás sin costo. Si algo sale mal, elegís entre rehacer, devolución del valor o un descuento. Las reglas completas están en la página de cancelación y reembolso.'], link: { texto: 'Ver cancelación y reembolso', para: 'cancelamento' } },
      { titulo: 'Atención y reclamos', texto: ['Escribinos por {contato}. Confirmamos que recibimos tu mensaje en el horario de atención y respondemos reclamos en hasta 5 días. Si no lo resolvemos, podés acudir al Procon o a consumidor.gov.br.'] },
      { titulo: 'Uso del sitio', texto: ['El sitio presenta el local y lleva el pedido a WhatsApp. Textos, marca e imágenes son de Guaraná do Homer y no pueden usarse sin autorización.'] },
      { titulo: 'Cambios en estos términos', texto: ['Podemos actualizar estos términos. Vale la versión publicada el día del pedido.'] }
    ]
  }
};

export const cancelamentoPagina = {
  pt: {
    titulo: 'Cancelamento e reembolso · Guaraná do Homer',
    descricao: 'Como cancelar um pedido e o que acontece em caso de copo errado, problema ou atraso na Guaraná do Homer.',
    rotulo: 'Cancelamento',
    h1: 'Cancelamento e reembolso',
    lead: 'O copo é batido na hora para você tomar logo. Por isso o cancelamento é livre antes do preparo e, depois dele, você tem as garantias de sempre se algo der errado.',
    atualizada: 'Atualizada em 2 de novembro de 2026.',
    secoes: [
      { titulo: 'Antes do preparo', texto: ['Você pode cancelar pelo WhatsApp até avisarmos que o preparo começou, e devolvemos 100% do valor. O Pix volta em até 1 hora, dentro do horário de funcionamento (fora dele, no começo do próximo dia aberto). No cartão, como o pagamento é na entrega ou na retirada, não há cobrança.'] },
      { titulo: 'Depois que o preparo começa', texto: ['Não dá para cancelar só por desistência: o copo é feito na hora, para consumo imediato, e não pode ser guardado nem revendido. Se houver problema, valem as regras abaixo.'] },
      { titulo: 'Copo errado ou com problema', texto: ['Mande uma foto pelo WhatsApp em até 1 hora depois de receber. Você escolhe: refazemos o copo sem custo, devolvemos o valor do copo ou damos um abatimento. Um cupom para o próximo pedido só entra se você preferir.'] },
      { titulo: 'Atraso', texto: ['A previsão de entrega é de cerca de 40 minutos. Se passar de 60 minutos depois da confirmação do pagamento, você escolhe: cancelar com devolução total, se o pedido ainda não saiu; ou, se ele já está a caminho ou chegou, a devolução da taxa de entrega ou um abatimento.'] },
      { titulo: 'Retirada', texto: ['O copo fica pronto em cerca de 10 minutos. Se ninguém buscar até o fechamento do dia, ele é descartado e o valor não é devolvido, porque não pode ser guardado. Se não puder vir, avise antes do preparo e cancelamos sem custo.'] },
      { titulo: 'Como pedir e prazos', texto: [
        'Tudo por {contato}. Confirmamos o recebimento no horário de funcionamento e resolvemos em até 5 dias.',
        'A devolução é pelo mesmo meio do pagamento: Pix para a mesma conta; no cartão, estorno pela maquininha, que aparece na fatura conforme o prazo do seu banco.'
      ] },
      { titulo: 'Pedidos pelo iFood', texto: ['Seguem as regras e o atendimento do próprio iFood.'] }
    ]
  },
  es: {
    titulo: 'Cancelación y reembolso · Guaraná do Homer',
    descricao: 'Cómo cancelar un pedido y qué pasa si el vaso llega equivocado, con algún problema o con demora en Guaraná do Homer.',
    rotulo: 'Cancelación',
    h1: 'Cancelación y reembolso',
    lead: 'El vaso se bate en el momento para que lo tomes enseguida. Por eso cancelar es libre antes de la preparación y, después, tenés las garantías de siempre si algo sale mal.',
    atualizada: 'Actualizada el 2 de noviembre de 2026.',
    secoes: [
      { titulo: 'Antes de la preparación', texto: ['Podés cancelar por WhatsApp hasta que te avisemos que empezó la preparación, y te devolvemos el 100% del valor. El Pix vuelve en hasta 1 hora, dentro del horario de atención (fuera de él, al comienzo del próximo día abierto). Con tarjeta, como el pago es al recibir o al retirar, no hay cobro.'] },
      { titulo: 'Cuando empieza la preparación', texto: ['No se puede cancelar solo por arrepentimiento: el vaso se hace en el momento, para consumo inmediato, y no se puede guardar ni revender. Si hay un problema, valen las reglas de abajo.'] },
      { titulo: 'Vaso equivocado o con algún problema', texto: ['Mandá una foto por WhatsApp hasta 1 hora después de recibirlo. Elegís: rehacemos el vaso sin costo, te devolvemos el valor del vaso o te hacemos un descuento. Un cupón para el próximo pedido solo si lo preferís.'] },
      { titulo: 'Demora', texto: ['La previsión de entrega es de unos 40 minutos. Si pasan más de 60 minutos desde la confirmación del pago, elegís: cancelar con devolución total, si el pedido todavía no salió; o, si ya está en camino o llegó, la devolución de la tarifa de envío o un descuento.'] },
      { titulo: 'Retiro', texto: ['El vaso está listo en unos 10 minutos. Si nadie lo busca hasta el cierre del día, se descarta y el valor no se devuelve, porque no se puede guardar. Si no podés venir, avisá antes de la preparación y cancelamos sin costo.'] },
      { titulo: 'Cómo pedirlo y plazos', texto: [
        'Todo por {contato}. Confirmamos que recibimos tu mensaje en el horario de atención y lo resolvemos en hasta 5 días.',
        'La devolución es por el mismo medio de pago: Pix a la misma cuenta; con tarjeta, reintegro por el posnet, que aparece en el resumen según el plazo de tu banco.'
      ] },
      { titulo: 'Pedidos por iFood', texto: ['Siguen las reglas y la atención de iFood.'] }
    ]
  }
};
