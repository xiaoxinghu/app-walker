"use strict";

var util = require('util');
var R = require('ramda');
var Component = require('./component');

var addNode = (graph, node) => graph.setNode(node.name, node);
var addEdge = (graph, path) => graph.setEdge(path.from, path.to, { info: path.info });

module.exports = (app, _) => {
  var Compiler = function() {
    this._nodes = [];
    this._paths = [];
    this._stack = [];
    this._contexts = {};
  };

  Compiler.prototype.describe = function(name, fn) {
    let parent = this._stack[this._stack.length - 1];
    var component;
    if (parent) {
      component = parent.has(name);
    } else {
      component = new Component(name);
      this._nodes.push(component);
    }
    this._stack.push(component);
    fn.call(component, component);
    this._stack.pop();
  };

  Compiler.prototype.when = function(context, fn) {
    let component = this._stack[this._stack.length - 1];
    component.when(context, fn);
  };

  // Compiler.prototype.node = function(name, fn) {
  //   this._nodes[name] = this._nodes[name] || {
  //     name,
  //     context: {}
  //   };
  //   // new register for new (mentioned) node
  //   this._register = {
  //     node: this._nodes[name],
  //     context: {}
  //   };
  //   return this;
  // };

  // Compiler.prototype.component = function(name) {
  //   this._register.component
  //     = this._register.node.components[name]
  //     = this._register.node.components[name] || {
  //       name,
  //       context: {}
  //     };
  //   return this;
  // };

  // Compiler.prototype.locate = function(locator) {
  //   // stands for locator describer
  //   let ld = {
  //     locator,
  //     meta: _.deepCopy(this._register.context)
  //   };
  //   this._register.locator = ld;
  //   this._register.component.locators.push(ld);
  //   return this;
  // };

  // Compiler.prototype.evaluate = function(evaluator, desc) {
  //   let ed = {
  //     desc,
  //     evaluator,
  //     meta: _.deepCopy(this._register.context)
  //   };
  //   this._register.evaluator = ed;
  //   this._register.component.evaluators.push(ed);
  //   return this;
  // };

  // Compiler.prototype.path = function(to, info) {
  //   this._paths.push({
  //     from: this._register.node.name,
  //     to,
  //     info
  //   });
  // };

  Compiler.prototype.compile = function(graph) {
    R.reduce(addNode, graph, R.values(this._nodes));
    R.reduce(addEdge, graph, this._paths);
  };

  app.Compiler = Compiler;
  app.Component = Component;
  app.compiler = new Compiler();
  app.interface.describe = app.compiler.describe.bind(app.compiler);
  app.interface.when = app.compiler.when.bind(app.compiler);
};
