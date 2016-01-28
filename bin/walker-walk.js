#!/usr/bin/env node
"use strict";

var program = require('commander'),
    path = require('path'),
    util = require('util'),
    Mocha = require('mocha');

program
  .option('-d, --dry', 'dry run')
  .option('-v, --verbose', 'verbose mode')
  .parse(process.argv);


if (program.dry) console.log('dry run');
if (program.verbose) {
  require('../lib/appwalker').interface.use('walklog');
}

var mocha = new Mocha();

mocha.addFile(path.join(__dirname, '_mocha.js'));
mocha.run(failures => {
  process.on('exit', () => {
    process.exit(failures);
  });
});
