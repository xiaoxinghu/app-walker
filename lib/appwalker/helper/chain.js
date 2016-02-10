var addProperty = require('./addProperty');

module.exports = function(ctx, keywords) {
  keywords.forEach(function(keyword) {
      addProperty(ctx, keyword, function() {
        return this;
      });
    });
  [ 'to', 'be', 'been'
    , 'is', 'and', 'or',
    , 'with', 'that', 'which', 'at'
    , 'of', 'found', 'find', 'should', 'can' ].forEach(function(chain) {
      addProperty(ctx, chain, function() {
        return this;
      });
    });
};
