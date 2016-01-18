'use strict';

var util = require('util');
var walker = require('../../lib/appwalker');
var state = walker.state;
var config = walker.config;
var graph = walker.graph;
var expect = require('chai').expect;

describe('graph', () => {
  beforeEach(() => {
    walker.reset();
    graph = walker.graph;
  });
  afterEach(() => {
    walker.reset();
  });

  it ('can generate simple graph with nodes', () => {
    state('state1');
    state('state2');
    state('state3');

    expect(graph.nodes()).to.have.length(3);
    expect(graph.nodes()).to.have.members(
      ['state1', 'state2', 'state3']);
  });

  it ('can generate graph with edages', () => {
    state('state1').can.goto('state2', function(state) {});
    state('state2').can.goto('state3', function(state) {});
    state('state3');

    expect(graph.edges()).to.have.length(2);
    expect(graph.nodeEdges('state1')).to.have.length(1);
    expect(graph.inEdges('state1')).to.have.length(0);
    expect(graph.outEdges('state1')).to.have.length(1);
    expect(graph.nodeEdges('state2')).to.have.length(2);
    expect(graph.inEdges('state2')).to.have.length(1);
    expect(graph.outEdges('state2')).to.have.length(1);
  });

  it ('can retrieve state details from graph', () => {
    var p = state('simple state')
      .should.have.button('button')
        .can.be.find.by.id('buttonId')
        .and.it('should have text Button in it', btn => btn.text == 'Button');

    expect(graph.node('simple state')).to.deep.equal(p);
  });

  it ('will run the function between states when walking.', () => {
    config.entrance = 'state1';
    let buffer = {};
    state('state1').can.goto('state2', function(from, to) {
      buffer = {from: from.name, to: to.name};
    });
    walker.walk();
    expect(buffer.from).to.equal('state1');
    expect(buffer.to).to.equal('state2');
  });

  it ('can generate default traverse paths', () => {
    config.entrance = 'state1';
    var app = {};
    state('state1').can.goto('state2', function(state) {
      // console.log('press button');
    });
    state('state2').can.goto('state3', function(state) {
      // console.log('press another button');
    }).can.goto('state4', function(state) {
      // console.log('press special button');
    });
    state('state3').can.goto('state1', function(state) {
      // console.log('press reset button');
    });
    state('state4').can.goto('state2', function(state) {
      // console.log('press secret button');
    });

    // console.log(util.inspect(walker.graph, false, null));
    // TODO add asserts
    walker.walk();
  });
});
