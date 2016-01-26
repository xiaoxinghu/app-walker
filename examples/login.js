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
    // output(info.from.name, info.to.name, driver);
    // output(info);
    driver().get("http://google.com").title().should.become('Google').done();
    // driver().title().should.become('Baidu').done();
    // info.app.wd.browser.get();
    // var counter = 0;
    // var sum = 0;
    // while (counter < 10000000000) {
    //   sum += counter;
    //   counter++;
    // }
    // output('sum:', sum);
  });
