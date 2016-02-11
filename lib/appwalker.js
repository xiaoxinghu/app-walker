"use strict";

var fs = require('fs');
var colors = require('colors');
var util = require('util');
var used = [];
var app = module.exports = {};
var R = require('ramda');

var helper = require('./appwalker/helper');
var core = require('./appwalker/core');
var ext = require('./appwalker/ext');

app.use = function(fn) {
  if (!~used.indexOf(fn)) {
    fn(this, helper);
    used.push(fn);
  }
  return app;
};

app.interface = Object.assign(app.interface || {}, {
  use: module => {
    if (ext[module]) app.use(ext[module]);
  },
  output: message => {
    util.log(message.red);
  }
});

var _event = {};
var eventStart = function() {
  console.log('event start');
};
app.when = function(e, fn) {
  _event[e] = _event[e] || R.compose(eventStart);
  _event[e] = R.compose(_event[e]);
};

app.fire = function(eName) {
  console.log('fire', eName, _event);
  _event[eName].call(app, app);
};

app.reset = function() {
  console.log('app.reset');
  app.fire('reset');
};

app.use(core.graph);
app.use(core.compiler);
app.use(core.walker);
app.use(core.context);

app.use(ext.asserts);
app.use(ext.dsl);
app.use(core.config);
