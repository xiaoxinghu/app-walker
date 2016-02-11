"use strict";

var util = require('util'),
    fs = require('fs'),
    path = require('path');

var app = require('../lib/appwalker'),
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

app.compiler.compile(app.graph);
let flows = app.graph.genFlows(app.config.entrance);

var expect = require('chai').expect;

describe('walking', function() {
  this.timeout(20000);
  before(() => {
    return walker.hook('before');
  });

  after(() => {
    return walker.hook('after');
  });

  beforeEach(() => {
    return walker.hook('beforeEach');
  });

  afterEach(() => {
    return walker.hook('afterEach');
  });

  flows.forEach((flow) => {
    it(`can go ${flow.join(' -> ')}`, () => {
      let promise = Promise.resolve();
      flow.forEach((element, index, array) => {
        promise = promise.then(() => {
          return walker.hook('onNode', graph.node(element));
        });
        if (index < array.length - 1) {
          let edge = graph.edge(element, array[index + 1]);
          promise = promise.then(() => {
            return walker.hook('onEdge', edge);
          });
        }
      });
      return promise;
    });
  });
});
