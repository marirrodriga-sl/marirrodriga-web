/* ═══════════════════════════════════════════════════════════════════════════
   EL HERO Y LAS INSIGNIAS
   ───────────────────────────────────────────────────────────────────────────
   Cinco puertas, un clic. Cada departamento se cuenta en tres tiempos:
     1. el diagrama  — qué se conecta con qué, antes de leer nada
     2. qué es y cómo funciona dentro de un negocio de verdad
     3. y solo entonces, las piezas sueltas con su explicación y su precio

   El cliente no sabe para qué sirven estas cosas. Enseñarle una lista de
   piezas con su límite es enseñarle el despiece de un coche que no ha visto.

   La cuenta la hace SIEMPRE cotiza(), nunca la plantilla. Y no se muestra
   nunca «suma − X %»: cuando actúa la guarda de monotonía esa resta no es
   la cuota, porque la última pieza puede entrar gratis.

   Nada dental sale a la web (decisión del 16-08).
   ═════════════════════════════════════════════════════════════════════════ */

const $ = id => document.getElementById(id);
const pieza = slug => CATALOGO.piezas.find(p => p.slug === slug);
const publicables = () => CATALOGO.piezas.filter(SIN_DENTAL);

const seleccion = {};   // id de departamento -> Set de slugs marcados

/* ─── El hero: cinco puertas ─────────────────────────────────────────────── */

function pintaPuertas() {
  const cont = $('hero-puertas');
  if (!cont) return;
  cont.innerHTML = DEPARTAMENTOS.map((d, i) => `
    <button class="puerta" style="--i:${i}" data-dep="${d.id}">
      <span class="puerta-dolor">${d.dolor}</span>
      <span class="puerta-flecha" aria-hidden="true">→</span>
    </button>`).join('');
  cont.querySelectorAll('.puerta').forEach(b =>
    b.addEventListener('click', () => {
      const destino = $('dep-' + b.dataset.dep);
      destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
      destino.classList.add('recien-abierto');
      setTimeout(() => destino.classList.remove('recien-abierto'), 1400);
    }));
}

/* ─── La base ────────────────────────────────────────────────────────────── */

function pintaBase() {
  const cont = $('la-base');
  if (!cont) return;
  cont.innerHTML = `
    <div class="seccion-inner">
      <h2 class="dep-titulo">${BASE.titulo}</h2>
      <p class="dep-resumen">${BASE.entradilla}</p>
      <div class="base-bloques">
        ${BASE.bloques.map((b, i) => {
          const p = b.slug ? pieza(b.slug) : null;
          return `
          <article class="base-bloque${b.pendiente ? ' base-pendiente' : ''}" style="--i:${i}">
            <div class="base-cab">
              <h3 class="base-titulo">${b.titulo}</h3>
              ${p ? `<span class="base-precio">${p.eur} €<i>/mes</i>${p.setup ? `<em>+${p.setup} € de instalación</em>` : ''}</span>`
                  : b.incluida ? `<span class="base-etiqueta">Incluida</span>`
                  : `<span class="base-etiqueta base-etiqueta-gris">Se presupuesta</span>`}
            </div>
            <p class="base-texto">${b.texto}</p>
            ${p ? `<p class="base-limite"><span>Hasta dónde llega</span> ${SIN_NOMBRES(p.limite)}</p>` : ''}
            ${b.incluida ? `<p class="base-nota base-nota-buena">${b.incluida}</p>` : ''}
            ${b.aviso ? `<p class="base-nota">${b.aviso}</p>` : ''}
          </article>`;
        }).join('')}
      </div>
    </div>`;
}

/* ─── La tarjeta de una pieza ────────────────────────────────────────────── */

