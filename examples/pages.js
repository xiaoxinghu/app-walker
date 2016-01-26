page('landing')
  .can.goto('accounts', (page) => {
    // var counter = 1;
    // var sum = 0;
    // while(counter < 1000000) {
    //   sum += counter;
    //   counter++;
    // }
    // expect(sum).to.equal(2);
    // output('sum->', sum);
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
