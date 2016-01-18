'use strict';

var util = require('util');
var walker = require('../../lib/appwalker');
var state = walker.state;
var config = walker.config;
var context = walker.dsl.context;
var graph = walker.graph;
var expect = require('chai').expect;

describe('context awareness', () => {
  beforeEach(() => {
    walker.reset();
    graph = walker.graph;
  });

  afterEach(() => {
    walker.reset();
  });
  it ('can genreate traverse with contexts', () => {
    context.global = {
      flag: ''
    };

    config.entrance = 'state1';
    state('state1').can.goto('state2', function(from) {
      context.global.flag = from.name;
    });
    // state('state3').can.goto('state1', function(state) {
    // });
    // state('state4').can.goto('state2', function(state) {
    // });

    // console.log(util.inspect(walker.graph, false, null));
    walker.walker.walk();
    console.log(util.inspect(context, false, null));
  });
});
