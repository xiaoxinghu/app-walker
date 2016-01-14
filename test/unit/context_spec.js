'use strict';

var util = require('util');
var walker = require('../../lib/appwalker');
var context = walker.context;
var expect = require('chai').expect;

describe('context', () => {
  it ('can add/retrieve named scenario contexts', () => {
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

    context.scenario(s1.name, s1);
    context.scenario(s2.name, s2);

    expect(context.scenario(s1.name)).to.deep.equal(s1);
    expect(context.scenario(s2.name)).to.deep.equal(s2);

  });

  it ('can amend scenario contexts', () => {
    let s = {
      name: 's1',
      user: 'user1',
      password: 'password1'
    };
    context.scenario(s.name, s);
    context.scenario(s.name, {
      password: 'password2',
      role: 'admin'
    });

    expect(context.scenario(s.name).password).to.equal('password2');
    expect(context.scenario(s.name)).to.have.property('role').and.equal('admin');
  });

  it ('can add/retrieve global context', () => {
    let g = {
      url: 'www.google.com',
      platform: 'iOS'
    };
    context.global = g;
    expect(context.global).to.deep.equal(g);
  });
});
