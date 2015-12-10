page('login')
  .should.have.button('login')
    .can.be.found.by.id('login', 'ios')
    .and.by.xpath('//login', 'android')
    .which({text: 'Login'})
  .should.have.inputbox('cancel')
    .can.be.find.by.id('cancel')
    .which((btn) => btn.text == 'Cancel');
