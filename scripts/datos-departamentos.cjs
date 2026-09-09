/* Los cinco departamentos que se abren el 09-09-2026.

   Atención al Cliente y Ventas y Captación NO están aquí: son páginas escritas
   a mano, con heros de maqueta (el móvil con su conversación, la bandeja) que
   no salen de un molde. Estas cinco usan el hero con foto y dejan que la pieza
   visual sea el diagrama de flujo.

   ⚠️ PRECIOS PENDIENTES DE VALIDAR por Ismael. Están puestos con la escala del
   catálogo (complementos 5-15 €, medianas 20-49 €, grandes 79-199 €) y el
   razonamiento pieza a pieza está en docs/catalogo-departamentos-nuevos.md.
   Las marcadas `yaExiste` ya estaban en datos-catalogo.json con ese precio.
*/

const CAL = 'https://cal.com/marirrodriga-ia/llamada';

const T = require('./trozos-a-mano.cjs');

const DEPARTAMENTOS = [
  /* ─── ATENCIÓN AL CLIENTE ─────────────────────────────────────────────────
     Entra en el generador el 09-09. Hasta hoy era una página a mano, y salía
     caro: arrastraba el menú de hace tres cambios y no tenía la estructura
     nueva. El hero y el bloque «esto no es un chatbot» se conservan tal cual
     desde trozos-a-mano.cjs.

     El reparto entre el plan completo y lo que queda fuera no es una opinión:
     sale de la aritmética del pack que validó Isma. 49+5+15+15+30+15+15 = 144
     y 150+30+50+30+70+70+70 = 470. Las cinco piezas de abajo no caben en esa
     cuenta, así que van sueltas. */
  {
    archivo: 'atencion-al-cliente.html', ruta: '/atencion-al-cliente',
    heroHtml: T.heroAtencion,
    antesDePiezas: T.noEsBot,
    pill: 'Atención al Cliente',
    titulo: 'Asistente de atención al cliente con IA | Marirrodriga IA',
    descripcion: 'Un asistente que contesta por WhatsApp, Telegram o el chat de tu web, mira tu agenda de verdad y cierra la cita. Desde 49 €/mes + 150 € de instalación.',
    h1: ['Contesta a las once de la noche.', 'Y también los domingos.'],
    lead: 'Un asistente que entiende lo que le escriben, mira tu agenda de verdad y cierra la cita él mismo. En el canal donde tus clientes ya te escriben, no en uno nuevo que tengan que aprender.',
    doloresTitulo: ['Lo que se pierde no es una llamada.', 'Es la que no vuelve a llamar.'],
    doloresLead: 'Quien escribe fuera de horario no espera a mañana: escribe al siguiente. El problema de no contestar no es el mensaje perdido, es que no te enteras de que lo has perdido.',
    pack: {
      nombre: 'Atención al Cliente, montada entera',
      gancho: 'Las siete piezas —el chat, la agenda, los recordatorios y el correo— con la misma cabeza detrás.',
      cuota: 144, alta: 330, altaSuelta: 470,
      entra: ['WhatsApp y Telegram', 'El chat de tu web', 'Tu bandeja de correo'],
      sale: ['Contestado a cualquier hora', 'La cita, cerrada', 'Y lo que no le toca, en tus manos'],
      comoVa: 'No son siete programas: es uno con siete manos. El mismo que contesta el chat es el que mira la agenda y el que ordena el correo.',
      pie: 'Montado entero, lo que aprende en un canal lo sabe en los demás. Comprando pieza a pieza, cada una empieza de cero.',
    },

    dolores: [
      ['Fuera de horario', 'El mensaje entra a las once de la noche, un domingo o en agosto. Tú lo lees el lunes. Para entonces ya han reservado en otro sitio.'],
      ['Mientras trabajas', 'Estás atendiendo a alguien delante. El teléfono suena, el WhatsApp se acumula y elegir a quién dejas tirado es parte del día.'],
      ['Lo de siempre', 'Precio, horario, dónde estáis, si queda hueco. Las mismas cinco preguntas, contestadas a mano, una por una, todos los días.'],
    ],
    piezas: [
    { n: 'El agente', slug: 'iris-0', eur: 49, setup: 150, yaExiste: true,
      maqueta: `<div class="mq-agente">
        <div class="mq-a-cab"><span class="mq-a-punto"></span>WhatsApp · tu negocio</div>
        <div class="mq-a-hilo">
          <p class="mq-a-tuya">Buenas, ¿tenéis hueco esta semana para una revisión?</p>
          <div class="mq-a-suya">
            <p>Buenas noches. Sí: el jueves a las 17:30 o el viernes a las 10:00.</p>
            <p class="mq-a-pie">Soy el asistente de la clínica — una IA. Si prefieres hablar con alguien, te paso.</p>
          </div>
          <p class="mq-a-tuya">El jueves me viene bien</p>
          <div class="mq-a-suya">
            <p>Hecho, <b>jueves 17:30</b>. Te aviso la víspera por si hay que moverla.</p>
          </div>
        </div>
        <div class="mq-a-caja"><span>23:41 · contestado en 4 segundos</span><em>✓</em></div>
      </div>`,
      d: 'Contesta las preguntas de siempre con lo que tú le hayas contado de tu negocio. Va con un canal incluido, el que tú elijas: el chat de tu web, WhatsApp o Telegram. Se identifica como IA y te pasa la conversación cuando no le toca a él.',
      lim: '500 conversaciones al mes · 1 canal' },

    { n: 'Un canal más', slug: 'canal-adicional', eur: 5, setup: 30,
      maqueta: `<div class="mq-lista">
        <div class="mq-l-cab">Por dónde contesta</div>
        <ul>
          <li class="mq-l-nuevo"><span class="mq-eti mq-eti-v">Incluido</span><i>WhatsApp · el que has elegido tú</i></li>
          <li><span class="mq-eti">+5 €</span><i>Telegram</i></li>
          <li><span class="mq-eti">+5 €</span><i>Instagram</i></li>
          <li><span class="mq-eti">+5 €</span><i>El chat de tu web</i></li>
        </ul>
        <p class="mq-l-pie">El mismo agente en todos: lo que aprende en uno lo sabe en los demás.</p>
      </div>`,
      d: 'El primero va incluido y lo eliges tú. Cada canal de más — WhatsApp, Telegram, Instagram — se suma aparte.',
      lim: '1 canal por unidad' },

    { n: 'Acceso a tu agenda: reservar, cambiar y cancelar', slug: 'agenda-reserva-publica', eur: 15, setup: 50, destacada: true,
      maqueta: `<div class="mq-lista">
        <div class="mq-l-cab">Jueves 14 · huecos reales</div>
        <ul>
          <li class="mq-l-lleno"><span>09:00</span><i>María G. · revisión</i></li>
          <li class="mq-l-lleno"><span>11:30</span><i>Jorge P. · limpieza</i></li>
          <li class="mq-l-libre"><span>17:30</span><i>libre</i></li>
          <li class="mq-l-nuevo"><span>17:30</span><i>reservado por el agente · hace 1 min</i></li>
          <li class="mq-l-libre"><span>19:00</span><i>libre</i></li>
        </ul>
        <p class="mq-l-pie">Mira el hueco de verdad antes de ofrecerlo. No promete lo que no hay.</p>
      </div>`,
      d: 'Deja de contestar y empieza a hacer: mira los huecos reales y cierra la cita él mismo.',
      lim: 'hasta 400 citas/mes' },

    { n: 'Recordatorios anti no-show y reseñas', slug: 'recordatorios-confirmacion', eur: 15, setup: 30,
      maqueta: `<div class="mq-agente">
        <div class="mq-a-cab"><span class="mq-a-punto"></span>La víspera, y el día después</div>
        <div class="mq-a-hilo">
          <div class="mq-a-suya">
            <p>Mañana a las <b>17:30</b> tienes cita. ¿La confirmas o la movemos?</p>
            <div class="mq-a-botones"><span>Confirmar</span><span>Cambiarla</span></div>
          </div>
          <p class="mq-a-tuya">Confirmada</p>
          <div class="mq-a-suya">
            <p>¿Qué tal fue ayer?</p>
            <p class="mq-a-pie">Si contesta bien, le manda el enlace de Google. Si contesta mal, no pide nada y te avisa a ti.</p>
          </div>
        </div>
      </div>`,
      d: 'Avisa la víspera y deja confirmar o cancelar con un toque. Cuando la visita ha pasado pregunta qué tal fue: si fue bien pide la reseña de Google, y si fue mal te avisa a ti.',
      lim: 'hasta 800 envíos/mes',
      nota: 'Para contestar las reseñas ya publicadas, eso vive en Posicionamiento Online.' },

    { n: 'Seguimiento de pedidos', slug: 'modulo-seguimiento-pedidos', eur: 30, setup: 70,
      maqueta: `<div class="mq-agente">
        <div class="mq-a-cab"><span class="mq-a-punto"></span>«Y lo mío, ¿dónde está?»</div>
        <div class="mq-a-hilo">
          <p class="mq-a-tuya">Buenas, pedí el martes y no sé nada</p>
          <div class="mq-a-suya">
            <p>Lo tengo: salió ayer y entra en reparto <b>mañana por la mañana</b>.</p>
            <div class="mq-a-pasos"><span class="hecho">Pagado</span><span class="hecho">Preparado</span><span class="hecho">En camino</span><span>Entregado</span></div>
            <p class="mq-a-pie">Consulta tu tienda y solo lee: ni toca el pedido ni lo cancela.</p>
          </div>
        </div>
      </div>`,
      d: 'Responde al «¿dónde está lo mío?» consultando tu tienda. Solo lee: ni toca ni cancela.',
      lim: 'se acopla al asistente',
      nota: 'Si lo que quieres es avisar antes de que pregunten, eso vive en Logística.' },

    { n: 'El organizador del buzón', slug: 'correo-clasificacion', eur: 15, setup: 70,
      maqueta: `<div class="mq-lista">
        <div class="mq-l-cab">Tu bandeja, a las 8:05</div>
        <ul>
          <li><span class="mq-eti mq-eti-r">Reclamación</span><i>Pedido 4412 — llegó roto</i></li>
          <li><span class="mq-eti mq-eti-p">Pedido</span><i>Confirmación de 3 unidades</i></li>
          <li><span class="mq-eti mq-eti-o">Propuesta</span><i>Colaboración con un proveedor</i></li>
          <li class="mq-l-gris"><span class="mq-eti">Spam</span><i>Posicionamiento garantizado en Google</i></li>
        </ul>
        <p class="mq-l-pie">Las etiquetas las decides tú. Solo lee y ordena: no escribe.</p>
      </div>`,
      d: 'Un agente que vive dentro de tu correo y ordena lo que entra: esto es spam, esto una reclamación, esto una propuesta, esto un pedido. Tú decides las etiquetas. Va siempre, porque es lo que hace que lo demás sepa qué está mirando.',
      lim: 'hasta 1.000 correos al mes · 1 buzón · solo lee, no escribe' },

    { n: 'Ningún correo se queda sin dueño', slug: 'correo-respuesta-derivacion', eur: 15, setup: 70,
      maqueta: `<div class="mq-lista">
        <div class="mq-l-cab">Lo que entra, repartido</div>
        <ul>
          <li><span class="mq-eti mq-eti-v">Contestado solo</span><i>«Horario de los sábados»</i></li>
          <li><span class="mq-eti mq-eti-p">Ticket → Marta</span><i>Cambio de una factura</i></li>
          <li><span class="mq-eti mq-eti-r">A ti, ahora</span><i>Cliente enfadado por una espera</i></li>
        </ul>
        <p class="mq-l-pie">Lo que puede esperar, se reparte. Lo que no, te llega al momento.</p>
      </div>`,
      d: 'Responde los correos que tú hayas decidido que se contestan solos; del resto abre un ticket y se lo asigna a quien le toque. Y lo que no puede esperar —una reclamación, un cabreo— te lo pasa al momento en vez de dejarlo en la bandeja.',
      lim: 'hasta 300 respuestas, derivaciones o avisos/mes',
      nota: 'Esto reparte lo que entra en tu buzón. Perseguir un problema con un tercero hasta cerrarlo es la gestión de incidencias, en Logística.' },

    { n: 'Base de datos de clientes', slug: 'ficha-cliente', eur: 25, setup: 100, fueraDelPack: true,
      d: 'Que sepa quién le escribe, qué le hiciste la última vez y qué hablasteis hace tres meses, en vez de empezar de cero cada vez.',
      lim: '2.000 fichas · 5 GB de fotos' },

    { n: 'Monitoreo de clientes potenciales', slug: 'hermes-acompanamiento-conversacional', eur: 49, setup: 50, fueraDelPack: true,
      d: 'Sigue a los que preguntaron y no cerraron: intenta cerrarlos, y cuando alguno se cae te reporta por qué se ha caído.',
      lim: '300 conversaciones/mes' },

    { n: 'Función de voz: que coja el teléfono', slug: 'voz-telefono', eur: 15, setup: 100, fueraDelPack: true,
      d: 'Que atienda hablando, no solo escribiendo. Mismo cerebro y mismos datos que el de texto.',
      lim: 'comparte el volumen del agente',
      nota: 'La telefonía y los minutos van a tu nombre y a tu cargo, igual que la cuenta de WhatsApp. Por eso el mensual es tan bajo: el consumo no pasa por nosotros.' },

    { n: 'Un buzón más', slug: 'correo-buzon-adicional', eur: 5, setup: 30, fueraDelPack: true,
      d: 'El primero va incluido. Si tienes info@, ventas@ y soporte@ por separado, cada uno de más se suma aparte.',
      lim: '1 buzón por unidad' },

    { n: 'Que lo lleve a tu CRM', slug: 'correo-extraccion-crm', eur: 20, setup: 100, fueraDelPack: true,
      d: 'Del correo salen los datos que importan — quién pregunta, por qué y cómo contactarle — y acaban en tu CRM en vez de en tu cabeza.',
      lim: 'hasta 300 fichas al mes',
      nota: 'Cuenta con que ya tienes un CRM y con que deja escribir desde fuera. Si no tienes, montarlo se presupuesta aparte.' },
    ],
    faq: [
      ['¿Se nota que es un bot?', 'Sí, y a propósito: se identifica siempre como IA. Lo exige el artículo 50 del Reglamento Europeo de IA desde agosto de 2026, y además mentir en eso sale caro el día que el cliente lo descubre. Lo que no se nota es que sea malo.'],
      ['¿Qué pasa cuando no sabe algo?', 'Deja de contestar y te pasa la conversación. No improvisa, no promete plazos y no cierra ventas con cobro. Si el cliente se enfada, también te lo pasa: la escalada a una persona es parte del diseño, no un fallo.'],
      ['¿Necesito una cuenta de WhatsApp Business?', 'Sí, y va a tu nombre: Meta te factura a ti directamente. No revendemos mensajería. Por eso un canal de más cuesta 5 €/mes — lo que pagas es la conexión, no el consumo.'],
      ['¿Y si me quedo corto de conversaciones?', 'Te avisamos al 80 % del límite y te proponemos subir. Nunca cortamos el servicio ni te facturamos el exceso por sorpresa. Un precio sin su límite al lado es una mentira o una trampa, así que aquí van siempre juntos.'],
      ['¿Hay permanencia?', 'No. Te vas cuando quieras avisando con 30 días. La instalación se paga 50 % al empezar y 50 % al entregar, y la cuota incluye los ajustes y una reunión al mes.'],
      ['¿Cuánto tarda en estar funcionando?', 'Depende de cuánto haya que contarle de tu negocio y de a cuántas cosas tuyas se tenga que conectar. En la llamada lo vemos y sales con una fecha concreta, no con un «pronto».'],
    ],
  },

  /* ─── VENTAS Y CAPTACIÓN ──────────────────────────────────────────────────
     Entra en el generador el 09-09, por lo mismo que Atención. Conserva su
     hero, la captura del panel de captación funcionando —la única prueba
     publicada de un producto nuestro en producción— y el analista de
     competencia entero, que es un producto aparte y no cabe en la tabla.

     Aritmética del pack: 199+49+15 = 263 y 600+200+40 = 840. */
  {
    archivo: 'ventas-y-captacion.html', ruta: '/ventas-y-captacion',
    css: ['ventas.css'],
    heroHtml: T.heroVentas,
    despuesDePiezas: T.capturaVentas + T.competenciaVentas,
    pill: 'Ventas y Captación',
    titulo: 'Captación de clientes con IA | Marirrodriga IA',
    descripcion: 'Sale a buscar negocios que encajan contigo y te los deja puntuados, con el primer mensaje escrito. Y persigue los presupuestos que se enfrían. Desde 49 €/mes.',
    h1: ['Encontrar a quien no te conoce.', 'Y no perder a quien ya te preguntó.'],
    lead: 'Salir a buscar clientes y perseguir lo que ya tienes abierto son dos trabajos distintos, y los dos se hacen todos los días o no se hacen. Estos los hacen solos.',
    doloresTitulo: ['Vender no es difícil.', 'Lo difícil es hacerlo todos los días.'],
    doloresLead: 'Buscar clientes se come el tiempo de atenderlos. Y los que ya preguntaron se enfrían mientras tú estás con el siguiente. Ninguna de las dos cosas es complicada; lo complicado es que no se te pase ni un día.',
    pack: {
      nombre: 'Ventas y Captación, montado entero',
      gancho: 'Salir a buscar, no perder al que preguntó y recuperar al que se fue — con una sola cola.',
      cuota: 263, alta: 590, altaSuelta: 840,
      entra: ['Tu sector y tu zona', 'Los presupuestos que mandas', 'Los que dejaron de venir'],
      sale: ['La cola puntuada, con su motivo', 'Ningún presupuesto sin seguir', 'Los dormidos, despertados'],
      comoVa: 'Las tres beben de la misma ficha: lo que el seguimiento aprende de un cliente lo aprovecha la reactivación dos meses después.',
      pie: 'Es la diferencia entre tres herramientas sueltas y un embudo: el que entra por captación sale por reactivación sin que nadie lo mueva a mano.',
    },

    dolores: [
      ['El día que se va buscando', 'Abrir Google, mirar fichas, apuntar teléfonos, adivinar cuál merece la pena. Tres horas para encontrar cinco a los que llamar, y ninguna para llamarlos.'],
      ['El presupuesto que se enfría', 'Lo mandas el lunes. El jueves no ha dicho nada y tú no escribes por no parecer pesado. A los quince días ya ha comprado en otro sitio, y no te has enterado.'],
      ['El que preguntó y no volvió', 'Pidió precio por WhatsApp, le contestaste, y ahí se quedó. No dijo que no: se le pasó. Nadie le volvió a escribir, porque nadie tenía eso apuntado.'],
    ],
    piezas: [
    { n: 'Captación de clientes potenciales', slug: 'captacion-leads', eur: 199, setup: 600, destacada: true,
      maqueta: `<div class="mq-lista">
        <div class="mq-l-cab">Tu cola del lunes · ordenada por nota</div>
        <ul>
          <li><span class="mq-nota mq-nota-a">98</span><i>Peluquería · 4,9★ y 204 reseñas — web sin candado, hora solo por teléfono</i></li>
          <li><span class="mq-nota mq-nota-a">91</span><i>Clínica · sin reserva online, 180 reseñas</i></li>
          <li><span class="mq-nota mq-nota-b">74</span><i>Taller · ficha sin horario ni fotos</i></li>
          <li class="mq-l-gris"><span class="mq-nota">41</span><i>Descartado · ya tiene montado lo que vendemos</i></li>
        </ul>
        <p class="mq-l-pie">Con el motivo escrito y el primer mensaje redactado. El botón de enviar lo pulsas tú.</p>
      </div>`,
      d: 'Rastrea negocios que encajan con tu cliente ideal en fuentes públicas, mira qué tienen y qué les falta, les pone nota y te los entrega ordenados de mejor a peor con el motivo escrito y el primer mensaje ya redactado. Tú te sientas a decidir a quién escribes, no a buscar a quién.',
      lim: '150 negocios cualificados al mes · 1 sector y 1 zona a elegir · entrega en tu CRM o en una hoja de cálculo, más un aviso semanal',
      nota: 'Te deja la lista y el borrador; el mensaje lo mandas tú. La base legal del artículo 21 de la LSSI es de quien lo manda, y esa responsabilidad no la asumimos por ti. Tampoco compramos bases de datos ni verificamos por teléfono.' },

    { n: 'Seguimiento de presupuestos', slug: 'hermes-seguimiento-presupuestos', eur: 49, setup: 200,
      maqueta: `<div class="mq-agente">
        <div class="mq-a-cab"><span class="mq-a-punto"></span>Jueves · tres días sin respuesta</div>
        <div class="mq-a-hilo">
          <div class="mq-a-suya">
            <p>Hola Marta, el lunes te pasamos el presupuesto. Lo que más suele frenar es el pago: se puede hacer en <b>12 meses sin intereses</b>. ¿Te lo cuento?</p>
          </div>
          <div class="mq-a-aviso">
            <b>A los diez días, en tu panel</b>
            <p>Marta y Jorge no han contestado a dos toques. Luis ha abierto el presupuesto tres veces: llámale tú.</p>
          </div>
        </div>
      </div>`,
      d: 'Trabaja sobre presupuestos que ya has mandado. Sabe cuáles siguen abiertos, escribe a los días justos con la duda más probable ya resuelta, y te dice cuáles se han enfriado y cuáles merecen una llamada tuya. Ni negocia precio ni aplica descuentos.',
      lim: '200 presupuestos activos · email + un canal de mensajería (WhatsApp o Telegram)',
      nota: 'Lee tus presupuestos en tu sistema solo si tiene API. Si es un programa cerrado, se valora aparte antes de empezar, no después.' },

    { n: 'Reactivación de dormidos', slug: 'reactivacion-dormidos', eur: 15, setup: 40,
      maqueta: `<div class="mq-lista">
        <div class="mq-l-cab">A quién sí, y a quién no</div>
        <ul>
          <li><span class="mq-eti mq-eti-v">Escribirle</span><i>Venía cada 6 semanas al color · lleva 4 meses sin pisar</i></li>
          <li><span class="mq-eti mq-eti-v">Escribirle</span><i>Dos tratamientos el año pasado · nada desde marzo</i></li>
          <li class="mq-l-gris"><span class="mq-eti">Dejarlo</span><i>Vino una vez hace dos años · escribirle molesta</i></li>
        </ul>
        <p class="mq-l-pie">«Hace tiempo que no te vemos. ¿Te guardo hueco el jueves por la tarde?»</p>
      </div>`,
      d: 'Trabaja con clientes que ya eran tuyos y llevan meses sin aparecer. Va a quien tiene sentido, con lo que ya sabes de él. No es una campaña a toda la base.',
      lim: 'hasta 200 contactos/mes · 1 campaña/mes' },

    { n: 'Que acompañe al que preguntó y no cerró', slug: 'hermes-acompanamiento-conversacional', eur: 49, setup: 50, fueraDelPack: true,
      d: 'Trabaja antes del presupuesto: con quien pidió información y no volvió. Sigue la conversación, resuelve la duda que le frena, intenta cerrarlo y, si se cae, te apunta por qué.',
      lim: '300 conversaciones/mes',
      nota: 'La diferencia con el seguimiento: aquel persigue un papel que ya enviaste; esta conversa con quien aún no ha llegado a papel.' },

    { n: 'Que avise de la cita y luego pida la reseña', slug: 'recordatorios-confirmacion', eur: 15, setup: 30, fueraDelPack: true,
      d: 'Trabaja después de cerrar: cuida la cita para que no te planten y convierte la visita buena en una reseña de Google.',
      lim: 'hasta 800 envíos/mes, sumando recordatorios y peticiones de reseña · sin SMS ni llamadas',
      nota: 'Las otras venden. Esta cuida lo ya vendido y trae la siguiente venta por reputación.' },

    { n: 'Y que conteste al que entra nuevo', slug: 'iris-0', eur: 49, setup: 150, fueraDelPack: true,
      d: 'Contesta, cualifica y da cita al que escribe por primera vez. Desde ahí, si le mandas presupuesto, ya lo coge el seguimiento.',
      lim: '500 conversaciones/mes · 1 canal',
      nota: 'Es el agente de Atención al Cliente. Vive en su página y no se repite aquí.' },
    ],
    faq: [
      ['¿Escribe a los negocios en mi nombre?', 'No. Te deja la lista puntuada y el primer mensaje redactado, pero el botón de enviar lo pulsas tú. La base legal del artículo 21 de la LSSI es de quien manda el correo, y esa responsabilidad no la asumimos por ti. Es la misma regla que seguimos nosotros con nuestra propia cola.'],
      ['¿De dónde saca los negocios?', 'De fuentes públicas: la ficha de Google del negocio y su propia web. Ahí es donde se ve si tiene reserva online, si su web va sin candado o cuántas reseñas le han entrado en el último año. No compramos bases de datos ni verificamos por teléfono.'],
      ['¿Cuántos de los 150 valen de verdad?', 'Depende del sector y de la zona, y por eso cada uno lleva su nota y su motivo escrito: los de arriba son a los que merece la pena escribir hoy. En nuestra propia cola, de 265 negocios rastreados solo 98 tenían un correo al que escribir. Te lo decimos antes de empezar, no después.'],
      ['¿Y si no tengo CRM?', 'Te lo entregamos en una hoja de cálculo, con el aviso semanal igual. Montar un CRM se presupuesta aparte, y de entrada no te lo recomendamos: un CRM sin volumen dentro es una hoja vacía que da trabajo y no devuelve nada.'],
      ['¿El seguimiento negocia el precio?', 'No. Escribe, resuelve dudas, marca calientes y fríos y te pasa a ti los que merecen llamada. Que negocie dentro de unos límites que fijes tú se construye aparte, con tus reglas por escrito, y lo que se salga de la regla te lo pasa igual.'],
      ['¿Se nota que es un bot?', 'Cuando conversa con alguien se identifica como asistente, que es lo que exige el artículo 50 del Reglamento Europeo de IA desde agosto de 2026. Escribe con tu tono y desde tu negocio, y cuando no sabe algo o la conversación se pone seria, deja de contestar y te la pasa a ti.'],
      ['¿Hay permanencia?', 'No. Te vas cuando quieras avisando con 30 días. La instalación se paga 50 % al empezar y 50 % al entregar, y la cuota incluye los ajustes y una reunión al mes. Y si te acercas al límite de tu pieza, te avisamos al 80 % y te proponemos subir: nunca cortamos ni facturamos el exceso por sorpresa.'],
    ],
  },

/* ═══ FINANZAS ═══════════════════════════════════════════════════════════ */
{
  archivo: 'finanzas.html', ruta: '/finanzas', hero: 'hero-finanzas.jpg',
  pill: 'Finanzas',
  titulo: 'Automatizar facturación y cobros | Marirrodriga IA',
  descripcion: 'Facturar por mensaje, perseguir lo vencido y ver tu dinero explicado: caja, cobros y punto muerto. Desde 49 €/mes.',
  h1: ['Facturar sin abrir el programa.', 'Y cobrar sin perseguir.'],
  lead: 'El papeleo no se hace más rápido: se hace <strong>en otro momento</strong>, cuando ya has cerrado. Esto lo hace mientras trabajas, y te avisa solo cuando algo necesita que decidas tú.',
  pack: {
    nombre: 'Finanzas, montado entero',
    gancho: 'Las cuatro piezas trabajando juntas y ajustadas a cómo facturas tú, no a un molde.',
    cuota: 306, alta: 840, altaSuelta: 1200,
    entra: [
      'Las facturas que emites',
      'Las que te llegan',
      'Los vencimientos',
    ],
    sale: [
      'Facturado sin abrir nada',
      'Cobrado sin perseguir',
      'Las cuentas explicadas',
    ],
    comoVa: 'Lo que factura una alimenta lo que cobra la siguiente, y lo cobrado entra en el cuadro sin que nadie lo teclee.',
    pie: 'No es comprar las cuatro piezas: es montarlas conectadas entre sí, para que lo que sale de una entre en la siguiente.',
  },
  dolores: [
    ['La factura del domingo', 'Se hacen a última hora, cuando ya no queda nadie. Y la que se olvida no la reclama nadie hasta que el cliente llama por otra cosa.'],
    ['El que no paga y nadie llama', 'La factura vence, pasa un mes, pasan dos. Reclamar da pereza y se pospone — y cuanto más tarde se reclama, menos se cobra.'],
    ['El justificante que no aparece', 'El albarán, el certificado, el papel que pide la gestoría. Está en un correo de hace cuatro meses o no está.'],
  ],
  flujo: {
    ruta: 'Persecución de documentos › La caza del trimestre',
    disparadores: [['reloj', 'Empieza el trimestre'], ['doc', 'Tu lista de clientes']],
    pasos: [
      ['msg', 'Escribe a cada uno pidiéndole lo suyo'],
      ['ojo', 'Comprueba lo que llega: si está completo y si es lo que pedía'],
      ['reloj', 'Al que no manda, le insiste — y sin repetirle el mismo mensaje'],
    ],
    fin: [['ok', 'Completo: lo archiva donde tú lo lleves'], ['humano', 'Incompleto: te dice qué falta y de quién']],
    pie: 'La tarea más odiada de una asesoría, hecha sola. Los plazos, el tono y cuántas veces insiste los fijas tú antes de empezar.',
  },
  piezas: [
    { n: 'Facturación por mensaje', yaExiste: true, eur: 49, setup: 200,
      foto: 'pz-fin-facturacion.jpg',
      fotoAlt: 'Una mano escribiendo en el móvil sobre el mostrador de una tienda, con el datáfono y una libreta al lado',
      d: 'Le dices por WhatsApp a quién y de qué, y la factura sale hecha, numerada y enviada. Sin abrir el programa.',
      lim: 'hasta 150 facturas/mes' },
    { n: 'Recobro de facturas vencidas', eur: 79, setup: 250, destacada: true,
      foto: 'pz-fin-recobro.jpg',
      fotoAlt: 'Un montón de facturas impresas sobre la mesa de una oficina pequeña, junto al portátil con el correo abierto',
      d: 'Persigue lo que está vencido: escribe, insiste con criterio y te pasa a ti solo lo que necesita una llamada de verdad.',
      lim: 'hasta 200 avisos/mes' },
    /* Reenfocada el 09-09. Antes describía el producto sin decir para quién:
       «albaranes, justificantes y certificados» le vale igual a una peluquería
       que a una gestoría, y por eso no le hablaba a nadie. El comprador es la
       propia gestoría, asesoría o aseguradora, cuyo dolor es perseguir a
       cuarenta clientes cada trimestre. Con el destinatario claro, los 79 € se
       pagan con un solo trámite que deja de atascarse. */
    { n: 'Persecución de documentos', yaExiste: true, eur: 79, setup: 300,
      foto: 'pz-fin-documentos.jpg',
      fotoAlt: 'Carpetas de plástico y archivadores apilados en la mesa de una asesoría',
      d: 'Para quien no puede cerrar un trámite hasta que llega un papel que tiene otro. Escribe, insiste con criterio, comprueba que está completo y te dice qué falta y de quién.',
      lim: 'hasta 300 documentos/mes',
      lista: [
        'La caza del trimestre: las facturas de cada cliente para el IVA',
        'Albaranes firmados que bloquean el cobro de una expedición',
        'Partes y peritajes que la aseguradora no paga sin ellos',
        'Certificados que caducan: Hacienda, Seguridad Social, seguros',
      ] },

    /* El segundo peldaño, que propuso Isma. La persecución resuelve que el
       papel LLEGUE; esto resuelve que llegue ORDENADO. Se vende después, no
       antes: primero se demuestra que la persecución funciona.
       El precio escala por volumen, pero el tramo de entrada va público —si
       no, se rompe la promesa de «precio y límite al lado», que es media
       marca. */
    { n: 'Fichas listas para validar', eur: 149, setup: 600, fueraDelPack: true,
      d: 'El paso siguiente, cuando la persecución ya funciona: lo que llega se lee, se ordena por cliente y se deja preparado para una sola revisión humana. Se cierra el trámite mirando una ficha, no una carpeta.',
      lim: 'desde 500 documentos/mes · escala por tramos',
      lista: [
        'Una ficha por cliente, con todo lo suyo del periodo',
        'Lo que falta, señalado antes de que lo busques',
        'Lo que no cuadra, marcado para que lo mires tú',
      ] },
    /* Era «Contabilidad asistida» a 169 €/mes + 650 € y solo ordenaba para la
       gestoría. Isma lo tumbó con un argumento que no tiene vuelta: una
       gestoría cuesta unos 50 €/mes, así que pagar 169 para entregarle el
       trabajo ordenado no sale a cuenta. Lo que sí sale es que además te
       explique tu propio dinero. Se amplía el alcance, baja a 99 + 450.
       El 09-09 se le funde además la conciliación, que iba suelta a 49 €: si
       esta pieza ya da previsión de caja y días de cobro, cruzar cobros con
       facturas está a un paso, y tener las dos obligaba al cliente a decidir
       algo que no sabe decidir. */
    { n: 'Contabilidad y cuadro financiero', eur: 99, setup: 450,
      foto: 'pz-fin-contabilidad.jpg',
      fotoAlt: 'Un portátil con un panel de gráficas junto a una libreta abierta, con luz de ventana',
      d: 'Clasifica gastos e ingresos, cruza lo cobrado con lo facturado y, con esas mismas facturas, monta el cuadro que ningún programa pequeño te da: qué vas a cobrar, quién te hace esperar y cuánto te falta para cubrir el mes.',
      lim: 'hasta 800 apuntes/mes · 6 indicadores',
      lista: [
        'Previsión de caja a 60 días, semana a semana',
        'Días medios de cobro — y qué clientes los suben',
        'Concentración: cuánto dependes de tu mayor cliente',
        'Punto muerto: lo que falta por facturar este mes',
        'Gastos recurrentes vivos y lo que llevas pagado',
        'Cobros cruzados con facturas: lo que no cuadra, señalado',
      ] },
  ],
  faq: [
    ['¿Manda la factura en mi nombre?', 'Sí, sale con tus datos y tu numeración. Pero la serie y el formato los fijamos contigo antes de empezar, y la primera semana revisas tú cada una antes de que salga.'],
    ['¿El recobro llama por teléfono?', 'Por defecto escribe: WhatsApp, correo o SMS. La llamada se puede añadir, pero entonces hay que grabar el aviso legal y fijar por escrito qué dice y qué no dice.'],
    ['¿Y si el cliente se enfada?', 'Deja de insistir y te lo pasa. No negocia plazos ni quitas por su cuenta: eso lo decides tú.'],
    ['¿Sustituye a mi gestoría?', 'No, y no lo pretende. Le deja el trabajo ordenado para que cobre por asesorarte y no por teclear.'],
    ['¿Hay permanencia?', 'No. Te vas cuando quieras avisando con 30 días. La instalación se paga 50 % al empezar y 50 % al entregar.'],
  ],
},

/* ═══ LOGÍSTICA ══════════════════════════════════════════════════════════ */
{
  archivo: 'logistica.html', ruta: '/logistica', hero: 'hero-logistica.jpg',
  pill: 'Logística',
  titulo: 'Seguimiento de entregas con IA | Marirrodriga IA',
  descripcion: 'Persigue al transportista, saca la fecha real y avisa a tu cliente antes de que pregunte. Desde 30 €/mes, con su límite al lado.',
  h1: ['Deja de llamar al transportista.', 'Llama él.'],
  lead: 'La pregunta que más veces se hace en un negocio que mueve mercancía es <strong>«¿por dónde va?»</strong>. Y la respuesta cuesta dos llamadas y media mañana. Esto la consigue solo, y avisa antes de que nadie pregunte.',
  pack: {
    nombre: 'Logística, montada entera',
    gancho: 'Todo lo que se mueve, seguido y avisado, sin que nadie coja el teléfono.',
    cuota: 207, alta: 490, altaSuelta: 700,
    entra: [
      'Los pedidos que salen',
      'Los transportistas',
      'Lo que se tuerce',
    ],
    sale: [
      'La fecha real, sabida',
      'El cliente, avisado',
      'La incidencia, cerrada',
    ],
    comoVa: 'La fecha que saca el seguimiento es la que el aviso le cuenta a tu cliente, y si no llega, abre la incidencia sola.',
    pie: 'Las cuatro piezas comparten lo que aprenden: lo que el seguimiento saca del transportista es lo que el aviso le cuenta a tu cliente.',
  },
  dolores: [
    ['La llamada de las diez', 'Llamar al transportista para saber dónde va el pedido. Y volver a llamar porque no lo cogen. Y otra vez mañana.'],
    ['El cliente que pregunta primero', 'Te enteras del retraso porque llama el cliente enfadado, no porque lo hayas visto venir. Ya vas tarde y encima con la culpa.'],
    ['El muelle a medias', 'Dos camiones a la misma hora, o ninguno en toda la mañana. Cuadrar la descarga es una cadena de llamadas que nadie quiere hacer.'],
  ],
  flujo: {
    ruta: 'Seguimiento de entregas › Cómo va un envío',
    disparadores: [['caja', 'Sale un pedido'], ['reloj', 'Llega el día de entrega']],
    pasos: [
      ['msg', 'Escribe o llama al transportista y le pide la fecha real'],
      ['doc', 'Apunta la respuesta donde tú lleves los envíos'],
      ['ojo', 'Compara con lo prometido al cliente'],
    ],
    fin: [['ok', 'Todo en plazo: avisa al cliente'], ['aviso', 'Va tarde: te avisa a ti primero']],
    pie: 'Lo que hace con cada envío en curso. Funciona con la hoja o el programa que ya uses; no hay que cambiar de sistema.',
  },
  piezas: [
    { n: 'Seguimiento de entregas', eur: 79, setup: 250, destacada: true,
      foto: 'pz-log-entregas.jpg',
      fotoAlt: 'La oficina de un almacen: el pincho de albaranes, el escaner de codigos y la pizarra de rutas junto a la ventana del muelle',
      d: 'Persigue a cada transportista hasta sacarle la fecha real, lo apunta y te avisa solo de lo que se ha torcido.',
      lim: 'hasta 400 envíos/mes' },
    /* Choca de nombre con «Módulo · Seguimiento de pedidos» de Atención
       (30 €/mes + 70 €), que lo vio Isma. La diferencia es real pero no se
       deduce del nombre, así que se dice en el texto:
         · el de Atención es REACTIVO — el cliente pregunta y el agente mira la
           tienda. Se acopla al asistente, y por eso el alta es de 70 €.
         · este es PROACTIVO — avisa sin que nadie pregunte, lee al
           transportista y no necesita al agente. Monta su propio canal, y de
           ahí los 100 € de alta.
       Se pueden tener los dos y se complementan; tener solo uno también vale. */
    { n: 'Avisar antes de que pregunten', eur: 30, setup: 100,
      foto: 'pz-log-avisos.jpg',
      fotoAlt: 'Una mano con el movil escribiendo un mensaje delante de un palet ya retractilado, con la persiana del muelle abierta',
      d: 'Cuando hay fecha, se la manda al cliente. Cuando cambia, se lo cuenta. No espera a que pregunte: ese es todo el truco, y es la llamada que te ahorras.',
      lim: 'hasta 800 avisos/mes',
      lista: [
        'Funciona solo: no necesita tener montado el agente de Atención',
        'Si además lo tienes, aquel contesta al que pregunta y este avisa antes',
      ] },
    { n: 'Citas de carga y descarga', eur: 49, setup: 150,
      foto: 'pz-log-citas.jpg',
      fotoAlt: 'Un camion dado marcha atras contra el porton de una nave, con los palets esperando fuera sobre el asfalto mojado',
      d: 'Cuadra la hora con el transportista y con tu almacén, confirma a los dos y avisa si uno se cae.',
      lim: 'hasta 200 citas/mes' },
    { n: 'Gestión de incidencias', eur: 49, setup: 200,
      foto: 'pz-log-incidencias.jpg',
      fotoAlt: 'Una caja de carton reventada en el suelo del almacen, con el producto abollado dentro y el albaran encima',
      d: 'Cuando algo se rompe, se pierde o llega mal: recoge lo que ha pasado, abre el parte y persigue la resolución.',
      lim: 'hasta 150 incidencias/mes' },
  ],
  faq: [
    ['¿Necesito un programa de logística?', 'No. Funciona contra lo que ya uses, aunque sea una hoja de cálculo. Si tienes un programa con API, mejor: escribe directamente en él.'],
    ['¿Llama de verdad a los transportistas?', 'Puede. Por defecto escribe, que es más barato y deja rastro. La llamada se añade aparte y lleva su aviso legal grabado.'],
    ['¿Y si el transportista no contesta?', 'Insiste con criterio y, pasado el margen que fijes, te lo pasa a ti señalado como «sin respuesta». No inventa una fecha.'],
    ['¿Vale para quien vende online?', 'Sí, y es donde más se nota: el «¿dónde está mi pedido?» es la pregunta más repetida de cualquier tienda.'],
    ['¿Hay permanencia?', 'No. Te vas cuando quieras avisando con 30 días. La instalación se paga 50 % al empezar y 50 % al entregar.'],
  ],
},

/* ═══ DATOS Y DIRECCIÓN ══════════════════════════════════════════════════ */
{
  archivo: 'datos-y-direccion.html', ruta: '/datos-y-direccion', hero: 'hero-datos.jpg',
  pill: 'Datos y Dirección',
  titulo: 'Cuadro de mando y análisis de negocio | Marirrodriga IA',
  descripcion: 'Tus datos juntos y cruzados, y un asistente al que preguntarle por qué ha ido así el mes. Desde 15 €/mes, con su límite al lado.',
  h1: ['Saber por qué ha ido bien.', 'No solo que ha ido bien.'],
  lead: 'Un panel te dice que has facturado un 12 % menos. Eso no sirve de nada si no sabes por qué. <strong>Y el porqué casi nunca está en un dato: está en el cruce de dos</strong> — la agenda contra la facturación, las conversaciones contra las citas.',
  pack: {
    nombre: 'Datos y Dirección, montado entero',
    gancho: 'Tus datos juntos, un panel para verlos y alguien a quien preguntarles.',
    cuota: 113, alta: 240, altaSuelta: 350,
    entra: [
      'Tu facturación',
      'Tu agenda',
      'Tus conversaciones',
    ],
    sale: [
      'El panel al día',
      'El porqué del mes',
      'El aviso cuando algo cambia',
    ],
    comoVa: 'Cada fuente entra una vez y sirve para las tres: el panel la enseña, el asistente la explica y el aviso la vigila.',
    pie: 'El valor está en el cruce, así que este es el departamento donde montarlo entero cambia más las cosas: con una sola fuente no hay nada que cruzar.',
  },
  dolores: [
    ['Decidir por sensación', 'Crees que el mes ha ido bien porque has estado ocupado. Estar ocupado y ganar dinero no son lo mismo, y la diferencia solo se ve en los números.'],
    ['Los números que nadie mira', 'El programa saca informes. Están ahí, y nadie los abre, porque abrirlos cuesta veinte minutos que no tienes.'],
    ['El dato que llega tarde', 'Te enteras en enero de que octubre fue malo. En octubre se podía hacer algo; en enero, ya no.'],
  ],
  flujo: {
    ruta: 'Informe mensual › Cómo sale',
    disparadores: [['reloj', 'Fin de mes'], ['grafica', 'Tus datos del periodo']],
    pasos: [
      ['ojo', 'Compara con el mes anterior y con el mismo mes del año pasado'],
      ['grafica', 'Busca qué ha cambiado de verdad y qué es ruido'],
      ['doc', 'Escribe el porqué en cristiano, no una tabla'],
    ],
    fin: [['ok', 'Te llega por correo el día 1'], ['aviso', 'Y si algo se tuerce antes, te avisa sin esperar']],
    pie: 'No es un panel más: es la explicación que normalmente tendrías que sacar tú mirando el panel.',
  },
  piezas: [
    /* Rehecho el 09-09 con el angulo de Isma. Antes eran cuatro piezas que
       solo INFORMABAN —informe, panel, insights, avisos— y ninguna resolvia
       nada. El valor no es el informe: es tener los datos en un sitio y
       alguien a quien preguntarles. Se funden los avisos dentro del asistente,
       porque depende de a que fuentes lo conectes, no es una pieza aparte. */
    { n: 'Tus datos en un sitio', eur: 49, setup: 150, desde: true, destacada: true,
      foto: 'pz-dat-fuentes.jpg',
      fotoAlt: 'Dos monitores con dos programas distintos en la mesa de una oficina pequena, rodeados de papeles y un libro de registro',
      d: 'Lo que hoy vive en cuatro sitios —la facturación, la agenda, las conversaciones— junta y cruzada. Porque lo que vale no es cada dato por separado: es lo que sale de cruzarlos.',
      lim: 'desde 2 fuentes · el precio sube con el volumen y con cuántas conecte',
      nota: 'Desde 49 €/mes porque no es lo mismo una peluquería con una agenda que una distribuidora con cuatro sistemas. Se cierra contigo antes de empezar, y va escrito.',
      lista: [
        'Cuánto deja cada hora de agenda ocupada, y qué servicio rinde más por hora',
        'Cuántas conversaciones hacen falta para una cita: tu conversión real',
        'Qué días y qué horas se quedan vacíos, y lo que cuesta ese hueco',
        'Quién repite, quién dejó de venir y cuánto valía',
      ] },

    { n: 'Un asistente al que preguntarle', eur: 49, setup: 150,
      /* Maqueta, no foto. La anterior era un mecanico mirando el movil en el
         banco de trabajo: ensenaba a alguien consultando algo, que es lo
         mismo que no ensenar nada. Lo que vende esta pieza es la
         CONVERSACION — preguntar en cristiano y que conteste con tus
         numeros — asi que se dibuja la conversacion.

         Y contesta con el dato y el desglose, sin decirle a nadie que hacer:
         es literalmente lo que promete el texto de al lado, «no decide por
         ti». Si la maqueta le hiciera recomendar algo, la pieza se estaria
         contradiciendo a si misma en la misma pantalla. */
      maqueta: `<div class="mq-agente">
        <div class="mq-a-cab"><span class="mq-a-punto"></span>Habla con tu negocio</div>
        <div class="mq-a-hilo">
          <p class="mq-a-tuya">¿Por qué ha bajado octubre?</p>
          <div class="mq-a-suya">
            <p>Octubre cerró un <b>12 % por debajo</b> de septiembre. No es el precio: es volumen.</p>
            <ul>
              <li><span>Citas atendidas</span><i>− 8 %</i></li>
              <li><span>Ticket medio</span><i>− 4 %</i></li>
              <li><span>Huecos sin cubrir</span><i>+ 31</i></li>
            </ul>
            <p class="mq-a-pie">Casi todo el hueco está en las tardes de martes y miércoles.</p>
          </div>
        </div>
        <div class="mq-a-caja"><span>Pregúntale lo que quieras…</span><em>↑</em></div>
      </div>`,
      d: 'Le preguntas en cristiano —«¿por qué ha bajado octubre?»— y te contesta con tus números delante. No decide por ti ni te dice qué hacer: te pone el dato para que decidas tú con algo más que la sensación.',
      lim: 'preguntas sin tope · un informe escrito al mes',
      lista: [
        'Pregúntale lo que quieras sobre tu negocio, cuando quieras',
        'Un informe al mes que explica qué ha cambiado y por qué',
        'Y si algo se sale de lo normal, te escribe el día que pasa',
      ] },

    { n: 'Insights semanales', yaExiste: true, eur: 15, setup: 50,
      foto: 'pz-dat-insights.jpg',
      fotoAlt: 'Un movil apoyado en el cafe sobre la barra de un bar de barrio, con el correo abierto en la pantalla',
      d: 'Un correo el lunes con cómo fue la semana. No para mirarlo cada día: para enterarte cuando algo se tuerce.',
      lim: 'un envío semanal' },
  ],
  faq: [
    ['¿De dónde saca los datos?', 'De donde ya los tengas: tu programa de gestión, tu hoja de cálculo, tu TPV o el panel de Bookia o Dentia si los usas. No hay que meter nada dos veces.'],
    ['¿Necesito tener muchos datos?', 'No, pero sí unos meses de historia. Con dos semanas no se puede comparar nada y el informe sería palabrería.'],
    ['¿El informe lo escribe una IA?', 'Sí, y lo dice. Lee tus números, busca lo que ha cambiado y lo redacta. Lo que no hace es inventarse la causa: si no la puede saber, lo dice.'],
    ['¿Puedo pedir que vigile algo concreto?', 'Sí, para eso está la pieza de avisos. Le dices qué te preocupa y te escribe el día que pasa.'],
    ['¿Hay permanencia?', 'No. Te vas cuando quieras avisando con 30 días. La instalación se paga 50 % al empezar y 50 % al entregar.'],
  ],
},

/* ═══ MARKETING ══════════════════════════════════════════════════════════ */
{
  archivo: 'marketing.html', ruta: '/marketing', hero: 'hero-marketing.jpg',
  pill: 'Marketing',
  titulo: 'Contenido para redes y newsletter | Marirrodriga IA',
  descripcion: 'Fotos y vídeos de tu marca, generados y publicados en la red que elijas. Desde 29 €/mes, con su límite al lado.',
  h1: ['Publicar sin que', 'te robe la semana.'],
  lead: 'No es que no sepas qué contar: es que hacer la foto, escribir el pie y subirlo cuesta una hora que no tienes, y por eso pasan tres semanas sin publicar. <strong>Esto lo hace y lo publica, con tu identidad y sin que tú abras nada.</strong>',
  pack: {
    nombre: 'Marketing, montado entero',
    gancho: 'Texto, foto, vídeo y campaña, con una sola identidad y un solo calendario.',
    cuota: 306, alta: 660, altaSuelta: 950,
    entra: [
      'Lo que pasa en tu negocio',
      'Tu identidad de marca',
      'El calendario del mes',
    ],
    sale: [
      'Publicado en LinkedIn',
      'Fotos y vídeos con tu marca',
      'La campaña, entera',
    ],
    comoVa: 'La identidad se fija una vez y la respetan las cuatro, así que el vídeo y la foto del martes se parecen entre sí.',
    pie: 'La identidad se fija una vez y la respetan las cuatro. Comprándolas sueltas, cada una habría que ajustarla por separado.',
  },
  dolores: [
    ['La semana sin publicar', 'Empiezas el lunes con la intención y llega el viernes sin nada. No por dejadez: por el mostrador.'],
    ['El folio en blanco', 'Sabes que hay que publicar. No sabes de qué. Y decidirlo cuesta más que escribirlo.'],
    ['Lo que suena a otro', 'Lo que escribe una IA sin conocerte suena a folleto. Y el cliente lo nota antes que tú.'],
  ],
  flujo: {
    ruta: 'Publicaciones › De dónde sale lo que se publica',
    disparadores: [['caja', 'Algo que ha pasado en tu negocio'], ['reloj', 'El calendario del mes']],
    pasos: [
      ['doc', 'Coge tu manera de hablar de los textos que ya tienes'],
      ['msg', 'Escribe la publicación y la adapta a cada canal'],
      ['ojo', 'Te la enseña antes de publicar nada'],
    ],
    fin: [['ok', 'Le das el visto bueno y sale'], ['humano', 'O la corriges y aprende de la corrección']],
    pie: 'Nada se publica sin que lo veas tú. La primera semana revisas todo; después, lo que quieras.',
  },
  piezas: [
    /* Rehecho el 09-09. Las cuatro anteriores —publicaciones, newsletter,
       calendario, adaptaciones— las tumbó Isma enteras: vendían «contenido»
       en abstracto y competían con un community manager en su terreno. Estas
       venden PIEZAS CONCRETAS publicadas en un sitio concreto.

       LOS LÍMITES NO SON INVENTADOS. Salen del coste real de generación
       medido el 09-09 contra la API:
         · imagen 2k .................. 0,15 €
         · vídeo 5 s (Seedance 480p) .. 0,68 €
         · vídeo 5 s (Kling 720p) ..... 1,36 €
       El tope de cada pieza deja la generación por debajo del 20-25 % del
       precio. Si Magnific cambia su tarifa, estos números hay que rehacerlos:
       son lo único de la web que depende de un proveedor. */

    { n: 'Publicación automática en LinkedIn', eur: 29, setup: 100,
      foto: 'pz-mkt-linkedin.jpg',
      fotoAlt: 'Un portatil abierto en un despacho de poligono, con la persiana veneciana y la mesa vacia alrededor',
      d: 'La red donde tener presencia cuesta menos y rinde más si eres B2B. Escribe y publica con tu voz a partir de lo que pasa en tu negocio. Sin imagen generada: texto, que es lo que funciona ahí.',
      lim: 'hasta 20 publicaciones/mes · solo LinkedIn',
      lista: [
        'Publica solo, en los días y las horas que fijes',
        'Con tu manera de hablar, sacada de lo que ya has escrito',
        'Tú lo ves antes de que salga, siempre que quieras',
      ] },

    { n: 'Fotos de marca, publicadas', eur: 49, setup: 150, destacada: true,
      foto: 'pz-mkt-fotos.jpg',
      fotoAlt: 'Una mano fotografiando con el movil un producto colocado sobre el mostrador de una tienda de barrio',
      d: 'Genera la imagen con tu identidad —tus colores, tu tipo de escena— y la publica en la red que elijas. No banco de imágenes: fotos hechas para ti y para lo que estás contando ese día.',
      lim: 'hasta 20 fotos/mes · una red incluida',
      nota: 'Cada red de más, +10 €/mes. El límite sale del coste real de generar: 20 imágenes son unos 3 € de los 49, y así el precio aguanta sin sorpresas.',
      lista: [
        'La identidad se fija una vez y se respeta en todas',
        'Publicada en Instagram, Facebook o LinkedIn, la que elijas',
        'Nada sale sin que lo hayas visto',
      ] },

    { n: 'Vídeos cortos, publicados', eur: 79, setup: 250,
      foto: 'pz-mkt-videos.jpg',
      fotoAlt: 'Un movil sujeto en un tripode barato con un aro de luz al lado, sobre la mesa de una trastienda',
      d: 'De cinco a diez segundos, en vertical, para lo que hoy más se ve: reels y stories. Se genera, se monta y se publica en la red que elijas.',
      lim: 'hasta 8 vídeos de 5 a 10 s al mes · una red incluida',
      nota: 'Ocho vídeos son unos 16 € de generación de los 79. Por eso son ocho y no veinte: el vídeo cuesta diez veces más que una foto y decirlo es más honesto que prometer de más.',
      lista: [
        'Vertical, que es donde se ven',
        'Con tu identidad, igual que las fotos',
        'Publicado o entregado, como prefieras',
      ] },

    { n: 'Campañas: diseño y publicación', eur: 149, setup: 450,
      foto: 'pz-mkt-campanas.jpg',
      fotoAlt: 'Un planificador mensual pegado a la pared de una oficina, cubierto de posits de colores y aspas de rotulador',
      d: 'Una campaña no son publicaciones sueltas: es una idea contada por partes durante unas semanas. Se diseña, se produce entera y se publica con su calendario.',
      lim: 'una campaña al mes · hasta 12 piezas entre fotos y vídeos · 2 redes',
      lista: [
        'Se decide contigo qué se cuenta y a quién',
        'Las piezas salen todas del mismo hilo, no sueltas',
        'Y al acabar, qué ha funcionado de la campaña',
      ] },
  ],
  faq: [
    ['¿Publica sin que yo lo vea?', 'Solo si tú lo decides. De salida, todo pasa por tu visto bueno. Muchos clientes lo dejan así siempre, y nos parece bien.'],
    ['¿De dónde saca mi manera de hablar?', 'De lo que ya has escrito: tu web, tus publicaciones anteriores, lo que nos cuentes en la llamada. Cuanto más le des, menos suena a folleto.'],
    ['¿Y las fotos?', 'Usa las tuyas. Puede sugerirte qué fotografiar, pero no inventa imágenes de tu negocio: eso se nota y resta.'],
    ['¿Sirve si no tengo redes?', 'La newsletter sí, y muchas veces rinde más. Si no tienes ni redes ni lista, lo primero es Posicionamiento, no esto.'],
    ['¿Hay permanencia?', 'No. Te vas cuando quieras avisando con 30 días. La instalación se paga 50 % al empezar y 50 % al entregar.'],
  ],
},

/* ═══ POSICIONAMIENTO ONLINE ═════════════════════════════════════════════ */
{
  archivo: 'posicionamiento-online.html', ruta: '/posicionamiento-online', hero: 'hero-posicionamiento.jpg',
  pill: 'Posicionamiento Online',
  titulo: 'SEO local, ficha de Google y reseñas | Marirrodriga IA',
  descripcion: 'Que te encuentren al buscar lo que haces, y que la web, la ficha y las reseñas estén cuidadas. Desde 30 €/mes, con su límite al lado.',
  h1: ['Que te encuentren.', 'Y que lo que vean esté bien.'],
  lead: 'Antes de escribirte, la gente te busca. Mira tu web, tu ficha de Google y lo que dicen otros. <strong>Esos tres sitios deciden si te escriben o siguen buscando</strong>, y casi nadie los cuida.',
  pack: {
    nombre: 'Posicionamiento, montado entero',
    gancho: 'La web, las páginas que traen gente, la ficha y las reseñas — tirando del mismo hilo.',
    cuota: 228, alta: 520, altaSuelta: 750,
    entra: [
      'Quien te busca en Google',
      'Quien termina una cita',
      'Tu web de hoy',
    ],
    sale: [
      'Te encuentran',
      'La ficha, al día',
      'Las reseñas, pedidas y contestadas',
    ],
    comoVa: 'Las páginas traen gente a la web, la web pide la reseña y la reseña sube la ficha. Es un círculo, no cuatro tareas.',
    pie: 'Las páginas de captación llevan a la web, la web pide la reseña y la reseña sube la ficha. Sueltas, cada una empuja por su lado.',
  },
  dolores: [
    ['No sales al buscar lo tuyo', 'Escribes en Google lo que haces y en tu ciudad, y no apareces. Aparecen tres que lo hacen peor y una guía que cobra por listarte.'],
    ['La ficha a medias', 'Horarios viejos, dos fotos de hace cuatro años y preguntas sin contestar. Es lo primero que ve el 80 % de los que te buscan.'],
    ['Las reseñas que no llegan', 'Los clientes contentos no escriben. Los enfadados sí. Y con no pedirlas, la media que sale es la de los enfadados.'],
  ],
  flujo: {
    ruta: 'Reseñas › Cómo se piden y qué pasa con las malas',
    disparadores: [['ok', 'Un cliente termina'], ['reloj', 'Pasan unas horas']],
    pasos: [
      ['msg', 'Le pregunta qué tal ha ido — sin pedirle nada todavía'],
      ['ojo', 'Lee la respuesta y separa lo bueno de lo que no lo es'],
    ],
    fin: [['ok', 'Fue bien: le pasa el enlace de Google'], ['aviso', 'Fue mal: te llega a ti antes que a Google']],
    pie: 'La diferencia está en preguntar primero. Pedir la reseña a ciegas es lo que llena Google de estrellas malas.',
  },
  piezas: [
    /* El orden importa: primero la web, que es el sitio donde aterriza todo lo
       demás, y después lo que trae gente a ella.

       La diferencia entre estas dos la marcó Isma el 09-09 y es la que
       justifica los 119 frente a los 49: la primera lleva panel —el cliente la
       gobierna— y la segunda es solo la cara que ve el visitante. Sin decirlo,
       parecían la misma cosa a dos precios. */
    { n: 'Tu web, hecha y llevada por nosotros', yaExiste: true, eur: 119, setup: 400,
      /* Cambio de PRODUCTO, no de foto — 09-09, decision de Isma. Antes se
         vendia «una web con panel para que la lleves tu», y ese no es el
         negocio: lo que se vende es una web profesional con su frontend y su
         backend, gestionada por nosotros de principio a fin. El servidor, el
         soporte, los cambios y las integraciones posteriores son nuestros.

         El limite esta escrito a proposito. «Cambios incluidos» sin frontera
         convierte 119 EUR/mes en un cheque abierto: integrar una pasarela o
         un producto nuevo es desarrollo, no mantenimiento. Se incluye el
         mantenimiento y el contenido; lo que se construye nuevo, se
         presupuesta. Es la misma disciplina del resto del catalogo — precio y
         limite al lado. */
      maqueta: `<figure class="mq-captura">
        <div class="mq-barra"><i></i><i></i><i></i><span></span></div>
        <img src="/assets/img/cap-web-home.jpg" alt="La portada de marirrodriga.com: el titular, el texto de entrada y la vitrina de departamentos" width="1200" height="900" loading="lazy">
      </figure>`,
      d: 'Una web profesional de verdad: la cara que ve tu cliente y el motor que la mueve por detrás. Y no te la dejamos con un manual — la llevamos nosotros: el servidor, los arreglos, los textos y lo que haya que integrarle después.',
      lim: 'una web · servidor, mantenimiento y cambios de contenido incluidos',
      lista: [
        'Frontend y backend: lo que se ve y lo que lo mueve, no una plantilla con tu logo',
        'El servidor y las actualizaciones, de nuestra cuenta — tú no tocas nada',
        'Los cambios de texto, precio o foto entran en la cuota, sin contarlos',
        'Integrarle algo nuevo después no obliga a rehacerla; se presupuesta y se monta',
      ] },

    { n: 'Páginas de captación por sector y zona', eur: 49, setup: 150, destacada: true,
      /* Maqueta, no foto. La pieza es «una pagina por cada cosa que tu
         cliente busca, con su sector y su zona»: se entiende viendo las
         paginas, no viendo la furgoneta desde la que alguien busca.
         A proposito NO se dibujan resultados de Google con nosotros
         arriba: eso prometeria una posicion que no se puede prometer. */
      maqueta: `<figure class="mq-captura">
        <div class="mq-barra"><i></i><i></i><i></i><span></span></div>
        <img src="/assets/img/cap-landing-asesoria.jpg" alt="Una página de captación nuestra: titular, la promesa en tres líneas, el botón y el formulario debajo" width="1200" height="900" loading="lazy">
      </figure>`,
      d: 'Una página por cada cosa que tu cliente busca de verdad en Google, apuntando a su sector y a su zona. No un blog: páginas hechas para traer a quien ya quiere comprar.',
      lim: 'hasta 12 páginas · solo captación, sin backend',
      nota: 'Estas son solo la cara: traen y captan, pero no se gobiernan desde un panel. Si lo que quieres es una web que además lleves tú, esa es la pieza de arriba.',
      lista: [
        'Cada página apunta a una búsqueda concreta, no a «mi sector»',
        'El que llega ya está buscando lo que haces',
        'Se pueden montar sobre tu web actual, sin rehacerla',
      ] },

    { n: 'Ficha de Google al día', eur: 30, setup: 100,
      /* Maqueta, no foto. Se imita la ficha de Google porque es lo que el
         lector reconoce de un vistazo — la foto anterior era un escaparate
         cualquiera y no decia nada. Mismo negocio inventado que en Resenas,
         para que el departamento se lea como un solo caso. Y por lo mismo
         que alli: con un negocio de ejemplo no se afirma nada de nadie. */
      maqueta: `<div class="mq-google mq-ficha">
        <div class="mq-g-cab">
          <svg class="mq-g-logo" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
            <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
            <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"/>
            <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
          </svg>
          <div>
            <b>Clínica Dental Arenal</b>
            <span>Clínica dental · Chamberí</span>
          </div>
        </div>
        <div class="mq-f-nota">
          <b>4,8</b><span class="mq-g-estrellas">&#9733;&#9733;&#9733;&#9733;&#9733;</span><i>127 reseñas</i>
        </div>
        <p class="mq-f-abierto"><em>Abierto</em> · cierra a las 20:00</p>
        <div class="mq-f-botones"><span>Llamar</span><span>Cómo llegar</span><span>Web</span></div>
        <div class="mq-f-fotos"><i></i><i></i><i></i><i></i></div>
        <ul class="mq-f-lista">
          <li><b>Horario</b><i class="mq-ok">al día</i></li>
          <li><b>Servicios</b><i class="mq-ok">12 publicados</i></li>
          <li><b>Preguntas</b><i class="mq-ok">4 respondidas</i></li>
        </ul>
      </div>`,
      d: 'Horarios, fotos, servicios y las preguntas que la gente deja sin contestar. Es el escaparate que más gente ve antes de escribirte, y el que menos se cuida.',
      lim: 'una ficha · revisión semanal' },

    { n: 'Reseñas: pedirlas y contestarlas', eur: 30, setup: 100,
      /* Maqueta, no foto. Esta pieza ES la resena: fotografiar la peluqueria
         donde pasa no contaba nada, y una resena generada con IA sale con el
         texto reventado. Se imita el panel de Google porque es lo que el
         lector reconoce de un vistazo — pero el negocio es INVENTADO.

         Y ahi esta la linea, que conviene dejar escrita para el proximo que
         lo toque: poner aqui a Marirrodriga con una nota media y comentarios
         que no existen seria una resena falsa de una empresa real, en el
         sitio donde el visitante espera la de verdad. Ley 3/1991 de
         Competencia Desleal y el articulo de resenas falsas que la reforma
         de 2022 metio en la LGDCU. Con un negocio de ejemplo no se afirma
         nada de nadie y se entiende igual. */
      maqueta: `<div class="mq-google">
        <div class="mq-g-cab">
          <svg class="mq-g-logo" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
            <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
            <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"/>
            <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
          </svg>
          <div>
            <b>Clínica Dental Arenal</b>
            <span>Reseñas</span>
          </div>
        </div>

        <div class="mq-g-nota">
          <div class="mq-g-cifra">
            <b>4,8</b>
            <span class="mq-g-estrellas">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <i>127 reseñas</i>
          </div>
          <div class="mq-g-barras">
            <span>5</span><b><i style="width:88%"></i></b>
            <span>4</span><b><i style="width:9%"></i></b>
            <span>3</span><b><i style="width:2%"></i></b>
            <span>2</span><b><i style="width:1%"></i></b>
            <span>1</span><b><i style="width:0%"></i></b>
          </div>
        </div>

        <div class="mq-g-resena">
          <div class="mq-g-quien">
            <span class="mq-g-avatar">L</span>
            <div>
              <b>Lucía R.</b>
              <span><span class="mq-g-estrellas mq-g-mini">&#9733;&#9733;&#9733;&#9733;&#9733;</span> hace 2 días</span>
            </div>
          </div>
          <p>Puntualísimos y me explicaron todo antes de empezar. Se nota que se lo curran.</p>
          <div class="mq-g-respuesta">
            <b>Respuesta del propietario</b>
            <p>Gracias, Lucía. Se lo decimos a Marta, que se va a alegrar.</p>
          </div>
        </div>
      </div>`,
      d: 'Un agente escribe al cliente cuando termina su cita y le pregunta qué tal fue. Si fue bien, le pasa el enlace de Google. Si fue mal, te avisa a ti antes de que lo publique. Y las que ya están publicadas, las contesta.',
      lim: 'hasta 300 peticiones/mes · respuestas sin tope',
      nota: 'Si llevas tu agenda con Bookia o Dentia, pedir reseñas ya te lo hace su pieza de recordatorios por 15 y 10 €/mes. Esta es para quien lleva la agenda en otro sitio — y para contestar, que aquellas no hacen.',
      lista: [
        'Pregunta primero, y solo pide la reseña si la respuesta es buena',
        'La mala te llega a ti antes que a Google',
        'Contesta las publicadas, con lo que tú hayas fijado que se dice',
        'Funciona con la agenda que uses, no hace falta la nuestra',
      ] },
  ],
  faq: [
    ['¿Esto es SEO del de siempre?', 'La parte de páginas de captación, sí, pero centrada en lo que se busca con intención de comprar y no en tráfico por tráfico. Lo demás —ficha y reseñas— es lo que más rinde en negocio local y casi nadie lo trabaja.'],
    ['¿Cuánto tarda en notarse?', 'La ficha y las reseñas, semanas. Las páginas de captación, meses: Google no las coloca de un día para otro y quien te diga lo contrario te está vendiendo humo.'],
    ['¿Escribís las reseñas?', 'No, y no lo haríamos. Es ilegal y se nota. Lo que hacemos es pedírselas a quien ha tenido una buena experiencia, que es lo que casi nadie hace.'],
    ['¿Y si me llega una reseña mala?', 'Te avisamos y te proponemos respuesta. Una mala contestada bien hace menos daño que diez buenas sin contestar.'],
    ['¿Hay permanencia?', 'No. Te vas cuando quieras avisando con 30 días. La instalación se paga 50 % al empezar y 50 % al entregar.'],
  ],
},

];

module.exports = { DEPARTAMENTOS, CAL };
