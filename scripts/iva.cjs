/* El IVA, en un solo sitio.

   Decisión de Ismael del 15-10-2026: en la web y en toda comunicación comercial,
   el precio que manda sigue siendo el de SIN IVA —es el que compara el cliente y
   el que la mayoría se deduce— pero debajo va siempre, en pequeño, lo que ese
   precio suma de IVA. No es letra pequeña legal: es para que se vea qué parte
   del total se va en impuesto.

   Existe este fichero porque los precios se pintan en cinco plantillas distintas
   (las 7 landings de departamento, Bookia, Dentia, las landings de anuncios y la
   portada) y un tipo copiado cinco veces es un tipo que algún día estará mal en
   cuatro. Si el IVA cambia, se cambia aquí.

   ⚠️ 21 % es el tipo general. Todo lo que vendemos tributa al general: software,
   desarrollo y servicios. Si algún día se vende algo a tipo reducido, NO se
   cambia esta constante — se le pasa el tipo a la función. */

const TIPO_IVA = 0.21;

/** Lo que suma de IVA un importe, redondeado al céntimo (el medio céntimo, al alza).

   Se calcula en enteros: céntimos de la base × puntos básicos del tipo (21 % =
   2.100), y se redondea una sola vez al final. Antes se hacía `base * 0.21 * 100`
   en coma flotante, y 76,50 × 0,21 salía 16,064999… → 16,06 € en vez de 16,07 €
   (el medio céntimo exacto se quedaba abajo). Comprobado el 19-10-2026 con
   76,50→16,07 · 144,50→30,35 · 620,50→130,31 · 64→13,44 · 193,60→40,66. */
function importeIva(base, tipo = TIPO_IVA) {
  const centimos = Math.round(base * 100);
  const bp = Math.round(tipo * 10000);
  return Math.round(centimos * bp / 10000) / 100;
}

/* Un importe en euros a la española: 1.234,56 · y sin decimales si es entero.

   Se formatea a mano y NO con toLocaleString('es-ES') por lo mismo que ya
   avisa generar-departamentos.cjs: el Node de esta máquina lleva un ICU a
   medias. Pone bien la coma decimal pero se come el punto de los miles, así
   que 1234.5 salía como «1234,50». Comprobado el 15-10-2026. */
function euros(n) {
  const neg = n < 0;
  const v = Math.abs(n);
  const ent = Math.trunc(v);
  const dec = Math.round((v - ent) * 100);
  const miles = String(ent).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return (neg ? '−' : '') + miles + (dec ? ',' + String(dec).padStart(2, '0') : '');
}

/**
 * La línea de IVA, ya escrita. `corto` para las celdas de tabla, donde no cabe
 * «de IVA» entero y la cabecera de la columna ya dice que el precio va sin él.
 */
function lineaIva(base, { corto = false, clase = 'iva', tipo = TIPO_IVA } = {}) {
  if (!base) return '';
  const v = euros(importeIva(base, tipo));
  return `<em class="${clase}">+ ${v} €${corto ? ' IVA' : ' de IVA'}</em>`;
}

module.exports = { TIPO_IVA, importeIva, euros, lineaIva };
