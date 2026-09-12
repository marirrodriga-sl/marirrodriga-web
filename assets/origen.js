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
   ───────────────────────────────────────────────────────────────────────── */
(function () {
  var origen = location.pathname.replace(/\/+$/, '') || '/';

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
