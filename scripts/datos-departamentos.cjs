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

const DEPARTAMENTOS = [

/* ═══ FINANZAS ═══════════════════════════════════════════════════════════ */
{
  archivo: 'finanzas.html', ruta: '/finanzas', hero: 'hero-finanzas.jpg',
  pill: 'Finanzas',
  titulo: 'Automatizar facturación y cobros | Marirrodriga IA',
  descripcion: 'Facturar por mensaje, perseguir lo vencido y ver tu dinero explicado: caja, cobros y punto muerto. Desde 49 €/mes.',
  h1: ['Facturar sin abrir el programa.', 'Y cobrar sin perseguir.'],
  lead: 'El papeleo no se hace más rápido: se hace <strong>en otro momento</strong>, cuando ya has cerrado. Esto lo hace mientras trabajas, y te avisa solo cuando algo necesita que decidas tú.',
  dolores: [
    ['La factura del domingo', 'Se hacen a última hora, cuando ya no queda nadie. Y la que se olvida no la reclama nadie hasta que el cliente llama por otra cosa.'],
    ['El que no paga y nadie llama', 'La factura vence, pasa un mes, pasan dos. Reclamar da pereza y se pospone — y cuanto más tarde se reclama, menos se cobra.'],
    ['El justificante que no aparece', 'El albarán, el certificado, el papel que pide la gestoría. Está en un correo de hace cuatro meses o no está.'],
  ],
  flujo: {
    ruta: 'Recobro de facturas › Cómo va un cobro',
    disparadores: [['reloj', 'La factura vence'], ['doc', 'Entra en la lista de pendientes']],
    pasos: [
      ['ojo', 'Comprueba que sigue sin pagarse'],
      ['msg', 'Escribe al cliente con el importe y el enlace de pago'],
      ['reloj', 'Si no contesta, insiste a los días — sin repetir el mismo mensaje'],
    ],
    fin: [['ok', 'Cobrado, y lo apunta'], ['humano', 'O te lo pasa a ti con el histórico']],
    pie: 'Lo que hace con cada factura que vence. Los plazos y el tono los fijas tú por escrito antes de empezar.',
  },
  piezas: [
    { n: 'Facturación por mensaje', yaExiste: true, eur: 49, setup: 200,
      d: 'Le dices por WhatsApp a quién y de qué, y la factura sale hecha, numerada y enviada. Sin abrir el programa.',
      lim: 'hasta 150 facturas/mes' },
    { n: 'Recobro de facturas vencidas', eur: 79, setup: 250, destacada: true,
      d: 'Persigue lo que está vencido: escribe, insiste con criterio y te pasa a ti solo lo que necesita una llamada de verdad.',
      lim: 'hasta 200 avisos/mes' },
    { n: 'Recuperación de documentos', yaExiste: true, eur: 79, setup: 300,
      d: 'Persigue albaranes, justificantes y certificados hasta que llegan. Los guarda donde le digas y avisa de lo que falta.',
      lim: 'hasta 300 documentos/mes' },
    { n: 'Conciliación de cuentas', eur: 49, setup: 200,
      d: 'Cruza lo cobrado con lo facturado, señala lo que no cuadra y persigue las partidas abiertas antes de que envejezcan.',
      lim: 'hasta 500 apuntes/mes' },
    /* Era «Contabilidad asistida» a 169 €/mes + 650 € y solo ordenaba para la
       gestoría. Isma lo tumbó con un argumento que no tiene vuelta: una
       gestoría cuesta unos 50 €/mes, así que pagar 169 para entregarle el
       trabajo ordenado no sale a cuenta. Lo que sí sale es que además te
       explique tu propio dinero. Se amplía el alcance, baja a 99 + 450. */
    { n: 'Contabilidad y cuadro financiero', eur: 99, setup: 450,
      d: 'Clasifica gastos e ingresos y, con esas mismas facturas, monta el cuadro que ningún programa pequeño te da: qué vas a cobrar, quién te hace esperar y cuánto te falta para cubrir el mes.',
      lim: 'hasta 800 apuntes/mes · 5 indicadores',
      lista: [
        'Previsión de caja a 60 días, semana a semana',
        'Días medios de cobro — y qué clientes los suben',
        'Concentración: cuánto dependes de tu mayor cliente',
        'Punto muerto: lo que falta por facturar este mes',
        'Gastos recurrentes vivos y lo que llevas pagado',
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
      d: 'Persigue a cada transportista hasta sacarle la fecha real, lo apunta y te avisa solo de lo que se ha torcido.',
      lim: 'hasta 400 envíos/mes' },
    { n: 'Aviso al cliente antes de que pregunte', eur: 30, setup: 100,
      d: 'Cuando hay fecha, se la manda al cliente. Cuando cambia, se lo cuenta. La llamada que te ahorras es la suya.',
      lim: 'hasta 800 avisos/mes' },
    { n: 'Citas de carga y descarga', eur: 49, setup: 150,
      d: 'Cuadra la hora con el transportista y con tu almacén, confirma a los dos y avisa si uno se cae.',
      lim: 'hasta 200 citas/mes' },
    { n: 'Gestión de incidencias', eur: 49, setup: 200,
      d: 'Cuando algo se rompe, se pierde o llega mal: recoge lo que ha pasado, abre el parte y persigue la resolución.',
      lim: 'hasta 150 incidencias/mes' },
    { n: 'Comunicación con proveedores', eur: 49, setup: 150,
      d: 'Confirma pedidos, pide plazos y persigue lo que no ha llegado. Sin que tengas que acordarte tú.',
      lim: 'hasta 200 gestiones/mes' },
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
  descripcion: 'Un panel con tus números y un informe que explica por qué ha ido así, no solo cómo ha ido. Desde 15 €/mes, con su límite al lado.',
  h1: ['Saber por qué ha ido bien.', 'No solo que ha ido bien.'],
  lead: 'Un panel te dice que has facturado un 12 % menos. Eso no sirve de nada si no sabes qué hacer con ello. <strong>Lo que hace falta es la frase de después</strong>: por qué, y qué tocar.',
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
    { n: 'Informe mensual que explica el porqué', eur: 49, setup: 150, destacada: true,
      d: 'No la tabla: la frase. Qué ha cambiado, por qué, y qué conviene tocar. En una página que se lee en dos minutos.',
      lim: 'un informe al mes · hasta 3 fuentes' },
    { n: 'Panel de negocio a medida', eur: 79, setup: 300,
      d: 'Tus números en una pantalla, con dos años de histórico. Montado sobre lo que ya usas, no sobre un programa nuevo.',
      lim: 'hasta 5 fuentes de datos' },
    { n: 'Insights semanales', yaExiste: true, eur: 15, setup: 50,
      d: 'Un correo el lunes con cómo fue la semana. No para mirarlo cada día: para enterarte cuando algo se tuerce.',
      lim: 'un envío semanal' },
    { n: 'Aviso cuando algo se sale de lo normal', eur: 30, setup: 100,
      d: 'Vigila lo que le digas —caída de citas, subida de cancelaciones, un gasto raro— y te escribe el día que pasa.',
      lim: 'hasta 8 vigilancias' },
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
  descripcion: 'Publicaciones y newsletter escritas con tu voz y con lo que pasa en tu negocio. Desde 20 €/mes, con su límite al lado.',
  h1: ['Publicar sin que', 'te robe la semana.'],
  lead: 'No es que no sepas qué contar: es que contarlo cuesta una hora que no tienes, y por eso pasan tres semanas sin publicar. <strong>Esto escribe con tu voz y con lo que ya pasa en tu negocio.</strong>',
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
    { n: 'Publicaciones con tu voz', eur: 79, setup: 250, destacada: true,
      d: 'Escribe y programa lo del mes a partir de lo que pasa en tu negocio, con tus fotos y tu manera de hablar. Tú das el visto bueno.',
      lim: 'hasta 20 publicaciones/mes · 2 canales' },
    { n: 'Newsletter', eur: 49, setup: 200,
      d: 'La periódica a tus clientes: qué hay de nuevo, qué conviene y qué se acaba. Escrita y mandada, no un recordatorio para que la escribas tú.',
      lim: 'hasta 2 envíos/mes · 2.000 destinatarios' },
    { n: 'Calendario editorial', eur: 30, setup: 100,
      d: 'Propone de qué publicar y cuándo, por temporada y por sector. Se acabó el folio en blanco del lunes.',
      lim: 'un calendario al mes' },
    { n: 'Una pieza, varios formatos', eur: 20, setup: 70,
      d: 'Lo que escribes una vez se adapta solo a cada sitio: no es lo mismo un texto para Instagram que para tu web.',
      lim: 'hasta 40 adaptaciones/mes' },
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
  descripcion: 'Que te encuentren al buscar lo que haces, y que la web, la ficha y las reseñas estén cuidadas. Desde 20 €/mes, con su límite al lado.',
  h1: ['Que te encuentren.', 'Y que lo que vean esté bien.'],
  lead: 'Antes de escribirte, la gente te busca. Mira tu web, tu ficha de Google y lo que dicen otros. <strong>Esos tres sitios deciden si te escriben o siguen buscando</strong>, y casi nadie los cuida.',
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
    fin: [['ok', 'Fue bien: le pasa el enlace de Google'], ['aviso', 'Fue mal: te avisa a ti antes de que lo publique']],
    pie: 'La diferencia está en preguntar primero. Pedir la reseña a ciegas es lo que llena Google de estrellas malas.',
  },
  piezas: [
    { n: 'Páginas de captación por sector y zona', eur: 79, setup: 300, destacada: true,
      d: 'Una página por cada cosa que la gente busca de verdad, con lo que buscan y donde lo buscan. No un blog: páginas que traen a quien ya quiere comprar.',
      lim: 'hasta 12 páginas' },
    { n: 'Presencia web · Landing conectada', yaExiste: true, eur: 119, setup: 400,
      d: 'Una página que trabaja: enseña lo que haces, recoge al que pregunta y lo mete en tu sistema. No un folleto con tu teléfono.',
      lim: 'una landing · formulario conectado' },
    { n: 'Ficha de Google al día', eur: 30, setup: 100,
      d: 'Horarios, fotos, servicios y las preguntas que dejan sin contestar. Es el escaparate que más gente ve y el que menos se cuida.',
      lim: 'una ficha · revisión semanal' },
    { n: 'Peticiones y gestión de reseñas', eur: 30, setup: 100,
      d: 'Pregunta qué tal fue. Si fue bien, pide la reseña; si fue mal, te avisa a ti antes de que se publique.',
      lim: 'hasta 300 peticiones/mes' },
    { n: 'Vigilancia de menciones', eur: 20, setup: 70,
      d: 'Te avisa cuando alguien te nombra: una reseña nueva, un foro, un grupo del barrio. Enterarse tarde es lo que hace daño.',
      lim: 'hasta 10 términos vigilados' },
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
