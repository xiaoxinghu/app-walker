"use strict";

var Hooker = {};
var _hooks = {};

Hooker.hook = function(name, fn) {
  _hooks[name] = _hooks[name] || [];
  _hooks[name].push(fn);
};

Hooker.runHook = function(name, ctx) {
  let p = Promise.all(( _hooks[name] || [] ).map(hook => {
    return hook.call(this, ctx);
  }));
  return p;
};

module.exports = Hooker;