function tarjetaPieza(p, i, elegible, depId) {
  const explica = SIN_NOMBRES(EXPLICACIONES[p.slug] || '');
  const marcada = elegible && seleccion[depId].has(p.slug);
  const control = elegible
    ? `<input type="checkbox" data-dep="${depId}" data-slug="${p.slug}" ${marcada ? 'checked' : ''}
              aria-label="Incluir ${nombreWeb(p)}">`
    : '';
  return `
    <article class="pz${elegible ? ' pz-elegible' : ''}${marcada ? ' marcada' : ''}" style="--i:${i}">
      <div class="pz-cabecera">
        ${control}
        <h4 class="pz-nombre">${nombreWeb(p)}</h4>
        <span class="pz-precio">${p.eur} €<i>/mes</i></span>
      </div>
      <p class="pz-explica">${explica}</p>
      <dl class="pz-limites">
        <dt>Hasta dónde llega</dt><dd>${SIN_NOMBRES(p.limite)}</dd>
        ${p.canales ? `<dt>Por dónde</dt><dd>${SIN_NOMBRES(p.canales)}</dd>` : ''}
        ${p.integra ? `<dt>Con qué se conecta</dt><dd>${SIN_NOMBRES(p.integra)}</dd>` : ''}
        ${p.excluye ? `<dt>Lo que no hace</dt><dd>${SIN_NOMBRES(p.excluye)}</dd>` : ''}
      </dl>
      ${p.setup !== undefined ? `<p class="pz-alta">Montaje: <strong>${p.setup ? p.setup + ' €' : 'sin coste'}</strong>, una sola vez</p>` : ''}
    </article>`;
}

/* ─── El diagrama: qué se conecta con qué ────────────────────────────────── */

/* Cada departamento tiene su propio esquema: cinco iguales no cuentan nada.
   Comparten lenguaje —trazo fino, morado, pulsos que recorren, rótulos en
   versalita— pero cada forma dice lo que hace ese departamento.
   Los pulsos son dash-offset en CSS, no SMIL, para que prefers-reduced-motion
   pueda pararlos de verdad. */

const curva = (x1, y1, x2, y2) => `M ${x1},${y1} C ${x1 + 90},${y1} ${x2 - 90},${y2} ${x2},${y2}`;
const reparte = (n, alto, H) => Array.from({ length: n },
  (_, i) => (H - alto) / 2 + (n === 1 ? alto / 2 : (alto / (n - 1)) * i));

/* ATENCIÓN · un radar: escucha por varios canales, barre y actúa */
function esqAtencion(d) {
  const { entradas, salidas, centro } = d.diagrama;
  const H = 340, CX = 450, CY = 170, R = 74;
  const yE = reparte(entradas.length, 250, H), yS = reparte(salidas.length, 250, H);
  const vias = [...yE.map(y => curva(212, y, CX - R - 6, CY)), ...yS.map(y => curva(CX + R + 6, CY, 688, y))];
  return `
    <defs>
      <radialGradient id="halo-${d.id}">
        <stop offset="55%" stop-color="var(--purple)" stop-opacity="0"/>
        <stop offset="100%" stop-color="var(--purple)" stop-opacity=".16"/>
      </radialGradient>
      <linearGradient id="barr-${d.id}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="var(--purple)" stop-opacity=".5"/>
        <stop offset="100%" stop-color="var(--purple)" stop-opacity="0"/>
      </linearGradient>
    </defs>
    ${vias.map((v, i) => `<path class="ln" d="${v}"/><path class="ln-pulso" style="--i:${i}" d="${v}"/>`).join('')}
    <circle cx="${CX}" cy="${CY}" r="${R + 26}" fill="url(#halo-${d.id})"/>
    <circle class="anillo anillo-3" cx="${CX}" cy="${CY}" r="${R}"/>
    <circle class="anillo anillo-2" cx="${CX}" cy="${CY}" r="${R - 22}"/>
    <circle class="anillo anillo-1" cx="${CX}" cy="${CY}" r="${R - 44}"/>
    <g class="barrido" style="transform-origin:${CX}px ${CY}px">
      <path d="M ${CX},${CY} L ${CX + R},${CY} A ${R},${R} 0 0 0 ${CX + R * .72},${CY - R * .69} Z" fill="url(#barr-${d.id})"/>
    </g>
    <circle class="nucleo" cx="${CX}" cy="${CY}" r="4.5"/>
    ${yE.map((y, i) => `<g class="nd" style="--i:${i}"><circle cx="206" cy="${y}" r="4"/><text x="192" y="${y + 4}" text-anchor="end">${entradas[i]}</text></g>`).join('')}
    ${yS.map((y, i) => `<g class="nd" style="--i:${i}"><circle cx="694" cy="${y}" r="4"/><text x="708" y="${y + 4}">${salidas[i]}</text></g>`).join('')}
    <text class="et" x="192" y="26" text-anchor="end">Le llega por</text>
    <text class="et et-cen" x="${CX}" y="${CY + R + 30}" text-anchor="middle">${centro}</text>
    <text class="et" x="708" y="26">Y actúa sobre</text>`;
}

