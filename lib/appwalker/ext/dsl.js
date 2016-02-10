"use strict";
var webdriverio = require('webdriverio');

module.exports = (app, _) => {
  _.chain(app.Component.prototype,
          [ 'to', 'be', 'been'
            , 'is', 'and', 'or',
            , 'with', 'that', 'which', 'at'
            , 'of', 'found', 'find', 'should', 'can' ]);
  _.alias(app.Component.prototype, ['has', 'have', 'button']);
  _.alias(app.Component.prototype, ['addSelector', 'by']);
  _.alias(app.Component.prototype, ['addPath', 'goto']);
};
