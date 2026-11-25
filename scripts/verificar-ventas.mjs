/* Comprueba que los precios escritos en ventas-y-captacion.html (y en
   atencion-al-cliente.html, que sigue el mismo marcado) son los de
   assets/catalogo.js, la copia verificada de Supabase.

   Uso:  node scripts/verificar-ventas.mjs

   Cómo funciona: cada precio de la landing va en un elemento con
   data-pieza="slug" (precio de una pieza) o data-cotiza="slug,slug" (cuota e
   instalación de varias juntas, calculadas con cotiza() y calculaSetup()).
   Aquí se lee el texto de ese elemento y se exige que contenga las cifras
   que dice el catálogo. Si alguien mueve un precio en Supabase y regenera
   catalogo.js, esto salta antes que el cliente. */
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';

const require = createRequire(import.meta.url);
const { CATALOGO, cotiza, calculaSetup } = require('../assets/catalogo.js');
const pieza = s => CATALOGO.piezas.find(p => p.slug === s);
const PLANES = require('./datos-catalogo.json').planes || [];

let fallos = 0;
/* El recuento va global y no por página: los cinco departamentos que se
   abrieron el 09-09 venden piezas que todavía no están en el catálogo, así
   que exigirle a cada página que tenga alguna marcada saltaba en las cinco
   sin que hubiera nada roto. Lo que sí hay que garantizar es que alguna
   página contrasta, para que esto no pase en verde sin comprobar nada. */
let marcados = 0;
const check = (ok, etiqueta, detalle = '') => {
  console.log(`${ok ? '  OK  ' : ' FALLA'} ${etiqueta}${detalle ? ' — ' + detalle : ''}`);
  if (!ok) fallos++;
};
const numeros = texto => (texto.replace(/<[^>]+>/g, ' ').match(/\d+(?:[.,]\d+)?/g) || [])
  .map(n => Number(n.replace('.', '').replace(',', '.')));
const fmt = n => Number.isInteger(n) ? String(n) : n.toFixed(2).replace('.', ',');

/* Desde el 09-09 las siete landings salen del generador y su tabla de piezas
   marca con data-pieza las que existen en el catálogo, así que la
   comprobación deja de ser solo de Ventas y cubre las siete. */
for (const fichero of ['atencion-al-cliente.html', 'finanzas.html',
                       'logistica.html', 'datos-y-direccion.html', 'marketing.html',
                       'posicionamiento-online.html']) {
  const html = readFileSync(new URL('../' + fichero, import.meta.url), 'utf8');
  console.log(`\n${fichero}`);

  // data-pieza: cuota y alta de la pieza
  const re = /<[^>]+data-pieza="([^"]+)"[^>]*>([\s\S]*?)<\/div>/g;
  let m, n = 0;
  while ((m = re.exec(html))) {
    n++;
    const p = pieza(m[1]);
    if (!p) { check(false, `pieza ${m[1]}`, 'no existe en el catálogo publicable'); continue; }
    const nums = numeros(m[2]);
    check(nums.includes(p.eur) && nums.includes(p.setup), `${m[1]} · ${p.eur} €/mes + ${p.setup} €`, nums.join(' '));
  }
  marcados += n;
  if (n) check(true, 'precios contrastados con el catálogo', String(n));

  // data-cotiza: varias piezas juntas
  const rc = /<[^>]+data-cotiza="([^"]+)"[^>]*>([\s\S]*?)<\/div>/g;
  while ((m = rc.exec(html))) {
    const slugs = m[1].split(',');
    const q = cotiza(slugs);
    const a = calculaSetup(q.piezas);
    const nums = numeros(m[2]);
    check(nums.includes(q.cuota) && nums.includes(a.total),
      `juntas ${m[1]} · ${fmt(q.cuota)} €/mes + ${fmt(a.total)} €`, nums.join(' '));
  }

  // data-plan: precios cerrados (25-11-2026), contra catalogo_planes vía datos-catalogo.json
  const rp = /<(article|span)[^>]+data-plan="([^"]+)"[^>]*>([\s\S]*?)<\/\1>/g;
  while ((m = rp.exec(html))) {
    const pl = PLANES.find(x => x.slug === m[2]);
    if (!pl) { check(false, `plan ${m[2]}`, 'no está en catalogo_planes'); continue; }
    marcados++;
    const nums = numeros(m[3]);
    check(nums.includes(pl.cuota) && nums.includes(pl.alta), `plan ${m[2]} · ${pl.cuota} €/mes + ${pl.alta} €`, nums.join(' '));
  }

  // data-horquilla: el rango de los departamentos que se presupuestan (25-11-2026)
  for (const h of html.matchAll(/data-horquilla="([^"]+)"[^>]*>([\s\S]*?)<\/section>/g)) {
    // 25-11-2026: la horquilla ya no sale de las bandas: es la fijada en datos-departamentos.cjs
    const dep = require('./datos-departamentos.cjs').DEPARTAMENTOS.find(d => d.planes === h[1]);
    const nums = numeros(h[2]);
    const hq = dep && dep.horquilla;
    const esperado = hq ? [hq.cMin, hq.cMax, hq.aMin, hq.aMax] : [];
    marcados++;
    check(!!hq && esperado.every(n => nums.includes(n)), `horquilla ${h[1]} · ${esperado.join(' / ')}`, nums.slice(0, 6).join(' '));
  }

  // Ningún precio sin límite: cada data-pieza con precio de cuota lleva un data-limite hermano
  const conPrecio = [...html.matchAll(/data-pieza="([^"]+)"/g)].map(x => x[1]);
  const conLimite = new Set([...html.matchAll(/data-limite="([^"]+)"/g)].map(x => x[1]));
  const sinLimite = conPrecio.filter(s => !conLimite.has(s));
  check(sinLimite.length === 0, 'cada precio lleva su límite al lado', sinLimite.join(', ') || 'todos');

  // Nada de nombres de agente en la web (decisión 16-08)
  const agentes = html.match(/\b(IRIS|HERMES|ÁBACO|MUSA|ATLAS|SONAR)\b/g);
  check(!agentes, 'sin nombres de agente en la página', agentes ? agentes.join(', ') : 'ninguno');

  // Nada de piezas no publicables
  const noPublicables = ['iris-1', 'iris-2', 'musa-1', 'musa-2', 'atlas-1', 'atlas-2', 'atlas-3', 'atlas-4', 'atlas-5', 'sonar-1', 'abaco-verifactu'];
  const coladas = noPublicables.filter(s => html.includes(`data-pieza="${s}"`));
  check(coladas.length === 0, 'ninguna pieza no publicable con precio', coladas.join(', ') || 'ninguna');
}

console.log('');
check(marcados > 0, 'alguna página contrasta precios contra el catálogo', String(marcados));

console.log(fallos ? `\n${fallos} FALLOS` : '\nTodo cuadra.');

process.exit(fallos ? 1 : 0);
