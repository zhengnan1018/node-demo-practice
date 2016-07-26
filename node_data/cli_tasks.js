var fs = require('fs')
var path = require('path')
// 获取命令行参数
var args = process.argv.splice(2)
var command = args.shift()
var taskDescription = args.join(' ')
var file = path.join(process.cwd(), '/.tasks')

switch (command) {
  case 'list':
    listTasks(file)
    break;
  case 'add':
    console.log(args);
    addTask(file, taskDescription)
    break;
  default:
    console.log('Usage: ' + process.argv[0] + ' list|add [taskDescription]');
}

// 获取已有的任务
function loadOrInitializeTaskArray(flie, callback) {
  fs.exists(file, function(exists) {
    var tasks = []
    if (exists) {
      fs.readFile(file, 'utf8', function(err, data) {
        if (err) throw err
        var data = data.toString()
        var tasks = JSON.parse(data || '[]')
        callback(tasks)
      })
    } else {
      callback([])
    }
  })
}

function listTasks(file) {
  loadOrInitializeTaskArray(file, function(tasks) {
    for (var i in tasks) {
      console.log(tasks[i]);
    }
  })
}

// 将任务保存在磁盘中
function storeTasks(file, tasks) {
  console.log(tasks);
  fs.writeFile(file, JSON.stringify(tasks), 'utf8', function(err) {
    if (err) throw err
    console.log('Saved!');
  })
}

// 添加一项任务
function addTask(file, taskDescription) {
  loadOrInitializeTaskArray(file, function(tasks) {
    tasks.push(taskDescription)
    storeTasks(file, tasks)
  })
}
