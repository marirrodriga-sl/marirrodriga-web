/* Comprueba que assets/catalogo.js sigue diciendo lo mismo que Supabase y que la
   cuenta en JS da exactamente lo mismo que catalogo_cotiza().

   Uso:  node scripts/verificar-catalogo.mjs
   La huella esperada se saca de la base con:
     select md5(string_agg(slug||'|'||precio_mensual::int||'|'||coalesce(setup::int::text,'-')||'|'||
            nombre||'|'||coalesce(limite_volumen,''), ';' order by slug))
     from catalogo_piezas where publicable;
*/
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';

const require = createRequire(import.meta.url);
const { CATALOGO, cotiza, calculaSetup } = require('../assets/catalogo.js');

// Comprobado contra Supabase el 19-08 tras fijar el alta de las cuatro piezas que
// salían a 0 €. Siguen siendo 33: no se ha añadido ni retirado ninguna, solo se les
// ha puesto precio de instalación.
// OJO: la consulta del encabezado necesita «where publicable and vigente». Solo con
// «publicable» devuelve 37 piezas y una huella que no cuadra con la del generador.
/* Cambió el 10-09 al subir ficha-cliente de 25 a 35 €/mes. Replicado en
   Supabase el 13-09: la misma huella calculada sobre catalogo_piezas da este
   valor, así que base y web vuelven a coincidir.

   Cambió otra vez el 08-10 al bajar el panel dental a precio de mercado (agenda 49→35,
   ficha 24→20, odontograma 19→15, presupuestos 25→20, facturación 30→25, firma 24→15).
   Replicado en catalogo_piezas el mismo día.

   ⚠️ Base y web ya NO dan la misma huella, y no es por los precios: cuatro piezas tienen
   el nombre o el límite distintos porque se retocó el texto en la web y nunca se replicó
   en la base — canal-adicional y voz-telefono dicen «chatbot» en la base y «agente» en la
   web, y correo-respuesta-derivacion y presencia-web-landing están renombradas en la web.
   Esta huella es la de la web. Al cuadrar esos cuatro textos, volverán a coincidir.

   Cambió el 14-10-2026 al dar de alta `crm-panel` (149 €/mes, 900 € de instalación), que
   pasa a ser el producto principal de Ventas. Son 34 piezas desde hoy, no 33: es la
   primera que se AÑADE desde que existe esta comprobación, así que si esto vuelve a
   saltar por el número, mira antes si alguien ha metido una pieza sin querer. La pieza
   se creó en catalogo_piezas y de ahí salió a datos-catalogo.json, en ese orden.

   Cambió el 19-10-2026: Bookia pasa a llamarse Citia con seis piezas propias
   (citia-base, -recordatorios, -reactivacion, -informe, -ficha, -landing) y entra
   consulta-stock, añadido del seguimiento de pedidos. Son 41. Las siete piezas
   viejas de Bookia siguen: las venden las páginas de departamento. En la misma
   tanda se cuadran en la base los cuatro textos de arriba, así que esta huella
   vuelve a ser la de la web Y la de Supabase (comprobado con una simulación de
   solo lectura en la base; el SQL que la deja así está pendiente de aplicar). */
const HUELLA_ESPERADA = '80dcea0255de738095f96c7ec995dab4';
const N_ESPERADAS = 41;

let fallos = 0;
const check = (ok, etiqueta, detalle = '') => {
  console.log(`${ok ? '  OK  ' : ' FALLA'} ${etiqueta}${detalle ? ' — ' + detalle : ''}`);
  if (!ok) fallos++;
};

// ── 1. Las piezas son las mismas que en la base ───────────────────────────
const huella = createHash('md5').update(
  [...CATALOGO.piezas]
    .sort((a, b) => a.slug.localeCompare(b.slug, 'en'))
    .map(p => `${p.slug}|${p.eur}|${p.setup ?? '-'}|${p.nombre}|${p.limite ?? ''}`)
    .join(';'),
  'utf8'
).digest('hex');

