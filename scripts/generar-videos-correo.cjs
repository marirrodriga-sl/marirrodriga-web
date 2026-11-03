/* Páginas /v/citia y /v/asistentes: el vídeo explicativo que se enlaza desde los correos en frío,
   y debajo la reserva de la reunión con Isma. Escritas a mano (no salen de soluciones.cjs): noindex,
   fuera del sitemap. Uso: node scripts/generar-videos-correo.cjs  (03-11-2026) */
const fs = require('fs');
const path = require('path');

const CAL = 'https://cal.com/marirrodriga-ia/llamada';
const WA = 'https://wa.me/34643102630';

const PAGINAS = [
  {
    slug: 'citia',
    titulo: 'Citia en 100 segundos',
    descripcion: 'Agenda, reserva online y un agente de WhatsApp para negocios de citas. Funciones, retorno y precios, en un vídeo.',
    eyebrow: 'Citia · software de citas con IA',
    h1: 'Citia, <em>en 100 segundos</em>',
    lead: 'Agenda, reserva online sin registro y un agente de WhatsApp que contesta y da la cita. Desde 49 € al mes.',
    video: 'citia.mp4', poster: 'citia.jpg',
    cta: 'Vemos tu agenda y te decimos qué plan te encaja.',
    utm: 'video-citia',
  },
  {
    slug: 'asistentes',
    titulo: 'Un asistente de IA para tu tienda online',
    descripcion: 'Un asistente que contesta en tu web y en WhatsApp: productos, stock y pedidos. Funciones, retorno y precios, en un vídeo.',
    eyebrow: 'Asistente de IA para tiendas online',
    h1: 'Que ninguna duda <em>te cueste una venta</em>',
    lead: 'Un asistente que contesta en tu web y en tu WhatsApp a cualquier hora: productos, stock y dónde está cada pedido. Desde 49 € al mes.',
    video: 'asistentes.mp4', poster: 'asistentes.jpg',
    cta: 'Vemos tu tienda y te decimos qué haría el asistente en ella.',
    utm: 'video-asistentes',
  },
];

const pagina = p => `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${p.titulo} · Marirrodriga I.A</title>
  <meta name="description" content="${p.descripcion}">
  <meta name="robots" content="noindex, nofollow">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <meta property="og:title" content="${p.titulo}">
  <meta property="og:description" content="${p.descripcion}">
  <meta property="og:image" content="https://www.marirrodriga-ia.com/v/${p.poster}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,600&family=Plus+Jakarta+Sans:wght@500;700;800&display=swap" rel="stylesheet">
  <style>
    :root { --tinta: #1e1338; --suave: #4b5563; --morado: #6d28d9; --fondo: #faf8f5; --osc: #1e1035; --cian: #22d3ee; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: radial-gradient(1200px 700px at 30% 0%, #ede9fe 0%, var(--fondo) 70%); color: var(--tinta);
      font-family: "Plus Jakarta Sans", system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
    .env { max-width: 1040px; margin: 0 auto; padding: 32px 20px 64px; }
    header { display: flex; align-items: center; gap: 12px; margin-bottom: 36px; }
    header img { width: 40px; height: 40px; }
    header span { font-family: "Cormorant Garamond", serif; font-weight: 600; font-size: 22px; letter-spacing: .18em; }
    .eyebrow { display: inline-block; padding: 6px 14px; border-radius: 999px; background: #ede9fe; color: var(--morado); font-weight: 700; font-size: 14px; }
    h1 { margin: 14px 0 10px; font-family: "Cormorant Garamond", serif; font-weight: 600; font-size: clamp(36px, 6vw, 60px); line-height: 1.05; }
    h1 em { color: var(--morado); }
    .lead { color: var(--suave); font-size: clamp(16px, 2.2vw, 19px); line-height: 1.5; max-width: 760px; }
    .video { margin: 28px 0; border-radius: 18px; overflow: hidden; background: #000; box-shadow: 0 30px 70px rgba(46,16,101,.22); }
    .video video { display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; }
    .reserva { display: grid; gap: 18px; padding: 28px; border-radius: 22px; background: var(--osc); color: #fff; }
    .reserva h2 { font-family: "Cormorant Garamond", serif; font-weight: 600; font-size: clamp(28px, 4vw, 40px); line-height: 1.1; }
    .reserva h2 em { color: #67e8f9; }
    .reserva p { color: #ddd6fe; font-size: 17px; line-height: 1.5; }
    .botones { display: flex; flex-wrap: wrap; gap: 12px; }
    .boton { display: inline-flex; align-items: center; justify-content: center; min-height: 54px; padding: 0 26px; border-radius: 999px; font-weight: 800; font-size: 17px; text-decoration: none; }
    .principal { background: var(--cian); color: #0e3a47; }
    .secundario { background: #fff; color: var(--osc); }
    .pie { margin-top: 28px; color: var(--suave); font-size: 14px; }
    .pie a { color: var(--suave); }
  </style>
</head>
<body>
  <div class="env">
    <header><img src="/apple-touch-icon.png" alt=""><span>MARIRRODRIGA I·A</span></header>
    <span class="eyebrow">${p.eyebrow}</span>
    <h1>${p.h1}</h1>
    <p class="lead">${p.lead}</p>
    <div class="video">
      <video controls playsinline preload="metadata" poster="/v/${p.poster}">
        <source src="/v/${p.video}" type="video/mp4">
      </video>
    </div>
    <section class="reserva">
      <h2>Reserva <em>30 minutos</em> con Isma</h2>
      <p>${p.cta} Gratis y sin compromiso.</p>
      <div class="botones">
        <a class="boton principal" href="${CAL}?utm_source=correo&utm_campaign=${p.utm}" target="_blank" rel="noopener">Reservar mi reunión</a>
        <a class="boton secundario" href="${WA}" target="_blank" rel="noopener">Escribir por WhatsApp</a>
      </div>
    </section>
    <p class="pie">Precios sin IVA. Marirrodriga I.A · <a href="/">marirrodriga-ia.com</a> · <a href="/privacidad">Privacidad</a></p>
  </div>
</body>
</html>
`;

const dir = path.join(__dirname, '..', 'v');
fs.mkdirSync(dir, { recursive: true });
for (const p of PAGINAS) {
  fs.writeFileSync(path.join(dir, p.slug + '.html'), pagina(p), 'utf8');
  console.log('v/' + p.slug + '.html');
}
