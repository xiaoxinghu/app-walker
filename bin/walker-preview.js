#!/usr/bin/env node
"use strict";

var program = require('commander');
var util = require('util');
var fs = require('fs');
var path = require('path');
var dot = require('graphlib-dot');
var app = require('../lib/appwalker');
var evalCode = require('../lib/appwalker/helper').evalCode;

program
  .option('-d, --dir <dir>', 'output folder', 'preview')
  .option('-o, --out <out>', 'output file name', 'graph.dot')
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

if (!fs.existsSync(program.dir)) fs.mkdirSync(program.dir);

fs.writeFile(path.join(program.dir, program.out), dot.write(app.graph), (err) => {
  if (err) throw err;
  console.log(`${program.out} generated.`);
});

