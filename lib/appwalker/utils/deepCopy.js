module.exports = function(obj) {
  var result = JSON.parse(JSON.stringify(obj));
  // console.log('source', obj);
  // console.log('copied', result);
  return result;
  // return JSON.parse(JSON.stringify(obj));
};
