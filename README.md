# Guaraná do Homer · site

Guaraná batido cremoso, feito na hora, com guaraná em pó de Maués. Delivery nos Ingleses e no Santinho, em
Florianópolis. Site em português e espanhol: marca, cardápio, "monte o seu copo" e pedido pelo WhatsApp.

## Rodar

Precisa só do [Node.js 22](https://nodejs.org). Não há pacotes para instalar.

```
npm run dev     # http://localhost:4321
npm test        # 32 testes: regras do cardápio, horário, WhatsApp e site gerado
```

## Mudar preço, horário, bairro ou texto

Veja `docs/conteudo.md`. Em resumo: `conteudo/loja.mjs` (WhatsApp, horários, bairros, links, inauguração),
`conteudo/cardapio.mjs` (preços, sabores, adicionais, esgotados) e `conteudo/textos/` (todos os textos, PT e ES).

## Publicar

Toda mudança entra por pull request. A CI roda testes, build e verificação; o merge na `main` gera o site e grava
no ramo `publicacao`, que a hospedagem publica. Detalhes em `docs/decisoes.md`.

## Documentos

- `CLAUDE.md`: regras para o Claude Code
- `docs/especificacao.md`: requisitos de negócio (RF, RN, RNF)
- `docs/decisoes.md`: decisões técnicas
- `docs/seguranca.md`: cabeçalhos, CSP e checklist
- `docs/conteudo.md`: como editar o conteúdo

Fontes Baloo 2 e Nunito Sans sob a SIL Open Font License (`publico/fontes/OFL-*.txt`).
