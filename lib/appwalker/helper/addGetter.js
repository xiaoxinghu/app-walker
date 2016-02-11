module.exports = function (ctx, name, getter) {
  Object.defineProperty(
    ctx, name,
    { get: function() {
      var result = getter.call(this);
      return result === undefined ? this : result;
    }
      , configurable: true
    });
};
