// ═══════════════════════════════════════════════════════════════════════════
// MENÚ DE NAVEGACIÓN — desplegables de escritorio y panel móvil.
//
// Va en fichero aparte y no inline porque el mismo menú vive en once páginas.
// La clase .pegada del scroll sigue donde estaba, en el script de cada página:
// no se toca lo que ya funciona.
//
// En escritorio los grupos abren al pasar el ratón Y al pulsar, porque con solo
// hover no hay forma de llegar con el teclado. El estado real lo lleva el
// atributo data-abierto; aria-expanded va detrás para el lector de pantalla.
// ═══════════════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var grupos = Array.prototype.slice.call(document.querySelectorAll('.nav-grupo'));
    var burger = document.querySelector('.nav-burger');
    var movil = document.querySelector('.nav-movil');

    // ─── Desplegables de escritorio ──────────────────────────────────────
    function abrir(g) {
      grupos.forEach(function (o) { if (o !== g) cerrar(o); });
      g.setAttribute('data-abierto', '');
      var b = g.querySelector('.nav-grupo-btn');
      if (b) b.setAttribute('aria-expanded', 'true');
    }

    function cerrar(g) {
      g.removeAttribute('data-abierto');
      var b = g.querySelector('.nav-grupo-btn');
      if (b) b.setAttribute('aria-expanded', 'false');
    }

    function cerrarTodos() { grupos.forEach(cerrar); }

    grupos.forEach(function (g) {
      var btn = g.querySelector('.nav-grupo-btn');
      if (!btn) return;

      g.addEventListener('mouseenter', function () { abrir(g); });
      g.addEventListener('mouseleave', function () { cerrar(g); });

      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (g.hasAttribute('data-abierto')) cerrar(g); else abrir(g);
      });

      // El foco saliendo del grupo entero lo cierra: así el tabulador recorre
      // el panel y al salir por el último enlace no se queda abierto detrás.
      g.addEventListener('focusout', function (e) {
        if (!g.contains(e.relatedTarget)) cerrar(g);
      });
      g.addEventListener('focusin', function () { abrir(g); });
    });

    // ─── Panel móvil ─────────────────────────────────────────────────────
    function cerrarMovil() {
      if (!movil) return;
      movil.removeAttribute('data-abierto');
      if (burger) burger.setAttribute('aria-expanded', 'false');
      document.body.style.removeProperty('overflow');
    }

    if (burger && movil) {
      burger.addEventListener('click', function () {
        var abierto = movil.hasAttribute('data-abierto');
        if (abierto) {
          cerrarMovil();
        } else {
          movil.setAttribute('data-abierto', '');
          burger.setAttribute('aria-expanded', 'true');
          document.body.style.overflow = 'hidden';
        }
      });

      // Al elegir destino se cierra. Con un ancla de la misma página es
      // imprescindible: sin esto el panel tapa aquello a lo que acabas de saltar.
      movil.addEventListener('click', function (e) {
        if (e.target.closest('a')) cerrarMovil();
      });
    }

    // ─── Cierres globales ────────────────────────────────────────────────
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      cerrarTodos();
      if (movil && movil.hasAttribute('data-abierto')) {
        cerrarMovil();
        if (burger) burger.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-grupo')) cerrarTodos();
      if (movil && movil.hasAttribute('data-abierto') &&
          !e.target.closest('.nav-movil') && !e.target.closest('.nav-burger')) {
        cerrarMovil();
      }
    });

    // Al pasar de móvil a escritorio el panel se queda abierto e invisible,
    // con el scroll del body todavía bloqueado. Se cierra al cruzar el corte.
    var ancho = window.matchMedia('(min-width: 861px)');
    var alCruzar = function (m) { if (m.matches) cerrarMovil(); };
    if (ancho.addEventListener) ancho.addEventListener('change', alCruzar);
    else if (ancho.addListener) ancho.addListener(alCruzar);
  });
})();
