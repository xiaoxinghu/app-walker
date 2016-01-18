#!/usr/bin/env node
"use strict";

var program = require('commander');
var util = require('util');

program.parse(process.argv);
var subject = program.args[0];

var walker = require('../lib/appwalker');
console.log(util.inspect(walker, false, null));
