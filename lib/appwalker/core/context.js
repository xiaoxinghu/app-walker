"use strict";

class Context {
  constructor() {
    this._global = {};
    this._scenarios = {};
  }

  get global() {
    // return Object.assign({}, this._global);
    // TODO: should I make the global context mutable?
    return this._global;
  }

  set global(context) {
    this._global = Object.assign(this._global, context);
  }

  scenario(name, context) {
    var c = this._scenarios[name] || {};
    if (context) {
      Object.assign(c, context);
    }
    return this._scenarios[name] = c;
  }

  reset() {
    this._global = {};
    this._scenarios = {};
  }
}

module.exports = (sandbox, _) => {
  var context = new Context();
  sandbox.dsl = Object.assign(sandbox.dsl || {}, {
    context
  });
};
