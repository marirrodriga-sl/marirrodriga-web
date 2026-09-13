# marirrodriga-ia.com

La web de Marirrodriga I.A. HTML estático servido por Vercel desde `main`: cada
push a `main` despliega.

**Repositorio público a propósito.** Nada de lo que hay aquí es secreto, pero
tenlo presente antes de escribir un comentario: los ficheros de datos llevan
dentro el razonamiento comercial de cada precio.

---

## La regla que más duele romper

> **Los HTML no se editan a mano.** Casi todos se generan. Si tocas
> `finanzas.html` directamente, el siguiente `node scripts/generar-*.cjs` se lo
> lleva por delante y no queda rastro.

Cada página generada lo avisa en sus primeras líneas, con el fichero de datos
del que sale.

---

## Cómo está montado

Tres generadores, cada uno con su fichero de datos al lado:

| Generador | Qué escribe | Textos y precios en |
|---|---|---|
| `scripts/generar-departamentos.cjs` | Las **7 landings de departamento** | `scripts/datos-departamentos.cjs` |
| `scripts/generar-paginas.cjs` | `bookia.html` y `dentia.html` | `scripts/datos-soluciones.cjs` |
| `scripts/sincronizar-menu.cjs` | Solo el **menú** de `index.html` | — (lo copia del generador) |

`index.html` y `asesoria.html` se escriben a mano; de ellas solo el menú sale
del generador, y por eso existe el tercer script. **Si tocas el menú, córrelo
después** o la home se queda con el de antes.

Los precios no están escritos a mano en ningún sitio: los calcula
`scripts/soluciones.cjs` con el motor de `scripts/datos-catalogo.json`
(bonificación por volumen, suelo de 49 €, altas fijadas). `assets/catalogo.js`
es la copia que usa el navegador.

### El orden para regenerar todo

```bash
node scripts/generar-paginas.cjs
node scripts/generar-departamentos.cjs
node scripts/sincronizar-menu.cjs
```

### Antes de publicar

```bash
node scripts/verificar-catalogo.mjs   # precios contra el catálogo
node scripts/verificar-ventas.mjs     # precios escritos en las 7 landings
```

Los dos tienen que decir **«Todo cuadra»**. El primero además compara una huella
del catálogo: si salta, es que alguien movió un precio sin querer.

⚠️ `scripts/verificar-hero.mjs` está roto de antes (`document is not defined`).
No lo cuentes como comprobación.

### Ver la web en local

Cualquier servidor estático sobre la raíz del repo. Ojo: en producción las
direcciones van **sin `.html`** (`cleanUrls` de Vercel), así que en local hay
que escribirlo o usar un servidor que lo resuelva.

---

## Dónde está cada cosa

```
assets/          CSS y JS. base.css manda: tokens, menú, botones, pie
  base.css         lo común a todo
  global.css       solo la home
  atencion.css     el molde de las landings de departamento
  solucion.css     el molde de bookia y dentia
  origen.js        marca de qué página sale cada botón de demo
scripts/         generadores, datos y verificadores (no se despliega)
docs/            notas internas — NO versionado, NO desplegado
```

`docs/ESTADO.md` es el documento vivo del proyecto: qué hay hecho, qué se
decidió y qué falta. **Para retomar el trabajo se entra por ahí.**

---

## Fuera del repositorio

Dos cosas que la web usa y que no se tocan desde aquí:

- **Cal.com** — el evento de la demo (`/marirrodriga-ia/llamada`): título,
  campos del formulario, aviso mínimo y sitio de la reunión. Se cambia por su
  API con la clave del `.env` de la agencia.
- **Google Search Console** — propiedad de dominio verificada por DNS. El
  sitemap se envía ahí a mano cuando cambian las páginas.
