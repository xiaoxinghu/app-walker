"use strict";

class Graph {
  constructor(name) {
    this.name = name;
    this.models = {};
    this.paths = [];
  }
}

module.exports = Graph;

module.exports = (appwalker, helper) => {
  appwalker.graph = new Graph('default');

  helper.addMethod(Graph.prototype, 'newModel', newModel);
  helper.addMethod(Graph.prototype, 'newPath', newPath);

  function newModel(name) {
    var m = new appwalker.Model(name);
    if (this.models.hasOwnProperty(name)) {
      throw new Error(`Model name "${name}" already exists. Model names should be unique.`);
    }
    this.models[name] = m;
    return m;
  }

  function newPath(name, from, to, func) {
    var p = new appwalker.Path(name, from, to, func);
    this.paths.push(p);
    return p;
  }
}
