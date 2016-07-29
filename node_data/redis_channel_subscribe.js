// 信道是数据传输机制，提供了发布/预定功能，对于聊天和游戏程序很实用
var net = require('net')
var redis = require('../node_modules/redis')

var server = net.createServer(function(socket) {
  var subscriber;
  var publisher;

  socket.on('connect', function() {
    console.log('connecting...');
    subscriber = redis.createClient(6379, '127.0.0.1')
    subscriber.subscribe('main_chat_room')

    subscriber.on('message', (channel, msg) => {
      socket.write('Channel ' + channel + ':' + msg)
    })

    publisher = redis.createClient(6379, '127.0.0.1')
  })
  socket.emit('connect')
  socket.on('data', function (data) {
    publisher.publish('main_chat_room', data)
  })

  socket.on('end', function() {
    subscriber.unsubscribe('main_chat_room');
    subscriber.end();
    publisher.end();
  })
})

server.listen(8700);
