#!/usr/bin/env node
"use strict";

var program = require('commander');
var util = require('util');
var fs = require('fs');
var app = require('../lib/appwalker');
var evalCode = require('../lib/appwalker/helper').evalCode;

program
  .option('-d, --dry', 'dry run')
  .parse(process.argv);


if (program.dry) console.log('dry run');


var sandbox = Object.assign({}, app.interface);
sandbox = Object.assign(sandbox, {
  console: console
});

var files = fs.readdirSync('.').filter((f) => {
  let match = false;
  ['.', '_'].forEach((c) => {
    match |= f.startsWith(c);
  });
  return f.endsWith('.js') && !match;
});
files.forEach(path => evalCode(path, sandbox));
console.log('eval: ', files);
app.walker.walk();

