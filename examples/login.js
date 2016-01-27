page('login')
// login button
  .should.have.button('login')
    .can.be.found.by.id('login', 'ios')
    .or.by.xpath('//login', 'android')
    .and.it('should have text Login on it', {text: 'Login'})

// cancel button
  .should.have.inputbox('cancel')
    .can.be.find.by.id('cancel')
    .and.it('should have text Cancel on it', btn => btn.text == 'Cancel')

// password button
  .can.goto('password', (info) => {
    output('enter user name');
    output('press login button');
  });
