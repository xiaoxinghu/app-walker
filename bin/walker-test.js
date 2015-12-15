#!/usr/bin/env node

var util = require('util');
var vm = require('vm');
var fs = require('fs');

var walker = require('../lib/appwalker');

function evalCode(path) {
  var sandbox = {
    page: walker.page
  };

  var context = new vm.createContext(sandbox);

  // fs.readFile(path, function(err, data) {
  //   if (err) throw err;
  //   var script = new vm.Script(data.toString());
  //   var page = script.runInContext(context);
  // })
  var code = fs.readFileSync(path);
  var script = new vm.Script(code.toString());
  script.runInContext(context);
}

['../examples/simple.js'
, '../examples/graph.js'].forEach(path => evalCode(path));

console.log(util.inspect(walker.graph, false, null));
