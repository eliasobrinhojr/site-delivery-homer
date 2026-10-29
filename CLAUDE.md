# Guaraná do Homer — guia para o Claude Code

Site da Guaraná do Homer: guaraná batido cremoso, feito na hora, com guaraná em pó de Maués (AM), vendido por
delivery **só nos Ingleses e no Santinho**, em Florianópolis. O site apresenta a marca para quem nunca tomou
guaraná batido e leva o pedido para o WhatsApp, fugindo da taxa dos aplicativos.

- Especificação de negócio: `docs/especificacao.md` (códigos RF, RN e RNF). Leia antes de mudar qualquer tela
  e cite os códigos no PR e nos testes.
- Decisões técnicas: `docs/decisoes.md`. Segurança: `docs/seguranca.md`. Como editar conteúdo: `docs/conteudo.md`.
- Divisão técnica: este repositório é o **site institucional + pedido pelo WhatsApp (fases 1 e 2)**, em HTML
  estático gerado por Node, sem dependências. O **sistema de pedidos e o app (fases 3 e 4) serão em Flutter**,
  em outro repositório, lendo o mesmo `conteudo/cardapio.mjs` (exportado em JSON quando chegar a hora).

## Regras que nunca mudam

1. **Marca:** nada de Os Simpsons (personagem amarelo, rosquinha, "D'oh", Duff, o traço da série). "Homer" é o
   apelido que os amigos da rua deram ao pai do Elias. O "HOMER" do logo é a letra do pai: use sempre os SVGs de
   `publico/marca/`, nunca imite com fonte.
2. **Comunicação:** nada de promessa de saúde ou efeito ("dá energia", "foco", "emagrece", "natural e
   saudável") nem comparação com remédio ou energético (RDC 727/2022). Pode: origem em Maués, "feito na hora",
   ocasião e os números de cafeína.
3. **Avisos sempre visíveis (RF-06):** todo copo contém leite, amendoim, castanha de caju e cafeína. O Modo Turbo
   tem aviso próprio.
4. **Endereço da cozinha nunca aparece no site.** A área de entrega é "Ingleses e Santinho". Nunca "Grande
   Florianópolis". A **retirada** é uma opção (RN-11): sem taxa, qualquer bairro, sem salão; o endereço vai só na
   confirmação do pedido pelo WhatsApp ou no app do iFood.
5. **Preço do iFood só na página /direto (RF-04).**
6. **Texto fora das telas:** todo texto fica em `conteudo/textos/` (PT e ES lado a lado); preços, horários, bairros
   e links em `conteudo/cardapio.mjs` e `conteudo/loja.mjs`. Nenhuma cor solta: só variáveis de
   `src/estilos/tokens.css`.
7. **Segurança:** nenhuma senha, chave ou token no repositório. Sem `style=""`, sem script inline e sem
   `onclick=""` no HTML (a CSP bloqueia). Sem dependência nova sem decisão registrada em `docs/decisoes.md`.
8. **Regra de negócio mudou?** Primeiro atualize `docs/especificacao.md` e o teste; depois o código.

## Estrutura

```
conteudo/        dados e textos (o que o dono edita): loja.mjs, cardapio.mjs, textos/*.mjs
src/lib/         regras puras (Node e navegador): cardapio, horario, whatsapp, formato
src/paginas/     uma função por página → HTML
src/layout.mjs   <head>, cabeçalho, faixas, rodapé
src/cliente/     JavaScript do navegador: site.mjs (status, idioma, cookies), monte.mjs (monte o seu copo)
src/estilos/     tokens.css e componentes.css (kit do designer) + site.css
publico/         arquivos copiados como estão: marca, fontes, favicons, imagens de prévia, .htaccess
scripts/         build.mjs, servir.mjs, verificar.mjs, gerar-og.mjs
testes/          node:test (regras RN, horário, WhatsApp, site gerado)
```

## Comandos (Node 22, nada para instalar)

```
npm test              # testes de regra + build + verificação do site gerado
npm run dev           # gera e abre em http://localhost:4321 (com a mesma CSP da produção)
npm run build         # gera dist/
npm run verificar     # build + conferência de SEO, CSP, links, alt, textos proibidos, RF-04
npm run og            # refaz as imagens de prévia (precisa do Playwright: npm i -D playwright)
```

## Como trabalhar

- Uma mudança por branch (`feat/…`, `fix/…`, `conteudo/…`) e por PR. Título no padrão Conventional Commits
  (`feat: página de eventos`), conferido pela esteira. O check obrigatório é `ci-ok`.
- Antes do PR: `npm test` passando. Confira no navegador em 390 px e 1440 px, em PT e ES.
- Merge na `main` publica sozinho (ramo `publicacao`, ver `docs/decisoes.md`). Nunca mexa no ramo `publicacao`
  à mão.
- Em dúvida entre duas leituras de uma regra, pergunte em vez de escolher.

## Pendências conhecidas

- Link do iFood, Instagram e e-mail: `null` em `conteudo/loja.mjs` até existirem (os blocos aparecem sozinhos).
- CNPJ 69.883.553/0001-36 (MEI) já está no site (RF-14). Nome empresarial e endereço físico: ver "Pontos em aberto"
  em `docs/especificacao.md` antes de mexer.
- Taxa de entrega por bairro: `null` (informada no WhatsApp).
- Cupom do cartão do iFood: `null` (bloco de cupom escondido em /direto).
- Fotos de 14–15/11 substituem o copo ilustrado (`publico/marca/copo-provisorio.svg`), mesmo enquadramento 4:5.
- Ficha de prova (página inicial): textos de sabor a confirmar na degustação de 9–22/11.
- Número do WhatsApp é o pessoal do pai; trocar em `conteudo/loja.mjs` quando houver o número da loja.
- Antes da inauguração, pedidos só no **modo equipe** (`/equipe/`, RF-29). A frase nunca entra no repositório:
  `npm run senha-equipe -- "frase"` grava só o hash.
