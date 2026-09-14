/* Marca de dónde sale cada botón de demo.
   ─────────────────────────────────────────────────────────────────────────
   Añade ?origen=/la-pagina a los enlaces de reserva, que Cal.com recoge en un
   campo OCULTO del formulario. Sirve para saber qué landings producen demos y
   decidir dónde merece la pena seguir invirtiendo.

   Ojo con la distinción, que costó una conversación: esto NO dice qué quiere
   el cliente. Eso lo contesta él en «¿Qué te interesa ver?», y ese campo se
   deja en blanco a propósito. Rellenárselo por adelantado desde la página
   convertiría una pregunta en un valor por defecto: el lead ve una respuesta
   puesta, le da a continuar sin pensar, y acabas con un dato que PARECE
   deliberado y no lo es. Peor que no tenerlo, porque preparas la demo
   fiándote de él.

   Son dos preguntas distintas —qué quiere y de dónde vino— y van en dos
   campos distintos para que una no contamine a la otra.

   Va en su propio fichero y no dentro de nav.js porque asesoria.html no
   carga el menú y sí tiene botón de reserva.

   14-09-2026 · GOOGLE ADS. Si la visita llega de un anuncio, la URL trae el
   identificador del clic (gclid, o gbraid/wbraid desde iPhone) y las utm_* del
   sufijo de la cuenta. Van pegadas al mismo campo oculto, detrás de la página:
   «/l/software-peluqueria?gclid=…&utm_campaign=…». Así Cal.com no se toca, y
   n8n («MUSA · La cita de Cal.com al CRM») lo separa y lo guarda en
   leads.atribucion, de donde sale la conversión que se devuelve a Google.
   No se guarda nada en el navegador: solo vale si reserva desde la misma
   página a la que llegó, que es justo lo que hace una landing de anuncio.
   ───────────────────────────────────────────────────────────────────────── */
(function () {
  var origen = location.pathname.replace(/\/+$/, '') || '/';

  var CLAVES = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium',
                'utm_campaign', 'utm_term', 'utm_content'];
  try {
    var entrada = new URLSearchParams(location.search);
    var campana = new URLSearchParams();
    CLAVES.forEach(function (k) {
      var v = entrada.get(k);
      if (v) campana.set(k, v.slice(0, 200));
    });
    if (campana.toString()) origen += '?' + campana.toString();
  } catch (e) {
    /* Sin URLSearchParams se queda solo la página, que es lo que había. */
  }

  var enlaces = document.querySelectorAll('a[href*="cal.com/marirrodriga-ia"]');
  Array.prototype.forEach.call(enlaces, function (a) {
    try {
      var u = new URL(a.href);
      /* Si alguien ya lo puso a mano en el HTML, manda el suyo */
      if (!u.searchParams.has('origen')) {
        u.searchParams.set('origen', origen);
        a.href = u.toString();
      }
    } catch (e) {
      /* Una URL que no se puede interpretar se deja como estaba: el campo es
         opcional y perder el origen no puede costar una reserva. */
    }
  });
})();
