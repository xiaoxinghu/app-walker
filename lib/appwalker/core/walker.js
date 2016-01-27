"use strict";
const EventEmitter = require('events');
const alg = require('graphlib').alg;

const constants = require('../helper/constants');

const Hooker = require('./hooker');

const EVENTS = constants('WALKER_', [
  'ON_NODE',
  'ON_EDGE',
  'PRE_FLOW',
  'POST_FLOW',
  'PRE_WALK',
  'POST_WALK'
]);

function descFlow(flow) {
  return flow.join(' -> ');
};

class Walker extends EventEmitter {
  constructor(app) {
    super();
    this._app = app;
    this.hook('before', function() {
      this.emit(EVENTS.PRE_WALK);
    });
    this.hook('after', function() {
      this.emit(EVENTS.POST_WALK);
    });
    this.hook('beforeEach', function() {
      this.emit(EVENTS.PRE_FLOW);
    });
    this.hook('afterEach', function() {
      this.emit(EVENTS.POST_FLOW);
    });
  }

  walk() {
    this.emit(EVENTS.PRE_WALK);
    for (let flow of this.genFlows()) {
      this.emit(EVENTS.PRE_FLOW, {desc: descFlow(flow)});

      flow.forEach((element, index, array) => {
        this.emit(EVENTS.ON_NODE, this._app.graph.node(element));
        if (index < array.length - 1) {
          let edge = this._app.graph.edge(element, array[index + 1]);
          this.emit(EVENTS.ON_EDGE, {
            from: this._app.graph.node(element),
            to: this._app.graph.node(array[index + 1]),
            edge
          });
        }
      });
      this.emit(EVENTS.POST_FLOW);
    }
    this.emit(EVENTS.POST_WALK);
  }

  genFlows() {
    let entrance = this._app.config.entrance;
    let map = alg.dijkstra(this._app.graph, entrance);
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
  }
}

module.exports = (app, _) => {
  app.EVENTS = Object.assign(app.EVENTS || {}, EVENTS);
  Object.assign(Walker.prototype, Hooker);
  var walker = new Walker(app);
  Object.defineProperty(app, 'walker', {get: function() {
    return walker;
  }});
};
