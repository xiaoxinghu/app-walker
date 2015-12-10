page('login')
  .should.have('inputbox').called('username').foundBy({
    ios: 'id:username',
    android: 'id:userName'
  })
  .should.have('button').called('login').foundBy('...')
  .should.have('button').called('cancel').foundBy('...')
  .can.goto.page('password').by((page) => {
    page.enter('user1').into('username')
      .then.tap('login');
  });

page('password')
  .should.have('inputbox').called('password').foundBy('...')
  .should.have('button').called('submit').foundBy('...')
  .should.have('button').called('back').foundBy('...')
  .can.goto.page('login').by((page) => {
    page.tap('back');
  })
  .can.goto.page('landing page').by((page) => {
    page.enter('password1').into('password')
      .then.tap('submit');
  });

page
  .called('landing page')
  ...
