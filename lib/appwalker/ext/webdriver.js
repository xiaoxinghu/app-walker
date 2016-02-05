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
  app.compiler = new app.Compiler();

  app.interface = Object.assign(app.interface || {}, {
    page: name => {
      return app.compiler.node(name);
    }
  });

  _.civilize(app.Compiler.prototype);
  // mention an element
  _.sugarCoat(app.Compiler.prototype, 'component', ['button', 'inputbox', 'label']);
  _.sugarCoat(app.Compiler.prototype, 'locate', ['id', 'name', 'xpath']);
  _.sugarCoat(app.Compiler.prototype, 'evaluate', ['it', 'its']);
  _.sugarCoat(app.Compiler.prototype, 'path', ['goto']);

  // ['goto'].forEach(keyword => {
  //   _.addMethod(app.Compiler.prototype, keyword, function (dest, callback) {
  //     // create dest node if does not exist
  //     // app.graph.setNode(dest, new State(dest));
  //     // app.graph.setEdge(this.name, dest, {desc: `from ${this.name} to ${dest}`, callback});
  //     return this;
  //   });
  // });

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
      return ctx.edge.callback(_driver = _driver || initDriver());
    }
    return null;
  });
};
