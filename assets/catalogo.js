/* ═══════════════════════════════════════════════════════════════════════════
   CATÁLOGO DE PIEZAS — GENERADO, NO EDITAR A MANO
   ───────────────────────────────────────────────────────────────────────────
   Lo genera scripts/generar-catalogo.mjs desde scripts/datos-catalogo.json.
   La fuente de verdad son las tablas catalogo_* de Supabase y la función
   catalogo_cotiza(). Este fichero es su copia para que la web funcione sin
   servidor.

   Huella de las 33 piezas publicables y vigentes: 094f9d817a1695fc8b039abbef981269
   (md5 de slug|eur|alta|nombre|limite ordenado por slug; la comprueba
   scripts/verificar-catalogo.mjs contra lo que diga la base)

   Solo entran piezas con publicable=true y vigente=true: precio fijado,
   límite escrito y todavía en venta.
   ═════════════════════════════════════════════════════════════════════════ */

const CATALOGO = {
  generado: '2026-08-16',
  suelo: 49,
  // [piezas_min, piezas_max, bonificación %]  ·  tope 20 %
  escala: [[1,3,0],[4,5,10],[6,7,15],[8,null,20]],
  setupPreset: [
    { base: 'bookia', hasta: 5, importe: 250 },
    { base: 'bookia', hasta: null, importe: 350 },
    { base: 'dentia', hasta: 5, importe: 300 },
    { base: 'dentia', hasta: null, importe: 450 },
  ],
  piezas: [
    /* ── Citas y agenda · se configura sobre la solución de citas ───────────── */
    { slug: 'agenda-reserva-publica', nombre: 'Agenda + reserva pública', cat: 'citas', regimen: 'preset', base: 'bookia', eur: 15, setup: 50,
      limite: 'hasta 400 citas/mes · hasta 3 profesionales',
      canales: 'panel web + página pública de reserva',
      integra: 'ninguna: la agenda es propia',
      excluye: 'sincronización con Google Calendar u otros calendarios externos · varios locales · cobro online de la reserva' },
    { slug: 'recordatorios-confirmacion', nombre: 'Recordatorios y reseñas', cat: 'citas', regimen: 'preset', base: 'bookia', eur: 15, setup: 30,
      limite: 'hasta 800 envíos/mes, sumando recordatorios y peticiones de reseña',
      canales: 'el mismo canal del producto; si no hay, email',
      integra: 'la agenda propia · enlace a tu ficha de Google',
      excluye: 'SMS (coste por mensaje, aparte) · llamadas de voz · responder reseñas · reputación en otras plataformas · incentivos por reseña (lo prohíbe Google)' },
    { slug: 'reactivacion-dormidos', nombre: 'Reactivación de dormidos', cat: 'citas', regimen: 'preset', base: 'bookia', eur: 15,
      limite: 'hasta 200 contactos/mes · 1 campaña/mes',
      canales: 'el del asistente',
      integra: 'agenda propia',
      excluye: 'segmentación a medida · ofertas personalizadas por cliente · campañas fuera de calendario' },
    { slug: 'insights-semanales', nombre: 'Insights semanales', cat: 'citas', regimen: 'preset', base: 'bookia', eur: 15,
      limite: '1 informe/semana',
      canales: 'email o Telegram',
      integra: 'solo datos propios del sistema',
      excluye: 'cuadro de mando en vivo (es el Panel de negocio) · fuentes externas · informes a medida' },
    { slug: 'landing-conectada-bookia', nombre: 'Landing conectada', cat: 'citas', regimen: 'preset', base: 'bookia', eur: 49,
      limite: 'hasta 5 secciones · 1 idioma · 1 revisión de diseño al año',
      canales: 'web',
      integra: 'reserva propia + formulario de contacto',
      excluye: 'blog · tienda · varios idiomas · el dominio lo paga el cliente · redacción de textos largos · SEO activo' },
    { slug: 'panel-negocio', nombre: 'Panel de negocio', cat: 'citas', regimen: 'preset', base: 'bookia', eur: 49,
      limite: 'histórico de 24 meses',
      canales: 'web',
      integra: 'solo datos propios',
      excluye: 'TPV, contabilidad y otras fuentes externas · métricas a medida · exportación automática' },
    { slug: 'ficha-cliente', nombre: 'Ficha de cliente', cat: 'citas', regimen: 'preset', base: 'bookia', eur: 25, setup: 100,
      limite: '2.000 fichas · 5 GB de fotos',
      canales: 'web',
      integra: null,
      excluye: 'consentimientos firmados (es Firma digital) · datos de salud · historiales clínicos' },

    /* ── Clínica dental · no sale a la web, pero sigue en catálogo ──────────── */
    { slug: 'dental-agenda', nombre: 'Agenda + reserva online + recordatorios', cat: 'dental', regimen: 'preset', base: 'dentia', eur: 49,
      limite: 'hasta 600 citas/mes · hasta 2 profesionales',
      canales: 'panel + reserva pública sin login + recordatorio por WhatsApp o Telegram',
      integra: 'agenda propia',
      excluye: 'calendarios externos · más de 2 profesionales (pieza aparte) · salas o boxes con recursos' },
    { slug: 'dental-ficha-historia', nombre: 'Ficha de paciente + historia clínica', cat: 'dental', regimen: 'preset', base: 'dentia', eur: 24,
      limite: '1.500 pacientes · 25 GB',
      canales: null,
      integra: null,
      excluye: 'imágenes radiológicas DICOM · integración con equipos de rayos · exportación a otros softwares' },
    { slug: 'dental-odontograma', nombre: 'Odontograma', cat: 'dental', regimen: 'preset', base: 'dentia', eur: 19,
      limite: 'incluido con la ficha, sin tope propio',
      canales: null,
      integra: null,
      excluye: 'periodontograma · seguimiento de fases de ortodoncia · comparativa temporal automática' },
    { slug: 'dental-presupuestos', nombre: 'Presupuestos', cat: 'dental', regimen: 'preset', base: 'dentia', eur: 25,
      limite: 'hasta 200 presupuestos/mes',
      canales: null,
      integra: null,
      excluye: 'financiación · pasarela de pago · facturación a mutuas y seguros' },
    { slug: 'dental-facturacion', nombre: 'Facturación', cat: 'dental', regimen: 'preset', base: 'dentia', eur: 30,
      limite: 'hasta 300 facturas/mes',
      canales: null,
      integra: 'ninguna',
      excluye: 'envío a Verifactu (obligatorio 07/2027 para autónomos; módulo aparte) · remesas SEPA · contabilidad · presentación de impuestos' },
    { slug: 'dental-asistente-pacientes', nombre: 'Asistente de pacientes (WhatsApp)', cat: 'dental', regimen: 'preset', base: 'dentia', eur: 49,
      limite: '500 conversaciones/mes',
      canales: 'WhatsApp. Cuenta del cliente; Meta le factura a él',
      integra: 'lectura y escritura sobre agenda y presupuestos',
      excluye: 'triaje clínico, diagnóstico y consejo médico (deriva siempre a la clínica) · urgencias. Se identifica como IA (art. 50 AI Act)' },
    { slug: 'dental-acompanamiento-presupuestos', nombre: 'Acompañamiento de presupuestos', cat: 'dental', regimen: 'preset', base: 'dentia', eur: 10,
      limite: 'hasta 100 presupuestos en seguimiento/mes',
      canales: null,
      integra: null,
      excluye: 'negociar precio · aplicar descuentos por su cuenta · cerrar el cobro' },
    { slug: 'dental-seguimiento-resenas', nombre: 'Seguimiento autónomo y reseñas', cat: 'dental', regimen: 'preset', base: 'dentia', eur: 10,
      limite: 'hasta 400 envíos/mes',
      canales: null,
      integra: null,
      excluye: 'responder reseñas · reputación en otras plataformas' },
    { slug: 'dental-analisis-conversaciones', nombre: 'Análisis de conversaciones', cat: 'dental', regimen: 'preset', base: 'dentia', eur: 15,
      limite: '1 informe/mes',
      canales: null,
      integra: 'conversaciones propias, anonimizadas',
      excluye: 'grabación de llamadas · análisis de voz · seguimiento por paciente identificado' },
    { slug: 'dental-contabilidad', nombre: 'Contabilidad asistida', cat: 'dental', regimen: 'preset', base: 'dentia', eur: 35,
      limite: 'hasta 300 apuntes/mes',
      canales: null,
      integra: 'lectura de las facturas del propio sistema',
      excluye: 'presentación de impuestos · asesoría fiscal · conexión bancaria · cierre de ejercicio' },
    { slug: 'dental-firma-digital', nombre: 'Firma digital de consentimientos', cat: 'dental', regimen: 'preset', base: 'dentia', eur: 24,
      limite: 'hasta 200 firmas/mes · las 8 plantillas actuales',
      canales: null,
      integra: null,
      excluye: 'firma cualificada eIDAS · plantillas nuevas a medida · custodia certificada por tercero' },

    /* ── Se construyen a medida ────────────────────────────────────────────── */
    { slug: 'iris-0', nombre: 'IRIS 0 · Asistente web', cat: 'a_medida', regimen: 'a_medida', base: null, eur: 49, setup: 150,
      limite: '500 conversaciones/mes',
      canales: 'un canal a elegir incluido: el chat de tu web, WhatsApp o Telegram',
      integra: 'ninguna',
      excluye: 'ficha de cliente · informes de conversación · canales adicionales (pieza aparte)' },
    { slug: 'modulo-seguimiento-pedidos', nombre: 'Módulo · Seguimiento de pedidos', cat: 'a_medida', regimen: 'a_medida', base: null, eur: 30, setup: 70,
      limite: 'sin tope propio: se acopla al asistente',
      canales: 'el mismo del asistente',
      integra: 'solo lectura contra la plataforma de comercio electrónico del cliente',
      excluye: 'modificar, cancelar o crear pedidos · gestionar devoluciones' },
    { slug: 'hermes-seguimiento-presupuestos', nombre: 'HERMES · Seguimiento de presupuestos', cat: 'a_medida', regimen: 'a_medida', base: null, eur: 49, setup: 200,
      limite: '200 presupuestos activos',
      canales: 'email + un canal de mensajería',
      integra: 'lectura sobre el sistema del cliente solo si tiene API',
      excluye: 'sistemas cerrados sin API (requiere valoración aparte) · negociar precio' },
    { slug: 'hermes-acompanamiento-conversacional', nombre: 'Monitoreo de clientes potenciales', cat: 'a_medida', regimen: 'a_medida', base: null, eur: 49, setup: 50,
      limite: '300 conversaciones/mes',
      canales: null,
      integra: null,
      excluye: 'cerrar la venta con cobro · descuentos por su cuenta' },
    { slug: 'abaco-facturacion-mensaje', nombre: 'ÁBACO · Facturación por mensaje', cat: 'a_medida', regimen: 'a_medida', base: null, eur: 49, setup: 200,
      limite: '200 facturas/mes',
      canales: 'Telegram o WhatsApp',
      integra: null,
      excluye: 'envío a Verifactu (módulo aparte) · contabilidad · impuestos' },
    { slug: 'abaco-contabilidad-asistida', nombre: 'ÁBACO · Contabilidad asistida', cat: 'a_medida', regimen: 'a_medida', base: null, eur: 169, setup: 650,
      limite: '800 documentos/mes',
      canales: null,
      integra: 'lectura de correo y de una carpeta',
      excluye: 'presentación de impuestos · asesoría fiscal · conexión bancaria PSD2 · cierre de ejercicio' },
    { slug: 'abaco-gestion-documental', nombre: 'ÁBACO · Gestión documental', cat: 'a_medida', regimen: 'a_medida', base: null, eur: 79, setup: 300,
      limite: '100 altas/mes',
      canales: null,
      integra: 'Google Drive + email',
      excluye: 'firma electrónica · archivo legal certificado · custodia a largo plazo' },
    { slug: 'presencia-web-landing', nombre: 'Presencia web · Landing conectada', cat: 'a_medida', regimen: 'a_medida', base: null, eur: 119, setup: 400,
      limite: 'hasta 8 secciones · 1 idioma · 1 revisión de diseño al año',
      canales: null,
      integra: null,
      excluye: 'tienda · blog · varios idiomas · dominio a cargo del cliente · redacción de contenidos · SEO activo' },
    { slug: 'captacion-leads', nombre: 'Captación de clientes potenciales', cat: 'a_medida', regimen: 'a_medida', base: null, eur: 199, setup: 600,
      limite: '150 negocios cualificados al mes · 1 sector y 1 zona a elegir',
      canales: 'entrega en tu CRM o en una hoja de cálculo, más un aviso semanal',
      integra: 'fuentes públicas: fichas de Google y la web del propio negocio',
      excluye: 'comprar bases de datos · enviar la comunicación comercial por ti · verificación telefónica · gestionar la respuesta de quien conteste (eso es HERMES) · sectores con datos de categorías especiales' },
    { slug: 'canal-adicional', nombre: 'Canal adicional', cat: 'a_medida', regimen: 'a_medida', base: null, eur: 5, setup: 30,
      limite: '1 canal por unidad · comparte el volumen de conversaciones del chatbot',
      canales: 'WhatsApp, Telegram o Instagram',
      integra: 'el mismo del chatbot',
      excluye: 'la cuenta de WhatsApp es del cliente y Meta le factura a él directamente' },
    { slug: 'voz-telefono', nombre: 'Función de voz', cat: 'a_medida', regimen: 'a_medida', base: null, eur: 15, setup: 100,
      limite: 'comparte el volumen de conversaciones del chatbot',
      canales: 'teléfono',
      integra: 'el mismo cerebro y los mismos datos que el chatbot de texto',
      excluye: 'la telefonía y los minutos van a tu nombre y a tu cargo, como la cuenta de WhatsApp' },
    { slug: 'correo-clasificacion', nombre: 'Clasificación de correos', cat: 'a_medida', regimen: 'a_medida', base: null, eur: 15, setup: 70,
      limite: 'hasta 1.000 correos/mes · 1 buzón',
      canales: 'un buzón de Gmail o Outlook',
      integra: 'solo lectura del buzón: etiqueta y ordena, no escribe',
      excluye: 'responder por ti (es la pieza de respuesta) · buzones adicionales · archivar los adjuntos (eso es gestión documental) · buzones compartidos con datos de salud' },
    { slug: 'correo-respuesta-derivacion', nombre: 'Respuestas, tickets y avisos', cat: 'a_medida', regimen: 'a_medida', base: null, eur: 15, setup: 70,
      limite: 'hasta 300 respuestas, derivaciones o avisos/mes',
      canales: 'el mismo buzón de la clasificación',
      integra: 'lectura y escritura sobre el buzón · asignación a una persona del equipo · aviso por el canal que elijas',
      excluye: 'cerrar ventas · comprometer precios o plazos · contestar reclamaciones legales o burofaxes · responder sin que tú hayas definido antes qué se contesta solo' },
    { slug: 'correo-buzon-adicional', nombre: 'Buzón adicional', cat: 'a_medida', regimen: 'a_medida', base: null, eur: 5, setup: 30,
      limite: '1 buzón por unidad · comparte el volumen de correos del producto',
      canales: 'Gmail u Outlook',
      integra: 'el mismo tratamiento que el buzón principal',
      excluye: 'buzones de otro dominio que no controles · buzones compartidos con datos de salud' },
    { slug: 'correo-extraccion-crm', nombre: 'Extracción a tu CRM', cat: 'a_medida', regimen: 'a_medida', base: null, eur: 20, setup: 100,
      limite: 'hasta 300 fichas o registros al mes',
      canales: 'el mismo buzón',
      integra: 'escritura sobre el CRM que ya uses, si tiene API',
      excluye: 'montarte un CRM si no tienes (se presupuesta aparte) · CRMs sin API · limpiar o deduplicar la base que ya tengas · fusionar fichas repetidas' },
  ],
};

