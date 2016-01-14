"use strict";

class Context {
  constructor() {
    this._global = {};
    this._scenarios = {};
  }

  get global() {
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
}

module.exports = (appwalker, helper) => {
  appwalker.context = new Context();
};
