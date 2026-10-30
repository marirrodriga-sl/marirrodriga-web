/* Genera las páginas de contenido: /agencia-ia-palencia, /guias y cada guía.

   Uso:  node scripts/generar-contenidos.cjs

   El nav, el pie y el cierre se IMPORTAN de generar-paginas.cjs, como hace
   generar-departamentos.cjs: dos copias del menú acaban siendo dos menús.

   ⚠️ NO EDITAR LOS HTML GENERADOS A MANO. Textos en scripts/datos-contenidos.cjs;
   precios en scripts/datos-departamentos.cjs, que aquí solo se leen.
*/
const fs = require('node:fs');
const path = require('node:path');
const { DEPARTAMENTOS } = require('./datos-departamentos.cjs');
const { nav, faq, cierre, pie, esc, migas } = require('./generar-paginas.cjs');
const { euros, lineaIva } = require('./iva.cjs');
const { FECHA, FECHA_TXT, PALENCIA, GUIAS, INDICE_GUIAS } = require('./datos-contenidos.cjs');

const raiz = path.join(__dirname, '..');
const BASE = 'https://www.marirrodriga-ia.com';

const iva = n => `<br>${lineaIva(n, { corto: true, clase: 'art-iva' })}`;
const dep = ruta => DEPARTAMENTOS.find(d => d.ruta === ruta);
const atencion = dep('/atencion-al-cliente');
const agenteBase = atencion.piezas.find(z => z.slug === 'iris-0');

/* El dolor de cada departamento, en una línea. El «desde» es el mismo que anuncia
   la descripción de cada landing: se lee de ahí para que no haya dos versiones. */
const DOLORES = [
  ['/atencion-al-cliente', 'Contestar mensajes, llamadas y correo fuera de horario'],
  ['/ventas-y-captacion', 'Clientes sin ficha y presupuestos sin seguimiento'],
  ['/finanzas', 'Facturar, reclamar cobros y saber cómo va la caja'],
  ['/posicionamiento-online', 'Que no te encuentren en Google ni tengas reseñas'],
  ['/marketing', 'Publicar en redes sin que te robe la semana'],
  ['/datos-y-direccion', 'Tener los datos separados y decidir a ojo'],
];

const departamentos = DOLORES.map(([ruta, dolor]) => {
  const d = dep(ruta);
  const desde = Number(d.descripcion.match(/Desde (\d+) €\/mes/)[1]);
  return { ruta, dolor, desde: euros(desde), nombre: d.pill, iva: iva(desde) };
});

const cabecera = (p, jsonlds) => `<!DOCTYPE html>
<html lang="es">
<!-- ==========================================================================
     GENERADO por scripts/generar-contenidos.cjs — NO EDITAR A MANO.
     Textos en scripts/datos-contenidos.cjs
     ========================================================================== -->
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(p.titulo)}</title>
  <meta name="description" content="${esc(p.descripcion)}">
  <link rel="canonical" href="${BASE}${p.ruta}">
  <meta name="theme-color" content="#7C3AED">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">

  <meta property="og:type" content="${p.esGuia ? 'article' : 'website'}">
  <meta property="og:site_name" content="Marirrodriga IA">
  <meta property="og:title" content="${esc(p.h1)}">
  <meta property="og:description" content="${esc(p.descripcion)}">
  <meta property="og:url" content="${BASE}${p.ruta}">
  <meta property="og:image" content="${BASE}/og-image.png">
  <meta property="og:locale" content="es_ES">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(p.h1)}">
  <meta name="twitter:description" content="${esc(p.descripcion)}">
  <meta name="twitter:image" content="${BASE}/og-image.png">
${jsonlds.map(j => `
  <script type="application/ld+json">
${JSON.stringify(j, null, 2)}
  </script>`).join('\n')}

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/base.css">
  <link rel="stylesheet" href="/assets/atencion.css">
  <link rel="stylesheet" href="/assets/solucion.css">
  <link rel="stylesheet" href="/assets/articulo.css">
</head>
<body>

${nav([])}
`;

