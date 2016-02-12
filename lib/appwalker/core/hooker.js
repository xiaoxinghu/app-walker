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
      if (typeof self[hook] === 'function') {
        throw `Func ${hook} exists.`;
      }
      self[hook] = function(fn) {
        if (typeof fn === 'function') {
          self._hooks[hook].push(fn);
          return this;
        } else {
          self.emit(hook);
          return Promise
            .all(( self._hooks[hook] || [] )
                 .map(hook => hook.apply(this, arguments)));
        }
      };
    });
  }
}

module.exports = Hooker;