/* VENTAS · una línea que se enfría sola, y los toques que la reaniman */
function esqVentas(d) {
  const y0 = 200, x0 = 140, x1 = 770;
  const toques = [{ x: 260, t: 'A los 2 días' }, { x: 430, t: 'A los 5' }, { x: 600, t: 'A los 10' }];
  const calor = `M ${x0},${y0 - 66} C 200,${y0 - 20} 230,${y0 - 8} 260,${y0 - 62}`
    + ` C 330,${y0 - 4} 370,${y0} 430,${y0 - 70}`
    + ` C 500,${y0 - 2} 540,${y0 + 4} 600,${y0 - 76}`
    + ` C 670,${y0 + 10} 710,${y0 + 20} ${x1},${y0 + 26}`;
  return `
    <defs><linearGradient id="cal-${d.id}" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="var(--purple)" stop-opacity="0"/>
      <stop offset="100%" stop-color="var(--purple)" stop-opacity=".13"/>
    </linearGradient></defs>
    <path d="${calor} L ${x1},${y0 + 40} L ${x0},${y0 + 40} Z" fill="url(#cal-${d.id})"/>
    <path class="ln-eje" d="M ${x0},${y0 + 40} L ${x1},${y0 + 40}"/>
    <path class="ln" d="${calor}"/>
    <path class="ln-pulso ln-larga" style="--i:0" d="${calor}"/>
    <g class="nd" style="--i:0">
      <circle cx="${x0}" cy="${y0 - 66}" r="5"/>
      <text x="${x0 + 2}" y="${y0 - 84}">Presupuesto enviado</text>
    </g>
    ${toques.map((t, i) => `
      <g class="nd" style="--i:${i + 1}">
        <path class="ln-guia" d="M ${t.x},${y0 + 40} L ${t.x},${y0 - 108}"/>
        <circle cx="${t.x}" cy="${y0 - 108}" r="4"/>
        <text x="${t.x}" y="${y0 - 120}" text-anchor="middle">${t.t}</text>
      </g>`).join('')}
    <g class="nd" style="--i:4">
      <circle cx="${x1}" cy="${y0 + 26}" r="5"/>
      <text x="${x1 - 6}" y="${y0 + 66}" text-anchor="end">Frío: te avisa a ti</text>
    </g>
    <text class="et" x="${x0}" y="38">Sin nadie detrás se enfría · cada toque lo reanima</text>
    <text class="et et-cen" x="450" y="${y0 + 100}" text-anchor="middle">${d.diagrama.centro}</text>`;
}

/* FINANZAS · lo que llega suelto sale apilado, numerado y en su sitio */
function esqFinanzas(d) {
  const CY = 170;
  const sueltos = [{ x: 138, y: 74, r: -9 }, { x: 120, y: 158, r: 5 }, { x: 146, y: 242, r: -4 }];
  return `
    ${sueltos.map((s, i) => `
      <g class="nd" style="--i:${i}" transform="rotate(${s.r} ${s.x + 42} ${s.y + 26})">
        <rect class="doc doc-suelto" x="${s.x}" y="${s.y}" width="84" height="52" rx="4"/>
        <path class="doc-linea" d="M ${s.x + 12},${s.y + 19} H ${s.x + 62} M ${s.x + 12},${s.y + 32} H ${s.x + 48}"/>
      </g>`).join('')}
    ${sueltos.map((s, i) => {
      const v = curva(s.x + 92, s.y + 26, 392, CY);
      return `<path class="ln" d="${v}"/><path class="ln-pulso" style="--i:${i}" d="${v}"/>`;
    }).join('')}
    <g class="proceso">
      <rect x="392" y="${CY - 48}" width="100" height="96" rx="12"/>
      <path class="proc-linea" d="M 418,${CY - 18} H 466 M 418,${CY} H 454 M 418,${CY + 18} H 462"/>
    </g>
    <path class="ln" d="M 492,${CY} H 596"/>
    <path class="ln-pulso" style="--i:3" d="M 492,${CY} H 596"/>
    ${[0, 1, 2, 3].map(i => `
      <g class="nd" style="--i:${i + 3}">
        <rect class="doc" x="${606 + i * 7}" y="${CY - 78 + i * 40}" width="104" height="34" rx="4"/>
        <text class="doc-num" x="${620 + i * 7}" y="${CY - 56 + i * 40}">FAC 2026-0${14 + i}</text>
      </g>`).join('')}
    <text class="et" x="120" y="38">Llega suelto</text>
    <text class="et et-cen" x="442" y="${CY + 82}" text-anchor="middle">${d.diagrama.centro}</text>
    <text class="et" x="606" y="38">Sale numerado y archivado</text>`;
}

