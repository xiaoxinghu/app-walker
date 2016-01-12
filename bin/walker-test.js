#!/usr/bin/env node

var util = require('util');

var walker = require('../lib/appwalker');
var evalCode = require('../lib/appwalker/helper').evalCode;

var sandbox = {
  page: walker.page,
  Page: walker.page,
  config: walker.config,
  console: console
};
// ['simple.js'].forEach(path => evalCode(path));
['graph.js'].forEach(path => evalCode(path, sandbox));

// console.log(util.inspect(walker, false, null));

// var e = walker.graph.outEdges('login');
// var e = walker.graph.edge('login', 'password');
// console.log(util.inspect(e, false, null));
// e.func();

walker.walk();
