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

app.use(require('./appwalker/core/graph'));
app.use(require('./appwalker/ext/state'));
app.use(require('./appwalker/core/config'));
