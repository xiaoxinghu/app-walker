"use strict";

var util = require('util'),
    fs = require('fs'),
    path = require('path');

var app = require('../lib/appwalker'),
    EVENTS = app.EVENTS,
    walker = app.walker,
    graph = app.graph,
    evalCode = require('../lib/appwalker/helper').evalCode;

var sandbox = Object.assign({}, app.interface);

var files = fs.readdirSync('.').filter((f) => {
  let match = false;
  ['.', '_'].forEach((c) => {
    match |= f.startsWith(c);
  });
  return f.endsWith('.js') && !match;
});
files.forEach(path => evalCode(path, sandbox));
let flows = walker.genFlows();

var expect = require('chai').expect;

describe('walking', () => {
  before(() => {
    walker.emit(EVENTS.PRE_WALK);
  });

  after(() => {
    walker.emit(EVENTS.POST_WALK);
  });

  beforeEach(() => {
    walker.emit(EVENTS.PRE_FLOW, {desc: 'blah'});
  });

  afterEach(() => {
    walker.emit(EVENTS.POST_FLOW);
  });

  flows.forEach((flow) => {
    it(`can go ${flow.join(' -> ')}`, () => {
      flow.forEach((element, index, array) => {
        walker.emit(EVENTS.ON_NODE, graph.node(element));
        if (index < array.length - 1) {
          let edge = graph.edge(element, array[index + 1]);
          walker.emit(EVENTS.ON_EDGE, {
            from: graph.node(element),
            to: graph.node(array[index + 1]),
            edge
          });
        }
      });
    });
  });
});
