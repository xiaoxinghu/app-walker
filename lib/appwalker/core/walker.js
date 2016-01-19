"use strict";
const EventEmitter = require('events');
const alg = require('graphlib').alg;

const constants = require('../helper/constants');

const EVENTS = constants('WALKER_', [
  'ON_NODE',
  'ON_EDGE',
  'PRE_FLOW',
  'POST_FLOW',
  'PRE_WALK',
  'POST_WALK'
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
  constructor(app) {
    super();
    this._app = app;
  }

  walk() {
    let entrance = this._app.config.entrance;
    let map = alg.dijkstra(this._app.graph, entrance);
    let flows = [];
    for (let node in map) {
      let steps = genSteps(map, entrance, node);
      if (steps.length > 0) flows.push(steps);
    }
    this.emit(EVENTS.PRE_WALK);
    for (let flow of flows) {
      this.emit(EVENTS.PRE_FLOW);
      while (flow.length > 0) {
        let step = flow.pop();
        let edge = this._app.graph.edge(step.from, step.to);
        this.emit(EVENTS.ON_EDGE, {
          from: this._app.graph.node(step.from),
          to: this._app.graph.node(step.to),
          edge
        });
        this.emit(EVENTS.ON_NODE, this._app.graph.node(step.to));
      }
      this.emit(EVENTS.POST_FLOW);
    }
    this.emit(EVENTS.POST_WALK);
  }
}

module.exports = (app, _) => {
  app.EVENTS = Object.assign(app.EVENTS || {}, EVENTS);
  var walker = new Walker(app);
  Object.defineProperty(app, 'walker', {get: function() {
    return walker;
  }});
};
