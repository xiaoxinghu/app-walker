"use strict";
var R = require('ramda');
var _ = require('../utils');

var isContext = c => {
  return !R.isEmpty(c) && !R.isNil(c);
};

var Component = function(name, context) {
  this.name = name;
  _.meta.push(this, context);
};

_.addFunc(Component.prototype, 'has', function(name) {
  var c = new Component(name, _.meta.get(this));
  this.components = this.components || [];
  this.components.push(c);
  return c;
});

_.addFunc(Component.prototype, 'when', function(context, fn) {
  _.meta.push(this, context);
  fn.call(this, this);
  _.meta.pop(this);
});

_.addFunc(Component.prototype, 'addSelector', function(selector) {
  this._selectors = this._selectors || [];
  this._selectors.push({
    selector,
    meta: _.meta.get(this)
  });
});

Component.prototype.getSelector = function(context) {
  // TODO get the right selector based on the context
  return this._selectors ? this._selectors[0].selector : undefined;
};

_.addFunc(Component.prototype, 'addPath', function(dest, callback) {
  this.paths = this.paths || [];
  this.paths.push({
    to: dest, // just name
    meta: _.meta.get(this),
    callback
  });
});

module.exports = Component;
