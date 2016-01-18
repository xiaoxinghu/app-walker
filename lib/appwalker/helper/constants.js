module.exports = function(prefix, keys) {
  return keys.reduce(function (obj, key) {
    obj[key] = prefix + key;
    return obj;
  }, {});
};
