#!/usr/bin/env node
"use strict";

var program = require('commander'),
    path = require('path'),
    util = require('util'),
    mocha = require('mocha');
var fs = require('fs');
var evalCode = require('../lib/appwalker/helper').evalCode;

var app = require('../lib/appwalker');

program
  .parse(process.argv);


var sandbox = Object.assign({}, app.interface);

var files = fs.readdirSync('.').filter((f) => {
  let match = false;
  ['.', '_'].forEach((c) => {
    match |= f.startsWith(c);
  });
  return f.endsWith('.js') && !match;
});
files.forEach(path => evalCode(path, sandbox));

// console.log(util.inspect(app.graph, false, null));
// app.compiler.compile(app.graph);
// console.log(util.inspect(app.graph, false, null));

// app.compiler.inspect();
console.log(util.inspect(app.compiler, false, null));
