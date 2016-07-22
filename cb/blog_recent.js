var http = require('http')
var fs = require('fs')

var server = http.createServer(function(req, res) {
  if (req.url === '/') {
    fs.readFile('./titles.json', function(err, data) {
      if (err) {
        console.error('Error: ' + err);
        res.end('Server error!')
      } else {
        var titlesText = JSON.parse(data)
        fs.readFile('./template.html', function(error, page) {
          if (error) console.error(console.error(error));
          else {
            var tmpl = page.toString()
            var html = tmpl.replace('%', titlesText.titles.join('</li><li>'))
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end(html)
          }
        })
      }
    })
  }
})

server.listen(8000)
