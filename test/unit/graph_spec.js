'use strict';

var util = require('util');
var walker = require('../../lib/appwalker');
var page = walker.page;
var config = walker.config;
var graph = walker.graph;
var expect = require('chai').expect;

describe('graph', () => {
  afterEach(() => {
    walker.reset();
    graph = walker.graph;
  });

  it ('can generate simple graph with nodes', () => {
    page('page1');
    page('page2');
    page('page3');

    expect(graph.nodes()).to.have.length(3);
    expect(graph.nodes()).to.have.members(
      ['page1', 'page2', 'page3']);
  });

  it ('can generate graph with edages', () => {
    page('page1').can.goto('page2', function(page) {});
    page('page2').can.goto('page3', function(page) {});
    page('page3');

    expect(graph.edges()).to.have.length(2);
    expect(graph.nodeEdges('page1')).to.have.length(1);
    expect(graph.inEdges('page1')).to.have.length(0);
    expect(graph.outEdges('page1')).to.have.length(1);
    expect(graph.nodeEdges('page2')).to.have.length(2);
    expect(graph.inEdges('page2')).to.have.length(1);
    expect(graph.outEdges('page2')).to.have.length(1);
  });

  it ('can retrieve page details from graph', () => {
    var p = page('simple page')
      .should.have.button('button')
        .can.be.find.by.id('buttonId')
        .and.it('should have text Button in it', btn => btn.text == 'Button');

    expect(graph.node('simple page')).to.deep.equal(p);
  });

  it ('can generate default traverse paths', () => {
    config.entrance = 'page1';
    page('page1').can.goto('page2', function(page) {
      // console.log('press button');
    });
    page('page2').can.goto('page3', function(page) {
      // console.log('press another button');
    }).can.goto('page4', function(page) {
      // console.log('press special button');
    });
    page('page3').can.goto('page1', function(page) {
      // console.log('press reset button');
    });
    page('page4').can.goto('page2', function(page) {
      // console.log('press secret button');
    });

    // console.log(util.inspect(walker.graph, false, null));
    // TODO add asserts
    walker.walk();
  });
});
