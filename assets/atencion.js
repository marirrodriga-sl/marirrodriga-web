/* ═══════════════════════════════════════════════════════════════════════════
   ATENCIÓN AL CLIENTE — configurador y comportamiento de la landing
   ───────────────────────────────────────────────────────────────────────────
   La CUENTA no se calcula aquí. Se calcula en catalogo.js (cotiza + calculaSetup),
   que es un port exacto de catalogo_cotiza() de Supabase y está verificado contra
   los 9 ejemplos del catálogo por scripts/verificar-catalogo.mjs.
   Este fichero solo la dibuja. Si hay que cambiar un precio, se cambia en
   Supabase → datos-catalogo.json → generar-catalogo.mjs. Nunca aquí.
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const pieza = slug => CATALOGO.piezas.find(p => p.slug === slug);
  const esc = s => String(s == null ? '' : s);
  const seleccion = {};   // { [idProducto]: Set(slugs) }

  /* ─── LA CUENTA ─────────────────────────────────────────────────────────
     El porcentaje que se enseña es el EFECTIVO, no el de la tabla: cuando
     actúa la guarda de monotonía no coinciden, y enseñar el de la tabla
     sería mentir. Cuando no coinciden se explica por qué. */
  function pintaCuenta(id) {
    const caja = document.getElementById('cuenta-' + id);
    const slugs = [...seleccion[id]];

    if (!slugs.length) {
      caja.innerHTML = `<div class="cuenta-nota" style="padding:20px">No has dejado nada marcado.
        Si ninguna te encaja, eso también es una respuesta — y merece más la pena contárnoslo
        que forzar una.</div>`;
      return;
    }

    const q = cotiza(slugs);
    const setup = calculaSetup(q.piezas);
    const efectivo = (suma, total) => suma ? Math.round((1 - total / suma) * 1000) / 10 : 0;
    const pct = n => n.toLocaleString('es-ES', { maximumFractionDigits: 1 });
    const pctCuota = efectivo(q.suma, q.cuota);
    const pctAlta  = efectivo(setup.suma, setup.total);
    const fila = (a, b, cls) => `<div class="cuenta-fila ${cls || ''}"><span>${a}</span><span>${b}</span></div>`;

    caja.innerHTML =
      fila(`Suma de ${q.nPiezas === 1 ? 'la pieza' : 'las ' + q.nPiezas + ' piezas'}`, `<b>${eur(q.suma)}</b>`) +

      (pctCuota > 0 ? fila(
        `Bonificación por llevar ${q.nPiezas} juntas`,
        `<b>−${eur(q.suma - q.cuota)} (−${pct(pctCuota)} %)</b>`, 'cuenta-bonif') : '') +

      (q.guardaAplicada ? `<div class="cuenta-nota">La última entra gratis: con ${q.nPiezas - 1} ya
        pagabas ${eur(q.cuota)}, así que añadirla no te sube la factura. Por eso el descuento
        no llega al ${q.bonificacion} % de la tabla.</div>` : '') +

      (q.sueloAplicado ? fila(
        'Mínimo por solución, con la reunión del mes y los ajustes dentro',
        eur(CATALOGO.suelo)) : '') +

      `<div class="cuenta-fila cuenta-total"><b>Tu cuota</b>
        <span class="cifra">${eur(q.cuota)}<span>/mes</span></span></div>` +

      (setup.total ? (
        fila(`Instalación, suma de ${setup.desglose.length}`, `<b>${eur(setup.suma)}</b>`) +
        (pctAlta > 0 ? fila(
          'Bonificación por montarlas de una vez',
          `<b>−${eur(setup.suma - setup.total)} (−${pct(pctAlta)} %)</b>`, 'cuenta-bonif') : '') +
        (setup.guardaAplicada ? `<div class="cuenta-nota">La última se monta gratis: no te sube
          el montaje.</div>` : '') +
        fila('<b>Total de instalación, una sola vez</b>', `<b>${eur(setup.total)}</b>`)
      ) : '') +

      `<div class="cuenta-pie">Precios <strong>sin IVA</strong>. La instalación se paga
        <strong>50 % al empezar y 50 % al entregar</strong>. Sin permanencia: te vas cuando
        quieras avisando con 30 días.</div>`;
  }

  /* ─── UN PRODUCTO ───────────────────────────────────────────────────────── */
  function pintaProducto(pr) {
    const nuc = pieza(pr.nucleo);
    seleccion[pr.id] = new Set([pr.nucleo]);   // de entrada SOLO el núcleo

    const conPrecio = pr.opciones.filter(o => pieza(o.slug));
    const deObra    = pr.opciones.filter(o => !pieza(o.slug));

    // Plural correcto. En el one-pager esto decía «1 cosas» y «0 cosas».
    const n = conPrecio.length;
    const sub = n === 0
      ? (deObra.length ? `${deObra.length} cosas más se construyen a medida` : '')
      : `${n} ${n === 1 ? 'cosa que puede aprender a hacer' : 'cosas que puede aprender a hacer'}` +
        (deObra.length ? ` · ${deObra.length} más se construyen` : '');

    const opcion = o => {
      const p = pieza(o.slug);
      return `<label class="opcion">
        <input type="checkbox" data-prod="${pr.id}" value="${o.slug}">
        <span class="opcion-cuerpo">
          <b>${esc(o.titulo)}</b>
          <p>${esc(o.texto)}</p>
          ${p.limite ? `<div class="opcion-limite">${esc(p.limite)}</div>` : ''}
          ${o.aviso ? `<div class="opcion-aviso">${esc(o.aviso)}</div>` : ''}
        </span>
        <span class="opcion-precio"><b>+${p.eur} €<span style="font-weight:500">/mes</span></b>
          <small>+${p.setup} € de alta</small></span>
      </label>`;
    };

    // La cabecera enseña la cuota REAL del núcleo, no el precio de la pieza suelta.
    // No es lo mismo: «Atención por correo» arranca en una pieza de 15 €, pero el
    // suelo de 49 € por solución la sube a 49 €. Anunciar 15 € y cobrar 49 € en la
    // cuenta de abajo es exactamente la trampa que esta web dice no hacer.
    const arranque = cotiza([pr.nucleo]);

    return `<article class="prod aparece">
      <div class="prod-cab">
        <h3>${esc(pr.nombre)}</h3>
        <div class="prod-precio">
          <b>${arranque.cuota} €<span>/mes</span></b>
          <small>+ ${nuc.setup} € de instalación</small>
        </div>
      </div>
      <p class="prod-nucleo">${pr.nucleoTexto}</p>

      ${conPrecio.length ? `
        <button class="magia" aria-expanded="true" aria-controls="op-${pr.id}" data-magia="${pr.id}">
          <svg class="magia-ico" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.9 5.8L20 9.7l-4.9 3.6L16.8 19 12 15.6 7.2 19l1.7-5.7L4 9.7l6.1-1.9z"/></svg>
          <span class="magia-txt"><b>${esc(pr.magia)}</b><span>${sub}</span></span>
          <svg class="magia-flecha" width="15" height="15" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="opciones" id="op-${pr.id}"><div class="opciones-int">
          <div class="opciones-lista">${conPrecio.map(opcion).join('')}</div>
          ${deObra.length ? `<div class="obra"><span>Y esto todavía no está empaquetado</span>
            ${deObra.map(o => `<div class="obra-item">
              <div><b>${esc(o.titulo)}</b><p>${esc(o.texto)}</p></div>
              <span>Se presupuesta</span></div>`).join('')}</div>` : ''}
        </div></div>` : ''}

      <div class="cuenta" id="cuenta-${pr.id}"></div>
      <div class="prod-cierre">
        <a class="btn btn-1" href="${CAL_URL}" target="_blank" rel="noopener">
          Media hora y te decimos si esto te encaja →</a>
      </div>
    </article>`;
  }

  /* ─── ARRANQUE ──────────────────────────────────────────────────────────── */
  const CAL_URL = 'https://cal.com/marirrodriga-ia/llamada';

  document.addEventListener('DOMContentLoaded', function () {
    const destino = document.getElementById('productos');
    if (destino && typeof PRODUCTOS !== 'undefined' && PRODUCTOS.atencion) {
      destino.innerHTML = PRODUCTOS.atencion.map(pintaProducto).join('');
      PRODUCTOS.atencion.forEach(pr => pintaCuenta(pr.id));
    }

    document.addEventListener('change', e => {
      const c = e.target.closest('input[type=checkbox][data-prod]');
      if (!c) return;
      const s = seleccion[c.dataset.prod];
      c.checked ? s.add(c.value) : s.delete(c.value);
      pintaCuenta(c.dataset.prod);
    });

    document.addEventListener('click', e => {
      const m = e.target.closest('[data-magia]');
      if (m) {
        const caja = document.getElementById('op-' + m.dataset.magia);
        const abierto = m.getAttribute('aria-expanded') === 'true';
        m.setAttribute('aria-expanded', String(!abierto));
        caja.hidden = abierto;
      }
      const q = e.target.closest('.faq-q');
      if (q) {
        const abierto = q.getAttribute('aria-expanded') === 'true';
        q.setAttribute('aria-expanded', String(!abierto));
        q.nextElementSibling.classList.toggle('abierta', !abierto);
      }
    });

    // Aparición al hacer scroll
    const io = new IntersectionObserver(es => {
      es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('dentro'); io.unobserve(x.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.aparece').forEach(el => io.observe(el));

    // Nav
    const nav = document.querySelector('.nav');
    if (nav) {
      const marca = () => nav.classList.toggle('pegada', window.scrollY > 24);
      marca(); addEventListener('scroll', marca, { passive: true });
    }
  });
})();
