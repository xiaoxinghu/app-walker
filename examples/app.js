page('landing')
  .can.goto('accounts', (page) => {
    console.log('press accounts button');
  })
  .can.goto('profile', (page) => {
    console.log('press profile button');
  });

page('accounts').can.goto('login', function(page) {
  console.log('press logout button');
});

page('profile').can.goto('login', function(page) {
  console.log('press logout button');
});
