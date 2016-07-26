'use strict'

var http = require('http')
var qs = require('querystring')
var items = []

var server = http.createServer((req, res) => {
  console.log(req.url);
  if ('/' === req.url) {
    switch (req.method) {
      case 'GET':
        console.log('get...');
        show(res)
        break;
      case 'POST':
        console.log('post...');
        add(req, res)
        break;
      default:
        badRequest(res)
    }
  } else {
    notFound(res)
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log('server started at: 8000')
})

function show(res) {
  var html = '<html>'
          + '<head>'
          + '<title>Todo List</title>'
          + '</head>'
          + '<body>'
          + '<h1>Todo list</h1>'
          + '<ul>'
          + items.map(function(item, index) {
              return '<li>' + item + '<li>'
            }).join('')
          + '</ul>'
          + '<form method="post" action="/">'
          + '<p>'
          + '<input type="text" name="item"/>'
          + '</p>'
          + '<p>'
          + '<input type="submit" value="Add Item"/>'
          + '</p>'
          + '</form>'
          + '</body>'
          + '</html>'
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Content-Length', Buffer.byteLength(html))
  res.end(html)
}

function notFound(res) {
  res.statusCode = 404
  res.setHeader('Content-Type', 'text/plain')
  res.end('Not Found')
}

function badRequest(res) {
  res.statusCode = 400
  res.setHeader('Content-Type', 'text/plain')
  res.end('Bad Request')
}

function add(req, res) {
  var body = ''
  req.setEncoding('utf-8')
  req.on('data', function(chunk) {
    console.log(chunk.toString());
    body += chunk
  })
  req.on('end', function() {
    var obj = qs.parse(body)
    items.push(obj.item)
    console.log('body: ' + body);
    console.log(obj);
    console.log(items);
    show(res)
  })
}