/* ───────────────────────────────────────────────────────────────────────────
   LA CUENTA — es el port exacto de catalogo_cotiza() de Supabase.
   Se trabaja en céntimos con enteros: todas las piezas cuestan euros enteros,
   así que suma × (100 − bonificación) da el céntimo exacto sin coma flotante.
   ─────────────────────────────────────────────────────────────────────────── */

function bonificacionPara(n) {
  const t = CATALOGO.escala.find(([min, max]) => n >= min && (max === null || n <= max));
  return t ? t[2] : 0;
}

function cotiza(slugs) {
  const piezas = slugs.map(s => CATALOGO.piezas.find(p => p.slug === s)).filter(Boolean);
  const precios = piezas.map(p => p.eur).sort((a, b) => b - a); // caras primero
  if (!precios.length) return null;

  let suma = 0, acc = 0, centsSub = 0, bonif = 0;
  for (let k = 1; k <= precios.length; k++) {
    suma += precios[k - 1];
    bonif = bonificacionPara(k);
    centsSub = suma * (100 - bonif);          // céntimos, exacto
    acc = Math.max(centsSub, acc);            // guarda de monotonía
  }
  const suelo = CATALOGO.suelo * 100;
  return {
    piezas,
    nPiezas: precios.length,
    suma,
    bonificacion: bonif,
    subtotal: centsSub / 100,
    cuota: Math.max(acc, suelo) / 100,
    guardaAplicada: acc > centsSub,
    sueloAplicado: suelo > acc,
  };
}

