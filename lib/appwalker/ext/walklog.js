"use strict";

module.exports = (app, _) => {
  let EVENTS = app.EVENTS;
  app.walker.on(EVENTS.ON_EDGE, function(info) {
    console.log('- on edge');
  });

  app.walker.on(EVENTS.ON_NODE, function(node) {
    console.log('- on', node.name);
  });

  app.walker.on(EVENTS.PRE_FLOW, () => {
    console.log('- flow start ---->');
  });

  app.walker.on(EVENTS.POST_FLOW, () => {
    console.log('- flow end <----');
  });

  app.walker.on(EVENTS.PRE_WALK, () => {
    console.log('================> walk start');
  });

  app.walker.on(EVENTS.POST_WALK, () => {
    console.log('################ walk end');
  });
};
