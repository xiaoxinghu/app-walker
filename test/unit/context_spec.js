'use strict';

var util = require('util');
var walker = require('../../lib/appwalker');
var context = walker.interface.context;
var scenario = walker.interface.scenario;
var expect = require('chai').expect;

describe('context', () => {
  beforeEach(() => {
    walker.reset();
  });

  it ('can switch scenarios', () => {
    let s1 = {
      name: 'scenario1',
      user: 'user1',
      password: 'password1'
    };

    let s2 = {
      name: 'scenario2',
      user: 'user2',
      password: 'password2'
    };

    scenario(s1.name, s1);
    scenario(s2.name, s2);

    context.sandbox('scenario1');
    expect(context.current).to.deep.equal(s1);

    context.sandbox('scenario2');
    expect(context.current).to.deep.equal(s2);

  });

  it ('can amend scenario contexts', () => {
    let s = {
      name: 's1',
      user: 'user1',
      password: 'password1'
    };
    scenario(s.name, s);
    scenario(s.name, {
      password: 'password2',
      role: 'admin'
    });

    context.sandbox('s1');
    expect(context.current.password).to.equal('password2');
    expect(context.current).to.have.property('role').and.equal('admin');
  });

  it ('can add/retrieve global context', () => {
    let g = {
      url: 'www.google.com',
      platform: 'iOS',
      app: {
        name: 'google'
      }
    };
    context.global = g;
    expect(context.current).to.deep.equal(g);
  });

  it ('context cannot be modified without setter', () => {
    // TODO implement this
  });

  it ('generates context of combination of global and current scenario', () => {
    context.global = {
      url: 'www.google.com'
    };
    scenario('s1', {
      app: 'myApp'
    });
    context.sandbox('s1');
    expect(context.current).have.property('url').and.equal('www.google.com');
    expect(context.current).have.property('app').and.equal('myApp');
  });

  it ('can add variables to sandbox during running, and restored after re-sandbox', () => {
    scenario('s1', {
      app: 'myApp'
    });
    context.sandbox('s1');
    context.current.version = '1.0';
    expect(context.current).have.property('app').and.equal('myApp');
    expect(context.current).have.property('version').and.equal('1.0');
    context.sandbox('s1');
    expect(context.current).have.property('app').and.equal('myApp');
    expect(context.current).not.have.property('version');
  });
});
