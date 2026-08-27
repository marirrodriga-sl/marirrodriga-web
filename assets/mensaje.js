/* ═══════════════════════════════════════════════════════════════════════════
   REDACTAR EL PRIVADO — herramienta interna.

   Manda los cuatro datos al flujo de n8n y pinta lo que devuelve, editable.
   Editable a propósito: el texto sale bien casi siempre, pero quien lo manda
   es una persona y tiene que poder quitarle una frase antes de pegarlo.

   Los avisos NO bloquean. Es al revés que el editor de posts: allí un fallo
   sale publicado y aquí lo lee Ismael antes de mandarlo. Lo que sí avisan es
   de lo que un ojo humano no pilla — sobre todo un precio que no está en el
   catálogo, que es la única mentira cara de este mensaje.
   ═══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var WEBHOOK = 'https://isman8nproyect.cloud/webhook/privado-linkedin';

  var form  = document.getElementById('ms-form');
  var boton = document.getElementById('ms-enviar');
  var aviso = document.getElementById('ms-error');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    aviso.hidden = true;

    var f = new FormData(form);
    var datos = {
      nombre:     (f.get('nombre') || '').toString().trim(),
      sector:     (f.get('sector') || '').toString().trim(),
      tema:       (f.get('tema') || 'mensajes').toString(),
      palabra:    (f.get('palabra') || '').toString().trim(),
      comentario: (f.get('comentario') || '').toString().trim()
    };

    if (!datos.nombre) {
      aviso.textContent = 'Sin su nombre no hay mensaje que escribir.';
      aviso.hidden = false;
      return;
    }

    boton.disabled = true;
    boton.textContent = 'Escribiendo…';

    fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Web-Token': 'mweb-2026-xk9p' },
      body: JSON.stringify(datos)
    })
      .then(function (r) {
        if (!r.ok) throw new Error('El flujo ha contestado ' + r.status);
        return r.json();
      })
      .then(function (d) {
        pintar(Array.isArray(d) ? d[0] : d);
      })
      .catch(function (err) {
        aviso.textContent = 'No ha salido: ' + err.message + '. Vuelve a darle.';
        aviso.hidden = false;
      })
      .then(function () {
        boton.disabled = false;
        boton.textContent = 'Escribir el mensaje';
      });
  });

  function pintar(d) {
    var caja = document.getElementById('ms-avisos');
    var avisos = d.avisos || [];

    document.getElementById('ms-texto').value = d.mensaje || '';
    document.getElementById('ms-para').textContent =
      'Para ' + (d.para || '') + (d.sector ? ' · ' + d.sector : '') +
      ' · ' + (d.mensaje || '').length + ' caracteres';

    if (avisos.length) {
      caja.innerHTML = '<strong>Míralo antes de mandarlo:</strong><ul>' +
        avisos.map(function (a) { return '<li>' + escapar(a) + '</li>'; }).join('') + '</ul>';
      caja.classList.remove('as-oculto');
    } else {
      caja.classList.add('as-oculto');
    }

    document.getElementById('ms-salida').classList.remove('as-oculto');
    document.getElementById('ms-salida').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.getElementById('ms-copiar').addEventListener('click', function () {
    var campo = document.getElementById('ms-texto');
    var boton = this;
    var listo = function () {
      boton.textContent = '✓ Copiado';
      setTimeout(function () { boton.textContent = 'Copiar'; }, 1800);
    };
    // El portapapeles moderno falla en http y en algunos navegadores; el select
    // de toda la vida no falla nunca.
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(campo.value).then(listo, function () { aLaAntigua(campo, listo); });
    } else {
      aLaAntigua(campo, listo);
    }
  });

  function aLaAntigua(campo, listo) {
    campo.select();
    try { document.execCommand('copy'); listo(); } catch (e) { /* que copie a mano */ }
    window.getSelection().removeAllRanges();
  }

  document.getElementById('ms-otro').addEventListener('click', function () {
    document.getElementById('ms-salida').classList.add('as-oculto');
    form.querySelector('[name=nombre]').value = '';
    form.querySelector('[name=palabra]').value = '';
    form.querySelector('[name=comentario]').value = '';
    form.querySelector('[name=nombre]').focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  function escapar(t) {
    return String(t).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
})();
