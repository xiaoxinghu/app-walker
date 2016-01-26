"use strict";
var chai = require('chai'),
    chaiAsPromised = require("chai-as-promised"),
    expect = chai.expect;

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = require('wd').transferPromiseness;

module.exports = (app, _) => {
  app.interface = Object.assign(app.interface || {}, {
    expect
  });
};

