# BRIEF — Landings de Bookia por sector (opción C)

> Tarea para una sesión dedicada a la WEB. Mientras, el equipo trabaja en el CRM y el scraper.
> Objetivo: que Bookia deje de venderse solo como "software para barberías" y tenga una
> landing propia por cada sector de citas, cada una con su copy e identidad.

---

## Contexto y problema

`bookia.html` (live en https://www.marirrodriga-ia.com/bookia) está construida **al 100% como
landing de barbería**: no es solo el título — el hero, los 3 planes ("para barberías…"), los
ejemplos ("un corte acaba a las 10:20"), el mock de WhatsApp ("asistente de la barbería") y hasta
la **identidad visual** (barber-pole giratorio como firma, colores "latón de oficio") son de barbería.

Esto **excluye** a peluquerías, centros de estética, uñas, fisios, etc. — que leen "barbería" y
piensan "esto no es para mí". Pero Bookia sirve para **cualquier negocio de citas**.

**Decisión de Ismael: opción C — una landing por sector** (la específica convierte mejor que una
genérica; el copy concreto es su fuerza). NO hacer una landing genérica descafeinada.

---

## La tarea

Clonar `bookia.html` en una landing por cada sector, adaptando copy, ejemplos e identidad visual,
manteniendo la estructura y la oferta. Añadir un selector de sector para que cada quién llegue a la suya.

### Sectores (prioridad)
1. **Barbería** — ya existe (`bookia.html`), dejar como está o moverla a `bookia-barberia.html`.
2. **Peluquería** — nuevo.
3. **Centro de estética** — nuevo.
4. (siguientes, si da tiempo) Uñas, fisioterapia, tatuajes, podología.

### Estructura de archivos (Vercel, cleanUrls activo)
- Web estática pura. `cleanUrls: true` → `bookia-peluqueria.html` se sirve como `/bookia-peluqueria`.
- Opción recomendada: `bookia-barberia.html`, `bookia-peluqueria.html`, `bookia-estetica.html`.
- Mantener `/bookia` como **selector/hub**: pequeña página que pregunta el sector y enlaza a cada landing
  (o redirige el más común). Alternativa rápida: dejar `/bookia` → barbería y enlazar las otras desde la home.

### Qué ADAPTAR por sector (checklist por archivo)
- [ ] `<title>`, meta description, og:description → nombrar el sector.
- [ ] Hero: eyebrow ("💈 Software de citas con IA para barberías"), titular y CTA ("Quiero verlo con mi barbería").
- [ ] Ejemplos concretos: "un corte acaba a las 10:20" → el servicio típico del sector (peluquería: "un tinte…", estética: "una limpieza facial…").
- [ ] Mock de WhatsApp: nombre del asistente ("Barbería · Asistente"), servicios mencionados.
- [ ] Los 3 planes: subtítulos "para barberías pequeñas / que crecen / con varios sillones" → sillón/cabina/box según sector.
- [ ] Identidad visual: el barber-pole y los colores "latón de oficio" son de barbería. Para peluquería/estética,
      cambiar el motivo-firma y la paleta (peluquería: tonos cálidos/rosados; estética: verdes/nude). Mantener la calidad.
- [ ] Imágenes en `bookia-img/` (agenda, dashboard, reserva-movil): valen para todos, pero el alt text menciona "barberos" → generalizar.
- [ ] Enlaces WhatsApp (`wa.me/34675148566?text=...`): el texto pre-rellenado dice "mi barbería" → sector.

### Qué MANTENER (no tocar)
- Estructura, secciones y el buen copy de venta (solo cambiar las palabras de sector).
- Oferta y precios: **Esencial 49€ · Profesional 79€ · Negocio 149€**, sin alta, sin permanencia,
  garantía 60 días. (Fuente de verdad = tabla `catalogo_planes` en Supabase, producto `bookia`.)
- Sección anti-Booksy ("tu agenda es tuya, no de Booksy"): aplica a todos los sectores.

### Selector de sector (nuevo)
- En la home (`index.html`), donde se enlaza Bookia, ofrecer los sectores (barbería / peluquería / estética…).
- O una mini-página `/bookia` tipo hub: "¿Qué tipo de negocio tienes?" con tarjetas a cada landing.

---

## Detalles técnicos

- **Repo**: `github.com/marirrodriga-sl/marirrodriga-web` (ya en la organización).
- **Deploy**: Vercel conectado a GitHub → **push a `main` despliega solo**. `vercel.json` con cleanUrls + headers de seguridad.
- **Verificar tras deploy**: abrir cada `/bookia-<sector>` y comprobar copy, imágenes, enlaces WhatsApp y responsive.
- **Marca**: logo oficial y dominio www.marirrodriga-ia.com (nunca vercel.app de cara a cliente).

## Fuente de datos (catálogo)
Precios, planes, dolores y ángulos de venta por producto están en Supabase (proyecto agencia
`dcaubdylorpixswnivqk`), tablas `catalogo_productos / planes / necesidades / objeciones`,
producto `bookia`. Útil para redactar el copy de cada sector con sus dolores concretos.
