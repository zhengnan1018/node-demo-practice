var http = require('http')

http.createServer(function(req, res) {
  var color = 'green'

  var myFun = (function(color) {
    asyncFun(function() {
      return console.log('Color is ' + color);
    })
  })(color)
  console.log('myFun' + myFun);

  color = 'blue'
  res.write('colorResult')
  res.end()
}).listen(8070)

function asyncFun(cb) {
  setTimeout(cb, 2000)
}
