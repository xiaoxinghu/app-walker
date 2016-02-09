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
    page: name => {
      return app.compiler.node(name);
    }
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
      return ctx.edge.callback(_driver = _driver || initDriver());
    }
    return null;
  });
};
