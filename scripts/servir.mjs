// Servidor local para ver o site em dist/ (http://localhost:4321). Só para desenvolvimento.
// Aplica os mesmos cabeçalhos de segurança do publico/.htaccess, para os problemas aparecerem aqui primeiro.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const PORTA = Number(process.env.PORTA ?? 4321);

const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json', '.json': 'application/json', '.webp': 'image/webp'
};

export const CSP = [
  "default-src 'self'", "img-src 'self' data:", "style-src 'self'", "script-src 'self'", "font-src 'self'",
  "connect-src 'self'", "manifest-src 'self'", "frame-ancestors 'none'", "base-uri 'self'", "form-action 'self'", "object-src 'none'"
].join('; ');

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let arquivo = normalize(join(DIST, decodeURIComponent(url.pathname)));
  if (!arquivo.startsWith(DIST)) { res.writeHead(403).end(); return; }
  try {
    if ((await stat(arquivo)).isDirectory()) arquivo = join(arquivo, 'index.html');
    const corpo = await readFile(arquivo);
    res.writeHead(200, {
      'Content-Type': TIPOS[extname(arquivo)] ?? 'application/octet-stream',
      'Content-Security-Policy': CSP,
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    });
    res.end(corpo);
  } catch {
    const pagina404 = await readFile(join(DIST, url.pathname.startsWith('/es/') ? 'es/404.html' : '404.html')).catch(() => 'Não encontrado');
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8', 'Content-Security-Policy': CSP }).end(pagina404);
  }
}).listen(PORTA, () => console.log(`Site em http://localhost:${PORTA}`));
