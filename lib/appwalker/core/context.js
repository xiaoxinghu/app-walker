"use strict";

module.exports = (app, _) => {
  var Context = function() {
    this.global = {};
    this._scenarios = {};
  };

  // _.addFunc(Context.prototype, 'reset', function() {
  //   this.global = {};
  //   this._scenarios = {};
  //   this._sandbox = undefined;
  // });

  _.addProp(Context.prototype, 'current', function() {
    if (!this._sandbox) this.sandbox();
    return this._sandbox;
  });

  _.addFunc(Context.prototype, 'scenario', function(name, context) {
    var c = this._scenarios[name] || {};
    if (context) {
      Object.assign(c, _.deepCopy(context));
    }
    return _.deepCopy(this._scenarios[name] = c);
  });

  _.addFunc(Context.prototype, 'sandbox', function(scenario) {
    return this._sandbox = Object.assign(this.global, this.scenario(scenario));
  });

  // _.overrideFunc(app, 'reset', function(_super) {
  //   return function () {
  //     _super.apply(this, arguments);
  //     app.context = new Context();
  //   };
  // });
  app.when('reset', _app => {
    console.log('context.reset');
    app.context = new Context();
  });

  app.context = new Context();
  app.interface = Object.assign(app.interface || {}, {
    scenario: (name, context) => {
      return app.context.scenario(name, context);
    },
    get context() {
      return app.context;
    }
  });
};
