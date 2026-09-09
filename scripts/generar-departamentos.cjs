/* Genera las cinco landings de departamento que se abren el 09-09-2026:
   Finanzas, Logística, Datos y Dirección, Marketing y Posicionamiento Online.

   Uso:  node scripts/generar-departamentos.cjs

   Atención al Cliente y Ventas y Captación NO salen de aquí: son páginas
   escritas a mano con heros de maqueta (el móvil con su conversación, la
   bandeja ordenándose) que no salen de un molde. Estas cinco usan el hero con
   foto y dejan que la pieza visual sea el diagrama de flujo.

   El nav, el pie, el FAQ y el cierre se IMPORTAN de generar-paginas.cjs. No se
   copian: el 09-09 la plantilla de aquel se desincronizó del HTML publicado y
   al regenerar devolvía el favicon a un fichero inexistente. Con dos copias, el
   riesgo se duplica.

   ⚠️ NO EDITAR LOS HTML GENERADOS A MANO. Se pierden al regenerar.
   Textos y precios en scripts/datos-departamentos.cjs.
*/
const fs = require('node:fs');
const path = require('node:path');
const { DEPARTAMENTOS } = require('./datos-departamentos.cjs');
const { nav, faq, cierre, pie, esc, CAL } = require('./generar-paginas.cjs');

const raiz = path.join(__dirname, '..');

/* toLocaleString('es-ES') devuelve «1200» en este Node: le falta el ICU con
   español. Se formatea a mano para no depender de cómo esté compilado. */
const miles = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const ANCLAS = [
  ['#completo', 'La solución completa'],
  ['#piezas', 'O por piezas'],
  ['#preguntas', 'Preguntas'],
];

/* ─── ICONOS DEL DIAGRAMA ────────────────────────────────────────────────
   Trazos sueltos, sin relleno: heredan el grosor y el color del CSS. */
const ICO = {
  reloj:   '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  doc:     '<path d="M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h4"/>',
  ojo:     '<path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="2.6"/>',
  msg:     '<path d="M21 11.5a8.4 8.4 0 01-9 8.4 8.5 8.5 0 01-3.9-.9L3 20.5l1.5-4.6A8.4 8.4 0 0112 3.1a8.4 8.4 0 019 8.4z"/>',
  caja:    '<path d="M3 8l9-4 9 4v9l-9 4-9-4zM3 8l9 4M21 8l-9 4M12 12v9"/>',
  grafica: '<path d="M4 20V9M10 20V4M16 20v-7M22 20H2"/>',
  ok:      '<path d="M4 12.5l5 5L20 6.5"/>',
  humano:  '<circle cx="12" cy="8" r="3.4"/><path d="M5 20a7 7 0 0114 0"/>',
  aviso:   '<path d="M12 3l9.5 17H2.5zM12 10v4M12 17h.01"/>',
};
const ico = (k, extra = '') =>
  `<i class="flujo-ico${extra}"><svg viewBox="0 0 24 24" aria-hidden="true">${ICO[k] || ICO.doc}</svg></i>`;

/* ─── PIEZAS DE PLANTILLA ────────────────────────────────────────────────── */

const hero = p => `<header class="hero-s" style="--hero:url('/assets/img/${p.hero}')">
  <div class="hero-s-fondo"></div>
  <div class="hero-s-centro">
    <span class="hero-s-pill"><i></i> ${esc(p.pill)}</span>
    <h1 class="t-h1">${esc(p.h1[0])}<br><span class="acento">${esc(p.h1[1])}</span></h1>
    <p class="t-lead">${p.lead}</p>
    <div class="hero-botones">
      <a class="btn btn-2" href="#completo">Ver la solución completa</a>
    </div>
    <p class="t-micro">Precios sin IVA, cada uno con su límite al lado. Sin permanencia.</p>
  </div>
</header>`;

const dolores = p => `<section class="seccion">
  <div class="envoltura">
    <div class="envoltura-txt centrado" style="padding:0">
      <span class="t-eyebrow">El agujero</span>
      <h2 class="t-h2" style="margin:14px 0 16px">Tres cosas que pasan<br><span class="acento">todas las semanas.</span></h2>
    </div>
    <div class="dolores aparece">
      ${p.dolores.map(([h, t]) => `<div class="dolor"><h3>${esc(h)}</h3><p>${esc(t)}</p></div>`).join('\n      ')}
    </div>
  </div>
</section>`;

/* El diagrama. Va en HTML y no en imagen porque es todo texto: el de una
   imagen ni se busca, ni lo lee un lector de pantalla, ni se corrige cuando
   cambia un producto. Y pesa 3 KB en vez de 200. */
