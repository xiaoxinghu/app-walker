var R = require('ramda');

var exports = module.exports = {};

var isMeta = c => !R.isEmpty(c) && !R.isNil(c);

exports.push = (obj, meta) => {
  if (isMeta(meta)) {
    obj.__meta = obj.__meta || [];
    obj.__meta.push(meta);
  }
};

exports.pop = obj => {
  obj.__meta.pop();
};

exports.get = obj => {
  var meta = {};
  ( obj.__meta || [] ).forEach(c => {
    Object.assign(meta, c);
  });
  return meta;
};
