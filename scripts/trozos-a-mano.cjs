/* Los trozos hechos a mano de Atencion y Ventas.
   ────────────────────────────────────────────────────────────────────────
   Las dos paginas salen del generador como las otras cinco, pero traen
   material que el molde no tiene donde meter y que seria una tonteria
   perder: sus heros son maquetas dibujadas a mano, el bloque «esto no es un
   chatbot» es la mejor explicacion de producto que hay en la web, y la
   captura del panel de captacion es la unica prueba publicada de un
   producto nuestro funcionando de verdad.

   Vive aqui en crudo, y no dentro de datos-departamentos.cjs, para que el
   fichero de datos se siga leyendo como datos y no como HTML.
   ──────────────────────────────────────────────────────────────────────── */

const heroAtencion = `<header class="hero">
  <div class="hero-fondo"></div>
  <div class="hero-grano"></div>

  <!-- La conversación funcionando alrededor del titular. Es HTML, no una
       captura: no se queda vieja y es literalmente el producto. -->
  <!-- Las laterales enseñan capacidades que el móvil NO está enseñando: el
       seguimiento de pedidos y el momento en que deja de contestar y te lo pasa.
       Si repitieran la conversación del teléfono, sobrarían. -->
  

  <div class="hero-centro">
    <span class="hero-pill"><i></i> Atención al Cliente</span>
    <h1 class="t-h1">Contesta a las once<br>de la noche.<br><span class="acento">Y también los domingos.</span></h1>
    <!-- El móvil con la conversación funcionando, entre el titular y el resto.
         Va ENTERO, sin recortar: colocación pedida por Ismael el 20-08. -->
    <div class="escena" aria-hidden="true">
    <div class="movil">
      <div class="movil-marco">
        <span class="movil-isla"></span>
        <div class="movil-pantalla">
          <div class="chat-cab">
            <span class="chat-avatar">V</span>
            <span class="chat-quien"><b>Tu negocio</b><small>en línea · responde al momento</small></span>
          </div>
          <div class="chat-hilo">
            <div class="msg msg-ent m1">Hola, ¿os queda hueco mañana por la tarde?</div>
            <div class="msg msg-sal msg-esc m2"><i></i><i></i><i></i></div>
            <div class="msg msg-sal m3">Sí — mañana tengo las 17:30 y las 19:00 libres. ¿Cuál te viene mejor?</div>
            <div class="msg msg-ent m4">La de las 19:00</div>
            <div class="msg msg-sal m5">Hecho, reservado ✓<br><span>Te aviso la víspera por si tienes que moverla.</span></div>
            <div class="msg msg-ent m6">¡Gracias!</div>
          </div>
        </div>
      </div>
    </div>

      <!-- El correo, detrás y a un lado: se ven los dos productos a la vez y la
           jerarquía queda clara sin tener que explicarla. -->
      
    </div>

    <p class="t-lead">Un asistente que entiende lo que le escriben, mira tu agenda de verdad y cierra la cita él mismo. En el canal donde tus clientes ya te escriben, no en uno nuevo que tengan que aprender.</p>
    <div class="hero-botones">
      <a class="btn btn-2" href="#agente">Ver qué sabe hacer y qué cuesta</a>
    </div>

    <!-- ─── SOBRE QUÉ ACTÚA ──────────────────────────────────────────────
         Lo que faltaba contar. La conversación del móvil enseña que CONTESTA,
         pero no que además ENTRA en tus sistemas y hace la gestión — que es
         justo la diferencia con un chatbot y lo que justifica el precio.
         ─────────────────────────────────────────────────────────────────── -->
    <div class="herramientas">
      <span class="herramienta">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4"/></svg>
        Tu agenda</span>
      <span class="herramienta">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v12H3zM3 7l9 6 9-6"/></svg>
        Tu correo</span>
      <span class="herramienta">
        <svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>
        Tu ficha de clientes</span>
      <span class="herramienta">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8l1.5-4h15L21 8M3 8h18v12H3zM9 12h6"/></svg>
        Tu tienda</span>
    </div>
    <p class="t-micro" style="margin-top:14px">No solo contesta: entra en tus sistemas y hace la gestión. Eso es lo que un chatbot no hace.</p>

    

  </div>
</header>`;

