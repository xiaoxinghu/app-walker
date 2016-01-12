"use strict";

class Component {
  constructor(name) {
    this.name = name;
    this.locators = [];
    this.validators = [];
  }

  addLocator(locator) {
    this.locators.push(locator);
  }

  addValidator(desc, validator) {
    let v = {
      desc
    };
    if (typeof validator === 'function') {
      v.func = validator;
    } else {
      v.func = function (e) {
        for (let k in conditon) {
          // assert e[k] == conditon[k]
        }
      };
    }
    this.validators.push(v);
  }

  validate() {
    this.validators.forEach(function (fn) {
      fn.call(this, ele);
    });
  }

  locate() {

  }
}

module.exports = Component;
