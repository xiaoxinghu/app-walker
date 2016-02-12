"use strict";

var fs = require('fs'),
    colors = require('colors'),
    util = require('util'),
    core = require('./appwalker/core'),
    ext = require('./appwalker/ext');

var used = [];
var app = module.exports = {};


app.use = function(fn) {
  if (!~used.indexOf(fn)) {
    fn(this, require('./appwalker/utils'));
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

app.use(core.walker);
app.use(core.graph);
app.use(core.compiler);
app.use(core.context);

app.use(ext.dsl);
app.use(core.config);
