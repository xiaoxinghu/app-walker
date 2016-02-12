"use strict";
const alg = require('graphlib').alg;
const Hooker = require('./hooker');

function descFlow(flow) {
  return flow.join(' -> ');
};

const EVENTS = ['before', 'after', 'beforeEach', 'afterEach',
                'onNode', 'onEdge', 'reset'];

class Walker extends Hooker {
  constructor(app) {
    super(EVENTS);
    this._app = app;
  }

  walk() {
  }
}

module.exports = (app, _) => {
  Object.assign(Walker.prototype, Hooker.prototype);
  var walker = new Walker(app);
  _.addProp(app, 'walker', () => {
    return walker;
  });
};
