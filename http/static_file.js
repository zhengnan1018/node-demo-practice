var http = require('http')
var parse = require('url').parse
var join = require('path').join
var fs = require('fs')

var root = __dirname;

var server = http.createServer(function(req, res) {
  var url = parse(req.url)
  var path = join(root, url.pathname)
  fs.stat(path, function(err, stats) {
    if (err) {
      // ENOENT -- No such file was found or the specified path name doesn't exist
      if ('ENOENT' === err.code) {
        res.statusCode = 404
        res.end('Not Found')
      } else {
        res.statusCode = 500
        res.end('Internal Server Error')
      }
    } else {
      console.log(stats);
      res.setHeader('Content-Length', stats.size)
      var stream = fs.createReadStream(path)
      stream.pipe(res)
      stream.on('error', function(err) {
        res.statusCode = 500
        res.end('Internal Server Error')
      })
    }
  })
})

server.listen(8070)
