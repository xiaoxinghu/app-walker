"use strict";

const deepCopy = require('../helper/deepCopy');

class Context {
  constructor() {
    this._global = {};
    this._scenarios = {};
  }

  get global() {
    // read only
    return deepCopy(this._global);
  }

  set global(context) {
    // eliminate side effects with deepCopy
    this._global = Object.assign(this._global, deepCopy(context));
  }

  scenario(name, context) {
    var c = this._scenarios[name] || {};
    if (context) {
      Object.assign(c, deepCopy(context));
    }
    return deepCopy(this._scenarios[name] = c);
  }

  // create sandbox with scenario name
  // this method will also drop the old sandbox
  sandbox(scenario) {
    return this._sandbox = Object.assign(this.global, this.scenario(scenario));
  }

  get current() {
    if (!this._sandbox) this.sandbox();
    return this._sandbox;
  }

  reset() {
    this._global = {};
    this._scenarios = {};
    this._sandbox = undefined;
  }
}

module.exports = (app, _) => {
  app.context = new Context();
  app.interface = Object.assign(app.interface || {}, {
    scenario: (name, context) => {
      return app.context.scenario(name, context);
    },
    context: app.context
  });
};
