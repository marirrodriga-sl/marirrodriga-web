/* Recorre las 360 combinaciones posibles del test y comprueba que ninguna
   produce una propuesta indefendible. Uso: node scripts/verificar-hero.mjs */
import { createRequire } from 'node:module';
import vm from 'node:vm';
import fs from 'node:fs';

const require = createRequire(import.meta.url);
const cat = require('../assets/catalogo.js');

// hero.js no es un módulo: se evalúa con el catálogo ya en su ámbito, como en la web
const ctx = vm.createContext({ ...cat, module: { exports: {} }, console });
vm.runInContext(fs.readFileSync(new URL('../assets/hero.js', import.meta.url), 'utf8'), ctx);
const { TEST, recomienda, veredicto, desbloquea } = ctx.module.exports;

const opciones = id => TEST.find(q => q.id === id).opciones.map(o => o.v);
let combinaciones = 0, fallos = 0;
const problema = (msg, r) => { console.log(` FALLA ${msg} — ${JSON.stringify(r)}`); fallos++; };

for (const sector of opciones('sector'))
  for (const dolor of opciones('dolor'))
    for (const frecuencia of opciones('frecuencia'))
      for (const tiene of opciones('tiene')) {
        const r = { sector, dolor, frecuencia, tiene };
        combinaciones++;
        const { base, slugs } = recomienda(r);

        if (sector === 'otro') {
          if (base !== null || slugs.length) problema('"otra cosa" no debe cotizar', r);
          continue;
        }

        if (!slugs.length) { problema('propuesta vacía', r); continue; }

        const q = cat.cotiza(slugs);
        if (q.cuota < cat.CATALOGO.suelo) problema(`cuota ${q.cuota} por debajo del suelo`, r);
        if (q.piezas.some(p => !p.limite)) problema('pieza sin límite', r);
        if (new Set(slugs).size !== slugs.length) problema('pieza repetida', r);

        const v = veredicto(r, base, slugs);
        if (!v.length) problema('sin veredicto honesto', r);

        // El veredicto no puede contradecir a la propuesta
        const nombres = q.piezas.map(p => p.nombre.toLowerCase()).join(' ');
        const dice = v.join(' ').toLowerCase();
        if (dice.includes('no te montamos la nuestra') && nombres.includes('agenda'))
          problema('el veredicto niega una pieza que sí propone', r);
        if (dice.includes('no te vendemos otra') && nombres.includes('landing'))
          problema('dice que no vende web y propone una landing', r);
        if (tiene === 'web' && slugs.some(s => s.includes('landing')))
          problema('propone landing a quien ya tiene web', r);

        // Lo que desbloquea no puede incluir lo que ya lleva
        const d = desbloquea(r, base, slugs);
        if (d.some(p => slugs.includes(p.slug))) problema('ofrece como futuro algo que ya lleva', r);
      }

console.log(`\n${combinaciones} combinaciones probadas`);
console.log(fallos ? `${fallos} FALLOS` : 'Ninguna combinación produce una propuesta indefendible.');
process.exit(fallos ? 1 : 0);
