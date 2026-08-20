/* Genera dentia.html, bookia.html y las seis landings de sector.
   Uso:  node scripts/generar-paginas.cjs

   Existe porque hasta el 20-08 eran ocho ficheros de ~600 líneas cada uno,
   copiados entre sí. Cambiar un precio obligaba a tocar ocho sitios y el que
   se olvidara quedaba mintiendo. Ahora los textos están en
   datos-soluciones.cjs, los precios los calcula soluciones.cjs con el motor
   del catálogo, y las páginas salen de aquí.

   ⚠️ NO EDITAR LOS HTML GENERADOS A MANO. Se pierden al regenerar.
*/
const fs = require('node:fs');
const path = require('node:path');
const { DENTIA, BOOKIA, CAL } = require('./datos-soluciones.cjs');
const SOL = require('./soluciones.cjs');

const raiz = path.join(__dirname, '..');
const eur = n => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const ent = n => n.toLocaleString('es-ES');
const pct = n => n.toLocaleString('es-ES', { maximumFractionDigits: 1 });
const esc = s => String(s).replace(/&(?![a-z]+;|#)/g, '&amp;');

const LOGO = '<img src="/assets/img/logo.png" alt="" width="256" height="256">';
const WA = 'https://wa.me/34675148566';

/* ─── PIEZAS DE PLANTILLA ────────────────────────────────────────────────── */

const nav = () => `<nav class="nav">
  <a class="nav-logo" href="/">
    ${LOGO}
    <span>Marirrodriga<b>.IA</b></span>
  </a>
  <div class="nav-links">
    <a class="nav-link" href="#lo-que-hace">Lo que hace</a>
    <a class="nav-link" href="#precio">Precio</a>
    <a class="nav-link" href="#preguntas">Preguntas</a>
  </div>
  <a class="btn btn-1 nav-cta" href="${CAL}" target="_blank" rel="noopener">Asesoría gratuita</a>
</nav>`;

const hero = p => `<header class="hero-s" style="--hero:url('/assets/img/${p.hero}')">
  <div class="hero-s-fondo"></div>
  <div class="hero-s-centro">
    <span class="hero-s-pill"><i></i> ${esc(p.pill)}</span>
    <h1 class="t-h1">${esc(p.h1[0])}<br><span class="acento">${esc(p.h1[1])}</span></h1>
    <p class="t-lead">${p.lead}</p>
    <div class="hero-botones">
      <a class="btn btn-1" href="${CAL}" target="_blank" rel="noopener">Asesoría gratuita de 30 min</a>
      <a class="btn btn-2" href="#precio">Ver qué cuesta</a>
    </div>
    <p class="t-micro">Precios sin IVA, cada uno con su límite al lado. Sin permanencia.</p>
  </div>
</header>`;

const dolores = p => `<section class="seccion">
  <div class="envoltura">
    <div class="envoltura-txt centrado" style="padding:0">
      <span class="t-eyebrow">Por qué existe esto</span>
      <h2 class="t-h2" style="margin:14px 0 16px">Tres cosas que pasan<br><span class="acento">todas las semanas.</span></h2>
    </div>
    <div class="dolores aparece">
      ${p.dolores.map(([h, t]) => `<div class="dolor"><h3>${esc(h)}</h3><p>${esc(t)}</p></div>`).join('\n      ')}
    </div>
  </div>
</section>`;

const vistas = p => `<section class="seccion seccion-cream" id="lo-que-hace">
  <div class="envoltura">
    <div class="envoltura-txt centrado" style="padding:0">
      <span class="t-eyebrow">Lo que hace</span>
      <h2 class="t-h2" style="margin:14px 0 16px">Esto no es una maqueta.<br><span class="acento">Es el programa funcionando.</span></h2>
      <p class="t-lead">Las capturas de abajo son de la aplicación de verdad, la que usan los clientes que ya lo tienen montado.</p>
    </div>
    <div class="vistas">
      ${p.vistas.map(v => `<article class="vista aparece">
        <div class="vista-texto">
          <span class="t-eyebrow">${esc(v.et)}</span>
          <h3>${esc(v.h)}</h3>
          <p>${v.p}</p>
          <div class="vista-lista">${v.lista.map(x => `<span>${esc(x)}</span>`).join('')}</div>
        </div>
        <div class="vista-img"><img src="/${v.img}" alt="${esc(v.h)}" loading="lazy"></div>
      </article>`).join('\n      ')}
    </div>
  </div>
</section>`;

const precio = (p, tramos) => `<section class="seccion" id="precio">
  <div class="envoltura">
    <div class="envoltura-txt centrado" style="padding:0">
      <span class="t-eyebrow">El precio</span>
      <h2 class="t-h2" style="margin:14px 0 16px">Cuatro puntos de partida.<br><span class="acento">Se sube cuando hace falta.</span></h2>
      <p class="t-lead">No son planes cerrados: son las combinaciones que montamos más a menudo. Puedes quitar o añadir piezas, y el precio se recalcula con la misma cuenta.</p>
    </div>

    <div class="tramos aparece">
      ${tramos.map((t, i) => `<article class="tramo${i === 1 ? ' tramo-destacado' : ''}">
        ${i === 1 ? '<span class="tramo-etiq">El más montado</span>' : ''}
        <h3>${esc(t.nombre)}</h3>
        <p class="tramo-gancho">${esc(t.gancho)}</p>
        <div class="tramo-precio"><b>${eur(t.cuota)} €<span>/mes</span></b></div>
        <div class="tramo-alta">+ ${ent(t.alta)} € de montaje, una sola vez</div>
        ${t.bonificacion > 0
          ? `<div class="tramo-bonif">${t.piezas} piezas juntas · −${pct(t.bonificacion)} % ya aplicado</div>`
          : `<div class="tramo-bonif">${t.piezas} piezas${t.sueloAplicado ? ' · mínimo por solución' : ''}</div>`}
        <div class="tramo-incluye">${t.incluye.map(x => `<span>${esc(x)}</span>`).join('')}</div>
        <a class="btn ${i === 1 ? 'btn-1' : 'btn-2'}" href="${CAL}" target="_blank" rel="noopener">Verlo en 30 min</a>
      </article>`).join('\n      ')}
    </div>

    <p class="tramos-pie">
      Todos los precios <strong>sin IVA</strong>. El montaje se paga <strong>50 % al empezar y 50 % al entregar</strong>,
      e incluye pasar lo que ya tengas. La cuota lleva dentro los ajustes y una reunión al mes.
      <strong>Sin permanencia:</strong> te vas cuando quieras avisando con 30 días.
      Cuantas más piezas juntas, menos cuesta cada una — la bonificación ya va aplicada en las cifras de arriba.
    </p>
  </div>
</section>`;

const faq = p => `<section class="seccion seccion-cream" id="preguntas">
  <div class="envoltura-txt">
    <span class="t-eyebrow">Preguntas</span>
    <h2 class="t-h2" style="margin:14px 0 0">Lo que nos preguntan<br><span class="acento">antes de decir que sí.</span></h2>
    <div class="faq">
      ${p.faq.map(([q, a]) => `<div class="faq-item">
        <button class="faq-q" aria-expanded="false">${esc(q)}
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button>
        <div class="faq-a"><div><p>${esc(a)}</p></div></div>
      </div>`).join('\n      ')}
    </div>
  </div>
</section>`;

const cierre = p => `<section class="cierre">
  <div class="envoltura-txt">
    <h2 class="t-h2">Media hora, y te decimos<br>si esto te encaja.</h2>
    <p>O que no te encaja. Si con lo que ya tienes te apañas, te lo decimos en la llamada y nos ahorramos los dos el tiempo.</p>
    <div class="hero-botones">
      <a class="btn btn-2" href="${CAL}" target="_blank" rel="noopener">Reservar la asesoría gratuita</a>
      <a class="btn btn-3" style="color:rgba(255,255,255,.6)" href="/">Ver todo lo que montamos →</a>
    </div>
  </div>
</section>`;

const pie = () => `<footer class="pie">
  <div class="envoltura">
    <div class="pie-fila">
      <div>
        <div class="pie-marca">${LOGO} Marirrodriga.IA</div>
        <p style="margin-top:12px;max-width:280px;font-size:13.5px">Software con IA montado por piezas, con su precio y su límite públicos.</p>
      </div>
      <div class="pie-cols">
        <div class="pie-col">
          <h4>Soluciones</h4>
          <a href="/dentia">Dentia · clínicas dentales</a>
          <a href="/bookia">Bookia · negocios de citas</a>
          <a href="/atencion-al-cliente">Atención al Cliente</a>
        </div>
        <div class="pie-col">
          <h4>Contacto</h4>
          <a href="${CAL}" target="_blank" rel="noopener">Asesoría gratuita</a>
          <a href="mailto:marirrodriga.ia@gmail.com">marirrodriga.ia@gmail.com</a>
          <a href="${WA}" target="_blank" rel="noopener">WhatsApp</a>
        </div>
        <div class="pie-col">
          <h4>Legal</h4>
          <a href="/aviso-legal">Aviso legal</a>
          <a href="/privacidad">Privacidad</a>
        </div>
      </div>
    </div>
    <div class="pie-legal"><span>© 2026 Marirrodriga IA</span><span>Todos los precios sin IVA</span></div>
  </div>
</footer>

<a class="wa" href="${WA}" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1s-.8 1-.9 1.2c-.2.2-.3.2-.6.1a8 8 0 01-4-3.5c-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5L9.3 7c-.2-.5-.4-.5-.6-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 1.9.8 2.7.9 3.6.8.6-.1 1.8-.7 2-1.5.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4z"/><path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.4A10 10 0 1012 2zm0 18.2c-1.6 0-3.2-.4-4.5-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2z"/></svg>
</a>`;

/* ─── LA PÁGINA ENTERA ───────────────────────────────────────────────────── */
function pagina(p, tramos) {
  const jsonld = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: p.faq.map(([q, a]) => ({
      '@type': 'Question', name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
  return `<!DOCTYPE html>
<html lang="es">
<!-- ==========================================================================
     GENERADO por scripts/generar-paginas.cjs — NO EDITAR A MANO.
     Textos en scripts/datos-soluciones.cjs · precios en scripts/soluciones.cjs
     ========================================================================== -->
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(p.titulo)}</title>
  <meta name="description" content="${esc(p.descripcion)}">
  <link rel="canonical" href="https://www.marirrodriga-ia.com${p.ruta}">
  <meta name="theme-color" content="#7C3AED">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Marirrodriga IA">
  <meta property="og:title" content="${esc(p.h1.join(' '))}">
  <meta property="og:description" content="${esc(p.lead.replace(/<[^>]+>/g, ''))}">
  <meta property="og:url" content="https://www.marirrodriga-ia.com${p.ruta}">
  <meta property="og:image" content="https://www.marirrodriga-ia.com/og-image.png">
  <meta property="og:locale" content="es_ES">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(p.h1.join(' '))}">
  <meta name="twitter:description" content="${esc(p.lead.replace(/<[^>]+>/g, ''))}">
  <meta name="twitter:image" content="https://www.marirrodriga-ia.com/og-image.png">

  <script type="application/ld+json">
${JSON.stringify(jsonld, null, 2)}
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/base.css">
  <link rel="stylesheet" href="/assets/atencion.css">
  <link rel="stylesheet" href="/assets/solucion.css">
</head>
<body>

${nav()}

${hero(p)}

${dolores(p)}

${vistas(p)}

${precio(p, tramos)}

${faq(p)}

${cierre(p)}

${pie()}

<script>
  document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (e) {
      var q = e.target.closest('.faq-q'); if (!q) return;
      var abierto = q.getAttribute('aria-expanded') === 'true';
      q.setAttribute('aria-expanded', String(!abierto));
      q.nextElementSibling.classList.toggle('abierta', !abierto);
    });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('dentro'); io.unobserve(x.target); } });
    }, { threshold: .1, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('.aparece').forEach(function (el) { io.observe(el); });
    var nav = document.querySelector('.nav');
    if (nav) {
      var marca = function () { nav.classList.toggle('pegada', window.scrollY > 24); };
      marca(); addEventListener('scroll', marca, { passive: true });
    }
  });
</script>
<script defer src="/_vercel/insights/script.js"></script>
</body>
</html>
`;
}

/* ─── ESCRIBIR ───────────────────────────────────────────────────────────── */
let n = 0;
for (const [p, tramos] of [[DENTIA, SOL.DENTIA], ...BOOKIA.map(b => [b, SOL.BOOKIA])]) {
  fs.writeFileSync(path.join(raiz, p.archivo), pagina(p, tramos), { encoding: 'utf8' });
  console.log(`  ${p.archivo.padEnd(28)} ${tramos[0].cuota} – ${tramos[3].cuota} €/mes`);
  n++;
}
console.log(`\n${n} páginas generadas.`);
