"use strict";
var util = require('util'),
    EventEmitter = require('events');

class Hooker extends EventEmitter {
  constructor(hooks) {
    super();
    var self = this;
    self._hooks = {};
    hooks.forEach(hook => {
      self._hooks[hook] = [];
      self[hook] = fn => {
        self._hooks[hook].push(fn);
      };
    });
  }

  hook(name) {
    var self = this;
    self.emit(name);
    return Promise
      .all(( self._hooks[name] || [] )
           .map(hook => hook.apply(this, Array.prototype.slice.call(arguments, 1))));
  }
}

module.exports = Hooker;
