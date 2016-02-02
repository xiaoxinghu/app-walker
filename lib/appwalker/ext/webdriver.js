"use strict";
var webdriverio = require('webdriverio');

function initDriver() {
  var options = {
    desiredCapabilities: {
      browserName: 'chrome'
    }
  };
  return webdriverio.remote(options).init();
}

module.exports = (app, _) => {
  var _driver;

  app.interface = Object.assign(app.interface || {}, {
    page: app.interface.state,
    driver: function() {
      _driver = _driver || initDriver();
      return _driver;
    }
  });

  // extend State
  var State = app.State;
  _.civilize(State.prototype);
  // mention an element
  ['button', 'inputbox', 'label'].forEach(keyword => {
    _.addMethod(State.prototype, keyword, function (name) {
      this.lastMentioned = name;
      return this;
    });
  });

  ['id', 'name', 'xpath'].forEach(keyword => {
    _.addMethod(State.prototype, keyword, function (value) {
      console.log('add component');
      return this;
      // return this.addComponentLocator({by: keyword, value, on});
    });
  });

  ['it', 'its'].forEach(keyword => {
    _.addMethod(State.prototype, keyword, function (desc, validator) {
      return this;
    });
  });

  ['goto'].forEach(keyword => {
    _.addMethod(State.prototype, keyword, function (dest, callback) {
      // create dest node if does not exist
      app.graph.setNode(dest, new State(dest));
      app.graph.setEdge(this.name, dest, {desc: `from ${this.name} to ${dest}`, callback});
      return this;
    });
  });

  // add hooks
  app.walker.hook('beforeEach', () => {
    _driver = undefined;
  });

  app.walker.hook('afterEach', () => {
    if (_driver) {
      return _driver.end();
    }
    return null;
  });

  app.walker.hook('onEdge', function(ctx) {
    if (typeof(ctx.edge.callback) === 'function') {
      return ctx.edge.callback({
        from: ctx.from,
        to: ctx.to
      });
    }
    return null;
  });
};
