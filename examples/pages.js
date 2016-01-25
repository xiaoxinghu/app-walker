page('landing')
  .can.goto('accounts', (page) => {
    output('press accounts button');
    expect(1).to.equal(1);
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
