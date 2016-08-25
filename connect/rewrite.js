var connect = require('../node_modules/connect')
var url = require('url')
var app = connect()
  .use(rewrite)
  .use(showPost)
  .listen(8700)

var path = url.parse(req.url).pathname;

function rewrite(req, res, next) {
  var match = path.match(/^\/blog\/posts\/(.+)/)
}
