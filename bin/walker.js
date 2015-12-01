#!/usr/bin/env node
"use strict";

var path = require('path');
var pkg = require('../package.json');
var program = require('commander');
program
  .version(pkg.version)
  .command('walk', 'walk the directory')
  .parse(process.argv);
