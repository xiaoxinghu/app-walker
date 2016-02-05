page('landing')
  .can.goto('accounts', () => {
    output('press accounts button');
  })
  .can.goto('profile', () => {
    output('press profile button');
  });

page('accounts').can.goto('login', () => {
  output('press logout button');
});

page('profile').can.goto('login', () => {
  output('press logout button');
});