const finPagina = p => `
${p.faq ? faq(p) : ''}

${cierre(p)}

${pie()}

<script>
  document.addEventListener('click', function (e) {
    var q = e.target.closest('.faq-q'); if (!q) return;
    var abierto = q.getAttribute('aria-expanded') === 'true';
    q.setAttribute('aria-expanded', String(!abierto));
    q.nextElementSibling.classList.toggle('abierta', !abierto);
  });
</script>
<script defer src="/assets/nav.js"></script>
<script defer src="/assets/origen.js"></script>
<script defer src="/_vercel/insights/script.js"></script>
</body>
</html>
`;

const faqLd = p => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: p.faq.map(([q, a]) => ({
    '@type': 'Question', name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
});

const ruta = (...tramos) => migas(tramos);

function palencia(p) {
  const servicio = {
    '@context': 'https://schema.org', '@type': 'Service',
    name: p.h1, serviceType: 'Automatización con inteligencia artificial para pymes',
    url: BASE + p.ruta,
    provider: { '@type': 'ProfessionalService', name: 'Marirrodriga IA', url: BASE + '/' },
    areaServed: [{ '@type': 'City', name: 'Palencia' }, { '@type': 'AdministrativeArea', name: 'Castilla y León' }, { '@type': 'Country', name: 'España' }],
  };
  return cabecera(p, [servicio, faqLd(p), ruta(['Inicio', '/'], [p.miga, p.ruta])]) + `
<main class="art">
  <header class="art-cab envoltura-txt">
    <span class="t-eyebrow">${esc(p.eyebrow)}</span>
    <h1 class="t-h2">${esc(p.h1)}</h1>
    <p class="t-lead">${esc(p.lead)}</p>
  </header>
  <div class="art-cuerpo envoltura-txt">${p.secciones({ departamentos })}
  </div>
</main>
` + finPagina(p);
}

function guia(p) {
  p.esGuia = true;
  const articulo = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: p.h1, description: p.descripcion, inLanguage: 'es-ES',
    datePublished: FECHA, dateModified: FECHA, url: BASE + p.ruta,
    image: BASE + '/og-image.png',
    author: { '@type': 'Organization', name: 'Marirrodriga IA', url: BASE + '/' },
    publisher: { '@type': 'Organization', name: 'Marirrodriga IA', logo: { '@type': 'ImageObject', url: BASE + '/icon-512.png' } },
  };
  const datos = {
    agente: { ...agenteBase, limCorto: agenteBase.lim.split(' · ')[0] },
    pack: atencion.pack, f: euros, iva,
    primerAno: (alta, cuota) => alta + cuota * 12,
  };
  return cabecera(p, [articulo, faqLd(p), ruta(['Inicio', '/'], ['Guías', '/guias'], [p.miga, p.ruta])]) + `
<main class="art">
  <header class="art-cab envoltura-txt">
    <span class="t-eyebrow">${esc(p.eyebrow)}</span>
    <h1 class="t-h2">${esc(p.h1)}</h1>
    <p class="t-lead">${esc(p.lead)}</p>
    <p class="art-firma">Por Marirrodriga IA · Actualizada el <time datetime="${FECHA}">${FECHA_TXT}</time></p>
  </header>
  <div class="art-cuerpo envoltura-txt">${p.resumen(datos)}${p.secciones(datos)}
  </div>
</main>
` + finPagina(p);
}

function indiceGuias(p) {
  return cabecera(p, [ruta(['Inicio', '/'], [p.miga, p.ruta])]) + `
<main class="art">
  <header class="art-cab envoltura-txt">
    <span class="t-eyebrow">${esc(p.eyebrow)}</span>
    <h1 class="t-h2">${esc(p.h1)}</h1>
    <p class="t-lead">${esc(p.lead)}</p>
  </header>
  <div class="art-cuerpo envoltura-txt">
    ${GUIAS.map(g => `<a class="art-tarjeta" href="${g.ruta}"><strong>${esc(g.h1)}</strong><span>${esc(g.descripcion)}</span></a>`).join('\n    ')}
  </div>
</main>
` + finPagina(p);
}

if (require.main === module) {
  const salida = [[PALENCIA, palencia], [INDICE_GUIAS, indiceGuias], ...GUIAS.map(g => [g, guia])];
  for (const [p, plantilla] of salida) {
    const destino = path.join(raiz, p.archivo);
    fs.mkdirSync(path.dirname(destino), { recursive: true });
    fs.writeFileSync(destino, plantilla(p), { encoding: 'utf8' });
    console.log(`  ${p.archivo}`);
  }
}
