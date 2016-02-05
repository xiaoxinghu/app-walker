var addMethod = require('./addMethod');

module.exports = function(ctx, fnName, sugar) {
  if (!Array.isArray(sugar)) sugar = [sugar];
  sugar.forEach(keyword => {
    addMethod(ctx, keyword, ctx[fnName]);
  });
};
