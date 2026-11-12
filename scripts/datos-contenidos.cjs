/* Textos de las páginas de contenido: la de Palencia y las guías.

   Salen de la auditoría SEO del 30-10-2026. Dos reglas que no se negocian:

   1. Los precios NO se escriben aquí: se leen de datos-departamentos.cjs. Por eso
      `cuerpo` es una función que recibe el pack y la pieza base de Atención.
   2. Solo lo comprobable. Nada de clientes, casos ni cifras que no se puedan
      enseñar, y las cifras de mercado llevan su fuente enlazada: son lo que dicen
      otros, no lo que hemos medido nosotros.

   Una página por ciudad donde NO estamos sería una página puerta: no se hace. */

const FECHA = '2026-10-30';
const FECHA_TXT = '30 de octubre de 2026';

const PALENCIA = {
  archivo: 'agencia-ia-palencia.html',
  ruta: '/agencia-ia-palencia',
  miga: 'Agencia de IA en Palencia',
  /* 12-11-2026: rehecha tras la auditoría de Search Console (0 enlaces
     externos, puesto ~14 para «agencia de IA en Palencia»). Fuera la «demo»:
     la puerta es el diagnóstico. Lo local es lo que la distingue de las
     agencias nacionales con una página por ciudad: quiénes somos, que vamos
     en persona y los sectores de aquí. Sin cifras de la provincia sin fuente. */
  titulo: 'Agencia de IA en Palencia: diagnóstico gratis | Marirrodriga IA',
  descripcion: 'Agencia de IA de Palencia. Vamos a tu empresa, vemos qué tareas se pueden automatizar y te damos un informe con horas y precios. Diagnóstico gratis.',
  eyebrow: 'Palencia · Castilla y León',
  h1: 'Agencia de IA en Palencia',
  lead: 'Marirrodriga IA es una agencia de inteligencia artificial nacida en Palencia. Vamos a tu empresa, vemos cómo se trabaja y montamos los agentes y automatizaciones que quitan las tareas repetitivas, con el precio de cada pieza publicado.',
  secciones: ({ departamentos }) => `
    <h2>Por qué una agencia de IA de Palencia</h2>
    <p>Buscar «agencia de IA en Palencia» devuelve, sobre todo, agencias de otras ciudades con una página para cada provincia. Nosotros somos de aquí: <strong>el diagnóstico lo hacemos en tu empresa, en persona</strong>, sentados con quien dirige y con el equipo que hace el trabajo.</p>
    <p>Montamos la agencia para que el negocio que sigue abierto en Palencia, el que compite con las cadenas y con internet con menos gente y menos horas, tenga las mismas herramientas que una empresa grande.</p>

    <h2>Quiénes somos</h2>
    <p>Somos dos hermanos. <strong>Ismael Marirrodriga</strong> hace los diagnósticos y monta los agentes de IA y las automatizaciones; además es graduado en Derecho, así que los contratos y el RGPD se miran antes de tocar nada. <strong>Marco Marirrodriga</strong>, desarrollador full-stack, escribe el código: las aplicaciones, los paneles y las conexiones entre programas. Trabajas con quien lo construye, no con un comercial que se lo pasa a otro. Más en <a href="/conocenos">Conócenos</a>.</p>

    <h2>Para qué empresas de Palencia</h2>
    <p>El diagnóstico gratis es para empresas de <strong>5 a 50 personas</strong>. En la provincia eso es, sobre todo:</p>
    <ul>
      <li><strong>Industria agroalimentaria y sus proveedores:</strong> pedidos que llegan por todas partes, albaranes, seguimiento de entregas e incidencias.</li>
      <li><strong>Talleres, industria y servicios a la automoción:</strong> presupuestos que se enfrían, citas, avisos al cliente y papeleo.</li>
      <li><strong>Distribución y comercio:</strong> stock, pedidos, cobros y la misma pregunta por WhatsApp veinte veces al día.</li>
      <li><strong>Despachos, asesorías y clínicas:</strong> documentos que hay que perseguir, citas, recordatorios y facturación.</li>
    </ul>

    <h2>Qué montamos</h2>
    <p>No vendemos «IA» en abstracto. Montamos el departamento entero con agentes de IA, o automatizamos las tareas repetitivas dentro de él:</p>
    <table class="art-tabla">
      <thead><tr><th>Si lo que te frena es…</th><th>Se resuelve en</th><th>Desde</th></tr></thead>
      <tbody>
        ${departamentos.map(d => `<tr><td>${d.dolor}</td><td><a href="${d.ruta}">${d.nombre}</a></td><td class="art-num">${d.desde} €/mes${d.iva}</td></tr>`).join('\n        ')}
      </tbody>
    </table>
    <p>Puedes ver cada agente en <a href="/agentes">Qué hacemos</a>. Si tienes una peluquería, un centro de estética o una clínica de fisioterapia, mira <a href="/citia">Citia</a>; si es una clínica dental, <a href="/dentia">Dentia</a>. Y algunos de los proyectos que hemos montado, contados sin nombres porque firmamos confidencialidad, están en <a href="/conocenos">Conócenos</a>.</p>

    <h2>Cómo empezamos</h2>
    <ol>
      <li><strong>Un diagnóstico gratis.</strong> Hasta tres sesiones de unas dos horas: con quien dirige, con el equipo y mirando el trabajo. Es para empresas de 5 a 50 personas en Castilla y León, y <a href="/#solicitar">quedan solo <span class="plazas-n">11</span> plazas a coste 0</a>; después costará 350 €.</li>
      <li><strong>Un informe con dos caminos.</strong> Para cada tarea que merezca la pena: formar a tu equipo para que la resuelva, o montar el software que la haga sola. Con las horas y el precio escritos. Y si no compensa, lo pone.</li>
      <li><strong>Precio cerrado antes de empezar.</strong> La instalación se paga 50 % al empezar y 50 % al entregar.</li>
      <li><strong>Sin permanencia.</strong> Te vas cuando quieras, avisando con 30 días.</li>
    </ol>

    <h2>Dónde trabajamos</h2>
    <p>Estamos en Palencia capital y vamos a cualquier punto de la provincia. El diagnóstico lo hacemos en toda Castilla y León, con alguna sesión en tu oficina. El montaje se hace casi todo a distancia: lo que necesitamos es entender tu negocio y tener acceso a las herramientas que ya usas.</p>
    <p>Puedes escribirnos a <a href="mailto:contacto@marirrodriga-ia.com">contacto@marirrodriga-ia.com</a> o por <a href="https://wa.me/34675148566" target="_blank" rel="noopener">WhatsApp, al 675 148 566</a>, o <a href="/#solicitar">pedir plaza para el diagnóstico</a>.</p>`,
  faq: [
    ['¿Qué hace una agencia de IA?', 'Busca en tu empresa las tareas que se repiten y monta lo que las hace solas: un asistente que contesta por WhatsApp, un sistema que persigue facturas vencidas, un agente que ordena el correo. En nuestro caso, primero miramos cómo trabajáis y después decimos qué compensa y qué no.'],
    ['¿Cuánto cuesta contratar una agencia de IA en Palencia?', 'El diagnóstico es gratis para las primeras plazas. Después, cada pieza tiene su alta y su cuota publicadas, sin IVA, en la página de su departamento, así que no hace falta pedir presupuesto para saber el orden de magnitud.'],
    ['¿Venís a la empresa o es todo por videollamada?', 'El diagnóstico lo hacemos en tu empresa: no se puede ver cómo se trabaja desde una pantalla. El montaje y las revisiones posteriores, casi siempre a distancia.'],
    ['¿Hace falta que mi negocio sea grande?', 'El diagnóstico gratis es para empresas de 5 a 50 personas. Si sois menos, casi siempre os sirve mejor uno de nuestros productos con precio cerrado, como Citia.'],
    ['¿Trabajáis solo en Palencia?', 'No. Somos de Palencia y el diagnóstico lo hacemos en toda Castilla y León. El montaje es en remoto, así que fuera de la comunidad también se puede: escríbenos y lo vemos.'],
    ['¿Mis datos y los de mis clientes están protegidos?', 'Si tratamos datos personales por tu cuenta, firmamos contigo el contrato de encargado de tratamiento que exige el artículo 28 del RGPD. Los asistentes, además, se identifican siempre como IA ante quien les escribe.'],
  ],
};

