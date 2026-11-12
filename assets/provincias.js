/* Buscador de provincia para los formularios del diagnóstico (12-11-2026).

   En el HTML va un <select name="provincia"> con las 52 provincias: si este
   script no carga, el formulario sigue funcionando con él. Si carga, lo
   cambia por un campo de texto que filtra mientras escribes (sin tildes ni
   mayúsculas, y con los otros nombres: Vizcaya, Lérida, Orense…).

   El valor que viaja es SIEMPRE el nombre de la lista, tal cual: el flujo de
   n8n lo compara con las nueve de Castilla y León para saber si encaja. Si
   lo escrito no es una provincia, el campo se queda vacío y el formulario
   pide «dónde está la empresa». */
(function () {
  var OTROS = {
    'Álava': 'Araba', 'Alicante': 'Alacant', 'Baleares': 'Illes Balears Islas Baleares Mallorca',
    'Castellón': 'Castelló', 'A Coruña': 'La Coruña Coruña', 'Girona': 'Gerona', 'Gipuzkoa': 'Guipúzcoa',
    'Lleida': 'Lérida', 'Ourense': 'Orense', 'Las Palmas': 'Gran Canaria Canarias',
    'Santa Cruz de Tenerife': 'Tenerife Canarias', 'Bizkaia': 'Vizcaya Bilbao', 'Valencia': 'València',
    'Navarra': 'Nafarroa', 'Asturias': 'Oviedo', 'Cantabria': 'Santander', 'La Rioja': 'Logroño',
    'Murcia': 'Región de Murcia'
  };
  var norm = function (s) {
    return (s || '').toString().normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  };

  document.querySelectorAll('select[name="provincia"]').forEach(function (sel, n) {
    var lista = Array.prototype.slice.call(sel.options).filter(function (o) { return o.value; })
      .map(function (o) { return o.value; });
    var claves = lista.map(function (p) { return norm(p + ' ' + (OTROS[p] || '')); });
    var id = 'as-prov-lista-' + n;

    var caja = document.createElement('div');
    caja.className = 'as-prov';
    caja.innerHTML =
      '<input type="text" class="as-prov-input" role="combobox" aria-autocomplete="list" aria-expanded="false"' +
      ' aria-controls="' + id + '" autocomplete="off" spellcheck="false" placeholder="Escribe para buscar: Palencia, Madrid…"' +
      ' aria-label="Provincia de la empresa">' +
      '<input type="hidden" name="provincia" value="">' +
      '<ul class="as-prov-lista" id="' + id + '" role="listbox" hidden></ul>';
    sel.parentNode.replaceChild(caja, sel);

    var input = caja.querySelector('.as-prov-input');
    var oculto = caja.querySelector('input[type="hidden"]');
    var ul = caja.querySelector('ul');
    var vistas = [], activa = -1;

    function pintar() {
      var q = norm(input.value);
      var empiezan = [], contienen = [];
      lista.forEach(function (p, i) {
        if (!q) { empiezan.push(p); return; }
        if (norm(p).indexOf(q) === 0) empiezan.push(p);
        else if (claves[i].indexOf(q) !== -1) contienen.push(p);
      });
      vistas = empiezan.concat(contienen);
      activa = vistas.length ? 0 : -1;
      ul.innerHTML = vistas.length
        ? vistas.map(function (p, i) {
            return '<li role="option" id="' + id + '-' + i + '" data-v="' + p + '"' + (i === activa ? ' aria-selected="true"' : '') + '>' + p + '</li>';
          }).join('')
        : '<li class="as-prov-nada">No hay ninguna provincia con ese nombre</li>';
      abrir(true);
      marcar();
    }
    function abrir(si) {
      ul.hidden = !si;
      input.setAttribute('aria-expanded', si ? 'true' : 'false');
      if (!si) input.removeAttribute('aria-activedescendant');
    }
    function marcar() {
      Array.prototype.forEach.call(ul.querySelectorAll('[role="option"]'), function (li, i) {
        if (i === activa) { li.setAttribute('aria-selected', 'true'); li.scrollIntoView({ block: 'nearest' }); }
        else li.removeAttribute('aria-selected');
      });
      if (activa >= 0) input.setAttribute('aria-activedescendant', id + '-' + activa);
    }
    function elegir(p) {
      input.value = p; oculto.value = p;
      caja.classList.add('elegida');
      abrir(false);
    }
    // Lo escrito vale solo si es exactamente una provincia (sin tildes ni mayúsculas).
    function fijar() {
      var q = norm(input.value);
      var exacta = lista.filter(function (p) { return norm(p) === q; })[0];
      if (exacta) { elegir(exacta); return; }
      oculto.value = '';
      caja.classList.remove('elegida');
    }

    input.addEventListener('input', function () { oculto.value = ''; caja.classList.remove('elegida'); pintar(); });
    input.addEventListener('focus', pintar);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (ul.hidden) { pintar(); return; }
        if (!vistas.length) return;
        activa = (activa + (e.key === 'ArrowDown' ? 1 : -1) + vistas.length) % vistas.length;
        marcar();
      } else if (e.key === 'Enter') {
        if (!ul.hidden && activa >= 0) { e.preventDefault(); elegir(vistas[activa]); }
      } else if (e.key === 'Escape') {
        abrir(false);
      } else if (e.key === 'Tab') {
        if (!ul.hidden && activa >= 0 && input.value) elegir(vistas[activa]);
      }
    });
    // mousedown y no click: el click llega después del blur y la lista ya se ha cerrado.
    ul.addEventListener('mousedown', function (e) {
      var li = e.target.closest('[role="option"]');
      if (li) { e.preventDefault(); elegir(li.getAttribute('data-v')); }
    });
    input.addEventListener('blur', function () { abrir(false); fijar(); });
  });
})();
