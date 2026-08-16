    // ═══════════════════════════════════════════════════════════════════════
    // Lo que queda en pie tras la demolición del 16-08-2026.
    //
    // Se fueron con sus secciones: el carrito y su modal, el modal openOB(),
    // el modal de Softwares entero (SW_DATA, Bookia, Dentia y sus plantillas),
    // las 16 demos de la carta con su runner, el simulador de facturas, el
    // clasificador de documentos, el cualificador de leads y la petición de
    // sector. Todo eso está en el backup si hiciera falta rescatar algo.
    //
    // El HTML solo llama ya a dos funciones: bookCall y submitContact.
    // Si añades una tercera, que sea porque el HTML la pide.
    // ═══════════════════════════════════════════════════════════════════════

    // ─── RESERVA DE LLAMADA (Cal.com) ────────────────────────
    // Tipo de evento "llamada" (Llamada gratuita, 30 min), el mismo que enlazan
    // los correos del workflow CONTACTO leads y los cuatro bots de la agencia.
    const CALCOM_URL = "https://cal.com/marirrodriga-ia/llamada";
    function bookCall() {
      if (CALCOM_URL.includes('PENDIENTE')) {
        document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
      } else {
        window.open(CALCOM_URL, '_blank');
      }
    }

    // ─── FORMULARIO DE CONTACTO ──────────────────────────────
    function submitContact() {
      const nombre = document.getElementById('contact-nombre').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const mensaje = document.getElementById('contact-mensaje').value.trim();
      if (!nombre || !email) { alert('Por favor, rellena tu nombre y email.'); return; }
      if (!document.getElementById('contact-privacidad').checked) { alert('Para enviar el formulario, acepta la política de privacidad.'); return; }
      fetch('https://isman8nproyect.cloud/webhook/contacto-web', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Web-Token': 'mweb-2026-xk9p' },
        body: JSON.stringify({ nombre, email, mensaje, timestamp: new Date().toISOString(), source: 'marirrodriga-web-contacto' })
      }).catch(() => {});
      document.getElementById('contact-form-content').style.display = 'none';
      document.getElementById('contact-success').style.display = 'block';
    }
