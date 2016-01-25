#!/usr/bin/env node
"use strict";

var program = require('commander'),
    path = require('path'),
    util = require('util'),
    Mocha = require('mocha');

program
  .option('-d, --dry', 'dry run')
  .parse(process.argv);


if (program.dry) console.log('dry run');

var mocha = new Mocha();

mocha.addFile(path.join(__dirname, '_mocha.js'));
mocha.run(failures => {
  process.on('exit', () => {
    process.exit(failures);
  });
});
