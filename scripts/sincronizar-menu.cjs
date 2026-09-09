/* Vuelca el menú del generador en las dos páginas escritas a mano.
   ─────────────────────────────────────────────────────────────────────────
   Atención y Ventas no salen de generar-paginas.cjs porque sus heros son
   maquetas hechas a mano. El menú, en cambio, tiene que ser el mismo en las
   veintiuna páginas, y hasta hoy se quedaba atrás cada vez que cambiaba: el
   09-09 se le quitaron las dos vías por departamento y estas dos siguieron
   enseñándolas.

   Cada vez que se toque nav() en generar-paginas.cjs, se corre esto detrás.
   Las anclas de cada página son suyas y se conservan.
   ───────────────────────────────────────────────────────────────────────── */
const fs = require('fs');
const path = require('path');
const { nav } = require(path.join(__dirname, 'generar-paginas.cjs'));

const RAIZ = path.join(__dirname, '..');

const ANCLAS = {
  // La home no lleva anclas en el menú: a sus apartados se llega por «Sobre nosotros»
  'index.html': [],
  'atencion-al-cliente.html': [['#agente', 'El agente'], ['#correo', 'Por correo'],
                               ['#preguntas', 'Preguntas']],
  'ventas-y-captacion.html': [['#captacion', 'La captación'], ['#seguimiento', 'El seguimiento'],
                              ['#competencia', 'Analista de competencia'], ['#preguntas', 'Preguntas']],
};

for (const [f, anclas] of Object.entries(ANCLAS)) {
  const ruta = path.join(RAIZ, f);
  const s = fs.readFileSync(ruta, 'utf8');
  const i = s.indexOf('<nav class="nav">');
  const j = s.indexOf('<div class="nav-movil"', i);
  if (i < 0 || j < 0) { console.log(`  ${f} >>> no encuentro el menú`); continue; }

  // el panel móvil acaba donde se cierra su propio div de nivel superior
  const re = /<div\b|<\/div>/g;
  re.lastIndex = j;
  let prof = 0, fin = -1, m;
  while ((m = re.exec(s))) {
    prof += m[0] === '</div>' ? -1 : 1;
    if (prof === 0) { fin = m.index + 6; break; }
  }
  if (fin < 0) { console.log(`  ${f} >>> el panel móvil no cierra`); continue; }

  fs.writeFileSync(ruta, s.slice(0, i) + nav(anclas) + s.slice(fin), 'utf8');
  console.log(`  ${f.padEnd(28)} menú sincronizado`);
}
