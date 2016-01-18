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

module.exports = (sandbox, _) => {
  sandbox.config = new Config();
  sandbox.interface = Object.assign(sandbox.interface || {}, {
    config: sandbox.config
  });
  var sb = {
    config: sandbox.config,
    console: console
  };

  // read config files automaticly
  ['config.js', '.appwalkerrc'].forEach(file => {
    try {
      fs.accessSync(file, fs.F_OK);
      _.evalCode(file, sb);
    } catch (e) {
      // console.error(file, 'does not exist.');
    }
  });
};
