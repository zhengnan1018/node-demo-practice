var http = require('http')
var url = 'http://www.google.com'

var server = http.createServer(function(req, res) {
  var body = '<p>Redirecting to <a href="' + url + '">' + url + '</a></p>'
  // 修改HTTP相应头
  res.setHeader('Location', url)
  res.setHeader('Content-Length', 11)
  res.setHeader('Content-Length', body.length);
  res.statusCode = 302
  res.end(body)
})

server.listen(8070)
