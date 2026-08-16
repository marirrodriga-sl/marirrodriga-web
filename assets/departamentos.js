/* ═══════════════════════════════════════════════════════════════════════════
   LOS DEPARTAMENTOS · LA BASE · LAS EXPLICACIONES
   ───────────────────────────────────────────────────────────────────────────
   Nada dental sale a la web (decisión de Ismael, 16-08): la solución dental no
   se comercializa como algo hecho de antemano. Sus piezas siguen en Supabase y
   en el catálogo interno, pero aquí no entran.

   Cada departamento tiene:
     · diagrama  → qué se conecta con qué, para que se vea antes de leerse
     · comoFunciona → la cosa completa trabajando dentro de un negocio real
     · piezas    → y cada pieza su explicación, no solo su límite
   ═══════════════════════════════════════════════════════════════════════════ */

const SIN_DENTAL = p => p.cat !== 'dental';

/* ─── Los nombres de agente, fuera de la web (16-08) ─────────────────────
   IRIS, HERMES, ÁBACO, MUSA, ATLAS y SONAR se quedan en Supabase y en los
   contratos, que es donde valen. En la web agobian: el que entra no sabe qué
   es un HERMES, y tiene que aprenderse un nombre antes de entender qué compra.
   Esto es solo capa de presentación: se quita esta constante y vuelven. */

const NOMBRE_WEB = {
  'iris-0': 'Chatbot de preguntas frecuentes',
  'modulo-seguimiento-pedidos': 'Seguimiento de pedidos',
  'hermes-seguimiento-presupuestos': 'Seguimiento de presupuestos',
  'abaco-facturacion-mensaje': 'Facturación por mensaje',
  'abaco-contabilidad-asistida': 'Contabilidad asistida',
  'abaco-gestion-documental': 'Gestión documental',
  'presencia-web-landing': 'Tu página, a medida',
  'ficha-cliente': 'Base de datos de clientes',
};

/* Y los que aparecen dentro de un texto, no como nombre de pieza */
const SIN_NOMBRES = t => (t || '')
  .replace(/\(eso es HERMES\)/g, '(eso es el acompañamiento de indecisos)')
  .replace(/\b(IRIS|HERMES|ÁBACO|ABACO|MUSA|ATLAS|SONAR)\s*\d?\s*·?\s*/g, '');

const nombreWeb = p => NOMBRE_WEB[p.slug] || p.nombre;

const BASE = {
  titulo: 'La base',
  entradilla: 'Tres cosas que no son agentes, pero sin las que los agentes no tienen dónde agarrarse: dónde te encuentran, dónde guardas lo que sabes de tu negocio y dónde guardas a tus clientes.',
  bloques: [
    {
      slug: 'presencia-web-landing',
      titulo: 'Tu página',
      texto: 'El sitio donde te encuentran y desde donde se puede reservar, escribir o dejarte el contacto sin salir de ahí. Es lo primero de la lista porque es lo único que funciona incluso si no compras ningún agente.',
    },
    {
      slug: null,
      titulo: 'La base de datos de tu negocio',
      texto: 'Lo que tu negocio sabe: qué haces, cuánto cuesta, cómo trabajas, qué contestas a las preguntas de siempre. Es de donde beben los agentes para responder sin inventarse nada.',
      incluida: 'Va incluida en los agentes que la necesiten. El chatbot no se cobra aparte por saber de tu negocio: sin eso no sería un chatbot, sería un menú.',
    },
    {
      slug: 'ficha-cliente',
      titulo: 'La base de datos de tus clientes',
      texto: 'Quién es cada uno, qué le hiciste, cuándo y qué le gustó. Esta sí se cobra aparte, porque es tuya y crece contigo: es lo que hace que el agente sepa con quién está hablando en vez de empezar de cero cada vez.',
    },
    {
      slug: null,
      titulo: 'El CRM',
      texto: 'El sitio donde vive tu relación con cada cliente y cada oportunidad: en qué punto está, qué se habló, qué toca hacer.',
      aviso: 'Este no te lo recomendamos de entrada. Un CRM sin información dentro es una hoja vacía que da trabajo y no devuelve nada: tiene sentido cuando ya tienes volumen que volcar. Es un paso más avanzado, y preferimos decírtelo a vendértelo.',
      pendiente: true,
    },
  ],
};

