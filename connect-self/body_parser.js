var connect = require('../node_modules/connect')
var bodyParser = require('../node_modules/body-parser')
var app = connect()
  .use(bodyParser())
  .use(function(req, res) {
    res.end('Registered new user: ' + req.body.username)
  })
  .listen(8080)
