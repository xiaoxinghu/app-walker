#!/usr/bin/env node
"use strict";

var path = require('path'),
    pkg = require('../package.json'),
    program = require('commander'),
    app = require('../lib/appwalker');

program
  .version(pkg.version)
  .command('walk', 'walk the current directory')
  .command('preview', 'generate graph')
  .command('info [subject]', 'show info')
  .command('test', 'test')
  .command('poc', 'poc')
  .parse(process.argv);
