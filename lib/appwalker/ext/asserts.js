"use strict";
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

module.exports = (app, _) => {
  app.interface = Object.assign(app.interface || {}, {
    expect,
    should
  });
};
