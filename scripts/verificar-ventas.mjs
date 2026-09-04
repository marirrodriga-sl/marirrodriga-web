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

let fallos = 0;
const check = (ok, etiqueta, detalle = '') => {
  console.log(`${ok ? '  OK  ' : ' FALLA'} ${etiqueta}${detalle ? ' — ' + detalle : ''}`);
  if (!ok) fallos++;
};
const numeros = texto => (texto.replace(/<[^>]+>/g, ' ').match(/\d+(?:[.,]\d+)?/g) || [])
  .map(n => Number(n.replace('.', '').replace(',', '.')));
const fmt = n => Number.isInteger(n) ? String(n) : n.toFixed(2).replace('.', ',');

for (const fichero of ['ventas-y-captacion.html']) {
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
  check(n > 0, 'hay precios marcados con data-pieza', String(n));

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

console.log(fallos ? `\n${fallos} FALLOS` : '\nTodo cuadra.');
process.exit(fallos ? 1 : 0);
