//# contexts.js -----------------------------
context('valid user', {
  username: 'valid_user',
  password: 'valid_password'
});

context('invalid user', {
  username: 'invalid_user',
  password: 'whatever'
});

//# pages.js -----------------------------
page('login')
// login button
  .should.have.button('login')
  .can.be.found.by.id('login').when({ platform: 'ios' })
  .or.by.xpath('//login').when({ platform: 'android' })
  .and.it('should have text Login on it', {text: 'Login'}).when({lang: 'en'})
  .or.it('should have text 登录 on it', {text: '登录'}).when({lang: 'cn'})

// cancel button
  .should.have.inputbox('cancel')
  .can.be.find.by.id('cancel')
  .and.it('should have text Cancel on it', btn => btn.text == 'Cancel')

// to password page
  .can.goto('password', (page) => {
    page.enter(context.current.username).into('username')
      .then.tap('login');
  }).when('valid user')

// to error page
  .can.goto('error', (page) => {
    page.enter(context.current.username).into('username')
      .then.tap('login');
  }).when('invalid user');


page('password');
// ...

page('error');
// ...

page('landing page');
// ...

//# config1.js -----------------------------
config.entrance = 'login';
context.global = {
  lang: 'en',
  platform: 'ios',
  device: 'iPhone 6+'
};

//# config2.js -----------------------------
config.entrance = 'login';
context.global.lang = 'cn';
context.global.platform = 'android';

// command examples
/*
 walker walk -c config1.js
 walker walk --config config2.js
*/


//# contexts

when({lang: 'en'}).page('blah');

page('blah').when({lang: 'en'});

when({lang: 'en'}).page('blah')
  .should.have.button('login')
  .when({lang: 'en'})
  .should.have.button('calncle');

when({lang: 'en'}).page('blah')
  .should.have.button('login')
  .when({lang: 'en'}, it => {
      it.should.have.button('calncle');
  });

describe('landing page', it => {
  it.has('login').find.by('#login');
  it.has('cancel').find.by('#cancel');
  describe('logout', it => {
    it.can.be.find.by('#logout');
  });
  when('valid user', it => {
    it.has.button('retry');
  });
});
