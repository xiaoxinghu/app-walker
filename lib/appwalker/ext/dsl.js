"use strict";
var webdriverio = require('webdriverio');

module.exports = (app, _) => {
  _.civilize(app.Compiler.prototype);
  _.civilize(app.Component.prototype);
  _.alias(app.Component.prototype, ['has', 'have']);
  _.alias(app.Component.prototype, ['locator', 'by']);
  // mention an element
  _.sugarCoat(app.Compiler.prototype, 'component', ['button', 'inputbox', 'label']);
  _.sugarCoat(app.Compiler.prototype, 'locate', ['id', 'name', 'xpath']);
  _.sugarCoat(app.Compiler.prototype, 'evaluate', ['it', 'its']);
  _.sugarCoat(app.Compiler.prototype, 'path', ['goto']);
};
