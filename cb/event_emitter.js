// var EventEmitter = require('events').EventEmitter
// var channel = new EventEmitter()
//
// channel.on('join', function(who) {
//   console.log('Welcome!' + ' ' + who);
// })
//
// channel.emit('join', 'nannan')
var events = require('events')
var net = require('net')
var channel = new events.EventEmitter()

channel.clients = {}
channel.subscriptions = {}

channel.setMaxListeners(50)

channel.on('join', function(id, client) {
  this.clients[id] = client
  this.subscriptions[id] = function(senderId, msg) {
    if (id !== senderId) {
      this.clients[id].write(msg)
    }
  }
  this.on('broadcast', this.subscriptions[id])

  var welcome = 'Welcome!\n' + 'Guest online: ' + this.listeners('broadcast').length
  console.log(this.listeners('broadcast'));
  client.write(welcome)
})

channel.on('leave', function(id) {
  this.removeListener('broadcast', this.subscriptions[id])
  this.emit('broadcast', id, id + 'has left the chat. \n')
})

channel.on('shutdown', function() {
  this.emit('broadcast', '', 'Chat has shutdown! \n')
  this.removeAllListeners('broadcast')
})

var server = net.createServer(function(client) {
  var id = client.remoteAddress + ":" + client.remotePort

  client.on('connect', function() {
    channel.emit('join', id, client)
  })
  client.on('data', function(data) {
    data = data.toString()
    if (data == 'shutdown\r\n') {
      channel.emit('shutdown')
    }
    channel.emit('broadcast', id, data)
  })
  client.on('close', function() {
    channel.emit('leave', id)
  })
  client.emit('connect')
})

server.listen(8888)
