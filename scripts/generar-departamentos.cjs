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
const flujo = p => {
  const f = p.flujo;
  return `<section class="seccion seccion-cream" id="flujo">
  <div class="envoltura">
    <div class="envoltura-txt centrado" style="padding:0;margin-bottom:44px">
      <span class="t-eyebrow">Cómo funciona</span>
      <h2 class="t-h2" style="margin:14px 0 16px">Esto es lo que hace,<br><span class="acento">paso por paso.</span></h2>
      <p class="t-lead">Sin cajas negras: cada paso está aquí, y cada uno se puede cambiar. Si algo no encaja con cómo trabajas, se ajusta antes de montarlo.</p>
    </div>
    <figure class="flujo aparece">
      <div class="flujo-marco">
        <div class="flujo-lienzo">
          <div class="flujo-ruta">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10"/></svg>
            ${esc(f.ruta).replace('›', '<span>›</span>')}
          </div>

          <div class="flujo-disparadores">
            ${f.disparadores.map(([k, t]) =>
              `<div class="flujo-nodo flujo-disp">${ico(k)}${esc(t)}</div>`).join('\n            ')}
          </div>

          <div class="flujo-horquilla" aria-hidden="true"></div>

          ${f.pasos.map(([k, t], i) =>
            `<div class="flujo-paso">${ico(k)}${esc(t)}</div>
          <div class="flujo-hilo${i === f.pasos.length - 1 ? ' flujo-hilo-corto' : ''}" aria-hidden="true"></div>`
          ).join('\n          ')}

          <div class="flujo-bifurca">
            ${f.fin.map(([k, t]) =>
              `<div class="flujo-nodo flujo-fin flujo-fin-${k === 'ok' ? 'ok' : 'humano'}">${ico(k, ' flujo-ico-' + (k === 'ok' ? 'ok' : 'humano'))}${esc(t)}</div>`).join('\n            ')}
          </div>
        </div>
      </div>
      <figcaption>${esc(f.pie)}</figcaption>
    </figure>
  </div>
</section>`;
};

/* ─── EL DEPARTAMENTO ENTERO ─────────────────────────────────────────────
   Va ANTES de las piezas sueltas, por decisión de Isma: el primer producto
   que se enseña es el completo, y las piezas quedan para quien solo quiere
   una parte.

   El precio, tal y como lo fijó: la cuota NO lleva descuento —es la suma de
   las piezas— y el alta lleva un 30 %. Tiene sentido: el ahorro real de
   montarlo todo a la vez está en el montaje, que se comparte, no en el
   servicio mensual, que no.

   El mapa es HTML por lo mismo que el diagrama de flujo: es todo texto, se
   corrige en una línea y pesa 2 KB. */
const completo = p => {
  const k = p.pack;
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
                  ${p.piezas.map(z => `<span>${esc(z.n)}</span>`).join('\n                  ')}
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

    <div class="pack aparece">
      <div class="pack-txt">
        <h3>${esc(k.nombre)}</h3>
        <p>Todas las piezas de abajo, conectadas entre sí y ajustadas a cómo trabajas tú. Con el alta un ${dto}&nbsp;% por debajo de montarlas una a una.</p>
      </div>
      <div class="pack-precio">
        <div class="pack-cuota">${k.cuota} €<span>/mes</span></div>
        <div class="pack-alta">${miles(k.alta)} € de instalación <s>${miles(k.altaSuelta)} €</s></div>
        <div class="pack-nota">La cuota es la misma que sumando las piezas: lo que baja es el montaje, que es lo que de verdad se comparte.</div>
      </div>
    </div>
  </div>
</section>`;
};

const piezas = p => `<section class="seccion" id="piezas">
  <div class="envoltura">
    <div class="envoltura-txt centrado" style="padding:0">
      <span class="t-eyebrow">Las piezas</span>
      <h2 class="t-h2" style="margin:14px 0 16px">O solo la pieza<br><span class="acento">que te duela.</span></h2>
      <p class="t-lead">Si no quieres el departamento entero, cada pieza se vende suelta con su precio y su límite al lado. Sin paquete mínimo y sin permanencia.</p>
    </div>
    <div class="capacidades aparece">
      ${p.piezas.map(z => {
        const base = z.destacada ? ' cap-base' : '';
        const etiq = z.destacada ? '<span class="cap-etiq">La que más se nota</span>'
                   : z.yaExiste  ? '<span class="cap-etiq">Ya montada</span>' : '';
        const pre  = z.destacada ? ' cap-precio-base' : '';
        return `<div class="cap${base}">
        ${etiq}
        <h3>${esc(z.n)}</h3>
        <p>${esc(z.d)}</p>
        ${z.lista ? `<ul class="cap-lista">
          ${z.lista.map(x => `<li>${esc(x)}</li>`).join('\n          ')}
        </ul>` : ''}
        <div class="cap-limite">${esc(z.lim)}</div>
        <div class="cap-precio${pre}">${z.desde ? 'desde ' : ''}${z.eur} €/mes <span>· ${z.setup} € de instalación</span></div>
        ${z.nota ? `<p class="cap-nota">${esc(z.nota)}</p>` : ''}
      </div>`;
      }).join('\n      ')}
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

${flujo(p)}

${completo(p)}

${piezas(p)}

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
