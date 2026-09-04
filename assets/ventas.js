/* ═══════════════════════════════════════════════════════════════════════════
   VENTAS Y CAPTACIÓN — comportamiento de la landing (04-09-2026)
   ───────────────────────────────────────────────────────────────────────────
   Esta página no calcula precios: van escritos en el HTML, con su límite al
   lado, y scripts/verificar-ventas.mjs comprueba que coinciden con
   assets/catalogo.js (la copia verificada de Supabase). Aquí solo hay FAQ,
   aparición al hacer scroll y la nav pegajosa.
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (e) {
      var q = e.target.closest('.faq-q');
      if (!q) return;
      var abierto = q.getAttribute('aria-expanded') === 'true';
      q.setAttribute('aria-expanded', String(!abierto));
      q.nextElementSibling.classList.toggle('abierta', !abierto);
    });

    var io = new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('dentro'); io.unobserve(x.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.aparece').forEach(function (el) { io.observe(el); });

    var nav = document.querySelector('.nav');
    if (nav) {
      var marca = function () { nav.classList.toggle('pegada', window.scrollY > 24); };
      marca(); addEventListener('scroll', marca, { passive: true });
    }
  });
})();
