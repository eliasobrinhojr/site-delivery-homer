// Dados estruturados (RNF-05). Regra herdada da Draxora: só marcar o que está visível na página.
import { loja } from '../../conteudo/loja.mjs';
import { comum } from '../../conteudo/textos/comum.mjs';
import { caminho } from '../rotas.mjs';
import { tamanhos } from '../../conteudo/cardapio.mjs';
import { soDigitos } from '../lib/formato.mjs';

const DIAS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function schemaLoja(lang) {
  const horarios = Object.entries(loja.horarios).map(([dia, [abre, fecha]]) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: `https://schema.org/${DIAS[Number(dia)]}`,
    opens: abre,
    closes: fecha
  }));
  const precos = tamanhos.map((t) => t.preco);
  return {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    '@id': `${loja.dominio}/#loja`,
    name: loja.nome,
    description: comum[lang].fraseMarca,
    url: loja.dominio + caminho(lang, 'inicio'),
    logo: `${loja.dominio}/icon-512.png`,
    image: `${loja.dominio}/og/og-inicio-${lang}.png`,
    servesCuisine: lang === 'es' ? 'Guaraná batido' : 'Guaraná batido',
    priceRange: `R$ ${Math.min(...precos)}–${Math.max(...precos)}`,
    hasMenu: loja.dominio + caminho(lang, 'cardapio'),
    address: { '@type': 'PostalAddress', addressLocality: 'Florianópolis', addressRegion: 'SC', addressCountry: 'BR' },
    areaServed: loja.bairros.map((b) => ({ '@type': 'Place', name: `${b.nome}, Florianópolis` })),
    openingHoursSpecification: horarios,
    ...(loja.cnpj ? { taxID: soDigitos(loja.cnpj) } : {}),
    ...(loja.nomeEmpresarial ? { legalName: loja.nomeEmpresarial } : {}),
    ...(loja.instagram ? { sameAs: [loja.instagram] } : {})
  };
}

export function schemaSite(lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: loja.nome,
    url: loja.dominio + caminho(lang, 'inicio'),
    inLanguage: comum[lang].lang
  };
}

export function schemaFaq(itens) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: itens.map((q) => ({ '@type': 'Question', name: q.p, acceptedAnswer: { '@type': 'Answer', text: q.r } }))
  };
}
