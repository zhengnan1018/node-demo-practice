var connect = require('../node_modules/connect')
var app = connect()

app
  .use(logger)
  .use(hello)
app.listen(8700)

function logger(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
}

function hello(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
}

function restrict(req, res, next) {
  var authorization = req.headers.authorization;
  if (!authorization) return next(new Error('Unauthorization!'))

  var parts = authorization.split(' ');
  var scheme = parts[0];
  var auth = new Buffer(parts[1], 'base64').toString().split(':');
  var user = auth[0];
  var pass = auth[1];

  authenticateWithDatabase(user, pass, function(err) {
    if (err) throw next(err);
    next()
  })
}

function admin(req, res, next) {
  switch (req.url) {
    case '/':
      res.end('try/users')
      break;
    case '/users':
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(['tobi', 'loki', 'jane']))
      break;
    default:
  }
}
