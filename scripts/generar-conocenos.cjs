/* Genera /conocenos: quiénes somos, por qué en Palencia y lo que hemos montado.

   Uso:  node scripts/generar-conocenos.cjs

   Decidido el 12-11-2026 con Ismael. Reglas:
   - Solo proyectos NUESTROS. Los de clientes (Pedro, Fer) tienen cláusula de
     confidencialidad firmada: no salen aquí sin su permiso por escrito.
   - Nada de cifras de la ciudad sin fuente.

   ⚠️ NO EDITAR conocenos.html A MANO.
*/
const fs = require('node:fs');
const path = require('node:path');
const { nav, cierre, pie, esc, migas } = require('./generar-paginas.cjs');

const raiz = path.join(__dirname, '..');
const BASE = 'https://www.marirrodriga-ia.com';

const P = {
  archivo: 'conocenos.html',
  ruta: '/conocenos',
  titulo: 'Conócenos: una agencia de IA nacida en Palencia | Marirrodriga IA',
  descripcion: 'Dos hermanos de Palencia: Ismael, experto en IA y graduado en Derecho, y Marco, desarrollador full-stack. IA para que el negocio de aquí siga compitiendo.',
  h1: 'Conócenos',
  lead: 'Somos dos hermanos de Palencia. Montamos la agencia para que los negocios de aquí, los que siguen abiertos, tengan las mismas herramientas que una gran empresa y puedan seguir compitiendo.',
};

const PERSONAS = [
  {
    nombre: 'Ismael Marirrodriga',
    foto: '/assets/img/isma.jpg',
    papel: 'Diagnóstico, automatizaciones y agentes de IA',
    titulos: ['Desarrollador de software y automatizaciones', 'Experto en IA generativa, automatización y creación de SaaS', 'Grado en Derecho'],
    texto: [
      'Hace los diagnósticos: se sienta contigo, habla con tu equipo y mira cómo se trabaja de verdad. Después monta los agentes, los flujos y las conexiones con los programas que ya usáis.',
      'El Derecho no es un adorno: es la razón de que los contratos, el RGPD y los datos de tus clientes se miren con lupa antes de automatizar nada.',
    ],
  },
  {
    nombre: 'Marco Marirrodriga',
    foto: '/assets/img/marco.jpg',
    papel: 'Desarrollo de software',
    titulos: ['Desarrollador full-stack'],
    texto: [
      'Escribe el código: las aplicaciones, los paneles, las bases de datos y las conexiones entre programas que no se hablan entre sí.',
      'Cuando una automatización necesita una pantalla propia —un CRM, una agenda, una ficha de paciente—, la construye él.',
    ],
  },
];

/* 12-11-2026, lista de Ismael. Hay casos de clientes (Pedro, Fer): sus
   contratos firmados obligan a guardar la información comercial, técnica y de
   negocio, así que van SIN nombre, SIN sector reconocible y SIN cifras —se
   cuenta el tipo de trabajo, no el cliente—. Ojo: el borrador de Palencia
   Asesores prohíbe incluso lo anonimizado; si lo firma, su caso no sale aquí. */
const SISTEMA = {
  nombre: 'El sistema completo de la agencia',
  texto: 'Lo que usamos nosotros cada día, de punta a punta: capta clientes por varios canales, los puntúa con el motivo escrito, deja preparado el primer mensaje, sigue cada conversación y, cuando alguien firma, lleva la gestión documental de su proyecto. Es la prueba de que lo que vendemos funciona: nos funciona a nosotros.',
  enlace: ['/ventas-y-captacion', 'Ver Ventas y Captación'],
};

const PROYECTOS = [
  { nombre: 'Tiendas online que lleva una sola persona',
    texto: 'Negocios de venta online donde el fundador lo hace todo. Los agentes se quedan con la atención, los pedidos y el seguimiento, y la tienda sigue creciendo sin contratar a nadie para contestar.',
    enlace: ['/atencion-al-cliente', 'Atención al Cliente'] },
  { nombre: 'Las rutas de un fisioterapeuta a domicilio',
    texto: 'Un agente que ordena las visitas del día para hacer menos kilómetros y que quepan más pacientes en la misma jornada.',
    enlace: ['/logistica', 'Logística'] },
  { nombre: 'Agentes que dan citas',
    texto: 'Miran el calendario de verdad y cierran la cita, la recuerdan la víspera y, cuando la visita ha ido bien, piden la reseña de Google.',
    enlace: ['/atencion-al-cliente', 'Atención al Cliente'] },
  { nombre: 'Agentes que venden por internet',
    texto: 'Consultan el stock y los detalles de cada producto, resuelven las dudas antes de comprar y contestan el «¿dónde está mi pedido?» sin que nadie lo busque.',
    enlace: ['/atencion-al-cliente', 'Atención al Cliente'] },
  { nombre: 'La competencia, analizada para crear contenido',
    texto: 'Agentes que miran qué está funcionando ahora mismo en tu sector y en tus competidores, y proponen contenido adaptado a las tendencias del momento.',
    enlace: ['/marketing', 'Marketing'] },
  { nombre: 'Datos de otras webs, al minuto',
    texto: 'Agentes que leen datos públicos de otras páginas en tiempo real —precios, catálogos, novedades— para decidir con la información de hoy y no con la de hace un mes.',
    enlace: ['/datos-y-direccion', 'Datos y Dirección'] },
];

