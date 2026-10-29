// Confere o site gerado em dist/ antes de publicar. Roda na esteira (CI) e nos testes.
// Uso: node scripts/build.mjs && node scripts/verificar.mjs
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));

// Regras de comunicação da marca (especificação e kit): nunca podem aparecer no site.
export const PROIBIDOS = [
  /simpsons?/i, /rosquinha/i, /d'oh/i, /\bduff\b/i,
  /d[áa] energia/i, /emagrece/i, /natural e saud[áa]vel/i, /\bcura\b/i, /imunidade/i,
  /energ[ée]tico natural/i, /venvanse/i, /tadala/i,
  /grande florian[óo]polis/i // a entrega é só nos Ingleses e no Santinho
];

async function arquivos(pasta, filtro) {
  const itens = await readdir(pasta, { recursive: true, withFileTypes: true });
  return itens.filter((i) => i.isFile() && filtro(i.name)).map((i) => join(i.parentPath ?? i.path, i.name));
}

const existe = (p) => stat(p).then(() => true, () => false);

export async function verificar() {
  const problemas = [];
  const erro = (arquivo, msg) => problemas.push(`${relative(DIST, arquivo)}: ${msg}`);
  const htmls = await arquivos(DIST, (n) => n.endsWith('.html'));

  for (const arquivo of htmls) {
    const html = await readFile(arquivo, 'utf8');
    const e404 = arquivo.endsWith('404.html');
    const texto = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');

    if (!/<html lang="(pt-BR|es)">/.test(html)) erro(arquivo, 'sem lang no <html>');
    if (!/<title>[^<]{10,}<\/title>/.test(html)) erro(arquivo, 'sem <title>');
    if (!/<meta name="description" content="[^"]{50,}">/.test(html)) erro(arquivo, 'descrição ausente ou curta');
    if ((html.match(/<h1[\s>]/g) ?? []).length !== 1) erro(arquivo, 'precisa ter exatamente um <h1>');
    if (!e404) {
      if (!/<link rel="canonical"/.test(html)) erro(arquivo, 'sem canonical');
      if (!/hreflang="es"/.test(html) || !/hreflang="pt-BR"/.test(html)) erro(arquivo, 'sem hreflang PT/ES');
      if (!/property="og:image" content="https:\/\/[^"]+\.png"/.test(html)) erro(arquivo, 'sem imagem de compartilhamento');
    }
    // CSP sem 'unsafe-inline': nada de style="" nem de script inline executável.
    if (/\sstyle="/.test(html)) erro(arquivo, 'atributo style="" (bloqueado pela CSP)');
    if (/\son[a-z]+="/i.test(html)) erro(arquivo, 'evento inline (onclick=...) bloqueado pela CSP');
    for (const script of html.match(/<script(?![^>]*type="application\/ld\+json")(?![^>]*\ssrc=)[^>]*>/g) ?? []) erro(arquivo, `script inline: ${script}`);
    if (/(src|href)="http:\/\//.test(html)) erro(arquivo, 'recurso por http://');
    for (const img of html.match(/<img\b[^>]*>/g) ?? []) if (!/\salt="/.test(img)) erro(arquivo, `imagem sem alt: ${img.slice(0, 80)}`);
    for (const re of PROIBIDOS) if (re.test(texto)) erro(arquivo, `texto proibido: ${re}`);
    // RF-04: preço do iFood só na página /direto.
    if (!/\/direto\/index\.html$/.test(arquivo) && /R\$ (22,90|31,90|42,90|27,90|36,90)/.test(texto)) erro(arquivo, 'preço do iFood fora da página /direto (RF-04)');
    // Links e recursos internos precisam existir.
    for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
      const alvo = join(DIST, url.endsWith('/') ? `${url}index.html` : url);
      if (!(await existe(alvo))) erro(arquivo, `link quebrado: ${url}`);
    }
    for (const [, url] of html.matchAll(/<use href="(\/[^"#]+)#/g)) if (!(await existe(join(DIST, url)))) erro(arquivo, `ícone ausente: ${url}`);
  }

  for (const nome of ['sitemap.xml', 'robots.txt', '.htaccess', 'site.webmanifest', 'favicon.ico']) {
    if (!(await existe(join(DIST, nome)))) problemas.push(`falta ${nome}`);
  }
  // Nenhuma senha, chave ou token no que vai para o ar.
  for (const arquivo of await arquivos(DIST, (n) => /\.(html|mjs|js|css|json|txt|xml)$/.test(n))) {
    const conteudo = await readFile(arquivo, 'utf8');
    if (/(api[_-]?key|secret|senha|password|token)\s*[:=]\s*['"][^'"]{8,}/i.test(conteudo)) erro(arquivo, 'possível segredo no código publicado');
  }
  return { problemas, paginas: htmls.length };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { problemas, paginas } = await verificar();
  if (problemas.length) {
    console.error(`✗ ${problemas.length} problema(s) em ${paginas} páginas:\n- ${problemas.join('\n- ')}`);
    process.exit(1);
  }
  console.log(`✓ ${paginas} páginas conferidas: SEO, segurança, acessibilidade básica, links e regras da marca.`);
}
