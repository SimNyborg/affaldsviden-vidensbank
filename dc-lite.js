// dc-lite: viser vidensbankens design-skabelon som en almindelig webside.
// Skabelonen bruger {{ huller }}, <template data-if> og <template data-for> (omskrevet fra sc-if og sc-for ved bygningen)
// og onClick, onInput og onChange, der peger på funktioner fra Component.renderVals().
(function () {
  var HOLE = /\{\{\s*([\w.$]+)\s*\}\}/g;
  var ONLY = /^\s*\{\{\s*([\w.$]+)\s*\}\}\s*$/;

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
    var el = document.createElement(n.tagName.toLowerCase());
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
      if (a.name === 'value' && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) { textValue = val; continue; }
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
      // Bevar fokus, markering, afkrydsninger og valg, når siden tegnes igen
      var act = document.activeElement;
      var id = act && act.id && root.contains(act) ? act.id : '';
      var sel = id && typeof act.selectionStart === 'number' ? [act.selectionStart, act.selectionEnd] : null;
      var keep = {};
      Array.prototype.forEach.call(root.querySelectorAll('input[id], select[id]'), function (x) {
        if (x.type === 'checkbox') keep[x.id] = { checked: x.checked };
        else if (x.tagName === 'SELECT') keep[x.id] = { value: x.value };
      });
      var scrollers = Array.prototype.map.call(root.querySelectorAll('[data-scroll]'), function (x) { return x.scrollLeft; });
      var frag = document.createDocumentFragment();
      renderNodes(tpl.content.childNodes, c.renderVals(), frag);
      root.replaceChildren(frag);
      Object.keys(keep).forEach(function (k) { var x = document.getElementById(k); if (x) for (var p in keep[k]) x[p] = keep[k][p]; });
      Array.prototype.forEach.call(root.querySelectorAll('[data-scroll]'), function (x, i) { if (scrollers[i]) x.scrollLeft = scrollers[i]; });
      if (id) {
        var f = document.getElementById(id);
        if (f) { f.focus({ preventScroll: true }); if (sel) try { f.setSelectionRange(sel[0], sel[1]); } catch (e) {} }
      }
      var st = c.state;
      var key = [st.view, st.docId, st.serie, st.tema].join('|');
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
