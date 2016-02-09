"use strict";
var R = require('ramda');

var isContext = c => {
  return !R.isEmpty(c) && !R.isNil(c);
};

var Component = function(name, context) {
  this.name = name;
  this._buffs = [];
  if (isContext(context)) this._buffs.push(context);
};

Component.prototype.has = function(name) {
  var c = new Component(name, this.ctx);
  this.components = this.components || [];
  this.components.push(c);
  return c;
};

Component.prototype.when = function(context, fn) {
  this._buff(context);
  fn.call(this, this);
  this._debuff();
  return this;
};

Component.prototype.locator = function(locator) {
  this.locators = this.locators || [];
  this.locators.push({
    locator,
    ctx: this.ctx
  });
};

Component.prototype._buff = function(context) {
  if (isContext(context)) this._buffs.push(context);
  return this;
};

Component.prototype._debuff = function() {
  this._buffs.pop();
  return this;
};

Object.defineProperty(Component.prototype, 'ctx', {
  get: function() {
    var context = {};
    this._buffs.forEach(c => {
      Object.assign(context, c);
    });
    return context;
  }
});

module.exports = Component;
