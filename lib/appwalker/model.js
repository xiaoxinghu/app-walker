"use strict";

class Model {
  constructor(name) {
    this.name = name;
    this.paths = [];
  }

  sayHello() {
    console.log(`Hello from ${this.name}`);
  }
};

module.exports = Model;
