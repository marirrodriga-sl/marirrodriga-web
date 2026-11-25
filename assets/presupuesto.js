/* ═══════════════════════════════════════════════════════════════════════════
   PRESUPUESTO A MEDIDA — el quinto cuadro de los precios de cada departamento
   (25-11-2026). Para quien no encaja en ninguna banda.

   Envía al flujo común «CRM · Entrada de leads» (webhook /asesoria) con
   formulario='presupuesto'; allí el nodo «Preparar entrada web» lo resume para
   el CRM y el Telegram. Si cambias un nombre de campo aquí, cámbialo allí.
   El filtro de texto es el de guardia-form.js (window.Guardia.revisar); el
   campo trampa y el tiempo mínimo van aquí, porque Guardia solo vigila #as-form.
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var WEBHOOK = 'https://isman8nproyect.cloud/webhook/asesoria';
  var form = document.getElementById('presu-form');
  if (!form) return;
  var boton = document.getElementById('presu-enviar');
  var aviso = document.getElementById('presu-error');
  var ok = document.getElementById('presu-ok');
  var inicio = Date.now();

  function quejarse(frases) {
    aviso.textContent = frases.join(' ');
    aviso.hidden = false;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    aviso.hidden = true;
    var f = new FormData(form);
    var d = {};
    ['nombre', 'sector', 'email', 'telefono', 'mensaje', 'sitio_web'].forEach(function (k) {
      d[k] = (f.get(k) || '').toString().trim();
    });
    d.funciones = f.getAll('funciones').map(String);

    var faltan = [];
    if (!d.nombre) faltan.push('tu nombre');
    if (!d.sector) faltan.push('tu empresa');
    if (!d.email) faltan.push('tu correo');
    if (!d.mensaje && !d.funciones.length) faltan.push('qué necesitas (marca algo o escríbelo)');
    if (!f.get('privacidad')) faltan.push('aceptar la política de privacidad');
    if (faltan.length) { quejarse(['Falta ' + faltan.join(', ') + '.']); return; }

    var malos = window.Guardia ? window.Guardia.revisar(d) : [];
    if (malos.length) { quejarse(malos); return; }

    var url = new URLSearchParams(window.location.search);
    var envio = {
      nombre: d.nombre, email: d.email, sector: d.sector, telefono: d.telefono,
      departamento: form.getAttribute('data-departamento'), funciones: d.funciones, mensaje: d.mensaje,
      formulario: 'presupuesto', source: 'presupuesto-formulario', pagina: window.location.pathname,
      sitio_web: d.sitio_web, t_ms: Date.now() - inicio,
      canal: url.get('c') || 'web', origen_pieza: url.get('p') || null,
      timestamp: new Date().toISOString()
    };

    boton.disabled = true;
    boton.textContent = 'Enviando…';
    fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Web-Token': 'mweb-2026-xk9p' },
      body: JSON.stringify(envio),
      keepalive: true
    }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      form.hidden = true;
      ok.hidden = false;
    }).catch(function () {
      boton.disabled = false;
      boton.textContent = 'Pedir mi presupuesto';
      quejarse(['No se ha podido enviar. Escríbenos a contacto@marirrodriga-ia.com o por WhatsApp al 675 148 566.']);
    });
  });
})();
