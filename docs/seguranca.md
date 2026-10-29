# Segurança

Base reaproveitada do site da Draxora (conferido no ar em 22–23/10/2026), ajustada para um site estático sem
backend: não há formulário, banco, PHP nem dado pessoal guardado no servidor.

## O que já está no código

| Proteção | Onde |
| --- | --- |
| HTTPS obrigatório e sem `www` (301) | `publico/.htaccess` |
| HSTS 1 ano, `nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, COOP | `publico/.htaccess` |
| CSP sem `unsafe-inline`: só recursos do próprio site | `publico/.htaccess` e `scripts/servir.mjs` |
| Arquivos ocultos, `.md`, `.yml`, `.sh` etc. nunca servidos | `publico/.htaccess` |
| Listagem de pastas desligada | `Options -Indexes` |
| Nenhum `style=""`, script inline ou `onclick=""` no HTML | conferido por `scripts/verificar.mjs` |
| Nenhum recurso por `http://` e nenhum segredo publicado | conferido por `scripts/verificar.mjs` |
| Todo texto interpolado escapado | `esc()` em `src/lib/formato.mjs` |
| Links externos com `rel="noopener"` | componentes |
| Medição (pixel/GA4) só depois do aceite | `src/cliente/site.mjs` |
| Sem dependências de npm (nada para ser comprometido) | `docs/decisoes.md` D1 |
| Ações do GitHub atualizadas pelo Dependabot | `.github/dependabot.yml` |

## Ao ativar o pixel da Meta ou o GA4

1. Preencher `loja.analytics` em `conteudo/loja.mjs`.
2. Acrescentar os domínios na CSP do `.htaccess` (a linha comentada logo acima mostra quais).
3. Conferir no navegador que o aviso de cookies aparece e que nada carrega antes do aceite.

## Checklist do Elias (fora do código)

- [ ] Verificação em duas etapas no GitHub e na hospedagem.
- [ ] GitHub → Settings → Code security: Secret scanning e Push protection ligados.
- [ ] Proteção da `main`: exigir PR e o check `ci-ok`; ambiente `producao` com aprovação manual.
- [ ] Domínio registrado no CNPJ, com renovação automática e bloqueio de transferência.
- [ ] Depois de publicar: conferir os cabeçalhos em https://securityheaders.com e o HTTPS em https://www.ssllabs.com/ssltest/.
- [ ] Criar `/.well-known/security.txt` quando houver um e-mail de contato da loja.
