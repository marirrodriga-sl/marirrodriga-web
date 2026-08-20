/* Los datos de las páginas de solución: Dentia, Bookia y sus seis sectores.
   Se tocan aquí. Las páginas se generan con generar-paginas.cjs.

   ⚠️ Ningún precio se escribe en este fichero. Los tramos salen de
   soluciones.cjs, que los calcula con el mismo motor que el resto de la web. */

const CAL = 'https://cal.com/marirrodriga-ia/llamada';

/* ─── DENTIA ─────────────────────────────────────────────────────────────── */
const DENTIA = {
  archivo: 'dentia.html',
  marca: 'Dentia',
  ruta: '/dentia',
  hero: 'hero-dentia.jpg',
  pill: 'Software para clínicas dentales',
  titulo: 'Dentia — Software para clínicas dentales | Marirrodriga IA',
  descripcion: 'Agenda, ficha de paciente, odontograma, presupuestos y facturación en un solo sitio, ' +
    'con un asistente que contesta a los pacientes por WhatsApp. Desde 73 €/mes, con su límite al lado.',
  h1: ['La clínica funcionando', 'cuando tú no estás.'],
  lead: 'Agenda, historia clínica, odontograma, presupuestos y facturación en un mismo sitio. Y encima, ' +
    'si lo quieres, un asistente que contesta a los pacientes por WhatsApp y les recuerda la cita.',
  dolores: [
    ['El teléfono a media cura', 'Suena mientras estás con un paciente en el sillón. O lo coges y le dejas a medias, o lo pierdes. Elegir eso quince veces al día no es trabajo clínico.'],
    ['Presupuestos que se enfrían', 'Se lo das, dice que se lo piensa y no vuelve. No porque no quiera: porque nadie le escribió a los cinco días para preguntarle si le había quedado alguna duda.'],
    ['Datos en cuatro sitios', 'La agenda en un programa, las fotos en el móvil, los presupuestos en Word y la facturación en una hoja. Y cuando falta algo, a buscarlo.'],
  ],
  vistas: [
    { img: 'dentia-img/agenda-recordatorio.png', et: 'La agenda',
      h: 'Se reserva sola, y sin que nadie se registre',
      p: 'El paciente entra desde tu web, ve tus huecos <strong>reales</strong> y cierra la cita sin crear cuenta ni descargar nada. La víspera le llega el recordatorio y puede confirmar o mover con un toque.',
      lista: ['Reserva pública sin login', 'Recordatorio por WhatsApp o Telegram', 'El hueco liberado vuelve a estar disponible'] },
    { img: 'dentia-img/historial-clinico.png', et: 'La ficha',
      h: 'Toda la historia del paciente en una pantalla',
      p: 'Lo que se le hizo, cuándo, con qué, y las fotos. Sin abrir tres programas ni buscar en una carpeta que se llama «pacientes 2023 definitivo».',
      lista: ['Historia clínica con evolución', 'Fotos y documentos por paciente', 'Consentimientos firmados digitalmente'] },
    { img: 'dentia-img/odontograma.png', et: 'El odontograma',
      h: 'Notación FDI, y clicando en el diente',
      p: 'Caries, obturado, extracción, corona, implante, endodoncia, puente. Marcas la zona del diente y queda registrado en la historia, no en un papel que se pierde.',
      lista: ['Notación FDI estándar', 'Por zonas del diente, no por diente entero', 'Enlazado a la historia clínica'] },
    { img: 'dentia-img/crm-presupuestos.png', et: 'Los presupuestos',
      h: 'Y alguien que pregunta si quedó alguna duda',
      p: 'Los haces desde la ficha y se quedan en seguimiento. El asistente escribe a los días para saber si el paciente lo está pensando o ya lo ha descartado — y te dice cuál es cuál.',
      lista: ['Presupuesto desde la ficha del paciente', 'Seguimiento automático a los días', 'Te reporta quién se ha caído y por qué'] },
  ],
  faq: [
    ['¿Tengo que migrar todo lo que ya tengo?',
     'No de golpe. Se empieza por la agenda y la ficha, que es lo que más duele, y lo demás se va metiendo cuando haga falta. Lo que ya tengas en otro programa lo pasamos nosotros en el montaje.'],
    ['¿Los datos de salud dónde están?',
     'En servidores de la Unión Europea, cifrados, con copia diaria. Firmamos el acuerdo de encargado de tratamiento que exige el artículo 28 del RGPD antes de tocar un solo dato.'],
    ['¿El asistente da consejo médico?',
     'Nunca. Coge citas, resuelve dudas de horario y precio y hace seguimiento. Cualquier cosa clínica la deriva a la clínica, y se identifica siempre como IA, que lo exige el artículo 50 del Reglamento Europeo de IA.'],
    ['¿Y si somos más de dos profesionales?',
     'El tramo de entrada cubre dos. A partir de ahí se amplía, y te decimos el precio antes de montarlo — nunca aparece en una factura sin que lo hayas aprobado.'],
    ['¿Hay permanencia?',
     'No. Te vas cuando quieras avisando con 30 días, y tus datos se los llevas exportados. El montaje se paga 50 % al empezar y 50 % al entregar.'],
  ],
};

