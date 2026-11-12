/* ═══════════════════════════════════════════════════════════════════════════
   DIAGNÓSTICO — la lógica del formulario de /diagnostico y de la home.

   Pregunta personas, provincia y departamento (los filtros de la oferta).
   Desde el 11-11-2026 viaja TAL CUAL al flujo común «CRM · Entrada de leads»
   (webhook /asesoria, nodo «Validar formulario web»), que entiende estos
   campos. Si cambias un nombre o un valor aquí, cámbialo allí el mismo día.
   La guardia anti-basura está en guardia-form.js.
   ═══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var WEBHOOK = 'https://isman8nproyect.cloud/webhook/asesoria';

  var form   = document.getElementById('as-form');
  var boton  = document.getElementById('as-enviar');
  var aviso  = document.getElementById('as-error');
  var otro   = document.getElementById('as-otro');
  if (!form) return;

  /* ─── «Otra cosa» abre su campo ─────────────────────────────────────── */
  form.addEventListener('change', function (e) {
    if (e.target.name !== 'problema') return;
    // Ya no es un radio: "Otra cosa" convive con las demas, asi que el campo se
    // abre cuando ESA casilla esta marcada y se cierra cuando se desmarca.
    var otraCasilla = form.querySelector('[name=problema][value=otra]');
    var abierta = otraCasilla && otraCasilla.checked;
    otro.classList.toggle('as-oculto', !abierta);
    if (abierta && e.target.value === 'otra') otro.querySelector('input').focus();
    if (!abierta) otro.querySelector('input').value = '';
  });

  /* ─── Validación, en el idioma de la pregunta ───────────────────────── */
  var ETIQUETAS = {
    nombre:   'tu nombre',
    email:    'tu correo',
    sector:    'tu empresa y a qué se dedica',
    personas:  'cuántas personas sois',
    provincia: 'dónde está la empresa',
    problema:  'marcar al menos un departamento',
    horas:     'cuántas horas se van a la semana',
    decide:    'si eres quien dirige'
  };

  function faltan(datos) {
    var falta = [];
    Object.keys(ETIQUETAS).forEach(function (campo) {
      var v = datos[campo];
      var vacio = Array.isArray(v) ? v.length === 0 : !v;
      if (vacio) falta.push(ETIQUETAS[campo]);
    });
    if (datos.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(datos.email)) {
      falta.push('un correo que se pueda escribir');
    }
    return falta;
  }

  function quejarse(lista) {
    aviso.textContent = lista.length === 1
      ? 'Te falta ' + lista[0] + '.'
      : lista.length === 2
        ? 'Te faltan un par de cosas: ' + lista.join(' y ') + '.'
        : 'Te falta por contestar: ' + lista.join(', ') + '.';
    aviso.hidden = false;
    aviso.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* ─── Envío ─────────────────────────────────────────────────────────── */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    aviso.hidden = true;

    var f = new FormData(form);
    var datos = {};
    ['nombre', 'email', 'sector', 'personas', 'provincia', 'problema_otro', 'horas', 'decide']
      .forEach(function (k) { datos[k] = (f.get(k) || '').toString().trim(); });

    // La 3 admite varias desde el 27-08. Viaja como lista, siempre: que a veces
    // sea texto y a veces lista es como se rompen los flujos en silencio.
    datos.problema = f.getAll('problema').map(function (v) { return v.toString(); });

    var pendientes = faltan(datos);
    if (datos.problema.indexOf('otra') !== -1 && !datos.problema_otro) {
      pendientes.push('cuál es ese otro departamento');
    }
    if (!f.get('privacidad')) {
      pendientes.push('aceptar la política de privacidad');
    }
    if (pendientes.length) { quejarse(pendientes); return; }
    // Lo que está pero mal escrito (guardia-form.js) va con su propia frase.
    var malos = window.Guardia ? window.Guardia.revisar(datos) : [];
    if (malos.length) {
      aviso.textContent = malos.join(' ');
      aviso.hidden = false;
      aviso.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    var url = new URLSearchParams(window.location.search);
    var envio = {
      nombre: datos.nombre, email: datos.email, sector: datos.sector,
      personas: datos.personas, provincia: datos.provincia,
      departamentos: datos.problema, problema_otro: datos.problema_otro,
      horas: datos.horas, decide: datos.decide,
      formulario: 'diagnostico', pagina: window.location.pathname
    };
    if (window.Guardia) { var x = window.Guardia.extra(); envio.sitio_web = x.sitio_web; envio.t_ms = x.t_ms; }
    envio.origen_pieza = url.get('p') || null;
    envio.canal        = url.get('c') || 'web';
    envio.timestamp    = new Date().toISOString();
    envio.source       = 'diagnostico-formulario';

    boton.disabled = true;
    boton.textContent = 'Un segundo…';

    fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Web-Token': 'mweb-2026-xk9p' },
      body: JSON.stringify(envio),
      keepalive: true
    })
      .catch(function () { /* la cita importa más que el formulario. Ver cabecera. */ })
      .then(function () { alCalendario(datos); });
  });


  /* ─── Paso 2 ────────────────────────────────────────────────────────── */
  function alCalendario(datos) {
    var nombre = datos.nombre.split(' ')[0];
    if (nombre) {
      document.getElementById('as-titulo-cita').innerHTML =
        escapar(nombre) + ', elige <em class="acento">la primera llamada</em>';
    }

    document.getElementById('paso-form').classList.add('as-oculto');
    document.getElementById('paso-cita').classList.remove('as-oculto');

    // A diferencia de /asesoria, aquí el formulario va al FINAL de la página
    // (en /diagnostico y en la home), con secciones encima. Subir arriba del
    // todo dejaba el calendario fuera de pantalla: se baja hasta él, dejando
    // sitio al menú fijo.
    var cita = document.getElementById('paso-cita');
    var y = cita.getBoundingClientRect().top + window.pageYOffset - 96;
    window.scrollTo({ top: y, behavior: 'auto' });

    pintarCalendario(datos);
  }

  function pintarCalendario(datos) {
    // El embed oficial. Un iframe a pelo a cal.com carga en blanco, asi que va
    // por aqui — y de paso admite prefill, que es lo que evita que reescriba
    // el nombre y el correo que acaba de escribir.
    try {
      window.Cal('inline', {
        elementOrSelector: '#as-cal',
        calLink: 'marirrodriga-ia/llamada',
        config: {
          layout: 'month_view',
          name:  datos.nombre,
          email: datos.email
        }
      });
    } catch (e) {
      respaldo();
      return;
    }

    // La senal de que ha pintado DE VERDAD es 'linkReady', no que exista el
    // iframe: el iframe se crea al instante y se queda girando, asi que mirarlo
    // daria por bueno justo el caso que esto tiene que cazar.
    var listo = false;
    try {
      window.Cal('on', { action: 'linkReady', callback: function () { listo = true; } });
    } catch (e) { /* si ni eso va, que decida el reloj */ }

    setTimeout(function () { if (!listo) respaldo(); }, 8000);
  }

  // El respaldo NO esconde el calendario: se pone debajo. Si Cal.com tarda diez
  // segundos en vez de ocho, taparlo seria quitarle al visitante lo que acaba
  // de aparecer.
  function respaldo() {
    document.getElementById('as-respaldo').classList.remove('as-oculto');
  }

  function escapar(t) {
    return String(t).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
})();
