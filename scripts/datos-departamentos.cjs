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
      d: 'Le dices por WhatsApp a quién y de qué, y la factura sale hecha, numerada y enviada. Sin abrir el programa.',
      lim: 'hasta 150 facturas/mes' },
    { n: 'Recobro de facturas vencidas', eur: 79, setup: 250, destacada: true,
      d: 'Persigue lo que está vencido: escribe, insiste con criterio y te pasa a ti solo lo que necesita una llamada de verdad.',
      lim: 'hasta 200 avisos/mes' },
    /* Reenfocada el 09-09. Antes describía el producto sin decir para quién:
       «albaranes, justificantes y certificados» le vale igual a una peluquería
       que a una gestoría, y por eso no le hablaba a nadie. El comprador es la
       propia gestoría, asesoría o aseguradora, cuyo dolor es perseguir a
       cuarenta clientes cada trimestre. Con el destinatario claro, los 79 € se
       pagan con un solo trámite que deja de atascarse. */
    { n: 'Persecución de documentos', yaExiste: true, eur: 79, setup: 300,
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
    { n: 'Fichas listas para validar', eur: 149, setup: 600,
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
      d: 'Cuando hay fecha, se la manda al cliente. Cuando cambia, se lo cuenta. No espera a que pregunte: ese es todo el truco, y es la llamada que te ahorras.',
      lim: 'hasta 800 avisos/mes',
      lista: [
        'Funciona solo: no necesita tener montado el agente de Atención',
        'Si además lo tienes, aquel contesta al que pregunta y este avisa antes',
      ] },
    { n: 'Citas de carga y descarga', eur: 49, setup: 150,
      d: 'Cuadra la hora con el transportista y con tu almacén, confirma a los dos y avisa si uno se cae.',
      lim: 'hasta 200 citas/mes' },
    { n: 'Gestión de incidencias', eur: 49, setup: 200,
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
      d: 'Le preguntas en cristiano —«¿por qué ha bajado octubre?»— y te contesta con tus números delante. No decide por ti ni te dice qué hacer: te pone el dato para que decidas tú con algo más que la sensación.',
      lim: 'preguntas sin tope · un informe escrito al mes',
      lista: [
        'Pregúntale lo que quieras sobre tu negocio, cuando quieras',
        'Un informe al mes que explica qué ha cambiado y por qué',
        'Y si algo se sale de lo normal, te escribe el día que pasa',
      ] },

    { n: 'Insights semanales', yaExiste: true, eur: 15, setup: 50,
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
      d: 'La red donde tener presencia cuesta menos y rinde más si eres B2B. Escribe y publica con tu voz a partir de lo que pasa en tu negocio. Sin imagen generada: texto, que es lo que funciona ahí.',
      lim: 'hasta 20 publicaciones/mes · solo LinkedIn',
      lista: [
        'Publica solo, en los días y las horas que fijes',
        'Con tu manera de hablar, sacada de lo que ya has escrito',
        'Tú lo ves antes de que salga, siempre que quieras',
      ] },

    { n: 'Fotos de marca, publicadas', eur: 49, setup: 150, destacada: true,
      d: 'Genera la imagen con tu identidad —tus colores, tu tipo de escena— y la publica en la red que elijas. No banco de imágenes: fotos hechas para ti y para lo que estás contando ese día.',
      lim: 'hasta 20 fotos/mes · una red incluida',
      nota: 'Cada red de más, +10 €/mes. El límite sale del coste real de generar: 20 imágenes son unos 3 € de los 49, y así el precio aguanta sin sorpresas.',
      lista: [
        'La identidad se fija una vez y se respeta en todas',
        'Publicada en Instagram, Facebook o LinkedIn, la que elijas',
        'Nada sale sin que lo hayas visto',
      ] },

    { n: 'Vídeos cortos, publicados', eur: 79, setup: 250,
      d: 'De cinco a diez segundos, en vertical, para lo que hoy más se ve: reels y stories. Se genera, se monta y se publica en la red que elijas.',
      lim: 'hasta 8 vídeos de 5 a 10 s al mes · una red incluida',
      nota: 'Ocho vídeos son unos 16 € de generación de los 79. Por eso son ocho y no veinte: el vídeo cuesta diez veces más que una foto y decirlo es más honesto que prometer de más.',
      lista: [
        'Vertical, que es donde se ven',
        'Con tu identidad, igual que las fotos',
        'Publicado o entregado, como prefieras',
      ] },

    { n: 'Campañas: diseño y publicación', eur: 149, setup: 450,
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
    { n: 'Tu web, con panel para llevarla tú', yaExiste: true, eur: 119, setup: 400,
      d: 'Una web de verdad, no una plantilla con tu logo: la parte que ve el cliente y el panel desde el que la llevas tú. Cambiar textos, ver quién ha escrito, mirar qué funciona — sin llamar a nadie y sin pagar por cada cambio.',
      lim: 'una web · panel incluido · formulario conectado a tu sistema',
      lista: [
        'La cara: lo que ve tu cliente y por donde te escribe',
        'El panel: donde tú cambias lo que quieras, cuando quieras',
        'Conectada a lo que ya tengas montado, no una isla',
      ] },

    { n: 'Páginas de captación por sector y zona', eur: 49, setup: 150, destacada: true,
      d: 'Una página por cada cosa que tu cliente busca de verdad en Google, apuntando a su sector y a su zona. No un blog: páginas hechas para traer a quien ya quiere comprar.',
      lim: 'hasta 12 páginas · sin panel',
      nota: 'Estas son solo la cara: traen y captan, pero no se gobiernan desde un panel. Si lo que quieres es una web que además lleves tú, esa es la pieza de arriba.',
      lista: [
        'Cada página apunta a una búsqueda concreta, no a «mi sector»',
        'El que llega ya está buscando lo que haces',
        'Se pueden montar sobre tu web actual, sin rehacerla',
      ] },

    { n: 'Ficha de Google al día', eur: 30, setup: 100,
      d: 'Horarios, fotos, servicios y las preguntas que la gente deja sin contestar. Es el escaparate que más gente ve antes de escribirte, y el que menos se cuida.',
      lim: 'una ficha · revisión semanal' },

    { n: 'Reseñas: pedirlas y contestarlas', eur: 30, setup: 100,
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
