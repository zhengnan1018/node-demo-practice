var connect = require('../node_modules/connect')
var cookieParser = require('../node_modules/cookie-parser')
// console.log(connect());
var app = connect()
  .use(cookieParser('tobi is a cool ferret'))
  .use(function(req, res) {
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.end('hello\n')
  })
  .listen(8080)