/* ─── Qué hace cada pieza, en cristiano ─────────────────────────────────── */

const EXPLICACIONES = {
  'agenda-reserva-publica':
    'Tu agenda y una página donde tus clientes reservan solos, a cualquier hora. Reserva por la duración real de cada servicio, así que las citas se pegan unas a otras y no te quedan huecos de veinte minutos donde no cabe nadie. Es tuya: sin comisión por reserva y sin que le enseñen tu competencia al que iba a venir a verte.',
  'ficha-cliente':
    'Cada cliente con su historial: qué le has hecho, cuándo, qué le gustó y qué no, con fotos y notas. Cuando vuelve a los seis meses no dependes de acordarte tú.',
  'profesionales-ilimitados-bookia':
    'Quita el tope de gente en la agenda. Si sois cuatro o si mañana sois nueve, el precio no se mueve. Vale también si abres un segundo local.',
  'asistente-citas':
    'Contesta por WhatsApp o Telegram y reserva la cita él mismo, a las once de la noche y en domingo. No es un menú de opciones: entiende lo que le escriben, mira los huecos que hay de verdad en tu agenda y cierra la cita. Si no sabe algo, te lo pasa a ti en vez de inventárselo.',
  'recordatorios-confirmacion':
    'Avisa al cliente antes de la cita y le deja confirmar o cancelar con un toque: el que iba a plantarte lo dice la víspera, no cuando ya has perdido la hora. Y cuando la visita ya ha pasado, pregunta qué tal fue — si fue bien pide la reseña de Google, y si fue mal no la pide y te avisa a ti, que es lo que hay que hacer con ese.',
  'iris-0':
    'El asistente dentro de tu web. Responde a quien está mirando y dudando: qué haces, cuánto cuesta, si hay hueco. Se identifica siempre como IA y, cuando la cosa se pone seria, te pasa la conversación a ti.',
  'modulo-seguimiento-pedidos':
    'Se acopla al asistente y responde al «¿dónde está mi pedido?» sin que tú abras nada. Consulta el estado en tu tienda y lo cuenta. Solo lee: no toca, no cancela y no devuelve nada por su cuenta.',
  'hermes-acompanamiento-conversacional':
    'El que acompaña al que aún no se decide. Sigue la conversación con quien pidió información y no volvió, resuelve las dudas que le frenan y avisa cuando alguien vuelve a estar caliente. No cierra cobros ni regala descuentos.',
  'captacion-leads':
    'Sale a buscar a los que todavía no te conocen. Rastrea negocios que encajan con tu cliente ideal, mira qué tienen y qué les falta, y te los entrega ordenados de mejor a peor con el motivo escrito: este no tiene reserva online, este otro tiene la web caída, a este se le ven pocas reseñas. Tú te sientas a llamar a los buenos en vez de a buscarlos. Es el mismo sistema con el que nos buscamos los clientes nosotros.',
  'hermes-seguimiento-presupuestos':
    'Persigue tus presupuestos, que es lo que nadie hace. Sabe cuáles siguen abiertos, escribe a los días justos, y te dice cuáles se han enfriado y cuáles merecen una llamada tuya. Ni negocia precio ni aplica descuentos.',
  'reactivacion-dormidos':
    'Encuentra a los que llevan meses sin aparecer y les escribe. No es una campaña a todo el mundo: va a quien tiene sentido, con lo que ya sabes de él, y te devuelve clientes que ya eran tuyos.',
  'abaco-facturacion-mensaje':
    'Haces la factura mandando un mensaje. Le cuentas lo que has hecho y a quién, y te devuelve el PDF listo, numerado y guardado donde toca. Se acabaron los domingos por la tarde poniéndote al día.',
  'abaco-contabilidad-asistida':
    'Lee tus facturas y las de tus proveedores y las ordena en apuntes, con sus totales y sus categorías. Tu gestoría recibe el mes cuadrado en vez de una carpeta de PDF sueltos. No presenta impuestos ni sustituye a tu asesoría: le hace el trabajo más corto.',
  'abaco-gestion-documental':
    'Todo lo que llega en papel o por correo —albaranes, contratos, justificantes— archivado donde debe estar y encontrable por lo que pone dentro, no por cómo lo llamaste al guardarlo.',
  'insights-semanales':
    'Cada lunes te llega qué pasó la semana anterior y, sobre todo, qué falló: los huecos que quedaron vacíos, quién no volvió, qué servicio se cae más. Un correo corto, no un panel que hay que ir a mirar.',
  'panel-negocio':
    'Los números que no salen en la caja: cuánto vale un cliente al año, cada cuánto vuelve, cuántos se te van y por dónde. Es lo que convierte «este mes ha ido bien» en saber por qué.',
  'presencia-web-landing':
    'Tu página, montada a medida y conectada por dentro con lo demás: el que entra puede reservar, escribir o dejarte su contacto sin salir de ella. Una web que trabaja, no un folleto con tu teléfono.',
  'landing-conectada-bookia':
    'La versión sencilla: una página propia enchufada a tu reserva, sin construir nada desde cero. Si lo que necesitas es estar y que se pueda reservar, es esta.',
};


