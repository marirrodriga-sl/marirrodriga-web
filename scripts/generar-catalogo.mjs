/* Genera assets/catalogo.js a partir de scripts/datos-catalogo.json.
   Uso: node scripts/generar-catalogo.mjs

   Existe porque el 16-08 me cargué el fichero editándolo a mano con un regex:
   se llevó 29 de las 32 piezas por delante. La cabecera decía «no editar a
   mano» y no había ninguna forma de no hacerlo. Ahora sí.

   Para actualizar los datos, sacarlos de Supabase con:
     select json_agg(json_build_object(
       'slug',slug,'nombre',nombre,'cat',categoria,'regimen',regimen,'base',base_preset,
       'eur',precio_mensual::int,'setup',setup::int,'limite',limite_volumen,
       'canales',limite_canales,'integra',limite_integraciones,'excluye',limite_excluye
     ) order by categoria, orden)
     from catalogo_piezas where publicable and vigente;
*/
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const raíz = new URL('..', import.meta.url);
const datos = JSON.parse(readFileSync(new URL('scripts/datos-catalogo.json', raíz), 'utf8'));

const huella = createHash('md5').update(
  [...datos.piezas].sort((a, b) => a.slug.localeCompare(b.slug, 'en'))
    .map(p => `${p.slug}|${p.eur}|${p.setup ?? '-'}|${p.nombre}|${p.limite ?? ''}`).join(';'),
  'utf8').digest('hex');

const txt = v => v === null || v === undefined ? 'null' : `'${String(v).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

const pieza = p => `    { slug: ${txt(p.slug)}, nombre: ${txt(p.nombre)}, cat: ${txt(p.cat)}, regimen: ${txt(p.regimen)}, base: ${txt(p.base)}, eur: ${p.eur}${p.setup !== null && p.setup !== undefined ? `, setup: ${p.setup}` : ''},
      limite: ${txt(p.limite)},
      canales: ${txt(p.canales)},
      integra: ${txt(p.integra)},
      excluye: ${txt(p.excluye)} },`;

const grupos = [
  ['citas', '── Citas y agenda · se configura sobre la solución de citas ─────────────'],
  ['dental', '── Clínica dental · no sale a la web, pero sigue en catálogo ────────────'],
  ['a_medida', '── Se construyen a medida ──────────────────────────────────────────────'],
];

const salida = `/* ═══════════════════════════════════════════════════════════════════════════
   CATÁLOGO DE PIEZAS — GENERADO, NO EDITAR A MANO
   ───────────────────────────────────────────────────────────────────────────
   Lo genera scripts/generar-catalogo.mjs desde scripts/datos-catalogo.json.
   La fuente de verdad son las tablas catalogo_* de Supabase y la función
   catalogo_cotiza(). Este fichero es su copia para que la web funcione sin
   servidor.

   Huella de las ${datos.piezas.length} piezas publicables y vigentes: ${huella}
   (md5 de slug|eur|alta|nombre|limite ordenado por slug; la comprueba
   scripts/verificar-catalogo.mjs contra lo que diga la base)

   Solo entran piezas con publicable=true y vigente=true: precio fijado,
   límite escrito y todavía en venta.
   ═════════════════════════════════════════════════════════════════════════ */

const CATALOGO = {
  generado: '${datos.generado}',
  suelo: ${datos.suelo},
  // [piezas_min, piezas_max, bonificación %]  ·  tope 20 %
  escala: ${JSON.stringify(datos.escala)},
  setupPreset: [
${datos.setupPreset.map(s => `    { base: '${s.base}', hasta: ${s.hasta}, importe: ${s.importe} },`).join('\n')}
  ],
  piezas: [
${grupos.map(([cat, rot]) => {
  const suyas = datos.piezas.filter(p => p.cat === cat);
  return !suyas.length ? '' : `    /* ${rot} */\n${suyas.map(pieza).join('\n')}`;
}).filter(Boolean).join('\n\n')}
  ],
};

/* ───────────────────────────────────────────────────────────────────────────
   LA CUENTA — es el port exacto de catalogo_cotiza() de Supabase.
   Se trabaja en céntimos con enteros: todas las piezas cuestan euros enteros,
   así que suma × (100 − bonificación) da el céntimo exacto sin coma flotante.
   ─────────────────────────────────────────────────────────────────────────── */

function bonificacionPara(n) {
  const t = CATALOGO.escala.find(([min, max]) => n >= min && (max === null || n <= max));
  return t ? t[2] : 0;
}

function cotiza(slugs) {
  const piezas = slugs.map(s => CATALOGO.piezas.find(p => p.slug === s)).filter(Boolean);
  const precios = piezas.map(p => p.eur).sort((a, b) => b - a); // caras primero
  if (!precios.length) return null;

  let suma = 0, acc = 0, centsSub = 0, bonif = 0;
  for (let k = 1; k <= precios.length; k++) {
    suma += precios[k - 1];
    bonif = bonificacionPara(k);
    centsSub = suma * (100 - bonif);          // céntimos, exacto
    acc = Math.max(centsSub, acc);            // guarda de monotonía
  }
  const suelo = CATALOGO.suelo * 100;
  return {
    piezas,
    nPiezas: precios.length,
    suma,
    bonificacion: bonif,
    subtotal: centsSub / 100,
    cuota: Math.max(acc, suelo) / 100,
    guardaAplicada: acc > centsSub,
    sueloAplicado: suelo > acc,
  };
}

// El alta también lleva bonificación por acumulación (decisión de Ismael,
// 16-08, que revierte la regla del 15-08 de que «el setup nunca la lleva»).
// Motivo: montar siete cosas de golpe comparte proyecto, alta y pruebas.
// Se usa la MISMA escala que la cuota, para no tener dos tablas distintas, y
// con la misma guarda de monotonía: añadir una herramienta no puede hacer que
// el montaje salga más barato que sin ella.
function calculaSetup(piezas) {
  const desglose = piezas.filter(p => p.setup).map(p => ({ concepto: p.nombre, importe: p.setup }));
  const importes = desglose.map(d => d.importe).sort((a, b) => b - a);
  if (!importes.length) return { total: 0, suma: 0, bonificacion: 0, desglose, guardaAplicada: false };

  let suma = 0, acc = 0, cents = 0, bonif = 0;
  for (let k = 1; k <= importes.length; k++) {
    suma += importes[k - 1];
    bonif = bonificacionPara(k);
    cents = suma * (100 - bonif);
    acc = Math.max(cents, acc);
  }
  return { total: acc / 100, suma, bonificacion: bonif, desglose, guardaAplicada: acc > cents };
}

const eur = n => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

if (typeof module !== 'undefined') module.exports = { CATALOGO, cotiza, calculaSetup, bonificacionPara, eur };
`;

writeFileSync(new URL('assets/catalogo.js', raíz), salida.replace(/\n/g, '\r\n'), 'utf8');
console.log(`assets/catalogo.js regenerado · ${datos.piezas.length} piezas · huella ${huella}`);
