context('valid user', {
  username: 'valid_user',
  password: 'valid_password'
});

context('invalid user', {
  username: 'invalid_user',
  password: 'whatever'
});

page('login')
  .should.have.button('login')
  .can.be.found.by.id('login', 'ios')
  .or.by.xpath('//login', 'android')
  .and.it('should have text Login on it', {text: 'Login'})
  .should.have.inputbox('cancel')
  .can.be.find.by.id('cancel')
  .and.it('should have text Cancel on it', btn => btn.text == 'Cancel')
  .can.goto('password', (page) => {
    page.enter(context.current.username).into('username')
      .then.tap('login');
  });

page('password')
  ...

page('landing page')
  ...

page('error page')
  ...
