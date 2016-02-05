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

app.compiler.compile(app.graph);
app.graph.setNode('start', {shape: 'diamond', color: 'red'});
app.graph.setEdge('start', app.config.entrance, {label: 'start'});
// app.graph.edges().forEach((edge) => {
//   let e = app.graph.edge(edge);
//   e.label = e.desc;
// });

var dotFile = path.join(program.dir, program.out);
fs.writeFile(dotFile, dot.write(app.graph), (err) => {
  if (err) throw err;
  console.log(`${program.out} generated.`);
  require('child_process').exec(`dot -Tpng -O ${dotFile}`, (err, stdout, stderr) => {
    if (err) throw err;
  });
});

