/* Los tramos de precio de Dentia y Citia (antes Bookia), calculados — nunca escritos a mano.
   ───────────────────────────────────────────────────────────────────────────
   Las páginas de Dentia y Citia venden combinaciones hechas, no configuradores:
   el cliente elige un tramo, no marca piezas. Por eso:

     · la CUOTA la da cotiza(), igual que en todas partes (bonificación por
       acumulación, guarda de monotonía y suelo de 49 €);
     · en DENTIA el ALTA sale de la tabla `setupPreset` (300/450 € según se
       pasen o no de 5 piezas), NO de sumar altas por pieza. Citia ya no usa
       preset desde el 16-10-2026: ver más abajo.
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

/* ─── CITIA (antes Bookia) ─────────────────────────────────────────────── */
/* 03-11-2026 · Citia vuelve a planes cerrados (decisión de Ismael del 29-10, ajustada
   el 03-11: Agenda sube a 60 € + 180 € porque lleva recordatorios y reseñas, y para
   «solo las citas» queda Citia Citas a 49 € + 150 €). Ya no se suman piezas ni hay
   descuento por juntarlas: cuota y alta van fijadas aquí y en el catálogo del CRM.
   Pagando por adelantado la cuota baja un 8 % (trimestral) o un 15 % (anual). */
function planCitia(nombre, gancho, cuota, alta, nota, incluye) {
  return { nombre, gancho, cuota, alta, nota, incluye, plan: true,
           piezas: 0, bonificacion: 0, slugs: ['citia-base'] };
}

const CITIA = [
  planCitia('Citia Citas', 'Solo las citas.', 49, 150, 'Hasta 2 profesionales',
    ['Agenda y página de reserva sin registro', 'Asistente por WhatsApp que cierra la cita',
     'Ficha de cliente y analíticas básicas']),

  planCitia('Citia Agenda', 'El que montamos casi siempre.', 60, 180, 'Hasta 3 profesionales',
    ['Todo lo de Citas', 'Recordatorio antes de la cita y hueco liberado',
     'Gracias y petición de reseña de Google tras la visita', 'Reactivación de clientes que dejan de venir']),

  planCitia('Citia Clínica', 'Para consultas sanitarias.', 75, 220, 'Hasta 5 profesionales',
    ['Todo lo de Agenda', 'Historia clínica (500 pacientes activos)',
     'Informes a partir de audios (600 min/mes)', 'Consentimiento informado digital',
     'Análisis semanal con IA de las conversaciones']),

  planCitia('Citia Negocio', 'Sin nada fuera.', 120, 500, 'Sin límite de profesionales',
    ['Todo lo de Clínica, sin límite de pacientes', 'Informes a partir de audios (2.000 min/mes)',
     'Panel de negocio completo', 'Contabilidad y facturación a tus clientes']),
];

module.exports = { DENTIA, CITIA, altaPreset, tramo };

if (require.main === module) {
  const eur = n => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  for (const [n, ts] of [['DENTIA', DENTIA], ['CITIA', CITIA]]) {
    console.log(`\n=== ${n} ===`);
    for (const t of ts) {
      console.log(`  ${t.nombre.padEnd(28)} ${String(t.piezas).padStart(2)} piezas · ` +
        `suma ${eur(t.suma).padStart(7)} → cuota ${eur(t.cuota).padStart(7)} €/mes ` +
        `(−${t.bonificacion} %)${t.sueloAplicado ? ' [suelo]' : ''} · alta ${t.alta} €`);
    }
  }
}
