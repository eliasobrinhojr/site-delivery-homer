# Decisões técnicas

## D1 · Site estático gerado por Node, sem dependências (29/10/2026)

- **Decisão:** o site institucional é HTML estático gerado por `scripts/build.mjs`, usando só o Node 22. Nada de
  framework nem pacote do npm. Testes com `node:test`.
- **Por quê:** o Google lê cada página como HTML (RNF-05), abre rápido no 4G (RNF-02) e não existe biblioteca de
  terceiros para atualizar ou ser comprometida. É o mesmo modelo do site da Draxora (HTML, CSS e JS puros).
  A especificação sugeria Astro; ele continua possível no futuro, mas não traz nada que este site precise hoje.
- **Consequência:** templates são funções JS que devolvem HTML (`src/paginas/`). Todo texto interpolado passa por
  `esc()`.

## D2 · Flutter só para o sistema e o app (29/10/2026)

O Flutter Web desenha a página num canvas, o Google lê mal e o primeiro carregamento é pesado. Ele fica para o
sistema de pedidos, cozinha, painel e app (fases 3 e 4), em `pedir.dohomer.com.br`, em outro repositório.
O cardápio é a fonte única: `conteudo/cardapio.mjs` será exportado em JSON para o Flutter.

## D3 · Fontes servidas pelo próprio site em WOFF (29/10/2026)

Baloo 2 (800) e Nunito Sans (400, 700, 800), recortadas para latim a partir dos arquivos oficiais do Google
Fonts (licença OFL), ~68 KB no total. WOFF em vez de WOFF2 porque o ambiente de geração não tinha o compressor
brotli; dá para trocar por WOFF2 depois sem mudar nenhuma tela.

## D4 · Publicação pelo ramo `publicacao` (29/10/2026)

- A CI (`.github/workflows/ci.yml`) roda em todo PR: testes, build, verificação e um artefato `site-<sha>` com o
  site gerado, para baixar e abrir como prévia.
- O merge na `main` roda `.github/workflows/publicar.yml`, que grava `dist/` no ramo `publicacao`.
- **Hospedagem sugerida: Hostinger**, a mesma da Draxora, com deploy automático pelo Git do hPanel apontando para
  o ramo `publicacao` e a pasta do domínio. O `.htaccess` já traz HTTPS, cabeçalhos de segurança e cache.
- Aprovação manual antes de publicar: em GitHub → Settings → Environments → `producao`, marcar "Required
  reviewers" com o Elias. Assim o merge espera um clique antes de ir para o ar.
- Voltar uma versão: reverter o commit na `main` (gera nova publicação).
- Alternativas que funcionam com o mesmo `dist/`: Cloudflare Pages ou Firebase Hosting (copiar os cabeçalhos do
  `.htaccess` para a configuração deles).

## D5 · Pedido pelo WhatsApp sem backend (fases 1 e 2)

O "monte o seu copo" calcula preço, código de produção e cafeína no navegador e abre o WhatsApp com a mensagem
pronta (`wa.me`). Nada é gravado em servidor. O backend só entra na fase 3 (Pix automático, push, nota fiscal).

## D6 · Domínio dohomer.com.br (29/10/2026)

- **Decisão:** o site fica em `https://dohomer.com.br`, registrado no CNPJ. "do Homer" é a marca-mãe: hoje o
  Guaraná do Homer; depois, saladas de frutas, pizzas e a loja física, sem trocar de domínio.
- **Consequência:** o nome no site continua "Guaraná do Homer". O sistema de pedidos usará `pedir.dohomer.com.br`.
  Trocar o domínio é editar `loja.dominio` em `conteudo/loja.mjs` e rodar `npm run og`.
