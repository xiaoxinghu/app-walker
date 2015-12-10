var addProperty = require('./addProperty');

module.exports = function(ctx) {
  [ 'to', 'be', 'been'
  , 'is', 'and', 'or', 'has', 'have'
  , 'with', 'that', 'which', 'at', 'by'
  , 'of', 'found', 'find', 'should', 'can' ].forEach(function(chain) {
    addProperty(ctx, chain, function() {
      return this;
    });
  });
}
