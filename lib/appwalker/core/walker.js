"use strict";
const EventEmitter = require('events');
const alg = require('graphlib').alg;

const constants = require('../helper/constants');

const Hooker = require('./hooker');

const EVENTS = constants('WALKER_', [
  'ON_NODE',
  'ON_EDGE',
  'BEFORE_EACH',
  'AFTER_EACH',
  'BEFORE_ALL',
  'AFTER_ALL'
]);

function descFlow(flow) {
  return flow.join(' -> ');
};

class Walker extends EventEmitter {
  constructor(app) {
    super();
    this._app = app;
    this.hook('before', function() {
      this.emit(EVENTS.BEFORE_ALL);
    });
    this.hook('after', function() {
      this.emit(EVENTS.AFTER_ALL);
    });
    this.hook('beforeEach', function() {
      this.emit(EVENTS.BEFORE_EACH);
    });
    this.hook('afterEach', function() {
      this.emit(EVENTS.AFTER_EACH);
    });
  }

  walk() {
    this.emit(EVENTS.BEFORE);
    for (let flow of this.genFlows()) {
      this.emit(EVENTS.BEFORE_EACH, {desc: descFlow(flow)});

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
      this.emit(EVENTS.AFTER_EACH);
    }
    this.emit(EVENTS.AFTER_ALL);
  }
}

module.exports = (app, _) => {
  app.EVENTS = Object.assign(app.EVENTS || {}, EVENTS);
  Object.assign(Walker.prototype, Hooker.prototype);
  var walker = new Walker(app);
  _.addProperty(app, 'walker', () => {
    return walker;
  });
};
