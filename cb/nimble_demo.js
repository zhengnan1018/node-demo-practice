var flow = require('../node_modules/nimble')

console.log(flow);
flow.series([
  function(callback) {
    setTimeout(function() {
      console.log('I am exec first');
      callback();
    }, 1000)
  },
  function(callback) {
    setTimeout(function() {
      console.log('I am exec second');
      callback();
    }, 800)
  },
  function(callback) {
    setTimeout(function() {
      console.log('I am exec third');
      callback();
    }, 500)
  }
])
