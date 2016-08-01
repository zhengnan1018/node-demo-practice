var mongoose = require('../node_modules/mongoose')
var db = mongoose.connect('mongodb://localhost/schemaDatabase', function(err) {
  if (err) throw err;
  console.log('connected');
})

// 注册Schema
var Schema = mongoose.Schema;
var Tasks = new Schema({
  project: String,
  description: String
})
mongoose.model('Task', Tasks)

// 添加任务
var Task = mongoose.model('Task');
// var task = new Task();
// task.project = 'Learn database';
// task.description = 'MySQL Redis MongoDB';
// task.save(function(err) {
//   if (err) throw err;
//   console.log('Task saved!');
// })

Task.find({project: 'Learn database'}, function(err, tasks) {
  if (err) throw err;
  for (var index in tasks) {
    console.log('Id: ' + tasks[index]._id);
    console.log(tasks[index].description);
  }
})

// Task.update(
//   {_id: '579eb149eca61c1883476855'},
//   {description: 'Already changed'},
//   {multi: false},
//   function(err, rows_updates) {
//     if (err) throw err;
//     console.log('Updated!');
//   }
// )

// Task.findById('579eb149eca61c1883476855', function(err, task) {
//   if (err) throw err;
//   task.remove()
// })
