"use strict";
const EventEmitter = require('events');
const alg = require('graphlib').alg;

const constants = require('../helper/constants');

const EVENTS = constants('WALKER_', [
  'ON_NODE',
  'ON_EDGE',
  'PRE_FLOW',
  'POST_FLOW'
]);

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

class Walker extends EventEmitter {
  constructor(sandbox) {
    super();
    this._sandbox = sandbox;
  }

  walk() {
    let entrance = this._sandbox.config.entrance;
    let map = alg.dijkstra(this._sandbox.graph, entrance);
    let flows = [];
    for (let node in map) {
      let steps = genSteps(map, entrance, node);
      if (steps.length > 0) flows.push(steps);
    }
    for (let flow of flows) {
      this.emit(EVENTS.PRE_FLOW);
      while (flow.length > 0) {
        let step = flow.pop();
        let edge = this._sandbox.graph.edge(step.from, step.to);
        this.emit(EVENTS.ON_EDGE, {
          from: this._sandbox.graph.node(step.from),
          to: this._sandbox.graph.node(step.to),
          edge
        });
        this.emit(EVENTS.ON_NODE, this._sandbox.graph.node(step.to));
      }
      this.emit(EVENTS.POST_FLOW);
    }
  }
}

module.exports = (sandbox, _) => {
  sandbox.EVENTS = Object.assign(sandbox.EVENTS || {}, EVENTS);
  var walker = new Walker(sandbox);
  Object.defineProperty(sandbox, 'walker', {get: function() {
    return walker;
  }});
};