/* ─── El producto de cada departamento y sus opciones ───────────────────
   Un solo producto por sección, con extras que se le añaden como quien
   configura un coche. Las opciones se nombran por la capacidad que le dan al
   producto, no por el nombre de la pieza que hay detrás.
   Las que llevan obra:true no tienen precio de catálogo: se presupuestan. */

const PRODUCTOS = {
  atencion: [{
    id: 'chatbot',
    nombre: 'Chatbot',
    magia: 'Dale magia a tu chatbot',
    nucleo: 'iris-0',
    nucleoTexto: 'Contesta las preguntas de siempre con lo que tú le hayas contado de tu negocio. Va con <strong>un canal incluido, el que tú elijas</strong>: el chat de tu web, WhatsApp o Telegram. Se identifica como IA y te pasa la conversación cuando no le toca a él. Es lo mínimo que montamos, y va siempre.',
    opciones: [
      { slug: 'canal-adicional', titulo: 'Un canal más',
        texto: 'El primero va incluido y lo eliges tú. Cada canal de más — WhatsApp, Telegram, Instagram — se suma aparte.' },
      { slug: 'agenda-reserva-publica', titulo: 'Acceso a tu agenda: reservar, cambiar y cancelar',
        texto: 'Deja de contestar y empieza a hacer: mira los huecos reales y cierra la cita él mismo.' },
      { slug: 'recordatorios-confirmacion', titulo: 'Recordatorios anti no-show y reseñas',
        texto: 'Avisa la víspera y deja confirmar o cancelar con un toque, para que el hueco vuelva a tiempo. Y cuando la visita ha pasado pregunta qué tal fue: si fue bien pide la reseña de Google, y si fue mal te avisa a ti.' },
      { slug: 'ficha-cliente', titulo: 'Base de datos de clientes',
        texto: 'Que sepa quién le escribe, qué le hiciste la última vez y qué hablasteis hace tres meses, en vez de empezar de cero cada vez.',
        aviso: 'El precio depende del tamaño de tu base: 25 € es la entrada y sube según cuántos clientes y cuánto histórico haya que llevar.' },
      { slug: 'modulo-seguimiento-pedidos', titulo: 'Seguimiento de pedidos',
        texto: 'Responde al «¿dónde está lo mío?» consultando tu tienda. Solo lee: ni toca ni cancela.' },
      { slug: 'hermes-acompanamiento-conversacional', titulo: 'Monitoreo de clientes potenciales',
        texto: 'Sigue a los que preguntaron y no cerraron: intenta cerrarlos, y cuando alguno se cae te reporta por qué se ha caído.' },
      { slug: 'voz-telefono', titulo: 'Función de voz: que coja el teléfono',
        texto: 'Que atienda hablando, no solo escribiendo. Mismo cerebro y mismos datos que el de texto.',
        aviso: 'La telefonía y los minutos van a tu nombre y a tu cargo, igual que la cuenta de WhatsApp. Por eso el mensual es tan bajo: el consumo no pasa por nosotros.' },
    ],
  }, {
    id: 'correo',
    nombre: 'Atención por correo',
    magia: 'Dale magia a tu buzón',
    nucleo: 'correo-clasificacion',
    nucleoTexto: 'Un agente que vive dentro de tu correo y ordena lo que entra: esto es spam, esto una reclamación, esto una propuesta, esto un pedido. Tú decides las etiquetas. Va siempre, porque es lo que hace que lo demás sepa qué está mirando.',
    opciones: [
      { slug: 'correo-respuesta-derivacion', titulo: 'Que conteste, abra ticket y te avise',
        texto: 'Responde los correos que tú hayas decidido que se contestan solos; del resto abre un ticket y se lo asigna a quien le toque. Y lo que no puede esperar —una reclamación, un cabreo— te lo pasa al momento en vez de dejarlo en la bandeja. Nada se queda sin dueño.' },
      { slug: 'correo-buzon-adicional', titulo: 'Un buzón más',
        texto: 'El primero va incluido. Si tienes info@, ventas@ y soporte@ por separado, cada uno de más se suma aparte.' },
      { slug: 'correo-extraccion-crm', titulo: 'Que lo lleve a tu CRM',
        texto: 'Del correo salen los datos que importan — quién pregunta, por qué y cómo contactarle — y acaban en tu CRM en vez de en tu cabeza.',
        aviso: 'Cuenta con que ya tienes un CRM y con que deja escribir desde fuera. Si no tienes, montarlo se presupuesta aparte.' },
      { slug: 'modulo-seguimiento-pedidos', titulo: 'Seguimiento de pedidos',
        texto: 'El «¿dónde está mi pedido?» que llega por correo lo resuelve él consultando tu tienda, igual que hace el chatbot.' },
    ],
  }],
  ventas: [{
    id: 'captacion',
    nombre: 'Captación de clientes',
    magia: 'Dale magia a tu captación',
    nucleo: 'captacion-leads',
    nucleoTexto: 'Sale a buscar negocios que encajan contigo, los cualifica y te los deja ordenados por quién merece la llamada, con el motivo escrito al lado. Es el mismo sistema con el que nos buscamos los clientes nosotros. Va siempre.',
    opciones: [
      { slug: 'hermes-seguimiento-presupuestos', titulo: 'Que persiga los presupuestos que mandas',
        texto: 'Escribe a los días justos, y te dice cuáles se enfriaron y a cuáles merece la pena llamar.' },
      { slug: 'reactivacion-dormidos', titulo: 'Que recupere a los que dejaron de venir',
        texto: 'Va a quien tiene sentido, con lo que ya sabes de él. No es una campaña a todo el mundo.' },
      { slug: 'recordatorios-confirmacion', titulo: 'Que avise de la cita y luego pida la reseña',
        texto: 'Recuerda la cita para que no te planten y, cuando pasa, pregunta qué tal fue: si fue bien pide la reseña de Google, y si fue mal te avisa a ti.' },
      { obra: true, titulo: 'Que escriba él el primer mensaje en frío',
        texto: 'Con tu base legal detrás, que la del artículo 21 de la LSSI es del que manda. Se construye.' },
    ],
  }],
  finanzas: [{
    id: 'facturacion',
    nombre: 'Facturación',
    magia: 'Dale magia a tu administración',
    nucleo: 'abaco-facturacion-mensaje',
    nucleoTexto: 'Haces la factura mandando un mensaje: le cuentas qué has hecho y a quién, y te devuelve el PDF numerado y guardado donde toca. Va siempre.',
    opciones: [
      { slug: 'abaco-contabilidad-asistida', titulo: 'Que ordene también lo que entra y lo que sale',
        texto: 'Lee tus facturas y las de proveedores y las convierte en apuntes con sus totales, para que tu gestoría reciba el mes cuadrado.' },
      { slug: 'abaco-gestion-documental', titulo: 'Que archive el papeleo que llega',
        texto: 'Albaranes, contratos y justificantes guardados donde deben y encontrables por lo que ponen dentro.' },
      { obra: true, titulo: 'Envío a Verifactu',
        texto: 'Obligatorio desde julio de 2027 para autónomos. Todavía no está empaquetado: se construye.' },
      { obra: true, titulo: 'Conexión con tu banco',
        texto: 'Para cuadrar cobros y pagos sin que los piques tú.' },
    ],
  }],
  datos: [{
    id: 'informe',
    nombre: 'Informe semanal',
    magia: 'Dale magia a tus números',
    nucleo: 'insights-semanales',
    nucleoTexto: 'Cada lunes, un correo corto con lo que pasó la semana anterior y sobre todo con lo que falló. Va siempre.',
    opciones: [
      { slug: 'panel-negocio', titulo: 'Un panel para mirar cuando quieras',
        texto: 'Retención, frecuencia de visita y valor por cliente, con dos años de histórico detrás.' },
      { obra: true, titulo: 'Juntar lo que hoy va por separado',
        texto: 'Tu gestoría, tu TPV y tu web contando lo mismo en el mismo sitio. Se construye.' },
      { obra: true, titulo: 'Márgenes reales por servicio',
        texto: 'No lo que facturas: lo que te queda. Se construye.' },
    ],
  }],
  marketing: [{
    id: 'pagina',
    nombre: 'Tu página',
    magia: 'Dale magia a tu página',
    nucleo: 'presencia-web-landing',
    nucleoTexto: 'Tu sitio, montado a medida y conectado por dentro: el que entra puede reservar, escribir o dejarte su contacto sin salir de ahí. Va siempre.',
    opciones: [
      { obra: true, titulo: 'Contenido publicándose solo',
        texto: 'En tu tono y cada semana, sin que le dediques horas. Se construye.' },
      { obra: true, titulo: 'Campañas y anuncios llevados por IA',
        texto: 'Se construye y se presupuesta.' },
    ],
  }],
};