/* ─── LA SOLUCIÓN COMPLETA ───────────────────────────────────────────────
   Reordenado el 09-09 con el criterio de Isma: hasta entonces las piezas
   sueltas ocupaban más página que la solución completa, que es justo lo que
   queremos vender. Ahora la página vende UNA cosa —el departamento entero— y
   las piezas sueltas quedan al final, en una tabla, para quien las busque.

   El orden importa y es deliberado:
     1. el mapa      · qué entra, qué sale y cómo se encadena
     2. el desglose  · qué hace cada parte, SIN precio
     3. el precio    · una sola vez, cuando ya sabes qué estás comprando

   Poner el precio antes del desglose obligaba a decidir sin saber qué se
   compra; ponerlo por pieza convertía la página en una lista de la compra. */
const completo = p => {
  const k = p.pack;
  /* Alguna pieza puede quedar fuera del plan completo a propósito —en Finanzas,
     las fichas listas para validar son el segundo peldaño y se venden después—.
     El mapa y el desglose enseñan lo que SÍ entra; la tabla de abajo las
     enseña todas, porque sueltas se pueden comprar igual. */
  const dentro = p.piezas.filter(z => !z.fueraDelPack);
  const dto = Math.round((1 - k.alta / k.altaSuelta) * 100);
  return `<section class="seccion" id="completo">
  <div class="envoltura">
    <div class="envoltura-txt centrado" style="padding:0;margin-bottom:40px">
      <span class="t-eyebrow">Lo que recomendamos</span>
      <h2 class="t-h2" style="margin:14px 0 16px">El departamento entero,<br><span class="acento">montado a tu medida.</span></h2>
      <p class="t-lead">${esc(k.gancho)}</p>
    </div>

    <figure class="mapa aparece">
      <div class="flujo-marco">
        <div class="flujo-lienzo">
          <div class="flujo-ruta">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10"/></svg>
            ${esc(p.pill)} <span>›</span> El montaje completo
          </div>
          <div class="mapa-rejilla">
            <div class="mapa-lado">
              <span class="mapa-titulo">Lo que entra</span>
              ${k.entra.map(x => `<div class="flujo-nodo mapa-nodo">${esc(x)}</div>`).join('\n              ')}
            </div>
            <div class="mapa-centro">
              <div class="mapa-nucleo">
                <span class="mapa-nucleo-et">Trabajando juntas</span>
                <b>${esc(p.pill)}</b>
                <div class="mapa-piezas">
                  ${dentro.map(z => `<span>${esc(z.n)}</span>`).join('\n                  ')}
                </div>
              </div>
              <p class="mapa-explica">${esc(k.comoVa)}</p>
            </div>
            <div class="mapa-lado">
              <span class="mapa-titulo">Lo que sale</span>
              ${k.sale.map(x => `<div class="flujo-nodo mapa-nodo mapa-nodo-fin">${esc(x)}</div>`).join('\n              ')}
            </div>
          </div>
        </div>
      </div>
      <figcaption>${esc(k.pie)}</figcaption>
    </figure>

    <div class="desglose aparece">
      <h3 class="desglose-titulo">Qué hace cada parte</h3>
      ${dentro.map((z, n) => `<article class="desglose-pieza${n % 2 ? ' desglose-vuelta' : ''}${z.foto || z.maqueta ? '' : ' desglose-sinfoto'}">
        ${z.maqueta
          ? `<div class="desglose-img desglose-maqueta">${z.maqueta}</div>`
          : z.foto
            ? `<div class="desglose-img"><img src="/assets/img/${z.foto}" alt="${esc(z.fotoAlt || z.n)}" width="900" height="675" loading="lazy"></div>`
            : ''}
        <div class="desglose-txt">
          <span class="desglose-num">${String(n + 1).padStart(2, '0')}</span>
          <h4>${esc(z.n)}</h4>
          <p>${esc(z.d)}</p>
          ${z.lista ? `<ul class="desglose-lista">
            ${z.lista.map(x => `<li>${esc(x)}</li>`).join('\n            ')}
          </ul>` : ''}
        </div>
      </article>`).join('\n      ')}
    </div>

    <div class="pack aparece">
      <div class="pack-txt">
        <h3>${esc(k.nombre)}</h3>
        <p>Todo lo de arriba, conectado entre sí y ajustado a cómo trabajas tú. Sin permanencia: te vas cuando quieras avisando con 30 días.</p>
      </div>
      <div class="pack-precio">
        <div class="pack-cuota">${k.cuota} €<span>/mes</span></div>
        <div class="pack-alta">${miles(k.alta)} € de instalación <s>${miles(k.altaSuelta)} €</s> <i>−${dto}&nbsp;%</i></div>
        <div class="pack-nota">El descuento va en el montaje, que es lo que de verdad se comparte al hacerlo todo a la vez. La cuota mensual es la misma que sumando las piezas: no te cobramos de más por juntarlas ni te prometemos un descuento que no existe.</div>
      </div>
    </div>
  </div>
</section>`;
};

