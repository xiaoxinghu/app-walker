var addProp = require('./addProp');

module.exports = function(ctx, keywords) {
  keywords.forEach(function(keyword) {
      addProp(ctx, keyword, function() {
        return this;
      });
    });
  [ 'to', 'be', 'been'
    , 'is', 'and', 'or',
    , 'with', 'that', 'which', 'at'
    , 'of', 'found', 'find', 'should', 'can' ].forEach(function(chain) {
      addProp(ctx, chain, function() {
        return this;
      });
    });
};
