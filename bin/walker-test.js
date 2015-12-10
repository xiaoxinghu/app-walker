#!/usr/bin/env node

var util = require('util');

var walker = require('../lib/appwalker');
page = walker.page('login')
  .should.have.button('login')
    .can.be.found.by.id('login', 'ios')
    .or.by.xpath('//login', 'android')
    .addElementValidator({text: 'Login'})
  .should.have.inputbox('cancel')
    .can.be.find.by.id('cancel')
    .addElementValidator((btn) => btn.text == 'Cancel');

console.log(util.inspect(page, false, null));
