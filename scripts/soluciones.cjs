/* Los tramos de precio de Dentia y Bookia, calculados — nunca escritos a mano.
   ───────────────────────────────────────────────────────────────────────────
   Las páginas de Dentia y Bookia venden SOLUCIONES PRESET, no configuradores:
   el cliente elige un tramo, no marca piezas. Por eso:

     · la CUOTA la da cotiza(), igual que en todas partes (bonificación por
       acumulación, guarda de monotonía y suelo de 49 €);
     · el ALTA sale de la tabla `setupPreset` (Bookia 250/350 €, Dentia
       300/450 € según se pasen o no de 5 piezas), NO de sumar altas por pieza.
       Las 11 piezas dentales no tienen alta propia justamente porque su alta
       es por solución montada.

   Se usa desde generar-paginas.mjs y lo comprueba verificar-catalogo.mjs, así
   que si alguien mueve un precio en Supabase, las páginas y el test saltan a la vez.
*/
const { CATALOGO, cotiza } = require('../assets/catalogo.js');

function altaPreset(base, nPiezas) {
  const tramos = CATALOGO.setupPreset.filter(t => t.base === base);
  const t = tramos.find(t => t.hasta !== null && nPiezas <= t.hasta)
         || tramos.find(t => t.hasta === null);
  return t.importe;
}

function tramo(base, nombre, gancho, slugs, incluye) {
  const q = cotiza(slugs);
  if (!q) throw new Error(`tramo sin piezas: ${nombre}`);
  return {
    nombre, gancho, slugs, incluye,
    piezas: q.nPiezas,
    suma: q.suma,
    cuota: q.cuota,
    bonificacion: q.suma ? Math.round((1 - q.cuota / q.suma) * 1000) / 10 : 0,
    sueloAplicado: q.sueloAplicado,
    alta: altaPreset(base, q.nPiezas),
  };
}

/* ─── DENTIA ─────────────────────────────────────────────────────────────
   Los cuatro tramos son los ejemplos que ya están verificados contra
   catalogo_cotiza() en Supabase: 73 · 132,30 · 184,80 · 232 €/mes. */
const DENTIA = [
  tramo('dentia', 'Lo mínimo',
    'Para dejar de llevar la agenda en papel.',
    ['dental-agenda', 'dental-ficha-historia'],
    ['Agenda con reserva online y recordatorios', 'Ficha de paciente con su historia clínica']),

  tramo('dentia', 'La clínica que empieza',
    'La que montamos casi siempre.',
    ['dental-agenda', 'dental-ficha-historia', 'dental-odontograma',
     'dental-presupuestos', 'dental-facturacion'],
    ['Todo lo anterior', 'Odontograma', 'Presupuestos', 'Facturación']),

  tramo('dentia', 'Con asistente de pacientes',
    'Cuando el teléfono no para.',
    ['dental-agenda', 'dental-ficha-historia', 'dental-odontograma',
     'dental-presupuestos', 'dental-facturacion', 'dental-asistente-pacientes',
     'dental-acompanamiento-presupuestos', 'dental-seguimiento-resenas'],
    ['Todo lo anterior', 'Asistente de pacientes por WhatsApp',
     'Seguimiento de presupuestos', 'Peticiones de reseña']),

  tramo('dentia', 'La clínica entera',
    'Sin nada fuera.',
    CATALOGO.piezas.filter(p => p.cat === 'dental').map(p => p.slug),
    ['Todo lo anterior', 'Contabilidad asistida', 'Firma digital de consentimientos',
     'Análisis de conversaciones']),
];

/* ─── BOOKIA ─────────────────────────────────────────────────────────────
   Mismos ejemplos verificados: 64 · 79 · 98,10 · 185,60 €/mes.
   Llevan `iris-0` porque el chatbot va dentro del producto de citas. */
const BOOKIA = [
  tramo('bookia', 'Lo mínimo',
    'Agenda y un asistente que contesta.',
    ['agenda-reserva-publica', 'iris-0'],
    ['Agenda y página de reserva pública', 'Asistente que contesta y reserva']),

  tramo('bookia', 'El negocio que empieza',
    'El que montamos casi siempre.',
    ['agenda-reserva-publica', 'iris-0', 'recordatorios-confirmacion'],
    ['Todo lo anterior', 'Recordatorios anti no-show', 'Peticiones de reseña']),

  tramo('bookia', 'Con volumen',
    'Cuando ya hay clientes que recuperar.',
    ['agenda-reserva-publica', 'iris-0', 'recordatorios-confirmacion',
     'reactivacion-dormidos', 'insights-semanales'],
    ['Todo lo anterior', 'Reactivación de clientes dormidos', 'Informe semanal']),

  tramo('bookia', 'El negocio entero',
    'Sin nada fuera.',
    [...CATALOGO.piezas.filter(p => p.cat === 'citas').map(p => p.slug), 'iris-0'],
    ['Todo lo anterior', 'Ficha de cliente', 'Panel de negocio', 'Tu página web conectada']),
];

module.exports = { DENTIA, BOOKIA, altaPreset, tramo };

if (require.main === module) {
  const eur = n => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  for (const [n, ts] of [['DENTIA', DENTIA], ['BOOKIA', BOOKIA]]) {
    console.log(`\n=== ${n} ===`);
    for (const t of ts) {
      console.log(`  ${t.nombre.padEnd(28)} ${String(t.piezas).padStart(2)} piezas · ` +
        `suma ${eur(t.suma).padStart(7)} → cuota ${eur(t.cuota).padStart(7)} €/mes ` +
        `(−${t.bonificacion} %)${t.sueloAplicado ? ' [suelo]' : ''} · alta ${t.alta} €`);
    }
  }
}
