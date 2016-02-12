"use strict";

var util = require('util');
var R = require('ramda');
var Component = require('./component');

module.exports = (app, _) => {
  var Compiler = function() {
    this._nodes = [];
    this._stack = [];
  };

  _.addFunc(Compiler.prototype, 'describe', function(name, fn) {
    let parent = this._stack[this._stack.length - 1];
    var component;
    if (parent) {
      component = parent.has(name);
    } else {
      component = new Component(name);
      this._nodes.push(component);
    }
    this._stack.push(component);
    if (typeof fn == 'function') fn.call(component, component);
    this._stack.pop();
  });

  Compiler.prototype.when = function(context, fn) {
    let component = this._stack[this._stack.length - 1];
    component.when(context, fn);
  };

  Compiler.prototype.compile = function(graph) {
    this._nodes.forEach(node => {
      graph.setNode(node.name, node);
      ( node.paths || [] ).forEach(path => {
        graph.setEdge(node.name, path.to, path);
      });
    });
  };

  app.Compiler = Compiler;
  app.Component = Component;
  app.compiler = new Compiler();
  app.interface.describe = app.compiler.describe.bind(app.compiler);
  app.interface.when = app.compiler.when.bind(app.compiler);
  app.walker.reset(() => {
    console.log('compiler.reset');
    app.compiler = new Compiler();
  });
};
