"use strict";

var fs = require('fs');
var colors = require('colors');
var util = require('util');
var used = [];
var app = module.exports = {};

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
    // console.log('>', message.red);
    util.log(message.red);
  }
});

app.use(core.graph);
app.use(core.walker);
app.use(core.context);
app.use(ext.state);
app.use(core.config);

