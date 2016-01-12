"use strict";
var Graph = require('graphlib').Graph;
var alg = require('graphlib').alg;

function genSteps(map, from, to) {
  let steps = [];
  let cursor = to;
  while (map[cursor].predecessor) {
    steps.push({
      from: map[cursor].predecessor,
      to: cursor
    });
    cursor = map[cursor].predecessor;
  }
  return steps;
}

module.exports = (appwalker, helper) => {
  Object.defineProperty(appwalker, 'graph', {get: function() {
    if (!this._graph) {
      this._graph = new Graph();
    }
    return this._graph;
  }});

  appwalker.reset = function() {
    appwalker._graph = new Graph();
  };

  appwalker.walk = function() {
    let map = alg.dijkstra(this.graph, appwalker.config.entrance);
    console.log(map);
    let paths = [];
    for (let node in map) {
      let steps = genSteps(map, appwalker.config.entrance, node);
      paths.push(steps);
    }
    for (let path of paths) {
      console.log('> -----');
      while (path.length > 0) {
        let step = path.pop();
        let edge = this.graph.edge(step.from, step.to);
        console.log('>', edge.desc);
        edge.func();
      }
    }
  }
}
