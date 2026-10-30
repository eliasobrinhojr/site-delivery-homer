// Gera as imagens de prévia (1200 × 630) de cada página, em PT e ES, em publico/og/ (RNF-06).
// Usa o Playwright (Chromium) só nesta máquina de desenvolvimento: npx playwright install chromium.
// Mesmo layout do kit do designer: lado Creme com logo e título, lado Vermelho com o copo.
import { createRequire } from 'node:module';
import { mkdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { comum } from '../conteudo/textos/comum.mjs';

const RAIZ = fileURLToPath(new URL('..', import.meta.url));
const PUBLICO = join(RAIZ, 'publico');

let chromium;
try {
  ({ chromium } = createRequire(import.meta.url)('playwright'));
} catch {
  console.error('Playwright não encontrado. Instale com: npm i -D playwright && npx playwright install chromium');
  process.exit(1);
}

const PECAS = {
  pt: {
    padrao: ['O guaraná batido mais cremoso da Ilha', 'Feito na hora, com guaraná em pó do Amazonas. Preço estimado: a partir de R$ 17.'],
    inicio: ['Guaraná do Amazonas, batido na Ilha', 'Em Manaus, tem carrinho na rua só para este copo. Preço estimado: a partir de R$ 17.'],
    cardapio: ['Cardápio', 'Tradicional, Abacate e Banana. 300, 500 e 700 ml. Modo Turbo.'],
    'o-guarana': ['O guaraná', 'Um copo do Amazonas, batido aqui na Ilha.'],
    sobre: ['Uma família do Norte que escolheu a Ilha', 'De Manaus para Florianópolis, com a receita do Homer.'],
    'como-pedir': ['Como pedir', 'Pelo WhatsApp, com Pix antes do preparo, em até 40 minutos.'],
    direto: ['Peça direto e pague menos', '500 ml por R$ 24 aqui. No iFood, R$ 31,90.'],
    eventos: ['Eventos e empresas', 'Guaraná batido para muita gente, com hora marcada.'],
    perguntas: ['Perguntas frequentes', 'Cafeína, alergênicos, entrega e pagamento.'],
    privacidade: ['Privacidade', 'Como cuidamos dos seus dados.']
  },
  es: {
    padrao: ['El guaraná batido más cremoso de la Isla', 'Hecho en el momento, con guaraná en polvo del Amazonas. Precio estimado: desde R$ 17.'],
    inicio: ['Guaraná del Amazonas, batido en la Isla', 'En Manaos hay carritos en la calle solo para este vaso. Precio estimado: desde R$ 17.'],
    cardapio: ['Menú', 'Tradicional, Palta y Banana. 300, 500 y 700 ml. Modo Turbo.'],
    'o-guarana': ['El guaraná', 'Un vaso del Amazonas, batido acá en la Isla.'],
    sobre: ['Una familia del norte que eligió la Isla', 'De Manaos a Florianópolis, con la receta de Homer.'],
    'como-pedir': ['Cómo pedir', 'Por WhatsApp, con Pix antes de la preparación, en hasta 40 minutos.'],
    direto: ['Pedí directo y pagá menos', '500 ml por R$ 24 acá. En iFood, R$ 31,90.'],
    eventos: ['Eventos y empresas', 'Guaraná batido para mucha gente, con horario acordado.'],
    perguntas: ['Preguntas frecuentes', 'Cafeína, alérgenos, envío y pago.'],
    privacidade: ['Privacidad', 'Cómo cuidamos tus datos.']
  }
};

const dataUri = async (arquivo, tipo) => `data:${tipo};base64,${(await readFile(join(PUBLICO, arquivo))).toString('base64')}`;

const fontes = {
  baloo: await dataUri('fontes/baloo2-800.woff', 'font/woff'),
  n700: await dataUri('fontes/nunitosans-700.woff', 'font/woff'),
  n800: await dataUri('fontes/nunitosans-800.woff', 'font/woff'),
  n400: await dataUri('fontes/nunitosans-400.woff', 'font/woff')
};
const logo = await dataUri('marca/logo-linha.svg', 'image/svg+xml');
const copo = await dataUri('marca/copo-provisorio.svg', 'image/svg+xml');

const html = (titulo, texto, lang) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:B;src:url(${fontes.baloo});font-weight:800}
@font-face{font-family:N;src:url(${fontes.n400});font-weight:400}
@font-face{font-family:N;src:url(${fontes.n700});font-weight:700}
@font-face{font-family:N;src:url(${fontes.n800});font-weight:800}
*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;display:grid;grid-template-columns:800px 400px;font-family:N}
.l{background:#F5E9D6;padding:56px 64px;display:flex;flex-direction:column}
.l img{height:52px;align-self:flex-start}
h1{font:800 64px/1.02 B;color:#B5252B;margin:auto 0 18px;letter-spacing:-.01em}
p{font:400 28px/1.35 N;color:#2B1B17;margin:0}
.r{background:#B5252B;position:relative;display:grid;place-items:center}
.r img{width:210px}
.s{position:absolute;top:32px;left:32px;background:#2E5E3E;color:#FFFDF8;font:800 16px N;letter-spacing:.12em;padding:8px 16px;border-radius:999px}
.f{display:flex;justify-content:space-between;margin-top:auto;padding-top:28px;font:800 20px N;color:#B5252B}.f span:last-child{color:#2B1B17}
</style></head><body><div class="l"><img src="${logo}" alt=""><h1>${titulo}</h1><p>${texto}</p>
<div class="f"><span>dohomer.com.br</span><span>${comum[lang].areaCurta.split(' · ')[0]}</span></div></div>
<div class="r"><span class="s">${comum[lang].deMaues.toUpperCase()}</span><img src="${copo}" alt=""></div></body></html>`;

await mkdir(join(PUBLICO, 'og'), { recursive: true });
const navegador = await chromium.launch();
const pagina = await navegador.newPage({ viewport: { width: 1200, height: 630 } });
let total = 0;
for (const [lang, pecas] of Object.entries(PECAS)) {
  for (const [nome, [titulo, texto]] of Object.entries(pecas)) {
    await pagina.setContent(html(titulo, texto, lang), { waitUntil: 'load' });
    await pagina.evaluate(() => document.fonts.ready);
    await pagina.screenshot({ path: join(PUBLICO, 'og', `og-${nome}-${lang}.png`) });
    total += 1;
  }
}
await navegador.close();
console.log(`${total} imagens de prévia geradas em publico/og/`);