/* ─── O SOLO UNA PIEZA ───────────────────────────────────────────────────
   Tabla, no tarjetas. Lo que hace cada una ya se ha explicado arriba, así que
   aquí solo hace falta el número: nombre, hasta dónde llega y cuánto cuesta.
   Con tarjetas volvía a ocupar más que la solución completa, que era el
   problema que se venía a arreglar. */
const sueltas = p => `<section class="seccion seccion-cream" id="piezas">
  <div class="envoltura">
    <div class="envoltura-txt centrado" style="padding:0;margin-bottom:36px">
      <span class="t-eyebrow">O solo una parte</span>
      <h2 class="t-h2" style="margin:14px 0 16px">Si prefieres empezar<br><span class="acento">por una sola pieza.</span></h2>
      <p class="t-lead">Cada una se vende suelta, con su precio y su límite al lado. Sin paquete mínimo y sin permanencia — lo que no lleva es el descuento del montaje conjunto.</p>
    </div>
    <div class="tabla-piezas">
      <div class="tp-cab">
        <span>Pieza</span><span>Hasta dónde llega</span><span>Al mes</span><span>Instalación</span>
      </div>
      ${p.piezas.map(z => `<div class="tp-fila">
        <span class="tp-n">${esc(z.n)}${z.fueraDelPack ? '<em>fuera del plan completo</em>' : ''}</span>
        <span class="tp-lim">${esc(z.lim)}</span>
        <span class="tp-eur">${z.desde ? 'desde ' : ''}${z.eur} €</span>
        <span class="tp-alta">${miles(z.setup)} €</span>
      </div>`).join('\n      ')}
      <div class="tp-pie">
        <span>Las ${p.piezas.filter(z => !z.fueraDelPack).length} del plan completo</span>
        <span>El departamento entero, a tu medida</span>
        <span class="tp-eur">${p.pack.cuota} €</span>
        <span class="tp-alta"><s>${miles(p.pack.altaSuelta)} €</s> ${miles(p.pack.alta)} €</span>
      </div>
    </div>
  </div>
</section>`;

/* ─── LA PÁGINA ENTERA ───────────────────────────────────────────────────── */
function pagina(p) {
  const jsonld = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: p.faq.map(([q, a]) => ({
      '@type': 'Question', name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
  const limpio = p.lead.replace(/<[^>]+>/g, '');
  return `<!DOCTYPE html>
<html lang="es">
<!-- ==========================================================================
     GENERADO por scripts/generar-departamentos.cjs — NO EDITAR A MANO.
     Textos y precios en scripts/datos-departamentos.cjs
     ⚠️ Los precios están PENDIENTES DE VALIDAR (09-09-2026).
     ========================================================================== -->
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(p.titulo)}</title>
  <meta name="description" content="${esc(p.descripcion)}">
  <link rel="canonical" href="https://www.marirrodriga-ia.com${p.ruta}">
  <meta name="theme-color" content="#7C3AED">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Marirrodriga IA">
  <meta property="og:title" content="${esc(p.h1.join(' '))}">
  <meta property="og:description" content="${esc(limpio)}">
  <meta property="og:url" content="https://www.marirrodriga-ia.com${p.ruta}">
  <meta property="og:image" content="https://www.marirrodriga-ia.com/og-image.png">
  <meta property="og:locale" content="es_ES">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(p.h1.join(' '))}">
  <meta name="twitter:description" content="${esc(limpio)}">
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

${nav(ANCLAS)}

${hero(p)}

${dolores(p)}

${completo(p)}

${sueltas(p)}

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
<script defer src="/assets/nav.js"></script>
<script defer src="/_vercel/insights/script.js"></script>
</body>
</html>
`;
}

/* ─── ESCRIBIR ───────────────────────────────────────────────────────────── */
if (require.main === module) {
  for (const p of DEPARTAMENTOS) {
    fs.writeFileSync(path.join(raiz, p.archivo), pagina(p), { encoding: 'utf8' });
    const min = Math.min(...p.piezas.map(z => z.eur));
    console.log(`  ${p.archivo.padEnd(28)} ${p.piezas.length} piezas · desde ${min} €/mes`);
  }
  console.log(`\n${DEPARTAMENTOS.length} departamentos generados.`);
}