const noEsBot = `<section class="seccion">
  <div class="envoltura">
    <div class="no-es-bot aparece">
      <h3>Esto no es un chatbot</h3>
      <p>Un chatbot lleva las respuestas escritas de antemano. Le preguntas algo
      que no estaba previsto y te contesta con un menú, un formulario o un
      «no te he entendido». Es el que te ha hecho odiar los chats de las webs.</p>
      <p>Este entiende lo que le escriben, responde con lo que tú le has contado
      de tu negocio y —esto es lo importante— <strong>sabe cuándo callarse y
      pasarte la conversación</strong>. Y si le enchufas la agenda, deja de
      contestar y empieza a hacer: mira los huecos de verdad y cierra la cita él
      mismo.</p>
      <p class="no-es-bot-cierre">Por eso lo llamamos agente y no chatbot. No es
      una etiqueta más bonita: es que hacen cosas distintas.</p>
    </div>

    <!-- ─── EL FLUJO, DIBUJADO ───────────────────────────────────────────
         Va en HTML y no en una imagen a propósito. Es todo texto, y el texto
         de una imagen ni se busca, ni se lee con lector de pantalla, ni se
         traduce, ni se corrige cuando cambia un producto: habría que volver a
         generarla. Aquí se edita una línea.
         Pesa unos 3 KB frente a los 200 de una captura.

         Ojo con lo que dice el paso de la agenda: lleva su marca de «pieza
         aparte» porque NO va en los 49 €. El diagrama tiene que ser tan
         honesto como el precio.
         ─────────────────────────────────────────────────────────────────── -->
    <figure class="flujo aparece">
      <div class="flujo-marco">
        <div class="flujo-lienzo">
          <div class="flujo-ruta">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10"/></svg>
            Agente de atención <span>›</span> Cómo va una conversación
          </div>

          <div class="flujo-disparadores">
            <div class="flujo-nodo flujo-disp">
              <i class="flujo-ico flujo-ico-wa"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 01-9 8.4 8.5 8.5 0 01-3.9-.9L3 20.5l1.5-4.6A8.4 8.4 0 0112 3.1a8.4 8.4 0 019 8.4z"/></svg></i>
              WhatsApp
            </div>
            <div class="flujo-nodo flujo-disp">
              <i class="flujo-ico flujo-ico-tg"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 4L2.5 11.2l5.4 1.9L19 6.5l-8.6 8.2.4 5.3 2.8-3.7 4.6 3.3z"/></svg></i>
              Telegram
            </div>
            <div class="flujo-nodo flujo-disp">
              <i class="flujo-ico flujo-ico-web"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v11H8l-4 4z"/></svg></i>
              El chat de tu web
            </div>
          </div>

          <div class="flujo-horquilla" aria-hidden="true"></div>

          <div class="flujo-paso">
            <i class="flujo-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 100 18 9 9 0 000-18zM9.5 9.5a2.5 2.5 0 015 0c0 1.7-2.5 2-2.5 3.5M12 17h.01"/></svg></i>
            Entiende qué está pidiendo
          </div>
          <div class="flujo-hilo" aria-hidden="true"></div>

          <div class="flujo-paso">
            <i class="flujo-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 016.5 3H20v15H6.5A2.5 2.5 0 004 20.5zM8 8h8M8 12h5"/></svg></i>
            Busca la respuesta en lo que le has contado de tu negocio
          </div>
          <div class="flujo-hilo" aria-hidden="true"></div>

          <div class="flujo-paso">
            <i class="flujo-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4"/></svg></i>
            Mira los huecos reales de tu agenda
          </div>
          <div class="flujo-hilo flujo-hilo-corto" aria-hidden="true"></div>

          <div class="flujo-bifurca">
            <div class="flujo-nodo flujo-fin flujo-fin-ok">
              <i class="flujo-ico flujo-ico-ok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5"/></svg></i>
              Contesta, y cierra la cita
            </div>
            <div class="flujo-nodo flujo-fin flujo-fin-humano">
              <i class="flujo-ico flujo-ico-humano"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.4"/><path d="M5 20a7 7 0 0114 0"/></svg></i>
              O te pasa la conversación a ti
            </div>
          </div>
        </div>
      </div>
      <figcaption>Lo que hace con cada mensaje que entra: entiende, busca, mira tu agenda y cierra — o te lo pasa a ti cuando no le toca.</figcaption>
    </figure>
  </div>
</section>
`;

