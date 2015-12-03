context
  .called('valid user').with({
    username: 'valid_user',
    password: 'valid_password'
  });

context
  .called('invalid user').with({
    username: 'invalid_user',
    password: 'whatever'
  });

page
  .called('login')
  .should.have('inputbox').called('username').foundBy('id:username')
  .should.have('button').called('login').foundBy('...')
  .should.have('button').called('cancel').foundBy('...')
  .can.goto.page('password').by((page, context) => {
    page.enter(context.username).into('username')
      .then.tap('login');
  });

page
  .called('password')
  .should.have('inputbox').called('password').foundBy('...')
  .should.have('button').called('submit').foundBy('...')
  .should.have('button').called('back').foundBy('...')
  .can.goto.page('login').by((page) => {
    page.tap('back');
  })
  .in.context.of('valid user', (page) => {
    page.can.goto.page('landing page').by((page, context) => {
      page.enter(context.password).into('password')
        .then.tap('submit');
    });
  })
  .in.context.of('invalid user', (page) => {
    page.can.goto.page('error page').by((page, context) => {
      page.enter(context.password).into('password')
        .then.tap('submit');
    })
  });

page
  .called('landing page')
  ...


page
  .called('error page')
  ...
