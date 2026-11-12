/* Genera /agentes: nuestros agentes, uno por departamento, y los programas.

   Uso:  node scripts/generar-agentes.cjs

   Decidido el 11-11-2026. Primero iba a ser un catálogo de productos filtrable;
   Ismael lo cambió a «nuestros agentes»: enseñar lo que sabemos montar, en
   registro de consultora, no un estante. Reglas:
   - Un agente por DEPARTAMENTO, que lleva el departamento entero (lo que en
     las páginas de departamento es el pack). Nada que no exista.
   - Con su «desde» de precio: filtra, y es lo que pide quien llega de anuncios.
   - Las piezas sueltas NO salen aquí hasta revisar sus precios.
   - Agentes por SECTOR (p. ej. distribuidoras) solo cuando haya uno montado.

   Los precios y las piezas NO se escriben aquí: se leen de los mismos datos que
   las páginas de departamento y de producto.

   ⚠️ NO EDITAR agentes.html A MANO.
*/
const fs = require('node:fs');
const path = require('node:path');
const { DEPARTAMENTOS } = require('./datos-departamentos.cjs');
const { DENTIA } = require('./datos-soluciones.cjs');
const SOL = require('./soluciones.cjs');
const { nav, cierre, pie, esc, migas } = require('./generar-paginas.cjs');
const { euros, lineaIva } = require('./iva.cjs');

const raiz = path.join(__dirname, '..');
const BASE = 'https://www.marirrodriga-ia.com';

const P = {
  archivo: 'agentes.html',
  ruta: '/agentes',
  titulo: 'Agentes de IA para cada departamento de tu empresa | Marirrodriga IA',
  descripcion: 'Agentes de IA que llevan un departamento entero o automatizan sus tareas repetitivas: atención, ventas, finanzas, logística, datos, marketing y SEO.',
  /* 12-11-2026: «Qué hacemos», no «Productos». La página no es un estante:
     enseña lo que montamos para que se entienda el trabajo, y lleva al
     diagnóstico, que es lo que de verdad queremos que pidan. */
  h1: 'Qué hacemos',
  lead: 'Montamos el departamento entero con agentes de IA, o automatizamos las tareas repetitivas dentro de él. Estos son los siete que más montamos: dales la vuelta para ver qué hace cada uno. Cuál necesita tu empresa no se elige en una lista: se ve en el diagnóstico.',
};

/* El texto de cada carta (12-11-2026). Se escribe aquí y NO se saca del pack
   de la página del departamento: aquel se lee con la página alrededor («las
   siete piezas», «la misma cabeza detrás») y en una carta suelta no se
   entiende. Reglas: qué hace, en verbos; solo lo que vende su página; y el
   «desde» tiene que estar dentro de lo que cuenta (Ventas empieza en el CRM,
   así que el CRM sale en el texto). */
const CARTA = {
  '/atencion-al-cliente': {
    texto: 'Contesta por WhatsApp, Instagram o el chat de tu web a cualquier hora, mira tu agenda y cierra la cita él mismo. Y en el correo, ordena lo que entra y lo reparte.',
    entra: ['WhatsApp e Instagram', 'El chat de tu web', 'Tu bandeja de correo'],
    sale: ['Contestado a cualquier hora', 'La cita, cerrada', 'Lo que no le toca, en tus manos'],
    tareas: ['Reserva, cambia y cancela en tu agenda real', 'Recuerda la cita la víspera', 'Pide la reseña si la visita fue bien'],
  },
  '/ventas-y-captacion': {
    texto: 'Una ficha por cliente con todo lo hablado, que se rellena sola. Y encima: busca clientes nuevos, sigue cada presupuesto y recupera a los que dejaron de venir.',
    entra: ['Tu sector y tu zona', 'Los presupuestos que mandas', 'Los que dejaron de venir'],
    sale: ['A quién llamar, y por qué', 'Ningún presupuesto sin seguir', 'Los dormidos, de vuelta'],
    tareas: ['Busca empresas que encajan y las puntúa', 'Escribe a los días justos tras el presupuesto', 'Vuelve a escribir al que no viene'],
  },
  '/finanzas': {
    texto: 'Hace la factura cuando se la pides por WhatsApp, persigue lo vencido, reclama los papeles que faltan y te explica tu dinero: qué vas a cobrar y cuánto te falta para cubrir el mes.',
    entra: ['Las facturas que emites', 'Las que te llegan', 'Los vencimientos'],
    sale: ['Facturado sin abrir el programa', 'Cobrado sin perseguir tú', 'Las cuentas, explicadas'],
    tareas: ['Hace y envía la factura desde un mensaje', 'Reclama lo vencido y te deja solo lo difícil', 'Pide a cada cliente los papeles que faltan'],
  },
  '/logistica': {
    texto: 'Saca al transportista la fecha real de cada envío, avisa a tu cliente antes de que pregunte, cuadra las citas de carga y lleva cada incidencia hasta cerrarla.',
    entra: ['Los pedidos que salen', 'Los transportistas', 'Lo que se tuerce'],
    sale: ['La fecha real, sabida', 'El cliente, avisado', 'La incidencia, cerrada'],
    tareas: ['Pide la fecha al transportista y la apunta', 'Avisa al cliente de la fecha, y si cambia', 'Abre el parte de la incidencia y lo persigue'],
  },
  '/datos-y-direccion': {
    texto: 'Junta en un sitio tu facturación, tu agenda y tus conversaciones, te explica en cristiano por qué ha ido así el mes y te avisa cuando algo se tuerce.',
    entra: ['Tu facturación', 'Tu agenda', 'Tus conversaciones'],
    sale: ['El panel al día', 'El porqué del mes', 'El aviso cuando algo cambia'],
    tareas: ['Cruza tus datos en un solo panel', 'Contesta a «¿por qué ha bajado octubre?»', 'Te manda el lunes un correo con la semana'],
  },
  '/marketing': {
    texto: 'Escribe y publica con tu voz, hace fotos y vídeos cortos con tu marca para Instagram, Facebook o LinkedIn y monta campañas enteras con su calendario. Nada sale sin que lo veas.',
    entra: ['Lo que pasa en tu negocio', 'Tu identidad de marca', 'El calendario del mes'],
    sale: ['Publicado, con tu voz', 'Fotos y vídeos con tu marca', 'La campaña, entera'],
    tareas: ['Publica en LinkedIn a partir de lo que te pasa', 'Hace vídeos verticales para reels y stories', 'Monta campañas de varias semanas'],
  },
  '/posicionamiento-online': {
    texto: 'Una web que llevamos nosotros, páginas que te sacan en Google por lo que haces y dónde, tu ficha de Google al día y las reseñas pedidas y contestadas.',
    entra: ['Quien te busca en Google', 'Quien termina una cita', 'Tu web de hoy'],
    sale: ['Te encuentran', 'La ficha, al día', 'Las reseñas, pedidas y contestadas'],
    tareas: ['Una página por cada búsqueda de tu sector', 'Mantiene tu ficha de Google al día', 'Pregunta qué tal fue antes de pedir la reseña'],
  },
};