const heroVentas = `<header class="hero">
  <div class="hero-fondo"></div>
  <div class="hero-grano"></div>

  <!-- Las burbujas cuentan el seguimiento; la lista del centro, la captación.
       Las dos mitades del titular, funcionando a la vez. -->
  <div class="burbujas" aria-hidden="true">
    <span class="burbuja-etiq e1">Un presupuesto abierto · jueves 10:02</span>
    <div class="burbuja burbuja-bot b1">Hola Marta, el lunes te pasamos el presupuesto. Lo que más suele frenar es el pago: se puede hacer en 12 meses. ¿Te lo cuento?<small>Tercer día sin respuesta · escribe él</small></div>
    <div class="burbuja burbuja-cliente b2">Ah, pensaba que era más. ¿Y el plazo?</div>

    <span class="burbuja-etiq e2">Y a ti, a las 10:04</span>
    <div class="burbuja burbuja-bot b3">Marta ha contestado y pregunta por el plazo: está caliente. Luis abrió el presupuesto tres veces y no dice nada, llámale tú.<small>Solo te llegan los que merecen una llamada</small></div>
  </div>

  <div class="hero-centro">
    <span class="hero-pill"><i></i> Ventas y Captación</span>
    <h1 class="t-h1">Encontrar a quien<br>no te conoce.<br><span class="acento">Y no perder a quien ya te preguntó.</span></h1>

    <!-- La lista del lunes: lo que entrega la captación, en HTML y no en captura -->
    <div class="lista" aria-hidden="true">
      <div class="lista-cab"><b>La lista del lunes</b><span>clínicas dentales · Valladolid · 150 rastreadas</span></div>
      <div class="lista-fila f1"><span class="lista-de">Clínica Dental Duero</span><span class="lista-por">Sin reserva online · 4,8 con 212 reseñas · web sin candado</span><span class="nota nota-alta">98 <small>llamar</small></span></div>
      <div class="lista-fila f2"><span class="lista-de">Dental Arlanza</span><span class="lista-por">Solo se pide hora por teléfono · 96 reseñas, la última hace 7 meses</span><span class="nota nota-alta">94 <small>llamar</small></span></div>
      <div class="lista-fila f3"><span class="lista-de">Clínica Pisuerga</span><span class="lista-por">Web de 2016 sin móvil · ficha de Google con horario mal</span><span class="nota nota-alta">91 <small>llamar</small></span></div>
      <div class="lista-fila f4"><span class="lista-de">Sonrisa Esgueva</span><span class="lista-por">Ya tiene reserva online y recordatorios</span><span class="nota nota-media">61 <small>después</small></span></div>
      <div class="lista-fila f5 apagada"><span class="lista-de">Dental Cega</span><span class="lista-por">Cerrada · ficha sin actividad desde 2024</span><span class="nota nota-baja">12 <small>descartar</small></span></div>
      <div class="lista-pie">Nombres inventados. La nota y el motivo, así de concretos, son lo que llega de verdad.</div>
    </div>

    <p class="t-lead">Un sistema que sale a buscar a los que todavía no te conocen y te los deja puntuados, con el motivo y el primer mensaje escrito. Y otro que persigue los presupuestos que mandas y acompaña al que duda. Tú solo hablas con los que merecen la llamada.</p>
    <div class="hero-botones">
      <a class="btn btn-2" href="#captacion">Ver qué hace y qué cuesta</a>
    </div>
    <!-- Los tres productos de la página, para moverse entre ellos sin bajar a ciegas -->
    <nav class="hero-productos" aria-label="Los tres productos de este departamento">
      <a class="hero-producto" href="#captacion">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/></svg>
        <span><b>La captación</b><small>Encontrar a quien no te conoce</small></span>
      </a>
      <a class="hero-producto" href="#seguimiento">
        <svg viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 01-9 8.4 8.5 8.5 0 01-3.9-.9L3 20.5l1.5-4.6A8.4 8.4 0 0112 3.1a8.4 8.4 0 019 8.4z"/></svg>
        <span><b>El seguimiento</b><small>No perder a quien ya preguntó</small></span>
      </a>
      <a class="hero-producto" href="#competencia">
        <svg viewBox="0 0 24 24"><path d="M12 12L19 5"/><path d="M12 21a9 9 0 110-18"/><path d="M12 17a5 5 0 110-10"/><circle cx="12" cy="12" r="1.2"/></svg>
        <span><b>El analista de competencia</b><small>Saber qué hace tu competencia</small></span>
      </a>
    </nav>
    <p class="t-micro" style="margin-top:18px">Cada precio con su límite al lado. Sin permanencia.</p>
  </div>
</header>`;

