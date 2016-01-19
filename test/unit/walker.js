'use strict';

var util = require('util');
var app = require('../../lib/appwalker');
var state = app.interface.state;
var config = app.interface.config;
var expect = require('chai').expect;

describe('walker', () => {
  beforeEach(() => {
    app.reset();
  });
  afterEach(() => {
    app.reset();
  });

  it ('has hooks', () => {
    var counter = {
      pre: {
        flow: 0,
        walk: 0
      },
      post: {
        flow: 0,
        walk: 0
      }
    };
    var preFLow = function() {
      counter.pre.flow++;
    };
    var postFLow = function() {
      counter.post.flow++;
    };
    var preWalk = function() {
      counter.pre.walk++;
    };
    var postWalk = function() {
      counter.post.walk++;
    };

    let EVENTS = app.EVENTS;
    app.walker.on(EVENTS.PRE_FLOW, preFLow);
    app.walker.on(EVENTS.POST_FLOW, postFLow);
    app.walker.on(EVENTS.PRE_WALK, preWalk);
    app.walker.on(EVENTS.POST_WALK, postWalk);

    config.entrance = 'state1';
    state('state1').can.goto('state2');
    state('state2').can.goto('state3');
    state('state2').can.goto('state4');
    state('state1').can.goto('state5');

    app.walker.walk();

    expect(counter.pre.walk).to.equal(1);
    expect(counter.post.walk).to.equal(1);
    expect(counter.pre.flow).to.equal(4);
    expect(counter.pre.flow).to.equal(4);

    app.walker.removeListener(EVENTS.PRE_FLOW, preFLow);
    app.walker.removeListener(EVENTS.POST_FLOW, postFLow);
    app.walker.removeListener(EVENTS.PRE_WALK, preWalk);
    app.walker.removeListener(EVENTS.POST_WALK, postWalk);
  });
});
