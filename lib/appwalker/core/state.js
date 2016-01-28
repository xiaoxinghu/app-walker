"use strict";

var util = require('util');

class State {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }
}

module.exports = (app, _) => {
  app.State = State;
  app.interface = Object.assign(app.interface || {}, {
    state: state
  });

  function state(name) {
    if (!app.graph.hasNode(name)) {
      app.graph.setNode(name, new app.State(name));
    }
    return app.graph.node(name);
  }
};
