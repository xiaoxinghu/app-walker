"use strict";
var fs = require('fs');

module.exports = (app, _) => {
  app.config = {};
  app.interface = Object.assign(app.interface || {}, {
    config: app.config
  });

  var sb = {
    config: app.interface.config,
    use: app.interface.use
  };

  app.loadConfig = file => {
    try {
      fs.accessSync(file, fs.F_OK);
      _.evalCode(file, sb);
    } catch (e) {
      console.error(e.message);
      process.exit(1);
    }
  };
};
