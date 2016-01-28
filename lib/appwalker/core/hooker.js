"use strict";

function Hooker () {};
var _hooks = {};

Hooker.prototype.hook = function(name, fn) {
  _hooks[name] = _hooks[name] || [];
  _hooks[name].push(fn);
};

// rest parameters is staged feature.
// Hooker.prototype.runHook = function(name, ...args) {
Hooker.prototype.runHook = function(name) {
  let p = Promise.all(( _hooks[name] || [] ).map(hook => {
    return hook.apply(this, Array.prototype.slice.call(arguments, 1));
    // return hook.call(this, args);
  }));
  return p;
};

module.exports = Hooker;
