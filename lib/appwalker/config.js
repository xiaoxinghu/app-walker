"use strict";
var fs = require('fs');

class Config {
  get entrance() {
    return this._entrance;
  }

  set entrance(id) {
    this._entrance = id;
  }
}

module.exports = (appwalker, helper) => {
  appwalker.config = new Config();
  var sandbox = {
    config: appwalker.config,
    console: console
  };

  // read config files automaticly
  ['config.js', '.appwalkerrc'].forEach(file => {
    try {
      fs.accessSync(file, fs.F_OK);
      helper.evalCode(file, sandbox);
    } catch (e) {
      // console.error(file, 'does not exist.');
    }
  })
}
