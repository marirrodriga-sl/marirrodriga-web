/* Plazas del diagnóstico gratis, en vivo (12-11-2026).

   El número escrito en cada página (<span class="plazas-n">) es el de reserva:
   si esto falla, se queda ese. Aquí se pregunta a n8n («Web · Plazas del
   diagnóstico»), que devuelve el total menos los leads que Ismael ha pasado a
   la etapa «Diagnóstico» en el CRM. Ninguna clave pasa por aquí. */
(function () {
  var huecos = document.querySelectorAll('.plazas-n');
  if (!huecos.length || !window.fetch) return;

  fetch('https://isman8nproyect.cloud/webhook/plazas-diagnostico')
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (d) {
      var n = d && Number(d.quedan);
      if (!d || !isFinite(n) || n < 0) return;
      Array.prototype.forEach.call(huecos, function (s) {
        s.textContent = String(n);
        // «Quedan solo 1 plazas» → «Queda solo 1 plaza»
        var antes = s.previousSibling, despues = s.nextSibling;
        var uno = n === 1;
        if (antes && antes.nodeType === 3) {
          antes.nodeValue = uno ? antes.nodeValue.replace(/Quedan(\s+solo)?\s*$/, 'Queda$1 ') : antes.nodeValue.replace(/Queda(\s+solo)?\s*$/, 'Quedan$1 ');
        }
        if (despues && despues.nodeType === 3) {
          despues.nodeValue = uno ? despues.nodeValue.replace(/^\s*plazas\b/, ' plaza') : despues.nodeValue.replace(/^\s*plaza\b/, ' plazas');
        }
      });
    })
    .catch(function () { /* se queda el número escrito */ });
})();
