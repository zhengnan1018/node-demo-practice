var fs = require('fs')
var complatedTasks = 0
var tasks = []
var wordCounts = {}
var filesDir = './text'

function checkIfComplated() {
  complatedTasks ++
  if (complatedTasks === tasks.length) {
    for (var key in wordCounts) {
      console.log(key + ": " + wordCounts[key]);
    }
  }
}

function countWordsInText(text) {
  var words = text.toString()
    .toLowerCase()
    .split(/\W+/)
    .sort()
  for (var index in words) {
    var word = words[index]
    if (word) {
      wordCounts[word] = wordCounts[word] ? wordCounts[word] + 1 : 1
      console.log(wordCounts);
    }
  }
}

fs.readdir(filesDir, function(err, files) {
  if (err) throw error;
  for (var index in files) {
    var task = (function(file) {
      return function() {
        fs.readFile(file, function(err, text) {
          if (err) throw error;
          countWordsInText(text)
          checkIfComplated()
        })
      }
    })(filesDir + '/' + files[index]);
    tasks.push(task)
  }
  for (var taskIndex in tasks) {
    tasks[taskIndex]()
  }
})
