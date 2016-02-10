"use strict";
var Graph = require('graphlib').Graph;
const alg = require('graphlib').alg;

module.exports = (app, _) => {
  _.addProperty(app, 'graph', () => {
    return this._graph = this._graph || new Graph();
  });

  Graph.prototype.genFlows = function(entrance) {
    let map = alg.dijkstra(this, entrance);
    let flows = [];
    for (let dest in map) {
      let n = dest;
      let steps = [];
      while (map[n].predecessor) {
        steps.push(n);
        n = map[n].predecessor;
      }
      steps.push(n);
      if (steps.length > 1) flows.push(steps.reverse());
    }
    return flows;
  };

  app.reset = function() {
    app._graph = new Graph();
    app.context.reset();
  };
};
