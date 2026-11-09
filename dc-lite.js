// dc-lite: viser vidensbankens design-skabelon som en almindelig webside.
// Skabelonen bruger {{ huller }}, <template data-if> og <template data-for> (omskrevet fra sc-if og sc-for ved bygningen)
// og onClick, onInput og onChange, der peger på funktioner fra Component.renderVals().
(function () {
  var HOLE = /\{\{\s*([\w.$]+)\s*\}\}/g;
  var ONLY = /^\s*\{\{\s*([\w.$]+)\s*\}\}\s*$/;
  // Elementer med data-keep genbruges, når siden tegnes igen, så fx baggrundsvideoen ikke starter forfra
  var KEPT = {};

  function get(scope, path) {
    if (path === 'true') return true;
    if (path === 'false') return false;
    return path.split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, scope);
  }
  function truthy(v) { return Array.isArray(v) ? v.length > 0 : !!v && v !== 'false'; }
  function str(v) { return v == null ? '' : String(v); }
  function fill(text, scope) { return text.replace(HOLE, function (_, p) { return str(get(scope, p)); }); }
  function lookup(expr, scope) { var m = expr.match(ONLY); return m ? get(scope, m[1]) : expr; }

  function renderNodes(nodes, scope, out) {
    for (var i = 0; i < nodes.length; i++) renderNode(nodes[i], scope, out);
  }
  function renderNode(n, scope, out) {
    if (n.nodeType === 3) { out.appendChild(document.createTextNode(fill(n.nodeValue, scope))); return; }
    if (n.nodeType !== 1) return;
    if (n.tagName === 'TEMPLATE' && n.hasAttribute('data-if')) {
      if (truthy(lookup(n.getAttribute('data-if'), scope))) renderNodes(n.content.childNodes, scope, out);
      return;
    }
    if (n.tagName === 'TEMPLATE' && n.hasAttribute('data-for')) {
      var list = lookup(n.getAttribute('data-for'), scope) || [];
      var as = n.getAttribute('data-as');
      for (var i = 0; i < list.length; i++) {
        var inner = Object.create(scope);
        inner[as] = list[i];
        inner.$index = i;
        renderNodes(n.content.childNodes, inner, out);
      }
      return;
    }
    var dk = n.getAttribute('data-keep');
    if (dk && KEPT[dk]) { out.appendChild(KEPT[dk]); return; }
    // Samme navnerum som i skabelonen, så svg-ikoner bliver tegnet
    var el = document.createElementNS(n.namespaceURI, n.localName);
    var textValue = null;
    for (var j = 0; j < n.attributes.length; j++) {
      var a = n.attributes[j];
      if (a.name.indexOf('hint-') === 0) continue;
      if (/^on[a-z]+$/.test(a.name)) {
        var fn = lookup(a.value, scope);
        if (typeof fn === 'function') el.addEventListener(a.name.slice(2), (function (f) { return function (e) { f(e); }; })(fn));
        continue;
      }
      var val = fill(a.value, scope);
      if (a.name === 'value' && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT')) { textValue = val; continue; }
      el.setAttribute(a.name, val);
    }
    if (el.tagName === 'A' && el.getAttribute('href') === '#') el.addEventListener('click', function (e) { e.preventDefault(); });
    renderNodes(n.childNodes, scope, el);
    if (textValue !== null) { el.value = textValue; if (el.tagName === 'INPUT') el.setAttribute('value', textValue); }
    out.appendChild(el);
  }

  window.DCLogic = function (props) { this.props = props || {}; this.state = {}; };
  window.DCLogic.prototype.setState = function (patch) {
    for (var k in patch) this.state[k] = patch[k];
    if (this.__render) this.__render();
  };

  window.dcMount = function (root, tplHtml, Component, props) {
    var tpl = document.createElement('template');
    tpl.innerHTML = tplHtml;
    var c = new Component(props || {});
    var lastKey = '';
    var queued = false;
    function render() {
      // Bevar fokus, markering og afkrydsninger, når siden tegnes igen. Valg i rullemenuer kommer fra tilstanden (value).
      var act = document.activeElement;
      var id = act && act.id && root.contains(act) ? act.id : '';
      // Knapper uden id (fx filtrene) har en data-key, så fokus bliver på samme knap, når man bruger tastaturet
      // Kun ved tastatur, så et museklik ikke efterlader en fokusramme
      var kbd = false; try { kbd = act && act.matches && act.matches(':focus-visible'); } catch (e) {}
      var dkey = !id && kbd && root.contains(act) && act.getAttribute ? act.getAttribute('data-key') : null;
      var sel = id && typeof act.selectionStart === 'number' ? [act.selectionStart, act.selectionEnd] : null;
      var keep = {};
      Array.prototype.forEach.call(root.querySelectorAll('input[id]'), function (x) {
        if (x.type === 'checkbox') keep[x.id] = { checked: x.checked };
      });
      var scrollers = Array.prototype.map.call(root.querySelectorAll('[data-scroll]'), function (x) { return x.scrollLeft; });
      KEPT = {};
      Array.prototype.forEach.call(root.querySelectorAll('[data-keep]'), function (x) { KEPT[x.getAttribute('data-keep')] = x; });
      var frag = document.createDocumentFragment();
      renderNodes(tpl.content.childNodes, c.renderVals(), frag);
      root.replaceChildren(frag);
      Object.keys(keep).forEach(function (k) { var x = document.getElementById(k); if (x) for (var p in keep[k]) x[p] = keep[k][p]; });
      Array.prototype.forEach.call(root.querySelectorAll('[data-scroll]'), function (x, i) { if (scrollers[i]) x.scrollLeft = scrollers[i]; });
      if (id) {
        var f = document.getElementById(id);
        if (f) { f.focus({ preventScroll: true }); if (sel) try { f.setSelectionRange(sel[0], sel[1]); } catch (e) {} }
      }
      if (dkey) {
        var kf = root.querySelector('[data-key="' + (window.CSS && CSS.escape ? CSS.escape(dkey) : dkey) + '"]');
        if (kf) kf.focus({ preventScroll: true });
      }
      var st = c.state;
      var key = [st.view, st.docId].join('|');
      if (lastKey && key !== lastKey) window.scrollTo(0, 0);
      lastKey = key;
    }
    c.__render = function () {
      if (queued) return;
      queued = true;
      Promise.resolve().then(function () { queued = false; render(); });
    };
    render();
    if (c.componentDidMount) c.componentDidMount();
  };
})();
