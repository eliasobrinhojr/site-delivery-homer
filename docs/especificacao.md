# Especificação de negócio · site Guaraná do Homer

Resumo operacional da especificação completa (documento "Especificação de Negócio — Site e Sistema de Pedidos
Guaraná do Homer", 28–29/10/2026). Quando houver conflito, vale a versão mais nova do documento completo;
atualize este arquivo junto.

## Contexto

- Produto: guaraná batido em 3 sabores (Tradicional, Abacate, Banana), 3 tamanhos (300, 500, 700 ml) e Modo
  Turbo (300 e 500 ml).
- **Área de entrega: só Ingleses e Santinho** (Norte da Ilha, Florianópolis). Decisão de 29/10/2026: áreas maiores
  não cabem no tempo de 40 minutos. Nunca escrever "Grande Florianópolis".
- Canais: iFood (cliente novo), site e WhatsApp (recompra, preço direto). Pagamento direto por Pix antes do preparo.
- **Retirada (decisão de 29/10/2026):** o cliente pode buscar o pedido, pelo site, pelo WhatsApp ou pela opção
  Retirada do iFood. Não é um ponto de atendimento: sem salão nem consumo no local. O endereço continua fora do
  site; vai só na confirmação do pedido (WhatsApp) ou no próprio app do iFood.
- Horário do MVP: quinta a domingo, 13h às 20h. **Inauguração: sem data** (decisão de 29/10/2026: primeiro o digital,
  depois compras, cozinha e treino da produção). O site mostra "Inauguração em breve" e só convida (`loja.inauguracao = 'em-breve'`).
- WhatsApp dos pedidos: (92) 99259-4820 (número pessoal do pai até a inauguração).
- Empresa: MEI, CNPJ 69.883.553/0001-36 (desde 29/10/2026). A chave Pix dos pedidos diretos é o CNPJ.
  Nome empresarial (padrão da Receita para MEI: "69.883.553 NOME DO TITULAR"): aprovado para o site em 29/10,
  aguardando o texto exato do cartão CNPJ.
- Público extra: turistas argentinos → site em espanhol.

## Fases

| Fase | Entrega | Meta |
| --- | --- | --- |
| 1 | Site institucional: 9 páginas, PT e ES | no ar desde 29/10/2026 |
| 2 | Monte o seu copo, carrinho, cupom, mensagem pronta no WhatsApp | 12/12/2026 |
| 3 | Sistema de pedidos em Flutter (Pix automático, cozinha, entrega, push, nota) | após o levantamento do backend |
| 4 | Fidelidade, cupons, painel, fechamento de caixa, teto do MEI | após a fase 3 |

## Mapa do site (fase 1)

`/`, `/sobre/`, `/o-guarana/`, `/cardapio/`, `/como-pedir/`, `/direto/` (destino do QR code do iFood),
`/eventos/`, `/perguntas/`, `/privacidade/` e os mesmos endereços com `/es`.

## Requisitos funcionais

| Código | Requisito | Onde está |
| --- | --- | --- |
| RF-01 | Botão "Pedir" fixo, sempre à vista no celular | `layout.mjs` (`.gh-botao-fixo`) |
| RF-02 | Mensagem pronta diferente por origem | `src/lib/whatsapp.mjs` (`MENSAGENS`) |
| RF-03 | Cardápio a partir de arquivo de conteúdo | `conteudo/` |
| RF-04 | Só preços diretos; iFood só em /direto | `verificar.mjs` confere |
| RF-05 | Turbo só em 300 e 500 ml, com selo e aviso | `cardapio.mjs`, `monte.mjs` |
| RF-06 | Avisos de alergênicos e cafeína | `componentes.mjs` (`avisoAlergenicos`), rodapé |
| RF-07 | Aberto ou fechado agora (fuso de São Paulo) | `src/lib/horario.mjs`, `site.mjs` |
| RF-08 | PT/ES, escolha lembrada, navegador em espanhol abre em espanhol | `site.mjs` |
| RF-09 | Link do iFood | `loja.ifood` (aparece quando preenchido) |
| RF-10 | Eventos de "Pedir" com origem | `site.mjs` (`data-origem`) |
| RF-11 | Medição só depois do aceite de cookies | `site.mjs`, `loja.analytics` |
| RF-12 | Prévia ao compartilhar (título, descrição, imagem) | `layout.mjs`, `publico/og/` |
| RF-13 | Aviso do dia no topo | `loja.aviso` |
| RF-14 | Identificação da empresa: "Guaraná do Homer · MEI · CNPJ" no rodapé de todas as páginas, controlador na privacidade, dados para cadastro de fornecedor em eventos, `taxID` nos dados do Google; chave Pix = CNPJ, mostrada em Como pedir e /direto com aviso contra Pix falso (Decreto 7.962/2013, art. 2º; LGPD, art. 9º) | `loja.cnpj`, `linhaEmpresa()` em `componentes.mjs`; dígitos conferidos em `testes/loja.test.mjs` |
| RF-20 | Monte o seu (sabor, tamanho, Turbo, doçura, até 3 adicionais) | `componentes.mjs`, `monte.mjs` |
| RF-21 | Carrinho com vários copos e combo | **pendente (fase 2)** — regra do combo pronta em `totalPedido` |
| RF-22/23 | Dados de entrega e taxa por bairro (só quando o cliente escolhe entrega; na retirada, só nome e telefone) | **pendente (fase 2)** — bairros em `loja.bairros` |
| RF-24 | Cupom | **pendente (fase 2)** |
| RF-25 | Mensagem do pedido com código de produção, preço e forma de receber (entrega com o bairro, ou retirada) | `mensagemPedido` |
| RF-28 | Retirada como opção: escolha "Entrega ou Retirada" no monte o seu, cartão "Prefere buscar?" em Como pedir, pergunta frequente, botão com mensagem própria | `loja.retirada`, `monte.mjs`, `paginaComoPedir` |
| RF-26 | Loja fechada bloqueia o envio; antes da inauguração vira convite | `monte.mjs` |
| RF-27 | Lembrar dados no aparelho | **pendente (fase 2)** |

## Regras do cardápio

| Código | Regra |
| --- | --- |
| RN-01 | Preço igual para os três sabores em cada tamanho (R$ 17 / 24 / 33) |
| RN-02 | Turbo só em 300 e 500 ml (R$ 21 / 28); não existe Turbo 700 nem "dose dupla" |
| RN-03 | Doçura obrigatória e grátis: menos doce, normal (padrão), mais doce |
| RN-04 | Até 3 adicionais por copo, cada um uma vez (mel, leite condensado, paçoca R$ 3; amendoim extra R$ 2; canela R$ 1) |
| RN-05 | Não existe versão sem leite, sem amendoim ou sem castanha |
| RN-06 | Nada ácido no copo (limão, maracujá, abacaxi) |
| RN-07 | Sabor ou adicional pode ficar esgotado no dia |
| RN-08 | Combo de casal: 2 copos de 500 ml por R$ 44 |
| RN-09 | Nenhuma promoção acima de 15% na primeira temporada |
| RN-10 | Preço do iFood ~33% maior; nunca como preço do site |
| RN-11 | Retirada: mesmo preço direto, sem taxa de entrega, para qualquer bairro; Pix antes do preparo; copo pronto em até 10 minutos depois do Pix; endereço só na confirmação do pedido; sem consumo no local |

Código de produção: sabor (T/A/B) + tamanho (3/5/7) + X (Turbo) + doçura (− ou +) + adicionais.
Ex.: `B5X+ MEL PAC`.

## Requisitos não funcionais (resumo)

RNF-01 responsivo (360–599, 600–1023, 1024+), RNF-02 conteúdo em até 2 s no 4G, RNF-03 imagens leves,
RNF-04 endereços limpos, RNF-05 HTML legível pelo Google + dados estruturados + sitemap, RNF-06 prévia por página,
RNF-07 WCAG 2.1 AA e alvo de toque de 48 px, RNF-08 PT e ES, RNF-11 LGPD, RNF-12 HTTPS e nenhum segredo no código,
RNF-13 UTM em anúncios, bio e QR code, RNF-14 site estático com CDN, RNF-15 conteúdo separado das telas.

## Pontos em aberto (decisão do Elias)

- **Nome empresarial no site:** aprovado em 29/10 (Decreto 7.962/2013, art. 2º, I). Falta o texto exato do cartão
  CNPJ para preencher `loja.nomeEmpresarial`; ele aparece no rodapé, na privacidade, em eventos, no aviso do Pix e
  como `legalName` nos dados do Google.
- **Endereço físico:** decisão de 29/10: **o site continua sem endereço** (só Florianópolis, SC, WhatsApp e CNPJ),
  mantendo a regra de nunca mostrar a cozinha, mesmo sem atender à letra do art. 2º, II. Rever se houver endereço
  comercial ou fiscal separado da casa.