const capturaVentas = `<section class="seccion seccion-cream">
  <div class="envoltura">
      <div class="captura-intro">
        <span class="t-eyebrow">Un resultado en producción</span>
        <h3 class="t-h3">Esta es nuestra sección de captación,<br>tal y como la usamos cada semana.</h3>
        <p class="t-body">Es el panel con el que nos buscamos los clientes nosotros. Lo que ves abajo es una captura real de un lunes, con lo que hace el sistema por cada negocio que rastrea:</p>
        <ul class="captura-lista">
          <li><b>Filtra por ciudad</b> y separa los negocios <b>contactables por correo</b> de los que hay que buscar por otra vía.</li>
          <li><b>Pone nota a cada uno</b> y escribe el motivo: por qué ese negocio y no otro.</li>
          <li><b>Detecta los dolores</b> del negocio y propone el <b>ángulo de venta</b>: por dónde entrarle.</li>
          <li><b>Redacta el primer correo</b>, editable, con ese motivo dentro y en tu tono.</li>
          <li><b>Deja el botón de enviar listo.</b> Lo pulsa una persona, no el sistema.</li>
        </ul>
      </div>
      <figure class="captura">
        <img src="/assets/img/crm-captacion.jpg" alt="La bandeja de captación de nuestro panel: a la izquierda la cola de negocios con su nota, en el centro el motivo de la nota y los problemas detectados, a la derecha el correo ya redactado con el botón de enviar" width="1800" height="1589" loading="lazy">
        <figcaption><strong>De 265 negocios rastreados, 98 tienen un correo al que escribir.</strong> Eso también se dice, antes de empezar. Los nombres, correos y webs de la captura son ficticios; el resto es tal cual.</figcaption>
      </figure>
  </div>
</section>

`;

