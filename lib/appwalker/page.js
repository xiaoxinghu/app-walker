"use strict";

var Element = require('./element');

class Page {
  constructor(name) {
    this.name = name;
    this.lmElement = undefined;
    this.elements = {};
  }

  /*
  * Mention the name of an element.
  */
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

module.exports = (appwalker, helper) => {
  appwalker.page = page;

  helper.civilize(Page.prototype);
  ['button', 'inputbox', 'label'].forEach(keyword => {
    helper.addMethod(Page.prototype, keyword, Page.prototype.mention);
  });

  ['id', 'name', 'xpath'].forEach(keyword => {
    helper.addMethod(Page.prototype, keyword, function (value, on) {
      return this.addElementLocator({by: keyword, value, on});
    });
  });

  ['it', 'its'].forEach(keyword => {
    helper.addMethod(Page.prototype, keyword, Page.prototype.addElementValidator);
  });

  ['goto'].forEach(keyword => {
    helper.addMethod(Page.prototype, keyword, function (dest, func) {
      appwalker.graph.setEdge(this.name, dest, {desc: `from ${this.name} to ${dest}`, func: func});
      return this;
    });
  });

  function page(name) {
    // TODO how to handle duplicated page name def
    // if (appwalker.graph.hasNode(name)) {
    //   console.log(util.inspect(appwalker.graph, false, null));
    //   throw new Error(`Model name "${name}" already exists. Model names should be unique.`);
    // }
    var p = new Page(name);
    appwalker.graph.setNode(name, p);
    return p;
  }
};
