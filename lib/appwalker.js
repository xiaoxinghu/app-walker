"use strict";

var used = [];
var app = module.exports = {};

var helper = require('./appwalker/helper');

app._use = function(fn) {
  if (!~used.indexOf(fn)) {
    fn(this, helper);
    used.push(fn);
  }
  return app;
};

app._use(require('./appwalker/core/graph'));
app._use(require('./appwalker/core/walker'));
app._use(require('./appwalker/ext/walklog'));
app._use(require('./appwalker/core/context'));
app._use(require('./appwalker/ext/state'));
app._use(require('./appwalker/core/config'));

