"use strict";
var R = require('ramda');
var _ = require('../helper');

var isContext = c => {
  return !R.isEmpty(c) && !R.isNil(c);
};

var Component = function(name, context) {
  this.name = name;
  this._buffs = [];
  if (isContext(context)) this._buffs.push(context);
};

_.addFunc(Component.prototype, 'has', function(name) {
  var c = new Component(name, this.ctx);
  this.components = this.components || [];
  this.components.push(c);
  return c;
});

_.addFunc(Component.prototype, 'when', function(context, fn) {
  this._buff(context);
  fn.call(this, this);
  this._debuff();
  return this;
});

_.addFunc(Component.prototype, 'addSelector', function(selector) {
  this._selectors = this._selectors || [];
  this._selectors.push({
    selector,
    ctx: this.ctx
  });
});

Component.prototype.getSelector = function(context) {
  // TODO implement this
  return this._selectors ? this._selectors[0].selector : undefined;
};

_.addFunc(Component.prototype, 'addPath', function(dest, fn) {
  this.paths = this.paths || [];
  this.paths.push({
    from: this.name, // the whole object
    to: dest, // just name
    ctx: this.ctx,
    fn
  });
});

_.addFunc(Component.prototype, '_buff', function(context) {
  if (isContext(context)) this._buffs.push(context);
  return this;
});

_.addFunc(Component.prototype, '_debuff', function() {
  this._buffs.pop();
  return this;
});

_.addProp(Component.prototype, 'ctx', function() {
  var context = {};
  this._buffs.forEach(c => {
    Object.assign(context, c);
  });
  return context;
});

module.exports = Component;
