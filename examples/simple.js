
page('simple login')
  .should.have.button('login')
    .can.be.found.by.id('login', 'ios')
    .or.by.xpath('//login', 'android')
    .and.it('should have text Login in it', {text: 'Login'})
  .should.have.inputbox('cancel')
    .can.be.find.by.id('cancel')
    .and.it('should have text Cancel in it', btn => btn.text == 'Cancel');