/* ─── BOOKIA ─────────────────────────────────────────────────────────────── */
const BOOKIA_BASE = {
  marca: 'Bookia',
  hero: 'hero-bookia.jpg',
  vistas: [
    { img: 'bookia-img/reserva-movil.png', et: 'La reserva',
      h: 'Reserva desde el móvil, sin registrarse',
      p: 'Entra desde tu Instagram o desde tu web, ve tus huecos <strong>reales</strong> y cierra la cita en tres toques. Sin crear cuenta, sin descargar una aplicación, sin llamar.',
      lista: ['Página de reserva pública', 'Sin registro ni descarga', 'Enlace que puedes poner en tu bio'] },
    { img: 'bookia-img/agenda.png', et: 'La agenda',
      h: 'Tu día entero en una pantalla',
      p: 'Lo que hay hoy, quién viene, qué servicio y cuánto dura. Y si alguien cancela, el hueco vuelve a salir libre para que lo coja otro.',
      lista: ['Vista de día y de semana', 'Hasta tres profesionales', 'Recordatorio la víspera'] },
    { img: 'bookia-img/negocio.png', et: 'Los clientes',
      h: 'Quién es cada uno y qué le hiciste',
      p: 'La última vez que vino, qué se llevó y qué le gustó. Para que cuando escriba no empieces de cero, y para saber a quién merece la pena escribir cuando lleva meses sin aparecer.',
      lista: ['Ficha por cliente con su historial', 'Reactivación de los que no vuelven', 'Peticiones de reseña de Google'] },
    { img: 'bookia-img/dashboard.png', et: 'Los números',
      h: 'Y el lunes, un correo con cómo fue la semana',
      p: 'Cuántos huecos quedaron sin llenar, cuántos no aparecieron, qué servicio deja más. No para mirarlo todos los días: para enterarte cuando algo se tuerce.',
      lista: ['Panel con dos años de histórico', 'Informe semanal por correo', 'Retención y valor por cliente'] },
  ],
  faq: [
    ['¿Mis clientes tienen que registrarse?',
     'No, y es a propósito. Reservan desde el móvil en tres toques sin crear cuenta ni descargar nada. Cada paso que añades es gente que se cae por el camino.'],
    ['¿Puedo seguir cogiendo citas por teléfono?',
     'Claro. Las metes tú en la agenda y el hueco desaparece de la reserva online al momento. No hay dos agendas que cuadrar.'],
    ['¿Y si alguien no aparece?',
     'La víspera le llega un recordatorio y puede confirmar o cancelar con un toque. Si cancela, el hueco vuelve a salir libre con tiempo para que lo coja otro.'],
    ['¿Se conecta con Google Calendar?',
     'De momento no: la agenda es propia. Preferimos decírtelo antes de que lo descubras tú. Si es imprescindible para ti, dínoslo en la llamada y valoramos montarlo.'],
    ['¿Hay permanencia?',
     'No. Te vas cuando quieras avisando con 30 días. El montaje se paga 50 % al empezar y 50 % al entregar.'],
  ],
};

/* Lo único que cambia entre sectores: el nombre del sitio donde se trabaja,
   el dolor concreto y el vocabulario. La estructura y los precios, idénticos. */