/* ─── Los cinco departamentos ───────────────────────────────────────────── */

const DEPARTAMENTOS = [
  {
    id: 'atencion',
    nucleo: 'iris-0',
    montaTitulo: 'Monta tu chatbot',
    nucleoNombre: 'El chatbot',
    nucleoTexto: 'Es el que va siempre. Contesta las preguntas de siempre en tu web y sabe cuándo callarse y pasarte la conversación. Lo demás de aquí abajo son capacidades que se le enchufan encima.',
    nombre: 'Atención al Cliente',
    dolor: 'Llamadas y mensajes que se quedan sin contestar fuera de horario',
    titular: 'Un asistente que atiende, entiende y reserva. También a las once de la noche.',
    queEs: 'Es un asistente conversacional profesional. No es el chat de preguntas frecuentes que ya has visto en veinte webs: entiende lo que le escriben, consulta tus datos de verdad y hace cosas — reserva la cita, la cambia, dice dónde está un pedido, avisa de que mañana toca. Vive en el canal donde ya te escriben tus clientes, no en uno nuevo que tengan que aprender.',
    comoFunciona: 'Dentro de un negocio funciona así: un cliente escribe por WhatsApp a las once de la noche pidiendo hora. El asistente mira los huecos reales de tu agenda —no una copia, la agenda—, le ofrece tres, cierra el que elija y lo apunta. Al día siguiente le recuerda la cita y le deja confirmar. Si el cliente pregunta algo que no le corresponde, o si se enfada, deja de contestar y te lo pasa a ti. Se identifica siempre como IA, porque la ley lo exige desde agosto de 2026 y porque mentir en eso se paga caro.',
    diagrama: {
      centro: 'El asistente',
      entradas: ['WhatsApp', 'Telegram', 'El chat de tu web'],
      salidas: ['Tu agenda', 'La ficha del cliente', 'Tu tienda', 'Y si no sabe: tú'],
    },
    piezas: ['iris-0', 'recordatorios-confirmacion', 'modulo-seguimiento-pedidos', 'hermes-acompanamiento-conversacional'],
    obra: [
      'Que coja el teléfono y hable, no solo escriba',
      'Memoria por cliente: que recuerde la conversación de hace tres meses',
      'Conectado por dentro a las herramientas que ya usas',
    ],
    noDeEntrada: '<strong>La voz.</strong> Que el bot coja el teléfono suena bien, pero hasta que el de texto no te esté quitando trabajo de verdad, es pagar por una demo cara.',
  },
  {
    id: 'ventas',
    nucleo: null,
    montaTitulo: 'Monta tu sistema de ventas',

    nombre: 'Ventas y Captación',
    dolor: 'Presupuestos que se enfrían porque nadie hace el seguimiento a tiempo',
    titular: 'Encontrar a quien no te conoce, y no perder a quien ya te preguntó.',
    queEs: 'Son las dos mitades del mismo problema. Por un lado, salir a buscar: rastrear negocios que encajan contigo, mirar qué les falta y dejártelos ordenados por quién merece la llamada. Por otro, no dejar caer lo que ya tienes: perseguir los presupuestos abiertos, volver a por el que preguntó y no volvió, y pedir la reseña cuando el cliente está contento. Ninguna es difícil; lo difícil es hacerlas todos los días.',
    comoFunciona: 'La captación trabaja de noche: rastrea, cualifica y el lunes tienes la lista con el motivo escrito al lado de cada uno — este no tiene reserva online, a este se le ven doce reseñas en cinco años. Llamas a los buenos. De los que te piden presupuesto se encarga la otra mitad: si el jueves no han dicho nada, escribe él con la duda más probable ya resuelta; a los diez días te marca los fríos y te dice a cuáles merece la pena llamar. Es exactamente el sistema con el que nos buscamos los clientes nosotros.',
    diagrama: {
      centro: 'El seguimiento',
      entradas: ['Presupuestos abiertos', 'Clientes dormidos', 'Visitas de la semana'],
      salidas: ['Email', 'WhatsApp', 'Reseña en Google', 'Los calientes, a ti'],
    },
    piezas: ['captacion-leads', 'hermes-seguimiento-presupuestos', 'reactivacion-dormidos', 'recordatorios-confirmacion'],
    obra: [
      'Que lea el sistema que ya usas, aunque no tenga API',
      'Que negocie dentro de los límites que le fijes tú',
      'Que escriba él el primer mensaje en frío, con tu base legal detrás',
    ],
    noDeEntrada: '<strong>Disparar el correo en frío por ti.</strong> Te entregamos la lista cualificada, pero el envío comercial lo haces tú: la base legal del art. 21 de la LSSI es del que manda, y esa responsabilidad no la asumimos nosotros.',
  },
  {
    id: 'finanzas',
    nucleo: 'abaco-facturacion-mensaje',
    montaTitulo: 'Monta tu administración',
    nucleoNombre: 'La facturación',
    nucleoTexto: 'Es el que va siempre: la factura hecha desde un mensaje, numerada y archivada. Lo demás se le enchufa encima.',
    nombre: 'Finanzas y Administración',
    dolor: 'Las horas que se van en facturas, papeleo y ordenar el correo',
    titular: 'La administración hecha, sin que la hagas tú.',
    queEs: 'Es el que convierte «lo hago el domingo» en que ya esté hecho. Emite las facturas a partir de lo que has trabajado, las guarda numeradas y donde toca, ordena en apuntes lo que entra y lo que sale, y archiva el papeleo que llega por correo para que se pueda encontrar después.',
    comoFunciona: 'Terminas un trabajo y mandas un mensaje: «factura a Talleres Ruiz, 400 € más IVA, cambio de instalación». Te devuelve el PDF numerado, con los datos fiscales correctos, guardado en su carpeta y anotado. A final de mes tu gestoría recibe el cuadro completo en vez de una carpeta con cuarenta archivos. Lo que no hace, y lo decimos claro: ni presenta impuestos ni te asesora fiscalmente. Eso es de tu gestoría, y ahí no nos metemos.',
    diagrama: {
      centro: 'La administración',
      entradas: ['Un mensaje tuyo', 'Correo con facturas', 'Lo que ya has cobrado'],
      salidas: ['La factura en PDF', 'Archivada y numerada', 'Apuntes ordenados', 'Tu gestoría'],
    },
    piezas: ['abaco-facturacion-mensaje', 'abaco-contabilidad-asistida', 'abaco-gestion-documental'],
    obra: [
      'Envío a Verifactu, obligatorio desde julio de 2027',
      'Conexión con tu banco para cuadrar cobros y pagos',
      'El cierre del mes montado y enviado a tu gestoría',
    ],
    noDeEntrada: '<strong>Impuestos y asesoría fiscal, nunca.</strong> Es de tu gestoría, tiene responsabilidad detrás y no la vamos a asumir. Le dejamos los números ordenados para que su trabajo sea más corto.',
  },
  {
    id: 'datos',
    nucleo: 'insights-semanales',
    montaTitulo: 'Monta tu cuadro de mando',
    nucleoNombre: 'El informe del lunes',
    nucleoTexto: 'Es el que va siempre: cada lunes, qué pasó y qué falló. Lo demás se le enchufa encima.',
    nombre: 'Datos y Dirección',
    dolor: 'Decidir con la sensación de cómo va el mes, y no con datos',
    titular: 'Saber por qué ha ido bien, no solo que ha ido bien.',
    queEs: 'Es la parte que mira lo que ya está pasando dentro de tu negocio y te lo cuenta en cristiano. No es un cuadro de mando lleno de gráficas que nadie abre: es un correo el lunes con lo que falló, y un sitio donde mirar cuánto vale de verdad un cliente tuyo.',
    comoFunciona: 'El lunes por la mañana te llega: cuántos huecos quedaron sin vender la semana pasada y a qué horas, quién no ha vuelto cuando debería, qué servicio se cancela más. Con eso decides si mueves horarios o si hay que llamar a alguien. Y cuando quieres pensar a un año vista, el panel te dice cuánto deja un cliente, cada cuánto vuelve y por dónde se te están yendo.',
    diagrama: {
      centro: 'Los números',
      entradas: ['Citas y huecos', 'Clientes y visitas', 'Lo facturado'],
      salidas: ['Correo del lunes', 'Retención y frecuencia', 'Valor por cliente'],
    },
    piezas: ['insights-semanales', 'panel-negocio'],
    obra: [
      'Juntar lo que hoy llevan por separado tu gestoría, tu TPV y tu web',
      'Márgenes reales por servicio, no facturación a secas',
      'Avisos cuando algo se sale de lo normal, sin que lo busques',
    ],
    noDeEntrada: '<strong>El panel, si acabas de empezar.</strong> Mide retención y frecuencia de visita: necesita meses de datos tuyos dentro para decir algo que no sepas ya.',
  },
  {
    id: 'marketing',
    nucleo: 'presencia-web-landing',
    montaTitulo: 'Monta tu presencia',
    nucleoNombre: 'La página',
    nucleoTexto: 'Es el que va siempre: tu sitio, conectado con lo demás.',
    nombre: 'Marketing y Presencia',
    dolor: 'Que no te vean: ni reseñas, ni publicaciones, ni web decente',
    titular: 'Una página que trabaja, no un folleto con tu teléfono.',
    queEs: 'Es tu sitio en internet, montado para que sirva de algo: que quien llegue pueda reservar, escribir o dejarte su contacto sin salir de ahí, y que lo que haga se enganche con el resto de lo que tengas montado.',
    comoFunciona: 'Alguien te busca en Google un sábado, entra, ve lo que haces y reserva sin llamar a nadie. Esa reserva cae en la misma agenda que lleva el asistente, y el lunes aparece en el informe. No hay copiar y pegar por el medio.',
    diagrama: {
      centro: 'Tu página',
      entradas: ['Google', 'Instagram', 'Tu tarjeta'],
      salidas: ['Reserva directa', 'Formulario', 'El asistente'],
    },
    piezas: ['presencia-web-landing', 'landing-conectada-bookia'],
    obra: [
      'Contenido publicándose solo, en tu tono, cada semana',
      'Campañas y anuncios llevados por IA',
      'Embajadores y contenido de tus propios clientes',
    ],
    noDeEntrada: '<strong>Casi todo lo demás, de momento.</strong> Este es el departamento donde menos tenemos empaquetado: hoy te montamos la web y el resto es obra. Preferimos decírtelo antes de que lo descubras tú.',
  },
];

if (typeof module !== 'undefined') module.exports = { BASE, DEPARTAMENTOS, EXPLICACIONES, SIN_DENTAL, NOMBRE_WEB, SIN_NOMBRES, nombreWeb, PRODUCTOS };
