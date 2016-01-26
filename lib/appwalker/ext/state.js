"use strict";

var util = require('util');
var Component = require('./component');

class State {
  constructor(name) {
    this.name = name;
    this.lastMentioned = '';
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
    this.components.forEach(component => {
      component.validate();
    });
  }
}

module.exports = (app, _) => {
  app.interface = Object.assign(app.interface || {}, {
    state: state,
    page: state
  });
  let EVENTS = app.EVENTS;
  app.hook('onEdge', function(ctx) {
    if (typeof(ctx.edge.func) === 'function') {
      return ctx.edge.func({
        from: ctx.from,
        to: ctx.to
      });
    }
    return null;
  });

  _.civilize(State.prototype);
  ['button', 'inputbox', 'label'].forEach(keyword => {
    _.addMethod(State.prototype, keyword, State.prototype.mention);
  });

  ['id', 'name', 'xpath'].forEach(keyword => {
    _.addMethod(State.prototype, keyword, function (value, on) {
      return this.addComponentLocator({by: keyword, value, on});
    });
  });

  ['it', 'its'].forEach(keyword => {
    _.addMethod(State.prototype, keyword, State.prototype.addComponentValidator);
  });

  ['goto'].forEach(keyword => {
    _.addMethod(State.prototype, keyword, function (dest, func) {
      // create dest node if does not exist
      app.graph.setNode(dest, new State(dest));
      app.graph.setEdge(this.name, dest, {desc: `from ${this.name} to ${dest}`, func: func});
      return this;
    });
  });

  function state(name) {
    // TODO how to handle duplicated page name def
    // if (app.graph.hasNode(name)) {
    //   console.log(util.inspect(app.graph, false, null));
    //   throw new Error(`Model name "${name}" already exists. Model names should be unique.`);
    // }
    if (!app.graph.hasNode(name)) {
      app.graph.setNode(name, new State(name));
    }
    return app.graph.node(name);
  }
};
