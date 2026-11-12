/* ═══════════════════════════════════════════════════════════════════════════
   GUARDIA — filtro de datos basura para los formularios de la web
   (/diagnostico, la home y /asesoria). Decidido el 11-11-2026.

   Va antes que diagnostico.js / asesoria.js y deja en window.Guardia:
     - revisar(datos) -> lista de frases completas con lo que está mal escrito;
     - extra()        -> {sitio_web, t_ms}: el campo invisible y el tiempo.

   Lo mismo se repite en n8n («CRM · Entrada de leads» → «Validar formulario
   web»), porque un bot no pasa por el navegador. Si cambias una lista aquí,
   cámbiala allí. Allí, además, se pregunta al DNS si el dominio del correo
   existe, que desde el navegador no se puede.

   Una errata de correo (gmial.com) no se bloquea a ciegas: se propone el
   arreglo, y si la persona vuelve a pulsar sin cambiarlo, se le deja pasar.
   ═══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var DESECHABLES = ['mailinator.com','10minutemail.com','guerrillamail.com','guerrillamail.info','sharklasers.com',
    'yopmail.com','yopmail.fr','tempmail.com','temp-mail.org','tempmail.net','tmpmail.org','trashmail.com',
    'getnada.com','maildrop.cc','dispostable.com','throwawaymail.com','mintemail.com','fakeinbox.com',
    'emailondeck.com','mohmal.com','tempail.com','mailnesia.com','spamgourmet.com','mail.tm','33mail.com',
    'mailcatch.com','burnermail.io','tempr.email','discard.email','inboxkitten.com'];
  var ERRATAS = {'gmial.com':'gmail.com','gmal.com':'gmail.com','gmai.com':'gmail.com','gmail.co':'gmail.com',
    'gmail.con':'gmail.com','gmail.cm':'gmail.com','gamil.com':'gmail.com','gnail.com':'gmail.com','gmaill.com':'gmail.com',
    'hotmial.com':'hotmail.com','hotmal.com':'hotmail.com','hotmai.com':'hotmail.com','hotmail.co':'hotmail.com',
    'hotmail.con':'hotmail.com','hotmil.com':'hotmail.com','homail.com':'hotmail.com','hotmial.es':'hotmail.es',
    'hotmal.es':'hotmail.es','outlok.com':'outlook.com','outllok.com':'outlook.com','outlook.co':'outlook.com',
    'outlok.es':'outlook.es','yahooo.es':'yahoo.es','yaho.es':'yahoo.es','yahoo.co':'yahoo.com',
    'iclod.com':'icloud.com','icloud.co':'icloud.com','iclud.com':'icloud.com'};
  var TERMINACION = { con: 'com', cmo: 'com', ocm: 'com', comm: 'com', coom: 'com', ess: 'es' };
  var BASURA = /^(test|testing|prueba|pruebas|asdf\w*|qwer\w*|zxcv\w*|aaa+|xxx+|abc|abcd|nombre|ninguno|nada|na|n\/a|no|sdf\w*|fake|fulano|mengano)$/i;
  var LOCAL_BASURA = /^(test|prueba|asdf\w*|qwer\w*|aaa+|xxx+|fake|noreply|no-reply)$/i;
  var LETRA = /[A-Za-zÀ-ÖØ-öø-ÿ]/;

  var inicio = Date.now();
  var propuesta = null; // la errata que ya le hemos señalado

  // El campo invisible: una persona no lo ve ni lo rellena; un bot sí.
  var form = document.getElementById('as-form');
  if (form && !form.querySelector('[name=sitio_web]')) {
    var trampa = document.createElement('div');
    trampa.setAttribute('aria-hidden', 'true');
    trampa.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden';
    trampa.innerHTML = '<label>Tu web<input type="text" name="sitio_web" tabindex="-1" autocomplete="off"></label>';
    form.appendChild(trampa);
  }

  function repetida(s) { return /^(.)\1+$/i.test(s.replace(/\s/g, '')); }

  function revisar(d) {
    var q = [];
    var nombre = (d.nombre || '').trim();
    if (nombre && (!/^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ .'’-]*$/.test(nombre) ||
        nombre.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ]/g, '').length < 2 || BASURA.test(nombre) || repetida(nombre))) {
      q.push('Escribe tu nombre de verdad, solo con letras.');
    }
    var empresa = (d.sector || '').trim();
    if (empresa && (empresa.length < 3 || !LETRA.test(empresa) || BASURA.test(empresa) || repetida(empresa))) {
      q.push('Escribe el nombre real de tu empresa.');
    }
    var correo = (d.email || '').trim().toLowerCase();
    if (correo) {
      if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(correo)) {
        q.push('Revisa el correo: tiene que ser como nombre@empresa.es.');
      } else {
        var partes = correo.split('@'), dominio = partes[1];
        var ext = dominio.split('.').pop();
        var arreglo = ERRATAS[dominio] ||
          (TERMINACION[ext] ? dominio.replace(/\.[a-z]+$/, '.' + TERMINACION[ext]) : null);
        if (LOCAL_BASURA.test(partes[0])) {
          q.push('Escribe tu correo real.');
        } else if (DESECHABLES.indexOf(dominio) !== -1) {
          q.push('Usa un correo que no sea temporal: te enviaremos el informe ahí.');
        } else if (arreglo && propuesta !== correo) {
          propuesta = correo;
          q.push('¿Tu correo es ' + partes[0] + '@' + arreglo + '? Corrígelo. Si de verdad termina en ' + dominio +
                 ', vuelve a pulsar el botón.');
        }
      }
    }
    return q;
  }

  function extra() {
    var campo = form && form.querySelector('[name=sitio_web]');
    return { sitio_web: campo ? campo.value : '', t_ms: Date.now() - inicio };
  }

  window.Guardia = { revisar: revisar, extra: extra };
})();
