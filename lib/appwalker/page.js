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

  addElementValidator(validator) {
    this.elements[this.lmElement].addValidator(validator);
    return this;
  }
}

const elementTypes = ['button', 'inputbox', 'label'];
const locator = ['id', 'name', 'xpath'];

module.exports = (appwalker, util) => {
  appwalker.Model = Page;

  appwalker.page = page;

  util.civilize(Page.prototype);
  elementTypes.forEach((t) => {
    util.addMethod(Page.prototype, t, Page.prototype.mention);
  });

  locator.forEach((by) => {
    util.addMethod(Page.prototype, by, function (value, on) {
      return this.addElementLocator({by, value, on});
    });
  })


  function page(name) {
    return new appwalker.Model(name);
  }
};
