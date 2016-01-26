"use strict";

class Hook {
  constructor(fn) {
    this._fn = fn;
  }

  run(ctx) {
    return this._fn.call(this, ctx);
  }
}

module.exports = (app, _) => {
  var _hooks = {};
  Object.defineProperty(app, 'hooks', {get: function() {
    return _hooks;
  }});
  app.hook = function(name, fn) {
    _hooks[name] = _hooks[name] || [];
    _hooks[name].push(new Hook(fn));
  };

  app.runHook = function(name, ctx) {
    let p = Promise.all(( _hooks[name] || [] ).map(hook => {
      return hook.run(ctx);
    }));
    return p;
  };
};
