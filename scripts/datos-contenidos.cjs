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
  titulo: 'Agencia de IA en Palencia: consultoría gratis | Marirrodriga IA',
  descripcion: 'Agencia de IA de Palencia. Vamos a tu empresa, vemos qué tareas se pueden automatizar y te damos un informe con horas y precios. Consultoría gratis.',
  eyebrow: 'Palencia · Castilla y León',
  h1: 'Agencia de IA en Palencia',
  lead: 'Marirrodriga IA es una agencia de inteligencia artificial nacida en Palencia. Vamos a tu empresa, vemos cómo se trabaja y montamos los agentes y automatizaciones que quitan las tareas repetitivas, con el precio de cada pieza publicado.',
  secciones: ({ departamentos }) => `
    <h2>Por qué una agencia de IA de Palencia</h2>
    <p>Buscar «agencia de IA en Palencia» devuelve, sobre todo, agencias de otras ciudades con una página para cada provincia. Nosotros somos de aquí: <strong>la consultoría la hacemos en tu empresa, en persona</strong>, sentados con quien dirige y con el equipo que hace el trabajo.</p>
    <p>Montamos la agencia para que el negocio que sigue abierto en Palencia, el que compite con las cadenas y con internet con menos gente y menos horas, tenga las mismas herramientas que una empresa grande.</p>

    <h2>Quiénes somos</h2>
    <p>Somos dos hermanos. <strong>Ismael Marirrodriga</strong> hace las consultorías y monta los agentes de IA y las automatizaciones; además es graduado en Derecho, así que los contratos y el RGPD se miran antes de tocar nada. <strong>Marco Marirrodriga</strong>, desarrollador full-stack, escribe el código: las aplicaciones, los paneles y las conexiones entre programas. Trabajas con quien lo construye, no con un comercial que se lo pasa a otro. Más en <a href="/conocenos">Conócenos</a>.</p>

    <h2>Para qué empresas de Palencia</h2>
    <p>La consultoría gratis es para empresas de <strong>5 a 50 personas</strong>. En la provincia eso es, sobre todo:</p>
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
      <li><strong>Una consultoría gratis.</strong> Hasta tres sesiones de unas dos horas: con quien dirige, con el equipo y mirando el trabajo. Es para empresas de 5 a 50 personas de toda España, y <a href="/#solicitar">quedan solo <span class="plazas-n">10</span> plazas a coste 0</a>; después costará 350 €.</li>
      <li><strong>Un informe con dos caminos.</strong> Para cada tarea que merezca la pena: formar a tu equipo para que la resuelva, o montar el software que la haga sola. Con las horas y el precio escritos. Y si no compensa, lo pone.</li>
      <li><strong>Precio cerrado antes de empezar.</strong> La instalación se paga 50 % al empezar y 50 % al entregar.</li>
      <li><strong>Sin permanencia.</strong> Te vas cuando quieras, avisando con 30 días.</li>
    </ol>

    <h2>Dónde trabajamos</h2>
    <p>Estamos en Palencia capital y vamos a cualquier punto de la provincia. En toda Castilla y León, la consultoría tiene alguna sesión en tu oficina; en el resto de España, va por videollamada. El montaje se hace casi todo a distancia: lo que necesitamos es entender tu negocio y tener acceso a las herramientas que ya usas.</p>
    <p>Puedes escribirnos a <a href="mailto:contacto@marirrodriga-ia.com">contacto@marirrodriga-ia.com</a> o por <a href="https://wa.me/34675148566" target="_blank" rel="noopener">WhatsApp, al 675 148 566</a>, o <a href="/#solicitar">pedir plaza para el diagnóstico</a>.</p>`,
  faq: [
    ['¿Qué hace una agencia de IA?', 'Busca en tu empresa las tareas que se repiten y monta lo que las hace solas: un asistente que contesta por WhatsApp, un sistema que persigue facturas vencidas, un agente que ordena el correo. En nuestro caso, primero miramos cómo trabajáis y después decimos qué compensa y qué no.'],
    ['¿Cuánto cuesta contratar una agencia de IA en Palencia?', 'La consultoría es gratis para las primeras plazas. Después, cada pieza tiene su alta y su cuota publicadas, sin IVA, en la página de su departamento, así que no hace falta pedir presupuesto para saber el orden de magnitud.'],
    ['¿Venís a la empresa o es todo por videollamada?', 'En Castilla y León, la consultoría la hacemos en tu empresa: el trabajo se entiende mejor viéndolo. Fuera, por videollamada, o en persona si la empresa paga el viaje. El montaje y las revisiones posteriores, casi siempre a distancia.'],
    ['¿Hace falta que mi negocio sea grande?', 'La consultoría gratis es para empresas de 5 a 50 personas. Si sois menos, casi siempre os sirve mejor uno de nuestros productos con precio cerrado, como Citia.'],
    ['¿Trabajáis solo en Palencia?', 'No. Somos de Palencia y la consultoría la hacemos en persona en toda Castilla y León. Fuera de la comunidad también: por videollamada, o en persona si la empresa paga el viaje. El montaje es en remoto.'],
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

/* 23-11-2026: guía nacional (el diagnóstico es para toda España desde el 17-11).
   Los tres niveles son los de Ismael: tarea concreta → proceso completo →
   departamento entero. El suelo del nivel 1 (150 € + 70 €/mes) lo fijó él; el
   resto de precios se lee de datos-departamentos.cjs. Fuera, por decisión suya:
   el suelo interno de los proyectos a medida y las ayudas públicas.
   El sueldo es el último dato del INE por ocupación (EES 2022) y los tipos de
   cotización son los de 2026 de la Seguridad Social. */
const { DEPARTAMENTOS } = require('./datos-departamentos.cjs');
const NIVEL1 = { alta: 150, cuota: 70 };
const fmt = n => n.toLocaleString('es-ES', { useGrouping: true }).replace(/(\d)(?=(\d{3})+$)/, '$1.');
const PACKS = DEPARTAMENTOS.filter(d => d.pack && d.pack.alta);
const N2 = [['/finanzas', 'Recobro de facturas vencidas'], ['/logistica', 'Seguimiento de entregas'],
  ['/finanzas', 'Contabilidad y cuadro financiero'], ['/ventas-y-captacion', 'Captación de clientes potenciales']]
  .map(([ruta, n]) => DEPARTAMENTOS.find(d => d.ruta === ruta).piezas.find(z => z.n === n));
const rangoDe = (xs, k) => `${fmt(Math.min(...xs.map(k)))} a ${fmt(Math.max(...xs.map(k)))}`;
const RANGO = {
  n2: { alta: rangoDe(N2, z => z.setup), cuota: rangoDe(N2, z => z.eur) },
  n3: { alta: rangoDe(PACKS, d => d.pack.alta), cuota: rangoDe(PACKS, d => d.pack.cuota) },
};
const SUELDO_ADMIN = 24198.08;          // INE, EES 2022, gran grupo 4 (ambos sexos)
const SS_EMPRESA = 0.3065 + 0.015;      // 23,60 + 5,50 + 0,20 + 0,60 + 0,75 (MEI) + ~1,50 AT/EP oficina
const COSTE_ADMIN = Math.round(SUELDO_ADMIN * (1 + SS_EMPRESA) / 1000) * 1000;

const IMPLANTAR = {
  archivo: 'guias/cuanto-cuesta-implantar-ia-pyme.html',
  ruta: '/guias/cuanto-cuesta-implantar-ia-pyme',
  miga: 'Cuánto cuesta implantar IA en una pyme',
  fecha: '2026-11-23',
  fechaTxt: '23 de noviembre de 2026',
  titulo: 'Cuánto cuesta implantar IA en una pyme en 2026 | Marirrodriga IA',
  descripcion: 'Tres niveles, del más sencillo a un departamento entero, con precios en euros y el IVA aparte. Y la cuenta frente a contratar a una persona.',
  eyebrow: 'Guía de precios',
  h1: 'Cuánto cuesta implantar IA en una pyme en España',
  lead: 'Depende de cuánto quieras que haga la IA: acelerar una tarea, llevar un proceso entero o encargarse de un departamento. Aquí van los tres niveles con precios reales, sin IVA y con el IVA debajo, y la comparación que se hace casi todo el mundo: contratar a una persona.',
  resumen: ({ f }) => `
    <aside class="art-resumen">
      <strong>La respuesta corta</strong>
      <p>Automatizar una tarea concreta empieza en unos ${f(NIVEL1.alta)} € de alta y ${f(NIVEL1.cuota)} €/mes. Un proceso completo, de ${RANGO.n2.alta} € de alta y de ${RANGO.n2.cuota} €/mes. Un departamento entero, de ${RANGO.n3.alta} € de alta y de ${RANGO.n3.cuota} €/mes. Todo sin IVA. Los proyectos a medida que publican otras agencias van de 2.000 a 30.000 €.</p>
    </aside>`,
  secciones: ({ f, iva, primerAno, deps, pieza }) => {
    const fila = d => `
        <tr>
          <td><strong>${d.nombre}</strong></td>
          <td class="art-num">${f(d.pack.alta)} €${iva(d.pack.alta)}</td>
          <td class="art-num">${f(d.pack.cuota)} €/mes${iva(d.pack.cuota)}</td>
          <td class="art-num"><strong>${f(primerAno(d.pack.alta, d.pack.cuota))} €</strong>${iva(primerAno(d.pack.alta, d.pack.cuota))}</td>
        </tr>`;
    const ej = (ruta, n) => { const z = pieza(ruta, n); return `<strong>${z.n}</strong>: ${f(z.setup)} € de alta y ${f(z.eur)} €/mes`; };
    const at = deps.find(d => d.ruta === '/atencion-al-cliente');
    return `
    <h2>Los tres niveles</h2>
    <table class="art-tabla">
      <thead><tr><th>Nivel</th><th>Qué hace la IA</th><th>Ejemplo</th></tr></thead>
      <tbody>
        <tr><td><strong>1. Una tarea concreta</strong></td><td>Hace más rápida una tarea dentro de un proceso que sigue llevando una persona.</td><td>Un agente que crea las facturas de tus clientes y las deja ordenadas.</td></tr>
        <tr><td><strong>2. Un proceso completo</strong></td><td>Lleva el proceso de principio a fin, sola o con una persona que solo revisa.</td><td>Perseguir las facturas vencidas hasta cobrarlas, o al transportista hasta tener la fecha.</td></tr>
        <tr><td><strong>3. Un departamento entero</strong></td><td>Varios agentes trabajando juntos que se encargan del departamento.</td><td>Toda la atención al cliente: chat, agenda, recordatorios y correo.</td></tr>
      </tbody>
    </table>
    <p>Cuanto más arriba, más horas libera y más hay que montar. Casi nadie empieza por el nivel 3: lo normal es empezar por la tarea que más tiempo roba y subir cuando funciona.</p>

    <h2>Nivel 1: una tarea concreta</h2>
    <p>Es la puerta de entrada. La IA no lleva el proceso: hace más rápida una parte. Por ejemplo, le dices a quién y de qué, y la factura sale hecha y archivada donde toca. La persona sigue decidiendo, pero tarda segundos en lo que antes le llevaba un rato.</p>
    <p>Con nosotros empieza en <strong>${f(NIVEL1.alta)} € de alta</strong>${iva(NIVEL1.alta)} y <strong>${f(NIVEL1.cuota)} €/mes</strong>${iva(NIVEL1.cuota)}.</p>

    <h2>Nivel 2: un proceso completo</h2>
    <p>Aquí la IA hace el trabajo entero y la persona solo mira lo que no está claro. Algunos de los que tenemos publicados, sin IVA:</p>
    <ul>
      <li>${ej('/finanzas', 'Recobro de facturas vencidas')}. Escribe, insiste con criterio y avisa cuando hay que llamar.</li>
      <li>${ej('/logistica', 'Seguimiento de entregas')}. Persigue a cada transportista hasta sacarle la fecha real.</li>
      <li>${ej('/finanzas', 'Contabilidad y cuadro financiero')}. Clasifica gastos e ingresos y cruza lo cobrado con lo facturado.</li>
      <li>${ej('/ventas-y-captacion', 'Captación de clientes potenciales')}. Busca negocios que encajan con tu cliente ideal.</li>
    </ul>

    <h2>Nivel 3: un departamento entero</h2>
    <p>Todas las piezas de un departamento, montadas juntas y con la misma cabeza detrás. Son nuestros precios publicados, sin IVA y con el IVA debajo:</p>
    <table class="art-tabla">
      <thead><tr><th>Departamento</th><th>Alta</th><th>Cuota</th><th>Primer año</th></tr></thead>
      <tbody>${deps.map(fila).join('')}
      </tbody>
    </table>
    <p class="art-nota">En Ventas, el CRM va aparte. Cada departamento tiene su página con todas las piezas y lo que incluye cada una.</p>

    <h2>Lo que dicen otros</h2>
    <p>No hay un precio oficial. Estas son cifras que publican otros proveedores, para que tengas con qué comparar:</p>
    <ul>
      <li><a href="https://www.utilia.ai/es/blog/cuanto-cuesta-ia-pymes-2025" target="_blank" rel="noopener">Utilia</a> da <strong>de 2.000 a 8.000 €</strong> para una automatización con herramientas <em>low-code</em> y <strong>de 8.000 a 30.000 €</strong> para un desarrollo a medida.</li>
      <li><a href="https://blog.tenea.com/cuanto-cuesta-ia-agentica" target="_blank" rel="noopener">Tenea</a> sitúa la IA agéntica para una pyme <strong>entre 3.000 y 15.000 €</strong>.</li>
    </ul>
    <p>La diferencia con lo nuestro no es magia. Esas cifras son proyectos que se construyen y se pagan de una vez. Lo nuestro son piezas que ya funcionan, se adaptan a tu negocio y se pagan con una cuota. Si lo que necesitas no existe, también se construye a medida, con un presupuesto cerrado después del diagnóstico.</p>

    <h2>La cuenta que se hace casi todo el mundo: contratar a una persona</h2>
    <p>Un administrativo en España cobra de media <strong>${f(Math.round(SUELDO_ADMIN))} € brutos al año</strong>, según la <a href="https://www.ine.es/dyngs/Prensa/EES2022.htm" target="_blank" rel="noopener">Encuesta de Estructura Salarial del INE</a> (2022, el último dato por ocupación). A eso la empresa le suma su parte de la Seguridad Social: un 30,65 % con los <a href="https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/CotizacionRecaudacionTrabajadores/36537" target="_blank" rel="noopener">tipos de 2026</a>, más la cotización por accidentes de trabajo. En total, <strong>unos ${f(COSTE_ADMIN)} € al año</strong>.</p>
    <p>Atención al cliente entera, montada con IA, sale por ${f(primerAno(at.pack.alta, at.pack.cuota))} € el primer año, sin IVA.</p>
    <p>Dicho esto, la comparación tiene trampa y conviene decirla: <strong>la IA no sustituye a una persona entera</strong>. Lo que hace es quitarle a tu equipo las horas que se van en lo repetitivo, para que las dedique a lo que solo puede hacer una persona. Por eso lo que hay que medir no es el sueldo, sino cuántas horas a la semana se van en tareas que siguen siempre el mismo esquema.</p>

    <h2>Lo que no sale en la factura</h2>
    <ul>
      <li><strong>El tiempo de tu equipo al principio.</strong> Alguien tiene que explicar cómo se hacen las cosas y revisar las primeras semanas.</li>
      <li><strong>Tus datos, en orden.</strong> Si los clientes están en tres hojas de cálculo distintas, primero hay que juntarlos.</li>
      <li><strong>Lo que cobran otros.</strong> Por ejemplo, los mensajes de WhatsApp que factura Meta, que van a tu nombre.</li>
    </ul>

    <h2>Cuándo no compensa</h2>
    <ul>
      <li>Si casi no hay tareas que se repitan: la IA rinde en lo que sigue un esquema.</li>
      <li>Si el proceso cambia cada semana: primero hay que asentarlo.</li>
      <li>Si sois menos de cinco personas: casi siempre te sirve mejor un producto con precio cerrado que un proyecto.</li>
    </ul>

    <h2>Cómo saber cuánto te costaría a ti</h2>
    <p>Las tablas dan el orden de magnitud, pero la cifra buena sale de mirar tu empresa: qué tareas se repiten, cuántas horas se llevan y cuáles merece la pena automatizar. Eso es lo que hacemos en la <a href="/#informe">consultoría</a>: hasta tres sesiones con quien dirige y con el equipo, y un informe con las tareas, las horas y el precio de quitarlas. Es gratis para empresas de 5 a 50 personas de toda España. Si quieres saber qué debería incluir cualquier diagnóstico, sea nuestro o de otro, lo contamos en <a href="/guias/diagnostico-ia-empresas">qué es un diagnóstico de IA para empresas</a>.</p>`;
  },
  faq: [
    ['¿Cuánto cuesta implantar inteligencia artificial en una pyme?', `Depende del nivel. Automatizar una tarea concreta empieza en unos ${NIVEL1.alta} € de alta y ${NIVEL1.cuota} €/mes. Un departamento entero, de ${RANGO.n3.alta} € de alta y de ${RANGO.n3.cuota} €/mes. Todo sin IVA. Los proyectos a medida que publican otras agencias van de 2.000 a 30.000 €.`],
    ['¿Sale más barato que contratar a una persona?', `En coste, sí: un administrativo le cuesta a la empresa unos ${fmt(COSTE_ADMIN)} € al año con la Seguridad Social. Pero la IA no sustituye a una persona entera: quita las horas de las tareas repetitivas para que tu equipo las dedique a otra cosa.`],
    ['¿Por dónde empiezo?', 'Por la tarea que más horas se lleva y que siempre se hace igual. Si no sabes cuál es, la consultoría gratuita sirve justo para eso.'],
    ['¿Hay permanencia?', 'Se paga una cuota mensual. Antes de contratar, pregunta siempre cuánto hay que avisar para irse y qué pasa con tus datos si te vas.'],
  ],
};

/* 23-11-2026: para «diagnóstico de IA para empresas». En Google salen tres cosas
   distintas con el mismo nombre (tests de madurez online, diagnósticos de
   cumplimiento del AI Act y consultoras que no dicen qué entregan): la guía las
   separa y dice qué debe incluir uno de procesos. Lo nuestro, tal y como está
   en la hoja de la home. */
const PRECIO_DIAG = 350;

const DIAGNOSTICO = {
  archivo: 'guias/diagnostico-ia-empresas.html',
  ruta: '/guias/diagnostico-ia-empresas',
  miga: 'Diagnóstico de IA para empresas',
  fecha: '2026-11-23',
  fechaTxt: '23 de noviembre de 2026',
  titulo: 'Diagnóstico de IA para empresas: qué incluye | Marirrodriga IA',
  descripcion: 'Test online, diagnóstico legal o diagnóstico de procesos: en qué se diferencian, qué debe incluir uno que sirva y qué señales indican que no te va a servir.',
  eyebrow: 'Guía',
  h1: 'Diagnóstico de IA para empresas: qué es y qué debe incluir',
  lead: 'Al buscarlo aparecen tres cosas distintas con el mismo nombre. Aquí van las tres, qué debería traer uno que te sirva para decidir y las señales de que no te va a servir.',
  resumen: () => `
    <aside class="art-resumen">
      <strong>La respuesta corta</strong>
      <p>Un diagnóstico de IA para empresas mira cómo se trabaja en tu empresa y te dice qué tareas se pueden automatizar, cuántas horas se llevan hoy y cuánto cuesta quitarlas. Uno que sirva habla con quien dirige y con el equipo, ve el trabajo en directo y termina en un informe con cifras, incluida la lista de lo que no compensa tocar.</p>
    </aside>`,
  secciones: ({ f, iva }) => `
    <h2>Los tres «diagnósticos» que vas a encontrar</h2>
    <table class="art-tabla">
      <thead><tr><th>Tipo</th><th>Qué te dice</th><th>Qué no te dice</th></tr></thead>
      <tbody>
        <tr><td><strong>Test de madurez online</strong></td><td>Un cuestionario de unos minutos y una puntuación de lo «preparada» que está tu empresa.</td><td>Qué tareas concretas automatizar. Nadie ha visto cómo trabajáis.</td></tr>
        <tr><td><strong>Diagnóstico legal (AI Act)</strong></td><td>Qué obligaciones tienes con el Reglamento Europeo de IA y el RGPD por la IA que ya usas.</td><td>Dónde te ahorraría tiempo la IA. Es cumplimiento, no procesos.</td></tr>
        <tr><td><strong>Diagnóstico de procesos</strong></td><td>Qué tareas se repiten, cuántas horas se llevan y cuánto cuesta quitarlas.</td><td>Si cumples la ley: para eso, el anterior.</td></tr>
      </tbody>
    </table>
    <p>Los tres son útiles para cosas distintas. Si lo que quieres saber es <strong>qué hacer con la IA en tu empresa y cuánto te va a costar</strong>, el que necesitas es el de procesos.</p>

    <h2>Qué debería incluir uno de procesos</h2>
    <ol>
      <li><strong>Una conversación con quien dirige.</strong> Qué le frena, dónde cree que se va el tiempo y qué no está dispuesto a cambiar.</li>
      <li><strong>Otra con el equipo.</strong> Son quienes saben qué se repite y qué se copia a mano de un sitio a otro. Muchas veces no coincide con lo que cree la dirección.</li>
      <li><strong>Ver el trabajo.</strong> Seguir de principio a fin las tareas de cada día y contar los pasos. Lo que se cuenta en una reunión no es lo mismo que lo que se hace.</li>
      <li><strong>Un informe con cifras.</strong> Cada tarea, las horas que se lleva y lo que costaría quitarla. Sin horas ni precios no puedes decidir.</li>
      <li><strong>Lo que no compensa.</strong> Un buen diagnóstico también te dice qué no tocar, porque cuesta más automatizarlo que seguir haciéndolo a mano.</li>
      <li><strong>Más de un camino.</strong> A veces lo mejor es formar al equipo para que lo resuelva con herramientas que ya tiene, no montar software.</li>
    </ol>

    <h2>Señales de que no te va a servir</h2>
    <ul>
      <li><strong>No habla con el equipo.</strong> Si solo pregunta a la dirección, se pierde la mitad.</li>
      <li><strong>No trae cifras.</strong> «Tenéis mucho potencial» no es un resultado.</li>
      <li><strong>Siempre acaba en la misma herramienta.</strong> Si la recomendación es justo lo que vende quien hace el diagnóstico, y no hay alternativa, desconfía.</li>
      <li><strong>El informe no es tuyo.</strong> Tienes que poder llevártelo y enseñárselo a otro proveedor.</li>
    </ul>

    <h2>Cómo prepararlo para aprovecharlo</h2>
    <ul>
      <li>Apunta durante una semana las tareas que más se repiten y quién las hace.</li>
      <li>Ten a mano las herramientas que usáis: programa de facturación, CRM, hojas de cálculo, WhatsApp de empresa.</li>
      <li>Avisa al equipo: no es una evaluación de su trabajo, es buscar lo que les sobra.</li>
      <li>Piensa qué no quieres cambiar. Ahorra tiempo a los dos.</li>
    </ul>

    <h2>El nuestro</h2>
    <p>Es una consultoría: un diagnóstico de procesos de <strong>hasta tres sesiones</strong>: con quien dirige, con el equipo y mirando el trabajo. No siempre hacen falta las tres. Al final te damos un informe con las tareas, las horas que cuestan y cómo quitarlas, por dos caminos: formar a tu equipo o montarlo nosotros con un precio cerrado. <strong>El informe es tuyo aunque no sigas con nosotros.</strong></p>
    <ul>
      <li><strong>Para quién:</strong> empresas de 5 a 50 personas de toda España, y siempre con quien dirige dentro.</li>
      <li><strong>Dónde:</strong> en persona en Castilla y León. En el resto de España, por videollamada.</li>
      <li><strong>Cuánto:</strong> gratis para las 10 primeras plazas. Después, ${f(PRECIO_DIAG)} €${iva(PRECIO_DIAG)}.</li>
    </ul>
    <p>Si antes quieres el orden de magnitud de lo que cuesta montar algo, está en <a href="/guias/cuanto-cuesta-implantar-ia-pyme">cuánto cuesta implantar IA en una pyme</a>.</p>`,
  faq: [
    ['¿Qué es un diagnóstico de IA para empresas?', 'Un análisis de cómo se trabaja en la empresa para saber qué tareas se pueden automatizar con IA, cuántas horas se llevan hoy y cuánto costaría quitarlas. El resultado es un informe con cifras.'],
    ['¿Sirve un test online?', 'Para hacerte una idea general, sí. Pero nadie ha visto cómo trabajáis, así que no te dirá qué tareas concretas automatizar ni cuánto cuesta.'],
    ['¿Cuánto dura?', 'El nuestro, hasta tres sesiones. No siempre hacen falta las tres: depende del tamaño de la empresa y de cuántos procesos haya que mirar.'],
    ['¿Es lo mismo que una auditoría del AI Act?', 'No. La auditoría legal te dice qué obligaciones tienes por la IA que ya usas. El diagnóstico de procesos te dice dónde te ahorraría tiempo.'],
    [`¿Cuánto cuesta?`, `El nuestro es gratis para las 10 primeras plazas y después cuesta ${PRECIO_DIAG} € más IVA. El informe es tuyo aunque no sigas con nosotros.`],
  ],
};

const GUIAS = [IMPLANTAR, DIAGNOSTICO, CHATBOT];

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
