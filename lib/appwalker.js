"use strict";

var used = [];
var app = module.exports = {};

var helper = require('./appwalker/helper');

app.use = fn => {
  if (!~used.indexOf(fn)) {
    fn(app, helper);
    used.push(fn);
  }
  return app;
};

var graph = require('./appwalker/graph');
app.use(graph);

var page = require('./appwalker/page');
app.use(page);
