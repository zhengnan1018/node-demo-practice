var flow = require('./node_modules/nimble')
var exec = require('child_process').exec
var origPaths = ['./random_story', './word_count']
var descPath = './copyed'

function copyFileToCopyed(origPath, descpath, cb) {
  exec('cp -r' + ' ' + origPath + '/*' + ' ' + descpath, cb)
}

flow.series([
  function(callback) {
    flow.parallel([
      function(callback) {
        console.log('copying file' + origPaths[0] + '...');
        copyFileToCopyed(origPaths[0], descPath, callback)
      },
      function(callback) {
        console.log('copying file' + origPaths[1] + '...');
        copyFileToCopyed(origPaths[1], descPath, callback)
      }
    ], callback)
  },
  function(callback) {
    console.log('Copy files finished!');
  }
])
