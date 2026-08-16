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

const HUELLA_ESPERADA = '2eff1866c3bc8dc574dd603f532db0af';
const N_ESPERADAS = 35;

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
  'abaco-contabilidad-asistida': 650, 'abaco-gestion-documental': 300, 'presencia-web-landing': 400, 'agenda-reserva-publica': 50, 'recordatorios-confirmacion': 30, 'ficha-cliente': 100, 'captacion-leads': 600, 'canal-adicional': 30, 'voz-telefono': 100, 'correo-clasificacion': 70, 'correo-respuesta-derivacion': 70, 'correo-buzon-adicional': 30, 'correo-extraccion-crm': 100 };
const altasMal = CATALOGO.piezas.filter(p => p.setup !== undefined && ALTAS[p.slug] !== p.setup);
check(altasMal.length === 0, 'las altas fijadas el 16-08 coinciden',
      altasMal.map(p => `${p.slug}=${p.setup}`).join(', ') || 'las 8 cuadran');

// ── 3. La cuenta da igual que en SQL: los 9 ejemplos del catálogo ─────────
const EJEMPLOS = [
  ['Peluquería mínima', 64.00, ['agenda-reserva-publica', 'iris-0']],
  ['Peluquería que empieza', 79.00, ['agenda-reserva-publica', 'iris-0', 'recordatorios-confirmacion']],
  ['Peluquería con volumen', 98.10, ['agenda-reserva-publica', 'iris-0', 'recordatorios-confirmacion', 'reactivacion-dormidos', 'insights-semanales']],
  ['Negocio de citas completo', 224.80, [...CATALOGO.piezas.filter(p => p.cat === 'citas').map(p => p.slug), 'iris-0']],
  ['Clínica dental mínima', 73.00, ['dental-agenda', 'dental-ficha-historia']],
  ['Clínica dental que empieza', 132.30, ['dental-agenda', 'dental-ficha-historia', 'dental-odontograma', 'dental-presupuestos', 'dental-facturacion']],
  ['Clínica dental con asistente', 184.80, ['dental-agenda', 'dental-ficha-historia', 'dental-odontograma', 'dental-presupuestos', 'dental-facturacion', 'dental-asistente-pacientes', 'dental-acompanamiento-presupuestos', 'dental-seguimiento-resenas', 'dental-analisis-conversaciones']],
  ['Clínica dental completa', 271.20, CATALOGO.piezas.filter(p => p.cat === 'dental').map(p => p.slug)],
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
check(siete.cuota === 175.10, 'escalera dental · 7 piezas', String(siete.cuota));
check(ocho.cuota === 175.10 && ocho.guardaAplicada, 'escalera dental · 8 piezas no baja la factura',
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

// ⚠️ Ninguna pieza que salga a la web debería enseñar 0 € de alta sin quererlo
const sinAlta = CATALOGO.piezas.filter(p => p.cat !== 'dental' && !p.setup);
check(sinAlta.length === 0, 'ninguna pieza de la web sin alta fijada',
      sinAlta.map(p => p.slug).join(', ') || 'todas la llevan');

console.log(fallos ? `\n${fallos} FALLOS` : '\nTodo cuadra.');
process.exit(fallos ? 1 : 0);