/* DATOS · el informe del lunes dibujándose solo sobre lo que ya pasó */
function esqDatos(d) {
  const base = 262, x0 = 160;
  const barras = [38, 62, 30, 74, 52, 88, 46];
  const dias = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  const linea = barras.map((h, i) => `${x0 + i * 62},${base - h - 36}`).join(' L ');
  return `
    <path class="ln-eje" d="M ${x0 - 30},${base} H 690"/>
    ${barras.map((h, i) => `
      <g class="nd" style="--i:${i}">
        <rect class="barra" x="${x0 - 13 + i * 62}" y="${base - h}" width="26" height="${h}" rx="3"/>
        <text class="dia" x="${x0 + i * 62}" y="${base + 24}" text-anchor="middle">${dias[i]}</text>
      </g>`).join('')}
    <path class="ln-tend" d="M ${linea}"/>
    ${barras.map((h, i) => `<circle class="pt" style="--i:${i}" cx="${x0 + i * 62}" cy="${base - h - 36}" r="3.5"/>`).join('')}
    <g class="nd" style="--i:7">
      <path class="ln-guia" d="M ${x0},${base - barras[0] - 36} L ${x0},76"/>
      <circle cx="${x0}" cy="76" r="4"/>
      <text x="${x0 + 14}" y="80">El correo del lunes</text>
    </g>
    <text class="et" x="${x0 - 30}" y="40">Lo que ya está pasando dentro</text>
    <text class="et et-cen" x="430" y="${base + 64}" text-anchor="middle">${d.diagrama.centro}</text>`;
}

/* MARKETING · la página como centro al que se llega y del que se sale */
function esqMarketing(d) {
  const { entradas, salidas, centro } = d.diagrama;
  const H = 340, CX = 450, CY = 162, W = 216, Hh = 138;
  const yE = reparte(entradas.length, 200, H), yS = reparte(salidas.length, 200, H);
  return `
    ${yE.map((y, i) => { const v = curva(198, y, CX - W / 2 - 8, CY); return `<path class="ln" d="${v}"/><path class="ln-pulso" style="--i:${i}" d="${v}"/>`; }).join('')}
    ${yS.map((y, i) => { const v = curva(CX + W / 2 + 8, CY, 702, y); return `<path class="ln" d="${v}"/><path class="ln-pulso" style="--i:${i + 3}" d="${v}"/>`; }).join('')}
    <g class="navegador">
      <rect x="${CX - W / 2}" y="${CY - Hh / 2}" width="${W}" height="${Hh}" rx="10"/>
      <path class="ln-eje" d="M ${CX - W / 2},${CY - Hh / 2 + 28} H ${CX + W / 2}"/>
      <circle class="pto" cx="${CX - W / 2 + 18}" cy="${CY - Hh / 2 + 14}" r="3.5"/>
      <circle class="pto" cx="${CX - W / 2 + 32}" cy="${CY - Hh / 2 + 14}" r="3.5"/>
      <circle class="pto" cx="${CX - W / 2 + 46}" cy="${CY - Hh / 2 + 14}" r="3.5"/>
      <rect class="bloque" x="${CX - W / 2 + 22}" y="${CY - 20}" width="${W - 110}" height="11" rx="3"/>
      <rect class="bloque" x="${CX - W / 2 + 22}" y="${CY}" width="${W - 66}" height="8" rx="3"/>
      <rect class="cta" x="${CX - W / 2 + 22}" y="${CY + 22}" width="84" height="24" rx="6"/>
    </g>
    ${yE.map((y, i) => `<g class="nd" style="--i:${i}"><circle cx="192" cy="${y}" r="4"/><text x="178" y="${y + 4}" text-anchor="end">${entradas[i]}</text></g>`).join('')}
    ${yS.map((y, i) => `<g class="nd" style="--i:${i}"><circle cx="708" cy="${y}" r="4"/><text x="722" y="${y + 4}">${salidas[i]}</text></g>`).join('')}
    <text class="et" x="178" y="30" text-anchor="end">Llegan de</text>
    <text class="et et-cen" x="${CX}" y="${CY + Hh / 2 + 36}" text-anchor="middle">${centro}</text>
    <text class="et" x="722" y="30">Y pueden</text>`;
}

