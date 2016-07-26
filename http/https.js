var https = require('https')
var fs = require('fs')

var options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./key-cert.pem')
}

https.createServer(options, function(req, res) {
  res.writeHead(200)
  res.end('Hello Https')
}).listen(8070)
