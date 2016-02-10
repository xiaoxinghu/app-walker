"use strict";
var webdriverio = require('webdriverio');
var R = require('ramda');

module.exports = (app, _) => {

  var _driver, _currentNode;

  function initDriver() {
    var options = {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    };
    var driver = webdriverio.remote(options)
          .init().url(app.config.url);

    driver.addCommand('setValueOn', function(selector, values) {
      var c = R.find(R.propEq('name', selector))(_currentNode.components || []);
      var loc = c ? c.getSelector() : selector;
      return this.setValue(loc, values);
    });

    driver.addCommand('clickOn', function(selector) {
      var c = R.find(R.propEq('name', selector))(_currentNode.components || []);
      var loc = c ? c.getSelector() : selector;
      return this.click(loc);
    });
    return driver;
  }

  function evalNode(node, driver) {
    var selector = node.getSelector(app.context.current);
    if (selector) {
      driver = driver.waitForExist(selector);
    }
    ( node.components || [] ).forEach(c => {
      driver = evalNode(c, driver);
    });
    return driver;
  };

  _.addProperty(app, 'driver', () => {
    return _driver = _driver || initDriver();
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

  app.walker.hook('onEdge', function(path) {
    if (typeof(path.fn) === 'function') {
      return path.fn(app.driver);
    }
    return null;
  });


  app.walker.hook('onNode', function(node) {
    _currentNode = node;
    return evalNode(node, app.driver);
    return null;
  });
};