check(CATALOGO.piezas.length === N_ESPERADAS, 'nº de piezas publicables', `${CATALOGO.piezas.length} de ${N_ESPERADAS}`);
check(huella === HUELLA_ESPERADA, 'huella contra Supabase', huella);

// ── 2. Ninguna pieza sin límite (la regla de oro) ─────────────────────────
const sinLimite = CATALOGO.piezas.filter(p => !p.limite);
check(sinLimite.length === 0, 'ninguna pieza sin su límite', sinLimite.map(p => p.slug).join(', ') || 'todas lo llevan');

// ── 2b. Las altas que se publican son las que dice la base ───────────────
const ALTAS = { 'iris-0': 150, 'modulo-seguimiento-pedidos': 70, 'hermes-seguimiento-presupuestos': 200,
  'hermes-acompanamiento-conversacional': 50, 'abaco-facturacion-mensaje': 200,
  'abaco-contabilidad-asistida': 650, 'abaco-gestion-documental': 300, 'presencia-web-landing': 400, 'agenda-reserva-publica': 50, 'recordatorios-confirmacion': 30, 'ficha-cliente': 100, 'captacion-leads': 600, 'canal-adicional': 30, 'voz-telefono': 100, 'correo-clasificacion': 70, 'correo-respuesta-derivacion': 70, 'correo-buzon-adicional': 30, 'correo-extraccion-crm': 100,
  // Validadas por Ismael el 19-08. Criterio: el alta ya era 2-4x la cuota en las piezas
  // de verdad, y estas cuatro se han encajado en esa horquilla.
  'reactivacion-dormidos': 40, 'insights-semanales': 50, 'panel-negocio': 150,
  'landing-conectada-bookia': 200,
  // 14-10-2026. El alta es un «desde»: 900 € cubre dos sistemas conectados, y sube con
  // cada uno que se añada. El ancla es la fase 1 de Palencia Asesores, 1.870 € con tres
  // sistemas y web incluida. Es la única pieza del catálogo cuyo alta se publica con
  // «desde» delante, y por eso lleva `desdeAlta` en datos-departamentos.cjs.
  'crm-panel': 900,
  // 16-10-2026 · Citia, por pieza. La reactivación va a 0 € a propósito.
  'citia-base': 150, 'citia-recordatorios': 30, 'citia-reactivacion': 0, 'citia-informe': 50,
  'citia-ficha': 100, 'citia-landing': 400,
  // 19-10-2026 · solo como añadido del seguimiento de pedidos
  'consulta-stock': 50 };
const altasMal = CATALOGO.piezas.filter(p => p.setup !== undefined && ALTAS[p.slug] !== p.setup);
check(altasMal.length === 0, 'las altas fijadas coinciden con la base',
      altasMal.map(p => `${p.slug}=${p.setup}`).join(', ') || `las ${Object.keys(ALTAS).length} cuadran`);

