#!/usr/bin/env node
"use strict";

var program = require('commander'),
    path = require('path'),
    util = require('util'),
    R = require('ramda'),
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


// app.reset();
// var funcs = [R.multiply(2), R.add(3), R.multiply(2)];
// var func = n => {
//   console.log('start', n);
//   return n;
// };

// var func = R.compose(funcs);
// funcs.forEach(func => {
//   func = R.compose(func);
// });
// var v = R.ap([R.multiply(2), R.add(3), R.multiply(2)], [1,2,3]);
// var v = func(2);
// console.log(v);
