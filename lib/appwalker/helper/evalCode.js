var vm = require('vm');
var fs = require('fs');

module.exports = function(path, sandbox) {
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
