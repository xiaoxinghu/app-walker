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
};

var defaultHook = {
  on: {
    node: function(node) {
      console.log('node:', node);
    },
    edge: function(edge) {
      console.log('edge:', edge);
    }
  },

  pre: {
    flow: function() {
      console.log('>>>');
    },
    step: function() {
    }
  },

  post: {
    flow: function() {
      console.log('<<<');
    },
    step: function() {}
  }

};

function walk(entrance, options) {
  options = options || {};
  var onNode = options.onNode || defaultHook.on.node;
  var onEdge = options.onEdge || defaultHook.on.edge;
  var preFlow = options.preFlow || defaultHook.pre.flow;
  var postFlow = options.postFlow || defaultHook.post.flow;
  let map = alg.dijkstra(this, entrance);
  let flows = [];
  for (let node in map) {
    let steps = genSteps(map, entrance, node);
    if (steps.length > 0) flows.push(steps);
  }
  for (let flow of flows) {
    preFlow();
    while (flow.length > 0) {
      let step = flow.pop();
      let edge = this.edge(step.from, step.to);
      onEdge(edge);
      onNode(this.node(step.to));
    }
    postFlow();
  }
};

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

  helper.addMethod(Graph.prototype, 'walk', walk);

};
