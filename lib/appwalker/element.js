"use strict";

class Element {
  constructor(name) {
    this.name = name;
    this.locators = [];
    this.validators = [];
  }

  addLocator(locator) {
    this.locators.push(locator);
  }

  addValidator(validator) {
    if (typeof validator === 'function') {
      this.validators.push(validator);
    } else {
      this.validators.push(function (e) {
        for (let k in conditon) {
          // assert e[k] == conditon[k]
        }
      });
    }
  }

  validate() {
    this.validators.forEach(function (fn) {
      fn.call(this, ele);
    });
  }

  locate() {

  }
}

module.exports = Element;
