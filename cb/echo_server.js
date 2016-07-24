var net = require('net')

// var serverOn = net.createServer(function(socket) {
//   socket.on('data', function(data) {
//     socket.write(data)
//   })
// }).listen(8888)

var serverOn = net.createServer(function(socket) {
  socket.once('data', function(data) {
    socket.write(data)
  })
}).listen(8888)