const SECTORES = [
  { archivo: 'bookia.html', ruta: '/bookia', sector: null,
    pill: 'Software de citas para tu negocio', sitio: 'La silla',
    h1: ['La silla nunca parada,', 'la agenda siempre llena.'],
    lead: 'Agenda, reserva online sin registro y recordatorios que evitan el hueco vacío. Con un asistente que contesta cuando tú tienes las manos ocupadas.',
    dolores: [
      ['El hueco que no se llena', 'Alguien cancela a última hora y ese rato ya no lo recupera nadie, porque no te da tiempo a avisar a quien estaba esperando.'],
      ['Contestar con las manos ocupadas', 'Te escriben mientras estás trabajando. O paras, o contestas dos horas después — y para entonces han reservado en otro sitio.'],
      ['Los que no vuelven', 'Vinieron dos veces y desaparecieron. No se enfadaron: simplemente nadie les volvió a escribir.'],
    ] },
  { archivo: 'bookia-peluqueria.html', ruta: '/bookia-peluqueria', sector: 'peluquerías',
    pill: 'Software de citas para peluquerías', sitio: 'El sillón',
    h1: ['Sillón nunca parado,', 'la agenda siempre llena.'],
    lead: 'Agenda, reserva desde Instagram sin registro y recordatorios que evitan el hueco vacío. Con un asistente que contesta mientras tienes las manos en un tinte.',
    dolores: [
      ['El hueco que no se llena', 'Cancelan un color de dos horas a última hora y ese rato ya no lo recupera nadie. Es el dinero que más se nota al final del mes.'],
      ['Contestar con las manos en un tinte', 'Te escriben por Instagram mientras estás con una clienta. O paras, o contestas dos horas después, cuando ya ha reservado en otro sitio.'],
      ['Las que no vuelven', 'Vinieron dos veces y desaparecieron. No se enfadaron: nadie les volvió a escribir cuando tocaba retoque.'],
    ] },
  { archivo: 'bookia-fisioterapia.html', ruta: '/bookia-fisioterapia', sector: 'fisioterapia',
    pill: 'Software de citas para fisioterapia', sitio: 'La camilla',
    h1: ['Camilla nunca parada,', 'la agenda siempre llena.'],
    lead: 'Agenda, reserva online sin registro y recordatorios que evitan el hueco vacío. Con un asistente que contesta mientras estás tratando a alguien.',
    dolores: [
      ['El hueco que no se llena', 'Un paciente cancela la sesión de la tarde y esa hora ya no la recupera nadie, aunque tengas a tres esperando fecha.'],
      ['Contestar en mitad de una sesión', 'Suena el móvil con las manos puestas. O paras el tratamiento, o devuelves la llamada al final del día.'],
      ['Los que dejan el tratamiento a medias', 'Vienen tres sesiones de las diez y desaparecen. Nadie les escribió para preguntar cómo iban.'],
    ] },
  { archivo: 'bookia-estetica.html', ruta: '/bookia-estetica', sector: 'centros de estética',
    pill: 'Software de citas para estética', sitio: 'La cabina',
    h1: ['Cabina nunca parada,', 'la agenda siempre llena.'],
    lead: 'Agenda, reserva desde Instagram sin registro y recordatorios que evitan el hueco vacío. Con un asistente que contesta mientras estás en cabina.',
    dolores: [
      ['El hueco que no se llena', 'Cancelan un tratamiento largo a última hora y esa cabina se queda parada toda la tarde.'],
      ['Contestar desde la cabina', 'Te escriben por Instagram mientras trabajas. Contestar tarde es perder la cita.'],
      ['Las que no completan el bono', 'Compraron cinco sesiones, hicieron dos y no volvieron. Nadie les recordó que les quedaban tres.'],
    ] },
  { archivo: 'bookia-unas.html', ruta: '/bookia-unas', sector: 'centros de uñas',
    pill: 'Software de citas para centros de uñas', sitio: 'El puesto',
    h1: ['Puesto nunca parado,', 'la agenda siempre llena.'],
    lead: 'Agenda, reserva desde Instagram sin registro y recordatorios que evitan el hueco vacío. Con un asistente que contesta mientras estás limando.',
    dolores: [
      ['El hueco que no se llena', 'Cancelan y ese rato se pierde. Con servicios de hora y media, dos cancelaciones son media tarde.'],
      ['Contestar mientras limas', 'La mayoría te escribe por Instagram, y casi siempre mientras tienes a alguien delante.'],
      ['Las que no vuelven al relleno', 'A las tres semanas toca relleno y nadie se lo recuerda. Se van a la que sí lo hace.'],
    ] },
  { archivo: 'bookia-podologia.html', ruta: '/bookia-podologia', sector: 'podología',
    pill: 'Software de citas para podología', sitio: 'La camilla',
    h1: ['Camilla nunca parada,', 'la agenda siempre llena.'],
    lead: 'Agenda, reserva online sin registro y recordatorios que evitan el hueco vacío. Con un asistente que contesta mientras estás con un paciente.',
    dolores: [
      ['El hueco que no se llena', 'Una quiropodia cancelada a última hora es una hora perdida que no vuelve.'],
      ['Contestar en mitad de la consulta', 'Suena el teléfono con el paciente en la camilla. Siempre pierde alguien.'],
      ['Los que no vuelven a revisión', 'La quiropodia toca cada dos meses. Si nadie avisa, el paciente lo deja pasar hasta que le duele.'],
    ] },
  { archivo: 'bookia-tatuajes.html', ruta: '/bookia-tatuajes', sector: 'estudios de tatuaje',
    pill: 'Software de citas para estudios de tatuaje', sitio: 'La cabina',
    h1: ['Cabina nunca parada,', 'la agenda siempre llena.'],
    lead: 'Agenda, reserva online sin registro y recordatorios que evitan el hueco vacío. Con un asistente que contesta las dudas de siempre mientras tatúas.',
    dolores: [
      ['La sesión que se cae', 'Una sesión de cuatro horas cancelada la víspera es un día entero perdido.'],
      ['Las mismas cinco preguntas', 'Cuánto cuesta, cuánto tarda, duele, cómo se cura, hay que dejar señal. Todos los días, por Instagram, mientras tatúas.'],
      ['Los proyectos a medias', 'Empezaron una manga y no cerraron la siguiente sesión. Nadie les escribió.'],
    ] },
];

const BOOKIA = SECTORES.map(s => Object.assign({}, BOOKIA_BASE, s, {
  titulo: `Bookia — ${s.h1.join(' ')} | Marirrodriga IA`.replace(/,/g, ''),
  descripcion: s.lead + ' Desde 64 €/mes, con su límite al lado.',
}));

module.exports = { DENTIA, BOOKIA, CAL };
