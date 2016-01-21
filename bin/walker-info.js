#!/usr/bin/env node
"use strict";

var program = require('commander');
var util = require('util');

program.parse(process.argv);
var subject = program.args[0];

var walker = require('../lib/appwalker');
var target = walker;
if (subject) target = walker[subject];
console.log(util.inspect(target, false, null));
