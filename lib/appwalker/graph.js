"use strict";

class Graph {
  constructor(name) {
    this.name = name;
    this.models = {};
  }
}

module.exports = Graph;

module.exports = (appwalker, helper) => {
  appwalker.graph = new Graph('default');
  helper.addMethod(Graph.prototype, 'newModel', function(name) {
    var m = new appwalker.Model(name);
    if (this.models.hasOwnProperty(name)) {
      throw new Error(`Model name "${name}" already exists. Model names should be unique.`);
    }
    this.models[name] = m;
    return m;
  });
}