// ── 3. La cuenta da igual que en SQL: los 9 ejemplos del catálogo ─────────
const EJEMPLOS = [
  ['Peluquería mínima', 64.00, ['agenda-reserva-publica', 'iris-0']],
  ['Peluquería que empieza', 79.00, ['agenda-reserva-publica', 'iris-0', 'recordatorios-confirmacion']],
  ['Peluquería con volumen', 98.10, ['agenda-reserva-publica', 'iris-0', 'recordatorios-confirmacion', 'reactivacion-dormidos', 'insights-semanales']],
  // 232,00 recalculado en Supabase con catalogo_cotiza() el 16-08. El tramo
  // completo de Bookia paso de 185,60 a 193,60 el 10-09 al subir
  // ficha-cliente de 25 a 35: son 10 € que la bonificacion deja en 8.
  // Comprobado el 13-09 con catalogo_cotiza() en Supabase: 193,60.
  // al retirar «profesionales ilimitados» de los dos conjuntos completos.
  // Desde el 19-10 se nombran las piezas a mano: filtrar por cat === 'citas' ya
  // arrastraría también las de Citia.
  ['Negocio de citas completo', 193.60, ['agenda-reserva-publica', 'recordatorios-confirmacion', 'reactivacion-dormidos',
    'insights-semanales', 'landing-conectada-bookia', 'panel-negocio', 'ficha-cliente', 'iris-0']],
  ['Clínica dental mínima', 55.00, ['dental-agenda', 'dental-ficha-historia']],
  ['Clínica dental que empieza', 103.50, ['dental-agenda', 'dental-ficha-historia', 'dental-odontograma', 'dental-presupuestos', 'dental-facturacion']],
  ['Clínica dental con asistente', 159.20, ['dental-agenda', 'dental-ficha-historia', 'dental-odontograma', 'dental-presupuestos', 'dental-facturacion', 'dental-asistente-pacientes', 'dental-acompanamiento-presupuestos', 'dental-seguimiento-resenas', 'dental-analisis-conversaciones']],
  ['Clínica dental completa', 199.20, CATALOGO.piezas.filter(p => p.cat === 'dental').map(p => p.slug)],
  ['Tienda online (caso Fer)', 79.00, ['iris-0', 'modulo-seguimiento-pedidos']],
];

for (const [nombre, esperada, slugs] of EJEMPLOS) {
  const r = cotiza(slugs);
  check(r.cuota === esperada, `cuota · ${nombre}`, `${r.cuota} (esperada ${esperada})`);
}

// ── 4. La guarda de monotonía, que es lo fácil de romper ──────────────────
const escalera = ['dental-agenda', 'dental-ficha-historia', 'dental-odontograma', 'dental-presupuestos',
  'dental-facturacion', 'dental-asistente-pacientes', 'dental-acompanamiento-presupuestos'];
const siete = cotiza(escalera);
const ocho = cotiza([...escalera, 'dental-seguimiento-resenas']);
check(siete.cuota === 147.90, 'escalera dental · 7 piezas', String(siete.cuota));
check(ocho.cuota === 147.90 && ocho.guardaAplicada, 'escalera dental · 8 piezas no baja la factura',
  `${ocho.cuota} (sin guarda serían ${ocho.subtotal})`);

// Añadir una pieza nunca baja la cuota, en ninguna combinación acumulativa
for (const cat of ['citas', 'dental']) {
  const slugs = CATALOGO.piezas.filter(p => p.cat === cat).map(p => p.slug);
  let previa = 0, monotona = true;
  for (let i = 1; i <= slugs.length; i++) {
    const c = cotiza(slugs.slice(0, i)).cuota;
    if (c < previa) monotona = false;
    previa = c;
  }
  check(monotona, `monotonía acumulando las ${slugs.length} piezas de ${cat}`);
}

// ── 5. Suelo y setup ──────────────────────────────────────────────────────
const minima = cotiza(['agenda-reserva-publica']);
check(minima.cuota === 49 && minima.sueloAplicado, 'suelo de 49 € con una sola pieza', String(minima.cuota));

// El alta de la web es la suma de las altas de cada pieza: aquí no se venden
// soluciones preset completas, se venden configuradores.
const setupFer = calculaSetup(cotiza(['iris-0', 'modulo-seguimiento-pedidos']).piezas);
check(setupFer.total === 220, 'el alta se suma por pieza (caso Fer: 150 + 70, sin bonificación con 2)', `${setupFer.total} €`);

const chatbot = cotiza(['iris-0', 'canal-adicional', 'agenda-reserva-publica', 'recordatorios-confirmacion',
  'ficha-cliente', 'modulo-seguimiento-pedidos', 'hermes-acompanamiento-conversacional', 'voz-telefono']);
