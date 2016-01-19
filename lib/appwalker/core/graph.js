"use strict";
var Graph = require('graphlib').Graph;

module.exports = (app, _) => {
  Object.defineProperty(app, 'graph', {get: function() {
    if (!this._graph) {
      this._graph = new Graph();
    }
    return this._graph;
  }});

  app.reset = function() {
    app._graph = new Graph();
    app.interface.context.reset();
  };
};
