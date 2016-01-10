page('login').can.goto('password', function(page) {
  console.log('input username');
  console.log('press login buttion');
});
page('password').can.goto('landing', function(page) {
  console.log('input password');
  console.log('press send buttion');
});
page('landing');
