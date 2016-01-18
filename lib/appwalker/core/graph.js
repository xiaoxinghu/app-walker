"use strict";
var Graph = require('graphlib').Graph;

module.exports = (sandbox, _) => {
  Object.defineProperty(sandbox, 'graph', {get: function() {
    if (!this._graph) {
      this._graph = new Graph();
    }
    return this._graph;
  }});

  sandbox.reset = function() {
    sandbox._graph = new Graph();
    sandbox.interface.context.reset();
  };
};
