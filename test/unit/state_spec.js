'use strict';

var util = require('util');
var walker = require('../../lib/appwalker');
var page = walker.interface.state;
var expect = require('chai').expect;

describe('state', () => {
  it ('can generate simple page with elements', () => {
    var p = page('simple page')
      .should.have.button('login')
        .can.be.found.by.id('login', 'ios')
        .or.by.xpath('//login', 'android')
        .and.it('should have text Login in it', {text: 'Login'})
      .should.have.inputbox('cancel')
        .can.be.find.by.id('cancel')
        .and.it('should have text Cancel in it', btn => btn.text == 'Cancel');

    expect(p.name).to.equal('simple page');
    expect(Object.keys(p.components)).to.have.length(2);
    expect(p.components).to.have.property('login')
      .with.property('locators').deep.equal(
        [{ by: 'id', on: 'ios', value: 'login' },
        { by: 'xpath', on: 'android', value: '//login' }]);
    // TODO complete the asserts
  });
});