const altaChatbot = calculaSetup(chatbot.piezas);
check(altaChatbot.suma === 580 && altaChatbot.total === 467.50 && altaChatbot.guardaAplicada,
      'el alta del chatbot con todo: 580 € de suma → 467,50 € con la guarda',
      `${altaChatbot.suma} → ${altaChatbot.total}`);

// La guarda también en el alta: montar una más no puede salir más barato
let previaAlta = 0, altaMonotona = true;
const todos = ['iris-0', 'canal-adicional', 'agenda-reserva-publica', 'recordatorios-confirmacion',
  'ficha-cliente', 'modulo-seguimiento-pedidos', 'hermes-acompanamiento-conversacional', 'voz-telefono'];
for (let i = 1; i <= todos.length; i++) {
  const a = calculaSetup(cotiza(todos.slice(0, i)).piezas).total;
  if (a < previaAlta) altaMonotona = false;
  previaAlta = a;
}
check(altaMonotona, 'añadir una herramienta nunca abarata el montaje');

// ── 5. Los tramos de las páginas de solución ──────────────────────────────
// Dentia y Bookia publican cuatro tramos cada una. Las cifras salen de
// soluciones.cjs, pero si alguien mueve un precio en Supabase estas páginas
// quedan mintiendo sin que nada avise. Aquí se fija lo que deben decir.
const SOL = require('./soluciones.cjs');
const TRAMOS = {
  DENTIA: [[55, 300], [103.50, 300], [147.90, 450], [199.20, 450]],
  // Citia (antes Bookia), 16-10-2026: montaje por pieza con calculaSetup() y su guarda (19-10), sin preset.
  CITIA: [[49, 150], [60, 180], [76.50, 230], [144.50, 657]],
};
for (const [nombre, esperados] of Object.entries(TRAMOS)) {
  const reales = SOL[nombre].map(t => [t.cuota, t.alta]);
  const igual = JSON.stringify(reales) === JSON.stringify(esperados);
  check(igual, `tramos publicados de ${nombre}`,
        reales.map(([c, a]) => `${c}€+${a}`).join(' · '));
}


// Ninguna pieza que salga a la web debería enseñar 0 € de alta sin quererlo.
// Del 16 al 19-08 esta comprobación FALLABA a propósito, para que no se publicaran las
// cuatro piezas sin precio de instalación. Ya tienen precio, así que ahora debe pasar:
// lo correcto pasa de «1 FALLOS» a «0 FALLOS».
// 0 € es un alta fijada (citia-reactivacion, a propósito); lo que no vale es que falte.
const sinAlta = CATALOGO.piezas.filter(p => p.cat !== 'dental' && (p.setup === undefined || p.setup === null));
check(sinAlta.length === 0, 'ninguna pieza de la web sin alta fijada',
      sinAlta.map(p => p.slug).join(', ') || 'todas la llevan');

// ── 6. Citia: la base va siempre, y el IVA de los planes es el del céntimo exacto ──
check(SOL.CITIA.every(t => t.slugs.includes('citia-base')), 'citia-base va en los cuatro planes de Citia');
const { importeIva } = require('./iva.cjs');
const IVA_CITIA = [[10.29, 31.5], [12.6, 37.8], [16.07, 48.3], [30.35, 137.97]];
const ivaReal = SOL.CITIA.map(t => [importeIva(t.cuota), importeIva(t.alta)]);
check(JSON.stringify(ivaReal) === JSON.stringify(IVA_CITIA), 'IVA de los planes de Citia',
      ivaReal.map(([c, a]) => c + ' + ' + a).join(' · '));

// consulta-stock solo existe como añadido del seguimiento de pedidos
check(!!CATALOGO.piezas.find(p => p.slug === 'consulta-stock') && !!CATALOGO.piezas.find(p => p.slug === 'modulo-seguimiento-pedidos'),
      'consulta-stock y el seguimiento de pedidos, los dos en catálogo');

console.log(fallos ? `\n${fallos} FALLOS` : '\nTodo cuadra.');
process.exit(fallos ? 1 : 0);