/* La foto de cada carta: la cabecera de su página de departamento, recortada
   a 800×600 en assets/img/agentes/ (pesa ~40 KB en vez de ~400). */
const FOTO = {
  '/atencion-al-cliente': 'atencion', '/ventas-y-captacion': 'ventas', '/finanzas': 'finanzas',
  '/logistica': 'logistica', '/datos-y-direccion': 'datos', '/marketing': 'marketing',
  '/posicionamiento-online': 'posicionamiento',
};

/* El «desde» de la carta es el MISMO que anuncia la página del departamento
   en su descripción (11-11-2026: Ismael quitó el de la cuota del pack entero,
   144 €, porque el agente empieza en 49). */
const desdeDe = d => Number(d.descripcion.match(/Desde (\d+) €\/mes/)[1]);

const AGENTES = DEPARTAMENTOS.map(d => ({
  nombre: 'Agente de ' + d.pill,
  foto: '/assets/img/agentes/' + FOTO[d.ruta] + '.jpg',
  desde: desdeDe(d),
  ruta: d.ruta,
  ...CARTA[d.ruta],
}));
for (const a of AGENTES) if (!a.texto) throw new Error('Falta el texto de la carta de ' + a.ruta);

const PROGRAMAS = [
  { nombre: 'Citia', ruta: '/citia', cuota: SOL.CITIA[0].cuota,
    texto: 'Software de citas: agenda, reserva online sin registro y recordatorios contra el hueco vacío. Para peluquería, estética, uñas, tatuajes, fisioterapia y podología.' },
  { nombre: 'Dentia', ruta: '/dentia', cuota: Number(DENTIA.descripcion.match(/Desde (\d+) €\/mes/)[1]),
    texto: 'Para clínicas dentales: agenda, ficha de paciente, odontograma, presupuestos y facturación, con un asistente que contesta por WhatsApp.' },
];

