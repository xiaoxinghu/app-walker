page('landing')
  .can.goto('accounts', (page) => {
    output('press accounts button');
  })
  .can.goto('profile', (page) => {
    output('press profile button');
  });

page('accounts').can.goto('login', function(page) {
  output('press logout button');
});

page('profile').can.goto('login', function(page) {
  output('press logout button');
});