const ESQUEMAS = { atencion: esqAtencion, ventas: esqVentas, finanzas: esqFinanzas, datos: esqDatos, marketing: esqMarketing };

function diagrama(d) {
  const { centro, entradas, salidas } = d.diagrama;
  const dibuja = ESQUEMAS[d.id] || esqAtencion;
  return `
  <figure class="esquema esquema-${d.id}" role="img"
    aria-label="${centro}: recibe por ${entradas.join(', ')} y actúa sobre ${salidas.join(', ')}.">
    <svg viewBox="0 0 900 340" preserveAspectRatio="xMidYMid meet">${dibuja(d)}</svg>
  </figure>`;
}

/* ─── El producto y sus opciones ─────────────────────────────────────────
   Un solo producto por departamento. El núcleo va siempre y no se puede
   quitar; lo demás se añade como quien elige extras de un coche. */

function bloqueProducto(pr) {
  if (!pr) return '';
  const nucleo = pieza(pr.nucleo);
  const conPrecio = pr.opciones.filter(o => o.slug && pieza(o.slug));
  const deObra = pr.opciones.filter(o => o.obra);
  const alta = calculaSetup([nucleo]).total;

  return `
    <div class="producto" id="producto-${pr.id}">
      <div class="producto-cab">
        <h3 class="producto-nombre">${pr.nombre}</h3>
        <div class="producto-precio">
          <strong>${nucleo.eur} €</strong><span>/mes</span>
          <em>+ ${alta} € de instalación</em>
        </div>
      </div>
      <p class="producto-texto">${SIN_NOMBRES(pr.nucleoTexto)}</p>

      <details class="opciones" open>
        <summary>
          <span class="magia-icono" aria-hidden="true">✦</span>
          <span class="magia-texto">
            <span class="magia-titulo">${pr.magia}</span>
            <span class="magia-sub">${conPrecio.length} cosas que puede aprender a hacer${deObra.length ? ` · ${deObra.length} más se construyen` : ''}</span>
          </span>
          <span class="magia-flecha" aria-hidden="true">▾</span>
        </summary>

        <div class="opciones-lista">
          ${conPrecio.map((o, i) => {
            const p = pieza(o.slug);
            return `
            <label class="opcion${seleccion[pr.id].has(o.slug) ? ' puesta' : ''}" style="--i:${i}">
              <input type="checkbox" data-prod="${pr.id}" data-slug="${o.slug}"
                     ${seleccion[pr.id].has(o.slug) ? 'checked' : ''}>
              <span class="opcion-cuerpo">
                <span class="opcion-titulo">${o.titulo}</span>
                <span class="opcion-texto">${o.texto}</span>
                <span class="opcion-limite">${SIN_NOMBRES(p.limite)}</span>
                ${o.aviso ? `<span class="opcion-aviso">${o.aviso}</span>` : ''}
              </span>
              <span class="opcion-precio">+${p.eur} €<i>/mes</i>${p.setup ? `<em>+${p.setup} € alta</em>` : ''}</span>
            </label>`;
          }).join('')}

          ${deObra.length ? `
            <p class="opciones-rotulo">Y esto todavía no está empaquetado</p>
            ${deObra.map((o, i) => `
              <div class="opcion opcion-obra" style="--i:${i + conPrecio.length}">
                <span class="opcion-cuerpo">
                  <span class="opcion-titulo">${o.titulo}</span>
                  <span class="opcion-texto">${o.texto}</span>
                </span>
                <span class="opcion-precio opcion-presupuesta">Se presupuesta</span>
              </div>`).join('')}` : ''}
        </div>
      </details>

      <div class="cuenta" id="cuenta-${pr.id}"></div>
    </div>`;
}