const competenciaVentas = `<section class="seccion" id="competencia">
  <div class="envoltura">
    <div class="envoltura-txt centrado" style="padding:0">
      <span class="t-eyebrow">El analista de competencia</span>
      <h2 class="t-h2" style="margin:14px 0 16px">Mirar también<br><span class="acento">a la competencia.</span></h2>
      <p class="t-lead">Lo que tu competencia hace en público dice mucho de lo que te conviene hacer a ti. El mismo rastreador que busca clientes sabe mirarla, analiza lo que ve y te cuenta solo lo que ha cambiado desde la última vez.</p>
    </div>

    <div class="capacidades aparece">
      <div class="cap cap-base">
        <span class="cap-etiq">Se monta sobre lo que quieras vigilar</span>
        <h3>Analista de competencia</h3>
        <p>Le dices a quién mirar y qué te importa de ellos. Cada semana rastrea sus webs, sus fichas de Google y sus redes, compara con la semana anterior y te manda <strong>un resumen corto de lo que ha cambiado</strong>, no una tabla que tengas que leer entera. Lo que no cambia, no te lo cuenta.</p>
        <div class="ejemplo"><b>Ejemplo del informe del lunes</b><q>Dos de tus cinco competidores han bajado la primera visita a 39 €. Uno ha empezado a ofrecer financiación en 12 meses. Al de la calle Mayor le han entrado 14 reseñas malas por esperas: es tu argumento. Y sus vídeos de antes y después consiguen cuatro veces más que sus fotos de producto.</q></div>
        <div class="cap-limite">se acota en la llamada: a quién se vigila, qué fuentes y cada cuánto · solo fuentes públicas · nunca zonas con contraseña</div>
        <div class="cap-aviso">Está construido para un cliente y funciona. Como cada analista se monta sobre competidores y fuentes distintas, <strong>el precio y el límite se cierran en la llamada, antes de empezar</strong>, con la misma regla que todo lo demás: sin límite escrito, no hay precio.</div>
        <div class="cap-precio cap-precio-base">Se presupuesta <span>· cuota mensual + instalación, como el resto</span></div>
      </div>

      <div class="cap">
        <div class="cap-ico"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3.5"/><path d="M17 7h.01"/></svg></div>
        <h3>Qué les funciona en redes</h3>
        <p>Qué publican, con qué frecuencia y qué formatos y temas les traen más respuesta. Para copiar lo que funciona y no perder tiempo en lo que no.</p>
        <div class="ejemplo"><b>Ejemplo</b><q>Los vídeos cortos de antes y después de X consiguen cuatro veces más comentarios que sus fotos de producto. Publican martes y jueves. Y llevan tres semanas sin publicar: hueco para ti.</q></div>
      </div>

      <div class="cap">
        <div class="cap-ico"><svg viewBox="0 0 24 24"><path d="M12 2v20M17 6.5c0-1.9-2.2-3-5-3s-5 1.1-5 3 2.2 3 5 3 5 1.1 5 3-2.2 3-5 3-5-1.1-5-3"/></svg></div>
        <h3>Sus precios y sus ofertas</h3>
        <p>Primera visita, promociones, financiación, packs. Cuándo suben, cuándo bajan y qué regalan. Para decidir el tuyo con datos y a tiempo, no cuando ya te lo cuenta un cliente.</p>
        <div class="ejemplo"><b>Ejemplo</b><q>Tres de tus cinco competidores han bajado la primera visita a 39 €. Tú sigues en 60. Uno ha añadido «revisión gratis el primer año».</q></div>
      </div>

      <div class="cap">
        <div class="cap-ico"><svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17l-6.1 3.5 1.5-6.8L2.2 9l6.9-.7z"/></svg></div>
        <h3>Qué dicen sus clientes</h3>
        <p>De qué se quejan y qué elogian en las reseñas de la competencia. Lo que a ellos les falla es tu argumento; lo que a ellos les alaban es lo que tú tienes que igualar.</p>
        <div class="ejemplo"><b>Ejemplo</b><q>A X le han entrado 14 reseñas malas este mes por esperas de más de media hora. A Y le alaban que contesta el WhatsApp al momento.</q></div>
      </div>

      <div class="cap">
        <div class="cap-ico"><svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5"/></svg></div>
        <h3>Quién se mueve en tu zona</h3>
        <p>Aperturas, cierres, servicios nuevos, cambios de horario y ofertas de empleo: la señal de quién crece y quién se apaga en tu mismo sector y tu misma ciudad.</p>
        <div class="ejemplo"><b>Ejemplo</b><q>Ha abierto una clínica nueva a 400 metros y busca dos higienistas. X ha quitado la ortodoncia invisible de su web. Y ha ampliado horario a los sábados.</q></div>
      </div>

      <div class="cap">
        <div class="cap-ico"><svg viewBox="0 0 24 24"><path d="M3 17l5-5 4 3 8-8"/><path d="M15 7h5v5"/></svg></div>
        <h3>Los mismos productos en otras tiendas</h3>
        <p>Para quien vende producto: seguir el precio de los mismos artículos en las tiendas que le digas y avisar cuando alguien se mueve, para que mover el tuyo sea decisión tuya y a tiempo.</p>
        <div class="ejemplo"><b>Ejemplo</b><q>El modelo X ha bajado un 8 % en dos tiendas desde el martes. Tú sigues 12 € por encima de la más barata. En el resto del catálogo no hay cambios.</q></div>
      </div>
    </div>
  </div>
</section>
`;

module.exports = { heroAtencion, noEsBot, heroVentas, capturaVentas, competenciaVentas };
