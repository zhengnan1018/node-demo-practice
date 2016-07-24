function Watcher(watchDir, processedDir) {
  this.watchDir = watchDir
  this.processedDir = processedDir
}

var events = require('events')
var util = require('util')

util.inherits(Watcher, events.EventEmitter)

var fs = require('fs')
var watchDir = './watch'
var processedDir = './done'

Watcher.prototype.watch = function() {
  var watcher = this
  console.log(this);
  fs.readdir(this.watchDir, function(err, files) {
    if (err) throw err
    for (var index in files) {
      files && watcher.emit('process', files[index])
    }
  })
}

Watcher.prototype.start = function() {
  var watcher = this
  fs.watch(this.watchDir, function() {
    watcher.watch()
  })
}

var watcher = new Watcher(watchDir, processedDir)

watcher.on('process', function processFile(file) {
  var watchFile = this.watchDir + '/' + file
  var processFile = this.processedDir + '/' + file

  fs.rename(watchFile, processFile, function(err) {
    if (err) throw err
  })
})

watcher.start()
