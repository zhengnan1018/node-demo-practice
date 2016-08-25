'use strict'
let connect = require('../node_modules/connect');
let app = connect()
  .use(logger(':method: url'))
  .use(hello)

function setup(format) {
  const regExp = /:(\w+)/g;
  return function(req, res, next) {
    let str = format.replace(regExp, function(match, property) {
      return req[property]
    });
    console.log(str);
    next();
  }
}

module.exports = setup
