/* ═══════════════════════════════════════════════════════════════════════════
   DIAGNÓSTICO — la lógica del formulario de /diagnostico.

   Es asesoria.js con dos cambios, y el segundo es un APAÑO CON FECHA:

   1) Pregunta personas y provincia (los filtros de la oferta) y no pregunta
      «qué has probado».

   2) Viaja al MISMO webhook que /asesoria (flujo «Asesoria · clasificar y
      preparar la llamada»), que valida contra listas blancas pensadas para la
      media hora. Lo que no está en su lista lo tira sin avisar. Para no perder
      nada mientras ese flujo no tenga rama propia para el diagnóstico:
        - las horas se traducen a sus tramos;
        - «pedidos» no existe allí: va como «otra» con el texto en problema_otro;
        - empresa, personas y provincia van DENTRO de `sector`, con la marca
          [DIAGNÓSTICO], para que se vean en la base y en el correo de aviso.
      PENDIENTE (11-11-2026): rama propia en n8n y quitar esta traducción.
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
    problema:  'marcar al menos una cosa de las que os roban tiempo',
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
    ['nombre', 'email', 'sector', 'personas', 'provincia', 'problema_otro', 'horas', 'decide']
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

    var url = new URLSearchParams(window.location.search);
    var envio = traducir(datos);
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


  /* ─── La traducción al contrato del flujo de /asesoria (ver cabecera) ── */
  var HORAS = { menos_5: '2_5', '5_15': '5_10', '15_40': 'mas_10', mas_40: 'mas_10' };
  var VALIDOS = ['mensajes', 'citas', 'cobros', 'papeleo', 'clientes', 'numeros', 'otra'];
  var PERSONAS = { '1_4': '1-4', '5_15': '5-15', '16_50': '16-50', mas_50: 'más de 50' };

  function traducir(d) {
    var problema = d.problema.filter(function (p) { return VALIDOS.indexOf(p) !== -1; });
    var otro = d.problema_otro;
    if (d.problema.indexOf('pedidos') !== -1) {
      if (problema.indexOf('otra') === -1) problema.push('otra');
      otro = 'Pedidos que llegan por teléfono, WhatsApp o correo' + (otro ? ' · ' + otro : '');
    }
    return {
      nombre: d.nombre,
      email: d.email,
      sector: '[DIAGNÓSTICO] ' + d.sector + ' · ' + (PERSONAS[d.personas] || d.personas) +
              ' personas · ' + (d.provincia === 'fuera_cyl' ? 'fuera de CyL' : d.provincia) +
              ' · horas/semana: ' + d.horas,
      problema: problema,
      problema_otro: otro,
      horas: HORAS[d.horas] || '',
      decide: d.decide,
      personas: d.personas,
      provincia: d.provincia,
      horas_reales: d.horas
    };
  }

  /* ─── Paso 2 ────────────────────────────────────────────────────────── */
  function alCalendario(datos) {
    var nombre = datos.nombre.split(' ')[0];
    if (nombre) {
      document.getElementById('as-titulo-cita').innerHTML =
        escapar(nombre) + ', elige <em class="acento">la primera llamada</em>';
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
