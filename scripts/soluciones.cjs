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
    alta: base === 'citia' ? null : altaPreset(base, q.nPiezas),   // Citia la pone tramoCitia()
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

/* ─── CITIA (antes Bookia) ───────────────────────────────────────────────
   16-10-2026 · Decisión de Ismael: Bookia pasa a llamarse Citia y cambia de
   modelo. Ya no es una solución preset con alta fija por tramos (250/350 €):
   son seis piezas propias, `citia-*`, cada una con su cuota y su montaje, y
   el cliente elige las que quiere. Los cuatro planes de abajo son solo las
   combinaciones más habituales, no planes cerrados.

     · CUOTA: cotiza(), igual que todo (escala por acumulación, guarda y suelo).
     · MONTAJE: calculaSetup(), el motor normal de la web: suma de los
       montajes con la misma escala y la guarda de monotonía. Añadir una pieza
       nunca baja el montaje; si el descuento lo bajaría, se queda como estaba
       (decisión de Ismael, 19-10-2026: sin excepciones para Citia).

   Las piezas viejas (agenda-reserva-publica, recordatorios-confirmacion…) NO
   se tocan: las siguen vendiendo las páginas de departamento.

   citia-base es obligatoria: va en todas las combinaciones. */
const { calculaSetup } = require('../assets/catalogo.js');

function tramoCitia(nombre, gancho, slugs, incluye) {
  if (!slugs.includes('citia-base')) throw new Error(`${nombre}: citia-base es obligatoria`);
  const t = tramo('citia', nombre, gancho, slugs, incluye);
  t.alta = calculaSetup(cotiza(slugs).piezas).total;
  return t;
}

const CITIA = [
  tramoCitia('Lo mínimo',
    'Agenda, reserva y un asistente que contesta.',
    ['citia-base'],
    ['Agenda y página de reserva sin registro', 'Asistente por WhatsApp que cierra la cita', 'Panel de negocio incluido']),

  tramoCitia('El negocio que empieza',
    'El que montamos casi siempre.',
    ['citia-base', 'citia-recordatorios'],
    ['Todo lo anterior', 'Recordatorio la víspera y hueco liberado', 'Peticiones de reseña de Google']),

  tramoCitia('Con volumen',
    'Cuando ya hay clientes que recuperar.',
    ['citia-base', 'citia-recordatorios', 'citia-reactivacion', 'citia-informe'],
    ['Todo lo anterior', 'Reactivación de clientes dormidos', 'Informe semanal por correo']),

  tramoCitia('El negocio entero',
    'Sin nada fuera.',
    ['citia-base', 'citia-recordatorios', 'citia-reactivacion', 'citia-informe', 'citia-ficha', 'citia-landing'],
    ['Todo lo anterior', 'Ficha de cliente con historial y fotos', 'Tu página web con la reserva dentro']),
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
