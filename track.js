/* Tilde · registro de visitas y clics en Google Sheets.
   Pegá entre las comillas la URL de tu Apps Script (termina en /exec). */
var TRACK_URL = 'https://script.google.com/macros/s/AKfycbxVIEPS_sSrlCA7ykj-gwawHdgAPJ_ys1D9sZ26nwYuOLMRFKD2uDwLdkoXHUILGHuE/exec';

(function () {
  if (!TRACK_URL) return;

  var sesion = Math.random().toString(36).slice(2, 10);
  var params = new URLSearchParams(location.search);
  var origen = params.get('src') || params.get('utm_source') || 'directo';
  var dispositivo = window.innerWidth <= 760 ? 'celular' : 'computadora';

  function enviar(tipo, texto, seccion) {
    var datos = JSON.stringify({
      tipo: tipo,
      texto: (texto || '').replace(/\s+/g, ' ').trim().slice(0, 80),
      seccion: seccion || '',
      origen: origen,
      dispositivo: dispositivo,
      sesion: sesion,
      pagina: location.pathname,
      referencia: document.referrer || ''
    });
    try {
      fetch(TRACK_URL, {
        method: 'POST',
        mode: 'no-cors',
        keepalive: true,
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: datos
      }).catch(function () {});
    } catch (e) {}
  }

  enviar('visita', document.title, 'inicio');

  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('a, button') : null;
    if (!el) return;
    var texto = el.getAttribute('data-track') || el.getAttribute('aria-label') || el.textContent;
    var sec = el.closest('section');
    var href = el.tagName === 'A' ? (el.getAttribute('href') || '') : '';
    var tipo = href.indexOf('5493514076087') >= 0 || href.indexOf('mailto:') === 0 ? 'contacto'
      : (/wa\.me/.test(href) ? 'whatsapp-demo' : 'clic');
    enviar(tipo, texto, sec ? sec.id : '');
  }, true);
})();
