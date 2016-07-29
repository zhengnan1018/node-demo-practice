// http://blog.csdn.net/u013310075/article/details/51857398
// http://jingyan.baidu.com/article/a378c960b8f828b328283033.html
var http = require('http')
var work = require('./timetrack')
var mysql = require('../node_modules/mysql')

// 连接到 mysql数据库
var db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'myuser',
  password: 'mypassword',
  database: 'test',
  port: 3306,
})

//
// db.connect(function(err) {
//   if (err) console.log(err);
//   console.log('connection...');
// })

var server = http.createServer(function(req, res) {
  switch (req.method) {
    case 'POST':
      switch (req.url) {
        case '/':
          work.add(db, req, res)
          break;
        case '/archive':
          work.archive(db, req, res)
          break;
        case '/delete':
          work.delete(db, req, res)
          break;
        default:
      }
      break;
    case 'GET':
      switch (req.url) {
        case '/':
          console.log('===');
          work.show(db, res, false)
          break;
        case '/archive':
          work.showArchived(db, res)
          break;
        default:
      }
      break;
    default:
  }
})

db.query (
  "CREATE TABLE IF NOT EXISTS work ("
  + "id INT(10) NOT NULL AUTO_INCREMENT, "
  + "PRIMARY KEY(id), "
  + "hours DECIMAL(5,2) DEFAULT 0, "
  + "date DATE, "
  + "archived INT(1) DEFAULT 0, "
  + "description LONGTEXT )" ,
  function(err) {
    if (err) throw err;
    console.log('Server started...');
    server.listen(8800, "127.0.0.1")
  }
)
