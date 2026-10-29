// Gera o site estático em dist/. Sem dependências: só Node 22.
// Uso: node scripts/build.mjs
import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import { pagina } from '../src/layout.mjs';
import { IDIOMAS, rotas, caminho } from '../src/rotas.mjs';
import { paginaInicio } from '../src/paginas/inicio.mjs';
import {
  paginaCardapio, paginaGuarana, paginaSobre, paginaComoPedir, paginaDireto,
  paginaEventos, paginaPerguntas, paginaPrivacidade, paginaErro, paginaEquipe
} from '../src/paginas/internas.mjs';
import { loja } from '../conteudo/loja.mjs';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(RAIZ, 'dist');

const GERADORES = {
  inicio: paginaInicio,
  cardapio: paginaCardapio,
  guarana: paginaGuarana,
  sobre: paginaSobre,
  comoPedir: paginaComoPedir,
  direto: paginaDireto,
  eventos: paginaEventos,
  perguntas: paginaPerguntas,
  privacidade: paginaPrivacidade
};

// Arquivos JavaScript que vão para o navegador (mesma árvore relativa, para os imports funcionarem).
const JS_CLIENTE = [
  'src/cliente', 'src/lib',
  'conteudo/loja.mjs', 'conteudo/cardapio.mjs', 'conteudo/textos/monte.mjs', 'conteudo/textos/equipe.mjs'
];
const CSS = ['src/estilos/tokens.css', 'src/estilos/componentes.css', 'src/estilos/site.css'];

const hash = (conteudo) => createHash('sha256').update(conteudo).digest('hex').slice(0, 10);

async function listar(caminhoRel) {
  const abs = join(RAIZ, caminhoRel);
  const info = await stat(abs);
  if (info.isFile()) return [caminhoRel];
  const itens = await readdir(abs, { recursive: true, withFileTypes: true });
  return itens.filter((i) => i.isFile()).map((i) => relative(RAIZ, join(i.parentPath ?? i.path, i.name)));
}

async function gravar(destRel, conteudo) {
  const destino = join(DIST, destRel);
  await mkdir(dirname(destino), { recursive: true });
  await writeFile(destino, conteudo);
}

async function construirCss() {
  const partes = await Promise.all(CSS.map((f) => readFile(join(RAIZ, f), 'utf8')));
  const css = partes.join('\n');
  const nome = `/estilo/site.${hash(css)}.css`;
  await gravar(nome, css);
  return nome;
}

// Cada versão do JS vai para uma pasta com o hash do conteúdo: o cache longo nunca serve código velho.
async function construirJs() {
  const arquivos = (await Promise.all(JS_CLIENTE.map(listar))).flat().sort();
  const conteudos = await Promise.all(arquivos.map((f) => readFile(join(RAIZ, f))));
  const versao = hash(Buffer.concat(conteudos.flatMap((c, i) => [Buffer.from(arquivos[i]), c])));
  const pasta = `/js/${versao}`;
  await Promise.all(arquivos.map((f, i) => gravar(`${pasta}/${f}`, conteudos[i])));
  return pasta;
}

function sitemap() {
  const hoje = new Date().toISOString().slice(0, 10);
  const urls = rotas.flatMap((r) => IDIOMAS.map((lang) => {
    const alternativas = IDIOMAS.map((l) => `<xhtml:link rel="alternate" hreflang="${l === 'pt' ? 'pt-BR' : 'es'}" href="${loja.dominio}${caminho(l, r.id)}"/>`).join('');
    return `<url><loc>${loja.dominio}${caminho(lang, r.id)}</loc><lastmod>${hoje}</lastmod><priority>${r.prioridade}</priority>${alternativas}</url>`;
  }));
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
}

const robots = () => `User-agent: *\nAllow: /\nDisallow: /js/\nDisallow: /equipe/\n\nSitemap: ${loja.dominio}/sitemap.xml\n`;

export async function construir() {
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });
  await cp(join(RAIZ, 'publico'), DIST, { recursive: true });

  const ativos = { css: await construirCss(), js: await construirJs() };
  const geradas = [];

  for (const lang of IDIOMAS) {
    for (const r of rotas) {
      const dados = GERADORES[r.id](lang);
      const html = pagina({ lang, ativos, ...dados });
      const destino = `${caminho(lang, r.id)}index.html`;
      await gravar(destino, html);
      geradas.push(destino);
    }
  }
  // 404 em português na raiz e em espanhol em /es/404.html (o servidor usa a da raiz).
  await gravar('/404.html', pagina({ lang: 'pt', ativos, ...paginaErro('pt') }));
  await gravar('/es/404.html', pagina({ lang: 'es', ativos, ...paginaErro('es') }));
  // RF-29: área da equipe, fora do menu, do sitemap e da busca (noindex + robots).
  await gravar('/equipe/index.html', pagina({ lang: 'pt', ativos, ...paginaEquipe('pt') }));
  await gravar('/sitemap.xml', sitemap());
  await gravar('/robots.txt', robots());

  return { ativos, paginas: geradas };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const inicio = Date.now();
  const { paginas, ativos } = await construir();
  console.log(`Site gerado em dist/: ${paginas.length} páginas, CSS ${ativos.css}, JS ${ativos.js} (${Date.now() - inicio} ms)`);
}
