"use strict";

var util = require('util');
var R = require('ramda');

var addNode = (graph, node) => graph.setNode(node.name, node);
var addEdge = (graph, path) => graph.setEdge(path.from, path.to, { info: path.info });

module.exports = (app, _) => {
  var Compiler = function() {
    this._register = {};
    this._nodes = {};
    this._paths = [];
  };

  Compiler.prototype.node = function(name) {
    this._nodes[name] = this._nodes[name] || {
      name,
      components: {}
    };
    // new register for new (mentioned) node
    this._register = {
      node: this._nodes[name],
      context: {}
    };
    return this;
  };

  Compiler.prototype.component = function(name) {
    this._register.component
      = this._register.node.components[name]
      = this._register.node.components[name] || {
        locators: [],
        evaluators: []
      };
    return this;
  };

  Compiler.prototype.locate = function(locator) {
    // stands for locator describer
    let ld = {
      locator,
      meta: _.deepCopy(this._register.context)
    };
    this._register.locator = ld;
    this._register.component.locators.push(ld);
    return this;
  };

  Compiler.prototype.evaluate = function(evaluator, desc) {
    let ed = {
      desc,
      evaluator,
      meta: _.deepCopy(this._register.context)
    };
    this._register.evaluator = ed;
    this._register.component.evaluators.push(ed);
    return this;
  };

  Compiler.prototype.path = function(to, info) {
    this._paths.push({
      from: this._register.node.name,
      to,
      info
    });
  };

  Compiler.prototype.inspect = function() {
    console.log(util.inspect(this._nodes, false, null));
    console.log(util.inspect(this._paths, false, null));
  };

  Compiler.prototype.compile = function(graph) {
    R.reduce(addNode, graph, R.values(this._nodes));
    R.reduce(addEdge, graph, this._paths);
  };

  app.Compiler = Compiler;
};
