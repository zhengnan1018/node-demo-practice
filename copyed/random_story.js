var fs = require('fs')
var request = require('../node_modules/request')
var htmlparser = require('../node_modules/htmlparser')
var configFilename = './rss_feeds.json'

function checkForRssfile() {
  fs.exists(configFilename, function(exists) {
    if (!exists) {
      return next(new Error('Missing RSS file: ' + configFilename))
    } else {
      next(null, configFilename)
    }
  })
}

function readRssFile(configFilename) {
  var feedListArr = []
  fs.readFile(configFilename, function(err, feedList) {
    if (err) {
      return next(err)
    } else {
      feedListArr = JSON.parse(feedList.toString()) ? JSON.parse(feedList.toString()).data : []
      var random = Math.floor(Math.random() * feedListArr.length)
      var useUrl = feedListArr[random] ? feedListArr[random].url : null
      if (useUrl) {
        next(null, useUrl)
      }
    }
  })
}

function downloadRssFeed(feedUrl) {
  // console.log(feedUrl);
  request({uri: feedUrl}, function(err, res, body) {
    if (err) return next(err)
    if (res.statusCode !== 200)
      return next(new Error('Abnormal response status code!'))
    console.log(body);
    next(null, body)
  })
}

var tasks = [
  checkForRssfile,
  readRssFile,
  downloadRssFeed
]

function next(err, result) {
  if (err) throw err
  var currentTask = tasks.shift()

  if (currentTask) {
    currentTask(result)
  }
}

next()
