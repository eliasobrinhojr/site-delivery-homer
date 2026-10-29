// RF-29: troca a frase do modo equipe. Grava só o hash em conteudo/loja.mjs (a frase nunca vai para o repositório).
// Uso: npm run senha-equipe -- "frase nova da equipe"
import { readFile, writeFile } from 'node:fs/promises';
import { hashFrase, normalizarFrase } from '../src/lib/equipe.mjs';

const frase = process.argv.slice(2).join(' ');
if (normalizarFrase(frase).length < 12) {
  console.error('Use uma frase com pelo menos 12 caracteres. Ex.: npm run senha-equipe -- "copo-de-manaus-2027"');
  process.exit(1);
}
const arquivo = new URL('../conteudo/loja.mjs', import.meta.url);
const conteudo = await readFile(arquivo, 'utf8');
const novo = conteudo.replace(/(equipe: \{\s*hash: ')[0-9a-f]{64}(')/, `$1${await hashFrase(frase)}$2`);
if (novo === conteudo) { console.error('Não achei equipe.hash em conteudo/loja.mjs'); process.exit(1); }
await writeFile(arquivo, novo);
console.log('Frase da equipe trocada. Publique (PR + merge) e ative de novo os aparelhos em /equipe/.');
