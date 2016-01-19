page('login')
  .should.have.button('login')
    .can.be.found.by.id('login', 'ios')
    .or.by.xpath('//login', 'android')
    .and.it('should have text Login on it', {text: 'Login'})
  .should.have.inputbox('cancel')
    .can.be.find.by.id('cancel')
    .and.it('should have text Cancel on it', btn => btn.text == 'Cancel')
  .can.goto('password', (page) => {
    console.log('enter user name');
    console.log('press login button');
  });
