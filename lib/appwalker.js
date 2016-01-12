"use strict";

var used = [];
var app = module.exports = {};

var helper = require('./appwalker/helper');

app.use = function(fn) {
  if (!~used.indexOf(fn)) {
    fn(this, helper);
    used.push(fn);
  }
  return app;
};

app.use(require('./appwalker/config'));
app.use(require('./appwalker/graph'));
app.use(require('./appwalker/state'));
