"use strict";

var Element = require('./element');

class Page extends require('./model') {
  constructor(name) {
    super(name);
    this.lmElement = undefined;
    this.elements = {};
  }

  mention(name) {
    this.lmElement = name;
    return this;
  }

  addElementLocator(locator) {
    this.elements[this.lmElement] = this.elements[this.lmElement] || new Element(this.lmElement);
    this.elements[this.lmElement].addLocator(locator);
    return this;
  }

  addElementValidator(desc, validator) {
    this.elements[this.lmElement].addValidator(desc, validator);
    return this;
  }
}

const elementTypes = ['button', 'inputbox', 'label'];
const locators = ['id', 'name', 'xpath'];
const validators = ['it', 'its'];

module.exports = (appwalker, helper) => {
  appwalker.Model = Page;

  appwalker.page = page;

  helper.civilize(Page.prototype);
  elementTypes.forEach((t) => {
    helper.addMethod(Page.prototype, t, Page.prototype.mention);
  });

  locators.forEach((by) => {
    helper.addMethod(Page.prototype, by, function (value, on) {
      return this.addElementLocator({by, value, on});
    });
  })

  validators.forEach(v => {
    helper.addMethod(Page.prototype, v, Page.prototype.addElementValidator);
  })


  function page(name) {
    return appwalker.graph.newModel(name);
  }
};
