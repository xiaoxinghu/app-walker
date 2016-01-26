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

module.exports = (app, _) => {
  var _driver;

  app.interface = Object.assign(app.interface || {}, {
    driver: function() {
      _driver = _driver || initDriver();
      return _driver;
    }
  });

  app.hook('beforeEach', () => {
    _driver = wd.promiseChainRemote();
    return _driver.init({browserName: 'chrome'});
  });

  app.hook('afterEach', () => {
    return _driver.quit();
  });
};
