"use strict";

var Component = require('./Component');

class State {
  constructor(name) {
    this.name = name;
    this.lastMentioned = undefined;
    this.components = {};
  }

  /*
  * Mention the name of an Component.
  */
  mention(name) {
    this.lastMentioned = name;
    return this;
  }

  addComponentLocator(locator) {
    this.components[this.lastMentioned] = this.components[this.lastMentioned] || new Component(this.lastMentioned);
    this.components[this.lastMentioned].addLocator(locator);
    return this;
  }

  addComponentValidator(desc, validator) {
    this.components[this.lastMentioned].addValidator(desc, validator);
    return this;
  }

  validate() {
  }
}

module.exports = (appwalker, helper) => {
  appwalker.state = state;
  appwalker.page = state;

  helper.civilize(State.prototype);
  ['button', 'inputbox', 'label'].forEach(keyword => {
    helper.addMethod(State.prototype, keyword, State.prototype.mention);
  });

  ['id', 'name', 'xpath'].forEach(keyword => {
    helper.addMethod(State.prototype, keyword, function (value, on) {
      return this.addComponentLocator({by: keyword, value, on});
    });
  });

  ['it', 'its'].forEach(keyword => {
    helper.addMethod(State.prototype, keyword, State.prototype.addComponentValidator);
  });

  ['goto'].forEach(keyword => {
    helper.addMethod(State.prototype, keyword, function (dest, func) {
      appwalker.graph.setEdge(this.name, dest, {desc: `from ${this.name} to ${dest}`, func: func});
      return this;
    });
  });

  function state(name) {
    // TODO how to handle duplicated page name def
    // if (appwalker.graph.hasNode(name)) {
    //   console.log(util.inspect(appwalker.graph, false, null));
    //   throw new Error(`Model name "${name}" already exists. Model names should be unique.`);
    // }
    var p = new State(name);
    appwalker.graph.setNode(name, p);
    return p;
  }
};
