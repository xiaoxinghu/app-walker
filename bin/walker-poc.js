#!/usr/bin/env node
"use strict";

var app = require('../lib/appwalker');
var alias = require('../lib/appwalker/helper/alias');
var R = require('ramda');

class Subject {
  constructor() {
    this.name = 'batman';
  }

  sayHello() {
    console.log('hello world');
  }
}

alias(Subject.prototype, ['say', 'hello', 'sayHello']);

var subject = new Subject();
subject.sayHello();
subject.say();
subject.hello();

// var print = x => console.log(x);

// var printAll = R.forEach(print);
// printAll([1, 2, 3]);
