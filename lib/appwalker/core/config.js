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

module.exports = (app, _) => {
  app.config = new Config();
  app.interface = Object.assign(app.interface || {}, {
    config: app.config
  });
  var sb = {
    config: app.config,
    use: app.interface.use
  };

  // read config files automatically
  ['config.js', '.appwalker'].forEach(file => {
    try {
      fs.accessSync(file, fs.F_OK);
      _.evalCode(file, sb);
    } catch (e) {
      // console.error(file, 'does not exist.');
    }
  });
};
