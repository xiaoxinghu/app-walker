describe('login page', it => {
  it.has('login btn').locator('#login');
  describe('cancel button', it => {
    it.locator('#cancel');
  });

  it.has('title')
    .when({platform: 'Android'}, it => {
    it.locator('#title');
    })
    .when({platform: 'iOS'}, it => {
    it.can.be.find.by('//title');
  });

  when({platform: 'Android', version: '6.1'}, it => {
    describe('sub view', it => {
      it.should.have('sub view checkbox1');
      describe('sub view button2', it => {});
      when({device: 'Nexus'}, it => {
        it.has('something specific');
      });
      describe('sub view button1', it => {});
    });
  });

  it.can.goto('landing page', page => {
    page
      .setValue('#username', 'admin')
      .setValue('#password', '123')
      .click('#login');
  });
});

describe('landing page', it => {
  describe('login button', it => {
  });
  describe('cancel button', it => {
  });
});
