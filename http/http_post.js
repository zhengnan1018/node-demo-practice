var http = require('http')
var url = require('url')
var items = []

var server = http.createServer(function(req, res){
  // 这样设置数据块不在是Buffer 对象，而是utf-8的字符串
  // req.setEncoding('utf-8')
  // req.on('data', function(chunk) {
  //   console.log(chunk);
  // })
  // req.on('end', function() {
  //   console.log('done parsing');
  //   res.end()
  // })

  switch (req.method) {
    case 'POST':
      var item = ''
      req.setEncoding('utf-8')
      req.on('data', function(chunk) {
        item += chunk
      })
      req.on('end', function() {
        items.push(item)
        res.end('OK\n')
      })
      break;
    case 'GET':
      // items.forEach(function(item, index) {
      //   res.write(index + ') ' + item + '\n')
      // })
      var body = items.map(function(item, index) {
        return index + ') ' + item + '\n'
      }).join('\n')
      console.log(Buffer.byteLength(body));
      res.setHeader('Content-Length', Buffer.byteLength(body))
      res.setHeader('Content-Type', 'text/plain; charset="utf-8"')
      res.end(body)
      break;
    case 'DELETE':
      var path = url.parse(req.url).pathname
      var i = parseInt(path.slice(1), 10)

      if (isNaN(i)) {
        res.statusCode = 400
        res.end('Invalid item id')
      } else if (!item[i]) {
        res.statusCode = 404
        res.end('Item not found')
      } else {
        items.splice(i, 1)
        items.end('OK\n')
      }
      break;
    default:

  }
})

server.listen(8070)