const CHATBOT = {
  archivo: 'guias/cuanto-cuesta-chatbot-whatsapp-ia.html',
  ruta: '/guias/cuanto-cuesta-chatbot-whatsapp-ia',
  miga: 'Cuánto cuesta un chatbot de WhatsApp con IA',
  titulo: 'Cuánto cuesta un chatbot de WhatsApp con IA en 2026 | Marirrodriga IA',
  descripcion: 'Alta, cuota y lo que cobra Meta desde octubre de 2026, en euros y con IVA. Precios de mercado con su fuente y los nuestros, para una pyme en España.',
  eyebrow: 'Guía de precios',
  h1: 'Cuánto cuesta un chatbot de WhatsApp con IA para una pyme',
  lead: 'Pagas tres cosas: la puesta en marcha, una cuota mensual y lo que Meta cobra por los mensajes. Aquí van las tres en euros, con el coste del primer año y con lo que cambió en octubre de 2026.',
  resumen: ({ agente, pack, f }) => `
    <aside class="art-resumen">
      <strong>La respuesta corta</strong>
      <p>Las guías de proveedores españoles sitúan un chatbot de WhatsApp con IA a medida en torno a 2.000–8.000 € de proyecto. Hay opciones por suscripción mucho más bajas: el nuestro empieza en ${f(agente.setup)} € de alta y ${f(agente.eur)} €/mes, sin IVA. Meta se paga aparte y sus primeros 1.000 mensajes de servicio al mes, por número, son gratis.</p>
    </aside>`,
  secciones: ({ agente, pack, f, iva, primerAno }) => `
    <h2>Los tres costes, uno por uno</h2>
    <table class="art-tabla">
      <thead><tr><th>Coste</th><th>Qué pagas</th><th>A quién</th></tr></thead>
      <tbody>
        <tr><td><strong>Puesta en marcha</strong></td><td>Contarle tu negocio al asistente, conectarlo a WhatsApp y a tu agenda o CRM, y probarlo.</td><td>Al proveedor, una vez</td></tr>
        <tr><td><strong>Cuota</strong></td><td>El modelo de IA, el servidor y los ajustes. Fíjate en el límite de conversaciones que incluye.</td><td>Al proveedor, cada mes</td></tr>
        <tr><td><strong>Mensajes de Meta</strong></td><td>Los mensajes que envía tu empresa por la API de WhatsApp Business.</td><td>A Meta, según consumo</td></tr>
      </tbody>
    </table>

    <h2>Lo que dicen los precios de mercado</h2>
    <p>No hay un precio oficial, y conviene mirar las cifras sabiendo que las publican los propios proveedores:</p>
    <ul>
      <li><a href="https://www.upliora.es/blog/precio-chatbot-ia-web-whatsapp-empresa-2026" target="_blank" rel="noopener">Upliora</a> da <strong>de 2.000 a 8.000 €</strong> para WhatsApp con IA, sin separar la puesta en marcha de la cuota.</li>
      <li><a href="https://duotach.com/blog/cuanto-cuesta-chatbot-whatsapp-ia" target="_blank" rel="noopener">DuoTach</a> recoge para España <strong>de 300 a 3.000 € de puesta en marcha</strong> y <strong>de 30 a 150 €/mes de API</strong>.</li>
    </ul>
    <p>La distancia entre esas cifras no es un error: no es lo mismo un bot de preguntas frecuentes que un asistente que consulta tu agenda y cierra la cita.</p>

    <h2>Lo que cambió en octubre de 2026: Meta y los mensajes de servicio</h2>
    <p>Muchas guías siguen diciendo que contestar dentro de las 24 horas es gratis. Ya no es así del todo. Según la <a href="https://developers.facebook.com/docs/whatsapp/pricing/" target="_blank" rel="noopener">documentación de precios de Meta</a>, desde el 1 de octubre de 2026:</p>
    <ul>
      <li>Cada número de teléfono tiene <strong>1.000 mensajes de servicio gratis al mes</strong>. A partir del 1.001 se cobran, y los que no gastes no pasan al mes siguiente.</li>
      <li>Los mensajes que te escriben tus clientes <strong>no se cobran</strong>.</li>
      <li>Las plantillas de marketing, utilidad y autenticación se cobran según su tarifa por país, y España tiene la suya.</li>
    </ul>
    <p>Para una pyme que recibe pocas consultas, el coste de Meta puede ser cero o casi. Si mandas campañas de marketing, cuéntalo aparte: esas plantillas se pagan siempre.</p>

    <h2>Cuánto cuesta el nuestro</h2>
    <p>Lo publicamos porque es lo primero que vas a querer saber. Precios sin IVA, con el IVA debajo:</p>
    <table class="art-tabla">
      <thead><tr><th></th><th>Alta</th><th>Cuota</th><th>Primer año</th></tr></thead>
      <tbody>
        <tr>
          <td><strong>El agente</strong><br><span class="art-nota">Contesta por un canal, hasta ${agente.limCorto}</span></td>
          <td class="art-num">${f(agente.setup)} €${iva(agente.setup)}</td>
          <td class="art-num">${f(agente.eur)} €/mes${iva(agente.eur)}</td>
          <td class="art-num"><strong>${f(primerAno(agente.setup, agente.eur))} €</strong>${iva(primerAno(agente.setup, agente.eur))}</td>
        </tr>
        <tr>
          <td><strong>Atención al Cliente entera</strong><br><span class="art-nota">Las siete piezas: chat, agenda, recordatorios y correo</span></td>
          <td class="art-num">${f(pack.alta)} €${iva(pack.alta)}</td>
          <td class="art-num">${f(pack.cuota)} €/mes${iva(pack.cuota)}</td>
          <td class="art-num"><strong>${f(primerAno(pack.alta, pack.cuota))} €</strong>${iva(primerAno(pack.alta, pack.cuota))}</td>
        </tr>
      </tbody>
    </table>
    <p>Lo que Meta cobre va aparte y a tu nombre: no revendemos mensajería. Todas las piezas, con su límite, están en <a href="/atencion-al-cliente">Atención al Cliente</a>.</p>

    <h2>Cuándo no te hace falta</h2>
    <p>Si te entran pocos mensajes y son siempre las mismas tres preguntas, prueba primero las <strong>respuestas automáticas y rápidas de la app gratuita de WhatsApp Business</strong>. Un asistente con IA empieza a compensar cuando las preguntas cambian, cuando te escriben fuera de horario y se te van, o cuando tiene que hacer algo: mirar la agenda, reservar o pasar el caso a una persona.</p>

    <h2>Qué preguntar antes de contratar</h2>
    <ol>
      <li><strong>¿Cuántas conversaciones incluye la cuota, y qué pasa si me paso?</strong> Un precio sin límite al lado no se puede comparar.</li>
      <li><strong>¿La cuenta de WhatsApp Business va a mi nombre?</strong> Si se va el proveedor, tu número y tu historial tienen que quedarse contigo.</li>
      <li><strong>¿Qué hace cuando no sabe algo?</strong> Tiene que pasar la conversación a una persona, no improvisar.</li>
      <li><strong>¿Se identifica como IA?</strong> Lo exige el artículo 50 del Reglamento Europeo de IA.</li>
      <li><strong>¿Quién trata los datos de mis clientes y dónde?</strong> Pide el contrato de encargado de tratamiento (artículo 28 del RGPD).</li>
      <li><strong>¿Hay permanencia?</strong> Y cuánto hay que avisar para irse.</li>
    </ol>`,
  faq: [
    ['¿Cuánto cuesta al mes un chatbot de WhatsApp con IA?', 'Depende del alcance. Hay suscripciones desde unas decenas de euros al mes y proyectos a medida con mantenimiento bastante más caros. El nuestro empieza en 49 €/mes, sin IVA, con 500 conversaciones al mes y un canal.'],
    ['¿Meta cobra por contestar a mis clientes?', 'Desde el 1 de octubre de 2026, cada número tiene 1.000 mensajes de servicio gratis al mes y se cobra a partir de ahí. Los mensajes que te envían tus clientes no se cobran.'],
    ['¿Hay chatbots de WhatsApp gratis?', 'La app de WhatsApp Business trae respuestas automáticas gratuitas, pero no entienden lo que les escriben ni consultan tu agenda. Para eso hace falta un asistente con IA, que tiene coste de modelo y de servidor.'],
    ['¿Sirve la cuenta normal de WhatsApp Business?', 'Para un asistente conectado hace falta la API de WhatsApp Business, y es Meta quien factura el consumo. Conviene que la cuenta vaya a nombre de tu empresa.'],
  ],
};

const GUIAS = [CHATBOT];

const INDICE_GUIAS = {
  archivo: 'guias/index.html',
  ruta: '/guias',
  miga: 'Guías',
  titulo: 'Guías de IA para pymes, con precios reales | Marirrodriga IA',
  descripcion: 'Guías prácticas para decidir si la IA le encaja a tu negocio: qué cuesta, qué hace falta y qué preguntar antes de contratar. En euros y con fuentes.',
  eyebrow: 'Guías',
  h1: 'Guías de IA para pymes',
  lead: 'Lo que nos preguntan antes de decir que sí, escrito con cifras y con sus fuentes.',
};

module.exports = { FECHA, FECHA_TXT, PALENCIA, GUIAS, INDICE_GUIAS };