/* ─── Las insignias ──────────────────────────────────────────────────────── */

function pintaDepartamentos() {
  const cont = $('los-departamentos');
  if (!cont) return;
  cont.innerHTML = DEPARTAMENTOS.map(d => {
    const productos = PRODUCTOS[d.id] || [];
    // De primeras solo el núcleo. Nadie debe encontrarse una cuota de 164 €
    // sin haber tocado nada: si no eliges extras, quieres el producto base.
    productos.forEach(pr => { seleccion[pr.id] = new Set([pr.nucleo]); });
    return `
    <section class="dep" id="dep-${d.id}">
      <div class="seccion-inner">
        <span class="dep-etiqueta">${d.nombre}</span>
        <h2 class="dep-titulo">${d.titular}</h2>

        ${diagrama(d)}

        <div class="dep-texto">
          <div>
            <h3 class="capa-titulo">Qué es</h3>
            <p>${d.queEs}</p>
          </div>
          <div>
            <h3 class="capa-titulo">Cómo funciona dentro de un negocio</h3>
            <p>${d.comoFunciona}</p>
          </div>
        </div>

        <div class="capa capa-obra">
          <h3 class="capa-titulo">Hasta dónde puede llegar</h3>
          <p class="capa-sub">Esto es el techo, no lo que se compra hoy. No lo tenemos empaquetado, así que no
          lleva precio de catálogo: se presupuesta después de verlo y empieza en 2.500 € por cada mes de
          construcción.</p>
          <ul class="obra-lista">${d.obra.map(t => `<li>${t}</li>`).join('')}</ul>
        </div>

        <div class="hueco-video" data-dep="${d.id}">
          <span>Aquí va el vídeo de marirrobot enseñándolo funcionando</span>
        </div>

        ${productos.map(bloqueProducto).join('')}

      </div>
    </section>`;
  }).join('');

  cont.querySelectorAll('input[type=checkbox]').forEach(cb =>
    cb.addEventListener('change', () => {
      const s = seleccion[cb.dataset.prod];
      cb.checked ? s.add(cb.dataset.slug) : s.delete(cb.dataset.slug);
      cb.closest('.opcion').classList.toggle('puesta', cb.checked);
      pintaCuenta(cb.dataset.prod);
    }));

  Object.values(PRODUCTOS).flat().forEach(pr => pintaCuenta(pr.id));
}

function pintaCuenta(prodId) {
  const caja = $('cuenta-' + prodId);
  const slugs = [...seleccion[prodId]];
  if (!slugs.length) {
    caja.innerHTML = `<p class="cuenta-vacia">No has dejado nada marcado. Si ninguna te encaja, eso también es
      una respuesta — y merece más la pena contárnoslo que forzar una.</p>`;
    return;
  }
  const q = cotiza(slugs);
  const setup = calculaSetup(q.piezas);
  // El porcentaje que se aplica DE VERDAD: cuando actúa la guarda no coincide
  // con el de la tabla, y enseñar el de tabla sería mentir.
  const efectivo = (suma, total) => suma ? Math.round((1 - total / suma) * 1000) / 10 : 0;
  const pct = n => n.toLocaleString('es-ES', { maximumFractionDigits: 1 });
  const pctCuota = efectivo(q.suma, q.cuota);
  const pctAlta = efectivo(setup.suma, setup.total);

  caja.innerHTML = `
    <div class="cuenta-linea"><span>Suma de ${q.nPiezas === 1 ? 'la pieza' : 'las ' + q.nPiezas + ' piezas'}</span><span>${eur(q.suma)}</span></div>
    ${pctCuota > 0 ? `
      <div class="cuenta-linea cuenta-bonif">
        <span>Bonificación por llevar ${q.nPiezas} juntas</span>
        <span>−${eur(q.suma - q.cuota)} <i>(−${pct(pctCuota)} %)</i></span>
      </div>` : ''}
    ${q.guardaAplicada ? `
      <div class="cuenta-linea cuenta-nota">
        <span>La última entra gratis: con ${q.nPiezas - 1} ya pagabas ${eur(q.cuota)}, así que añadirla no te sube la factura. Por eso el descuento no llega al ${q.bonificacion} % de la tabla.</span><span></span>
      </div>` : ''}
    ${q.sueloAplicado ? `
      <div class="cuenta-linea cuenta-nota"><span>Mínimo por solución, con la reunión del mes y los ajustes dentro</span><span>${eur(CATALOGO.suelo)}</span></div>` : ''}
    <div class="cuenta-linea cuenta-total"><span>Tu cuota</span><span>${eur(q.cuota)}<i>/mes</i></span></div>

    ${setup.total ? `
      <div class="cuenta-linea cuenta-alta"><span>Instalación, suma de ${setup.desglose.length}</span><span>${eur(setup.suma)}</span></div>
      ${pctAlta > 0 ? `
        <div class="cuenta-linea cuenta-alta cuenta-bonif">
          <span>Bonificación por montarlas de una vez</span>
          <span>−${eur(setup.suma - setup.total)} <i>(−${pct(pctAlta)} %)</i></span>
        </div>` : ''}
      ${setup.guardaAplicada ? `
        <div class="cuenta-linea cuenta-alta cuenta-nota"><span>La última se monta gratis, por lo mismo que arriba</span><span></span></div>` : ''}
      <div class="cuenta-linea cuenta-alta cuenta-alta-total"><span>Total de instalación, una sola vez</span><span>${eur(setup.total)}</span></div>` : ''}

    <p class="cuenta-letra">Precios <strong>sin IVA</strong>. La instalación se paga <strong>50 % al empezar y 50 % al entregar</strong>. Sin permanencia: te vas cuando quieras avisando con 30 días.</p>`;
}

