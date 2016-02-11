var addFunc = require('./addFunc');
var R = require('ramda');

module.exports = function(ctx, aliases) {
  var hasFn = fn => typeof ctx[fn] == 'function';
  var selected = R.find(hasFn, aliases);
  if (!selected) {
    throw `Cannot find existing function [ ${aliases} ]`;
  }
  var makeAlias = a => addFunc(ctx, a, ctx[selected]);
  var makeAliases = R.forEach(makeAlias);
  makeAliases(aliases);
};
