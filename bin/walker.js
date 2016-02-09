#!/usr/bin/env node
"use strict";

var path = require('path');
var pkg = require('../package.json');
var program = require('commander');
program
  .version(pkg.version)
  .command('walk', 'walk the current directory')
  .command('preview', 'generate graph')
  .command('info [subject]', 'show info')
  .command('test', 'test')
  .command('poc', 'poc')
  .parse(process.argv);
