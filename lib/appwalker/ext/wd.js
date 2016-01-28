"use strict";
var wd = require('wd');

function initDriver() {
  var driver = wd.promiseChainRemote();
  // driver.on('status', function(info) {
  //   console.log(info.cyan);
  // });
  // driver.on('command', function(eventType, command, response) {
  //   console.log(' > ' + eventType.cyan, command, (response || '').grey);
  // });
  // driver.on('http', function(meth, path, data) {
  //   console.log(' > ' + meth.magenta, path, (data || '').grey);
  // });
  return driver.init({browserName: 'chrome'});
}

// Locatable
function Locatable() {
  this.located = undefined;
  this.locators = [];
};

Locatable.prototype.addLocator = function(locator, condition) {
  this.locators.push(locator);
};

Locatable.prototype.locate = function() {
  if (!this.located) {
  }
};

// Validatable
function Validatable() {
  this.validators = [];
};

Validatable.prototype.addValidator = function(validator, desc) {
};

Validatable.prototype.validate = function() {
};

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
    _.addMethod(State.prototype, keyword, function (dest, func) {
      // create dest node if does not exist
      app.graph.setNode(dest, new State(dest));
      app.graph.setEdge(this.name, dest, {desc: `from ${this.name} to ${dest}`, func: func});
      return this;
    });
  });

  // add hooks
  app.walker.hook('beforeEach', () => {
    _driver = wd.promiseChainRemote();
    return _driver.init({browserName: 'chrome'});
  });

  app.walker.hook('afterEach', () => {
    return _driver.quit();
  });

  app.walker.hook('onEdge', function(ctx) {
    if (typeof(ctx.edge.func) === 'function') {
      return ctx.edge.func({
        from: ctx.from,
        to: ctx.to
      });
    }
    return null;
  });
};
