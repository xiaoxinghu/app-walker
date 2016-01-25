"use strict";

module.exports = (app, _) => {
  let EVENTS = app.EVENTS;
  app.walker.on(EVENTS.ON_EDGE, function(info) {
    console.log(`# ${info.from.name} -> ${info.to.name}`.bold);
  });

  app.walker.on(EVENTS.ON_NODE, function(node) {
    console.log(`- on ${node.name}`.bold);
  });

  app.walker.on(EVENTS.PRE_FLOW, (flow) => {
    console.log('-------------------- flow --------------------'.blue);
    console.log(flow.desc.blue);
  });

  app.walker.on(EVENTS.POST_FLOW, () => {
  });

  app.walker.on(EVENTS.PRE_WALK, () => {
    console.log('===> walk start'.underline.green);
  });

  app.walker.on(EVENTS.POST_WALK, () => {
    console.log('<=== walk end'.underline.green);
  });
};
