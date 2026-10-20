/* Tilde · mini runtime: renders the page template with Preact. */
(function () {
  var h = preact.h, render = preact.render, Component = preact.Component;
  var HOLE = /\{\{\s*([^}]+?)\s*\}\}/g;
  var WHOLE = /^\s*\{\{\s*([^}]+?)\s*\}\}\s*$/;
  var EVENTS = {
    onclick: 'onClick', onchange: 'onChange', oninput: 'onInput',
    onmouseenter: 'onMouseEnter', onmouseleave: 'onMouseLeave',
    ontouchstart: 'onTouchStart', onkeydown: 'onKeyDown', onsubmit: 'onSubmit',
    onfocus: 'onFocus', onblur: 'onBlur'
  };
  var ROOT = null;

  function lookup(path, scope) {
    path = path.trim();
    if (path === 'true') return true;
    if (path === 'false') return false;
    if (path === 'null') return null;
    if (/^-?\d+(\.\d+)?$/.test(path)) return Number(path);
    var parts = path.split('.'), cur = scope;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  function interp(str, scope) {
    var m = str.match(WHOLE);
    if (m) return lookup(m[1], scope);
    if (str.indexOf('{{') < 0) return str;
    return str.replace(HOLE, function (_, p) {
      var v = lookup(p, scope);
      return v == null ? '' : String(v);
    });
  }

  function pushAll(out, r) {
    if (r == null || r === false) return;
    if (Array.isArray(r)) { for (var i = 0; i < r.length; i++) pushAll(out, r[i]); }
    else out.push(r);
  }

  function children(nodes, scope) {
    var out = [];
    for (var i = 0; i < nodes.length; i++) pushAll(out, build(nodes[i], scope));
    return out;
  }

  function build(node, scope) {
    if (node.nodeType === 3) {
      var t = node.nodeValue;
      if (t.indexOf('{{') < 0) return t;
      return t.replace(HOLE, function (_, p) {
        var v = lookup(p, scope);
        return v == null ? '' : String(v);
      });
    }
    if (node.nodeType !== 1) return null;
    var tag = node.localName;

    if (tag === 'sc-if') {
      return interp(node.getAttribute('value') || '', scope) ? children(node.childNodes, scope) : null;
    }
    if (tag === 'sc-for') {
      var list = interp(node.getAttribute('list') || '', scope) || [];
      var as = node.getAttribute('as') || 'item';
      var out = [];
      for (var i = 0; i < list.length; i++) {
        var s = Object.create(scope);
        s[as] = list[i];
        s.$index = i;
        pushAll(out, children(node.childNodes, s));
      }
      return out;
    }

    var props = {};
    for (var a = 0; a < node.attributes.length; a++) {
      var attr = node.attributes[a], name = attr.name;
      if (name.indexOf('hint-') === 0) continue;
      var val = interp(attr.value, scope);
      var ev = EVENTS[name];
      if (ev) {
        if (ev === 'onChange' && (tag === 'input' || tag === 'textarea')) ev = 'onInput';
        if (typeof val === 'function') props[ev] = val;
        continue;
      }
      if (name.indexOf('aria-') === 0 && typeof val === 'boolean') { props[name] = String(val); continue; }
      if (val === false || val == null) continue;
      if (name === 'value') { props.value = val; continue; }
      props[name] = val;
    }
    var kids = children(node.childNodes, scope);
    return h(tag, props, kids.length ? kids : undefined);
  }

  function DCLogic(props) { Component.call(this, props); }
  DCLogic.prototype = Object.create(Component.prototype);
  DCLogic.prototype.constructor = DCLogic;
  DCLogic.prototype.render = function () {
    var vals = this.renderVals ? this.renderVals() : {};
    return build(ROOT, vals);
  };
  window.DCLogic = DCLogic;

  window.DCMount = function (Comp, tpl, el) {
    var frag = tpl.content;
    for (var i = 0; i < frag.childNodes.length; i++) {
      if (frag.childNodes[i].nodeType === 1) { ROOT = frag.childNodes[i]; break; }
    }
    render(h(Comp, {}), el);
  };
})();
