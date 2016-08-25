var connect = require('connect')
var router = require('./router')
var routers = {
  GET: {
    '/users': function(req, res) {
      res.end('tobi, loki, ferret')
    },
    '/user/:id': function(req, res, id) {
      res.end('user ' + id)
    }
  },
  DELETE: {
    '/user/:id': function(req, res, id) {
      res.end('deleted user ' + id);
    }
  }
}

connect()
  .use(router(routers))
  .listen(8700)