const iva = n => lineaIva(n, { corto: true, clase: 'ag-iva' });
const lista = xs => `<ul>${xs.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;

/* Carta que gira (11-11-2026). Delante: foto y nombre. Detrás: el resumen y
   el botón a la página del departamento. La cara que no se ve va con `inert`
   para que el teclado y los lectores de pantalla no entren en ella. */
const agente = (a, i) => {
  const id = 'ag-' + a.ruta.slice(1);
  return `<article class="ag-carta" aria-labelledby="${id}">
        <div class="ag-carta-in">
          <div class="ag-cara ag-frente">
            <img src="${a.foto}" alt="" width="800" height="600" loading="${i < 3 ? 'eager' : 'lazy'}">
            <div class="ag-frente-pie">
              <h3 id="${id}">${esc(a.nombre)}</h3>
              <button type="button" class="ag-girar" aria-label="Ver resumen del ${esc(a.nombre)}">Ver resumen</button>
            </div>
          </div>
          <div class="ag-cara ag-dorso" inert>
            <p class="ag-dorso-nombre">${esc(a.nombre)}</p>
            <p class="ag-texto">${esc(a.texto)}</p>
            <div class="ag-flujo">
              <div><h4>Le entra</h4>${lista(a.entra)}</div>
              <div><h4>Te devuelve</h4>${lista(a.sale)}</div>
            </div>
            <div class="ag-tareas">
              <h4>Lo que hace</h4>
              ${lista(a.tareas)}
            </div>
            <p class="ag-precio">Desde ${euros(a.desde)} €/mes ${iva(a.desde)}</p>
            <div class="ag-dorso-botones">
              <a class="btn btn-1 ag-detalle" href="${a.ruta}">Ver detalles y precio</a>
              <button type="button" class="ag-volver">Volver</button>
            </div>
          </div>
        </div>
      </article>`;
};

const programa = p => `<a class="ag-prog" href="${p.ruta}">
        <h3>${esc(p.nombre)}</h3>
        <p>${esc(p.texto)}</p>
        <span class="ag-precio">Desde ${euros(p.cuota)} €/mes ${iva(p.cuota)}</span>
      </a>`;

const ld = [
  migas([['Inicio', '/'], ['Qué hacemos', P.ruta]]),
  { '@context': 'https://schema.org', '@type': 'ItemList', name: P.h1,
    itemListElement: [...AGENTES, ...PROGRAMAS].map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.nombre, url: BASE + p.ruta })) },
];

const html = `<!DOCTYPE html>
<html lang="es">
<!-- ==========================================================================
     GENERADO por scripts/generar-agentes.cjs — NO EDITAR A MANO.
     ========================================================================== -->
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(P.titulo)}</title>
  <meta name="description" content="${esc(P.descripcion)}">
  <link rel="canonical" href="${BASE}${P.ruta}">
  <meta name="theme-color" content="#7C3AED">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Marirrodriga IA">
  <meta property="og:title" content="${esc(P.h1)} · Marirrodriga IA">
  <meta property="og:description" content="${esc(P.descripcion)}">
  <meta property="og:url" content="${BASE}${P.ruta}">
  <meta property="og:image" content="${BASE}/og-image.png">
  <meta property="og:locale" content="es_ES">
  <meta name="twitter:card" content="summary_large_image">
${ld.map(j => `
  <script type="application/ld+json">
${JSON.stringify(j, null, 2)}
  </script>`).join('\n')}

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/base.css?v=20261112c">
  <link rel="stylesheet" href="/assets/agentes.css">
</head>
<body>

${nav([])}

<main class="ag">
  <header class="ag-cab">
    <div class="ag-ancho">
      <h1>${esc(P.h1)}</h1>
      <p>${esc(P.lead)}</p>
      <a class="btn btn-1 ag-cab-btn" href="/#solicitar">Pedir el diagnóstico gratis</a>
    </div>
  </header>

  <section class="ag-sec">
    <div class="ag-ancho">
      <div class="ag-rejilla">
      ${AGENTES.map(agente).join('\n      ')}
      </div>
    </div>
  </section>

  <section class="ag-sec ag-sec-blanca">
    <div class="ag-ancho">
      <div class="ag-marco">
        <h2>Programas con precio cerrado</h2>
        <p>Para negocios de citas y clínicas dentales: listos para usar, sin proyecto.</p>
      </div>
      <div class="ag-progs">
      ${PROGRAMAS.map(programa).join('\n      ')}
      </div>
    </div>
  </section>

  <section class="ag-sec">
    <div class="ag-ancho">
      <div class="ag-aviso">
        <h2>¿Por qué departamento empezar?</h2>
        <p>Si sois de 5 a 50 personas, empieza por el diagnóstico: hasta tres sesiones en tu empresa y un informe con lo que se puede automatizar, cuántas horas son y lo que cuesta.</p>
        <a class="btn btn-1" href="/#solicitar">Pedir el diagnóstico gratis</a>
      </div>
    </div>
  </section>
</main>

${cierre(P)}

${pie()}

<script>
  /* Girar las cartas. La cara oculta lleva inert; el foco pasa a la otra cara
     para que con teclado se siga el giro. */
  (function () {
    function girar(carta, aDorso) {
      carta.classList.toggle('girada', aDorso);
      var frente = carta.querySelector('.ag-frente'), dorso = carta.querySelector('.ag-dorso');
      frente.inert = aDorso; dorso.inert = !aDorso;
      (aDorso ? dorso.querySelector('.ag-detalle') : frente.querySelector('.ag-girar')).focus({ preventScroll: true });
    }
    document.addEventListener('click', function (e) {
      var b = e.target.closest('.ag-girar, .ag-volver'); if (!b) return;
      girar(b.closest('.ag-carta'), b.classList.contains('ag-girar'));
    });
  })();
</script>
<script defer src="/assets/nav.js"></script>
<script defer src="/assets/plazas.js"></script>
<script defer src="/assets/origen.js"></script>
<script defer src="/_vercel/insights/script.js"></script>
</body>
</html>
`;

if (require.main === module) {
  fs.writeFileSync(path.join(raiz, P.archivo), html, { encoding: 'utf8' });
  console.log('  ' + P.archivo + ' · ' + AGENTES.length + ' agentes y ' + PROGRAMAS.length + ' programas');
}
