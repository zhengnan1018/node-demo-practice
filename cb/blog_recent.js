var http = require('http')
var fs = require('fs')

var server = http.createServer(function(req, res) {
  if (req.url === '/') {
    getTitles(res)
  }
})

server.listen(8000)

function getTitles(response) {
  fs.readFile('./titles.json', function(err, data) {
    if (err) {
      console.error('Error: ' + err);
      response.end('Server error!')
    } else {
      var titlesText = JSON.parse(data)
      getTemplate(titlesText, function(html) {
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end(html)
      })
    }
  })
}

function getTemplate(titlesData, callback) {
  fs.readFile('./template.html', function(error, page) {
    if (error) return console.error(console.error(error));
    else {
      var tmpl = page.toString()
      var html = tmpl.replace('%', titlesData.titles.join('</li><li>'))
      callback(html)
    }
  })
}
