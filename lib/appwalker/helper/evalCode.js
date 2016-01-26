"use strict";

var vm = require('vm'),
    fs = require('fs');

var _history = [];

module.exports = function(path, sandbox) {
  if (_history.indexOf(path) > -1) return;
  var context = new vm.createContext(sandbox);
  var code = fs.readFileSync(path);
  var script = new vm.Script(code.toString());
  script.runInContext(context);
  _history.push(path);
  console.log(_history);
};
