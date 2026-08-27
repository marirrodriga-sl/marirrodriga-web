/* ═══════════════════════════════════════════════════════════════════════════
   ASESORÍA — la lógica del formulario del regalo.

   Tres cosas que no son obvias y por eso están escritas:

   1) EL ORIGEN NO SE PREGUNTA. Llega en la URL: ?p= es la pieza (el uuid de
      contenido_piezas) y ?c= el canal. El enlace del primer comentario lo lleva
      puesto. Preguntarle a alguien cómo nos ha conocido, cuando ya lo sabemos,
      es cobrarle un campo por nada — y encima contesta peor que la URL.

   2) SI FALLA EL ENVÍO, SE SIGUE A LA CITA IGUAL. Una cita cogida vale mucho
      más que un formulario guardado: lo segundo es contexto, lo primero es la
      reunión. Si el webhook se cae, Cal.com avisa igualmente y la llamada se
      hace a ciegas, que es exactamente como se hacían antes de todo esto.

   3) EL NOMBRE Y EL CORREO VAN A CAL.COM YA PUESTOS. Acaba de escribirlos; que
      los repita es la clase de fricción tonta que hace abandonar en el paso
      donde ya habías ganado.

   El X-Web-Token es el mismo apaño que usa app.js. Va en el navegador, así que
   no es un secreto: es un badén para bots tontos, no seguridad.
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
    sector:   'a qué te dedicas',
    problema: 'marcar al menos una cosa de las que te roban tiempo',
    horas:    'cuánto tiempo se te va a la semana',
    decide:   'si la decisión es tuya',
    intento:  'si ya has intentado arreglarlo'
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
      : 'Te faltan un par de cosas: ' + lista.join(', ') + '.';
    aviso.hidden = false;
    aviso.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* ─── Envío ─────────────────────────────────────────────────────────── */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    aviso.hidden = true;

    var f = new FormData(form);
    var datos = {};
    ['nombre', 'email', 'sector', 'problema_otro', 'horas', 'decide', 'intento']
      .forEach(function (k) { datos[k] = (f.get(k) || '').toString().trim(); });

    // La 3 admite varias desde el 27-08. Viaja como lista, siempre: que a veces
    // sea texto y a veces lista es como se rompen los flujos en silencio.
    datos.problema = f.getAll('problema').map(function (v) { return v.toString(); });

    var pendientes = faltan(datos);
    if (datos.problema.indexOf('otra') !== -1 && !datos.problema_otro) {
      pendientes.push('cuál es esa otra cosa');
    }
    if (!f.get('privacidad')) {
      pendientes.push('aceptar la política de privacidad');
    }
    if (pendientes.length) { quejarse(pendientes); return; }

    // El origen, de la URL. Si no viene nada, es que ha entrado a pelo.
    var url = new URLSearchParams(window.location.search);
    datos.origen_pieza = url.get('p') || null;
    datos.canal        = url.get('c') || 'directo';
    datos.timestamp    = new Date().toISOString();
    datos.source       = 'asesoria-formulario';

    boton.disabled = true;
    boton.textContent = 'Un segundo…';

    fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Web-Token': 'mweb-2026-xk9p' },
      body: JSON.stringify(datos),
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
        escapar(nombre) + ', elige tú <em class="acento">el hueco</em>';
    }

    document.getElementById('paso-form').classList.add('as-oculto');
    document.getElementById('paso-cita').classList.remove('as-oculto');

    // El hero se retira: ya ha hecho su trabajo, y dejarlo puesto era lo que
    // hacia que al enviar el formulario la pagina te devolviera arriba del todo
    // -- a la portada otra vez -- y el calendario quedara fuera de pantalla,
    // esperando a que volvieras a bajar. Sin hero, arriba ES el calendario.
    var hero = document.querySelector('.as-hero');
    if (hero) hero.classList.add('as-oculto');
    // El logo estaba en blanco para el hero oscuro: sin hero hay que devolverlo
    // a tinta o se queda invisible sobre el fondo claro.
    document.body.classList.add('sin-hero');

    window.scrollTo({ top: 0, behavior: 'auto' });

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