const persona = p => `<article class="cn-persona">
        <img src="${p.foto}" alt="${esc(p.nombre)}" width="560" height="560" loading="lazy">
        <div>
          <h3>${esc(p.nombre)}</h3>
          <p class="cn-papel">${esc(p.papel)}</p>
          <ul class="cn-titulos">${p.titulos.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
          ${p.texto.map(t => `<p>${esc(t)}</p>`).join('\n          ')}
        </div>
      </article>`;

const sistema = p => `<article class="cn-sistema">
        <div class="cn-sistema-txt">
          <h3>${esc(p.nombre)}</h3>
          <p>${esc(p.texto)}</p>
          <a class="cn-enlace" href="${p.enlace[0]}">${esc(p.enlace[1])}</a>
        </div>
      </article>`;

const proyecto = p => `<article class="cn-proyecto">
        <h3>${esc(p.nombre)}</h3>
        <p>${esc(p.texto)}</p>
        <a class="cn-enlace" href="${p.enlace[0]}">${esc(p.enlace[1])}</a>
      </article>`;

const ld = [
  migas([['Inicio', '/'], ['Conócenos', P.ruta]]),
  { '@context': 'https://schema.org', '@type': 'AboutPage', name: P.h1, url: BASE + P.ruta,
    about: { '@type': 'Organization', name: 'Marirrodriga IA', url: BASE,
      address: { '@type': 'PostalAddress', addressLocality: 'Palencia', addressCountry: 'ES' },
      founder: PERSONAS.map(p => ({ '@type': 'Person', name: p.nombre, jobTitle: p.papel })) } },
];

const html = `<!DOCTYPE html>
<html lang="es">
<!-- ==========================================================================
     GENERADO por scripts/generar-conocenos.cjs — NO EDITAR A MANO.
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
  <link rel="stylesheet" href="/assets/conocenos.css?v=4">
</head>
<body>

${nav([])}

<main class="cn">
  <header class="cn-cab">
    <div class="cn-ancho">
      <h1>${esc(P.h1)}</h1>
      <p>${esc(P.lead)}</p>
    </div>
  </header>

  <section class="cn-sec">
    <div class="cn-ancho cn-palencia">
      <div class="cn-marco">
        <h2>Una agencia que nace en Palencia</h2>
      </div>
      <div class="cn-palencia-txt">
        <p>En una ciudad como la nuestra, el negocio que sigue abierto compite con las cadenas y con internet, y casi siempre con menos gente y menos horas. No le falta oficio: le falta tiempo.</p>
        <p>Por eso empezamos aquí. Queremos que Palencia se modernice sin perder lo que tiene: que la tienda, la clínica o la distribuidora de siempre conteste a las once de la noche, persiga sus cobros y salga en Google como lo haría una empresa grande.</p>
        <p>Trabajamos sobre todo en Castilla y León, y vamos a tu empresa en persona. Quien te hace el diagnóstico es quien después monta el trabajo.</p>
      </div>
    </div>
  </section>

  <section class="cn-sec cn-sec-blanca">
    <div class="cn-ancho">
      <div class="cn-marco">
        <h2>Quiénes somos</h2>
        <p>Uno monta las automatizaciones y los agentes; el otro escribe el código. Sin comerciales en medio.</p>
      </div>
      <div class="cn-personas">
      ${PERSONAS.map(persona).join('\n      ')}
      </div>
    </div>
  </section>

  <section class="cn-sec">
    <div class="cn-ancho">
      <div class="cn-marco">
        <h2>Algunas cosas que hemos montado</h2>
        <p>Nuestros y de clientes. Los de clientes van sin nombres: firmamos confidencialidad, y la cumplimos.</p>
      </div>
      ${sistema(SISTEMA)}
      <div class="cn-proyectos">
      ${PROYECTOS.map(proyecto).join('\n      ')}
      </div>
    </div>
  </section>
</main>

${cierre(P)}

${pie()}

<script defer src="/assets/nav.js"></script>
<script defer src="/assets/plazas.js"></script>
<script defer src="/assets/origen.js"></script>
<script defer src="/_vercel/insights/script.js"></script>
</body>
</html>
`;

if (require.main === module) {
  fs.writeFileSync(path.join(raiz, P.archivo), html, { encoding: 'utf8' });
  console.log('  ' + P.archivo + ' · ' + PERSONAS.length + ' personas y ' + (PROYECTOS.length + 1) + ' proyectos');
}