/* ─── El catálogo entero, de un vistazo ──────────────────────────────────── */

function pintaCatalogo() {
  const cont = $('el-catalogo');
  if (!cont) return;
  const piezas = publicables();
  const grupos = [
    { id: 'preset', titulo: 'Se configuran sobre lo que ya tenemos montado',
      pie: 'Existen y funcionan: lo que se hace es adaptarlas a tu negocio. Por eso son más baratas.',
      filtro: p => p.regimen === 'preset' },
    { id: 'medida', titulo: 'Se construyen para ti',
      pie: 'No se configuran sobre nada: se montan desde cero, y por eso llevan su propia alta.',
      filtro: p => p.regimen === 'a_medida' },
  ];
  cont.innerHTML = `
    <div class="seccion-inner">
      <span class="dep-etiqueta">El catálogo entero</span>
      <h2 class="dep-titulo">Las ${piezas.length} piezas, con su precio y su límite.</h2>
      <p class="dep-resumen">Todo lo que se puede comprar hoy está aquí. Ninguna lleva precio sin decir hasta
      dónde llega: un precio sin límite es una mentira o una trampa.</p>
      ${grupos.map(g => {
        const suyas = piezas.filter(g.filtro);
        return `
        <div class="cat-grupo">
          <h3 class="cat-grupo-titulo">${g.titulo} <span>${suyas.length}</span></h3>
          <table class="cat-tabla">
            <thead><tr><th>Pieza</th><th>Qué hace</th><th>Hasta dónde</th><th>Al mes</th>${g.id === 'medida' ? '<th>Alta</th>' : ''}</tr></thead>
            <tbody>
              ${suyas.map(p => `
                <tr>
                  <td class="cat-nombre">${nombreWeb(p)}</td>
                  <td class="cat-que">${SIN_NOMBRES((EXPLICACIONES[p.slug] || '').split('.')[0])}.</td>
                  <td class="cat-limite">${SIN_NOMBRES(p.limite)}</td>
                  <td class="cat-precio">${p.eur} €</td>
                  ${g.id === 'medida' ? `<td class="cat-alta">${p.setup ? p.setup + ' €' : '—'}</td>` : ''}
                </tr>`).join('')}
            </tbody>
          </table>
          <p class="cat-pie">${g.pie}</p>
        </div>`;
      }).join('')}
      <p class="dep-nota">El alta de las de catálogo va <strong>por solución montada</strong>, no por pieza:
      250 € hasta cinco piezas y 350 € desde seis. Y ninguna solución baja de ${eur(CATALOGO.suelo)}/mes.</p>
    </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof CATALOGO === 'undefined') return;
  pintaPuertas();
  pintaBase();
  pintaDepartamentos();
  pintaCatalogo();
});
