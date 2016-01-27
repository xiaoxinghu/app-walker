"use strict";

module.exports = (app, _) => {
  let EVENTS = app.EVENTS;
  app.walker.on(EVENTS.ON_EDGE, function(info) {
    console.log(`# ${info.from.name} -> ${info.to.name}`.bold);
  });

  app.walker.on(EVENTS.ON_NODE, function(node) {
    console.log(`- on ${node.name}`.bold);
  });

  app.walker.on(EVENTS.BEFORE_EACH, () => {
    console.log('-------------------- flow --------------------'.blue);
  });

  app.walker.on(EVENTS.AFTER_EACH, () => {
  });

  app.walker.on(EVENTS.BEFORE_ALL, () => {
    console.log('===> walk start'.underline.green);
  });

  app.walker.on(EVENTS.AFTER_ALL, () => {
    console.log('<=== walk end'.underline.green);
  });
};