// El alta también lleva bonificación por acumulación (decisión de Ismael,
// 16-08, que revierte la regla del 15-08 de que «el setup nunca la lleva»).
// Motivo: montar siete cosas de golpe comparte proyecto, alta y pruebas.
// Se usa la MISMA escala que la cuota, para no tener dos tablas distintas, y
// con la misma guarda de monotonía: añadir una herramienta no puede hacer que
// el montaje salga más barato que sin ella.
function calculaSetup(piezas) {
  const desglose = piezas.filter(p => p.setup).map(p => ({ concepto: p.nombre, importe: p.setup }));
  const importes = desglose.map(d => d.importe).sort((a, b) => b - a);
  if (!importes.length) return { total: 0, suma: 0, bonificacion: 0, desglose, guardaAplicada: false };

  let suma = 0, acc = 0, cents = 0, bonif = 0;
  for (let k = 1; k <= importes.length; k++) {
    suma += importes[k - 1];
    bonif = bonificacionPara(k);
    cents = suma * (100 - bonif);
    acc = Math.max(cents, acc);
  }
  return { total: acc / 100, suma, bonificacion: bonif, desglose, guardaAplicada: acc > cents };
}

const eur = n => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

if (typeof module !== 'undefined') module.exports = { CATALOGO, cotiza, calculaSetup, bonificacionPara, eur };
