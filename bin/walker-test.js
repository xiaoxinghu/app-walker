#!/usr/bin/env node
"use strict";

var program = require('commander'),
    path = require('path'),
    util = require('util'),
    mocha = require('mocha');

var app = require('../lib/appwalker');


program
  .parse(process.argv);

// var mocha = new Mocha();

// mocha.addFile(path.join(__dirname, '_mocha.js'));
// mocha.run(failures => {
//   process.on('exit', () => {
//     process.exit(failures);
//   });
// });

// var title = app.interface.driver().get("http://google.com").title();

console.log('start');
app.interface.driver().get("http://google.com").title().should.become('Baidu').fin(() => {
  console.log('real end');
}).done();
console.log('end');
