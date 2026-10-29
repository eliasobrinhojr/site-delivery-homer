# Como editar o conteúdo

Tudo o que muda no dia a dia fica em `conteudo/`. Depois de editar: `npm test`, abrir um PR e, aprovado, o site
publica sozinho.

| Quero mudar | Arquivo | Campo |
| --- | --- | --- |
| Número do WhatsApp | `conteudo/loja.mjs` | `whatsapp` (55 + DDD + número, só dígitos) |
| Horário | `conteudo/loja.mjs` | `horarios` (0 = domingo … 6 = sábado) |
| Bairros e taxa de entrega | `conteudo/loja.mjs` | `bairros` |
| Link do iFood, Instagram | `conteudo/loja.mjs` | `ifood`, `instagram` |
| CNPJ e nome empresarial | `conteudo/loja.mjs` | `cnpj` (formato 00.000.000/0000-00; o teste confere os dígitos), `nomeEmpresarial` |
| "Fechados hoje", "esgotou o abacate" | `conteudo/loja.mjs` | `aviso.pt` e `aviso.es` (vazio = sem faixa) |
| Cupom do cartão do iFood | `conteudo/loja.mjs` | `cupomSegundaCompra` (até 15%) |
| Data de inauguração | `conteudo/loja.mjs` | `inauguracao` |
| Preços | `conteudo/cardapio.mjs` | `tamanhos`, `adicionais` |
| Sabor ou adicional esgotado hoje | `conteudo/cardapio.mjs` | `esgotados` (ex.: `['A']`) |
| Qualquer texto | `conteudo/textos/*.mjs` | o português e o espanhol ficam lado a lado |
| Mensagens prontas do WhatsApp | `src/lib/whatsapp.mjs` | `MENSAGENS` |

Os testes avisam se um preço quebrar uma regra (RN-01 a RN-10) e a verificação avisa se algum texto usar uma
palavra proibida pela marca.

## Fotos

Quando chegarem as fotos de 14–15/11: WebP até 200 KB, proporção 4:5, em `publico/marca/` com o mesmo nome do
copo ilustrado que ela substitui, ou um nome novo trocado em `src/paginas/`.

## Imagens de prévia (WhatsApp e redes)

`npm run og` refaz as 20 imagens de `publico/og/` com os títulos de `scripts/gerar-og.mjs`.
