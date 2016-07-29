// http://www.jianshu.com/p/6b5eca8d908b
var redis = require('../node_modules/redis');
var client = redis.createClient(6379, '127.0.0.1');

// console.log(client);

client.on('error', function(err) {
  console.error('Error: ' + err);
})

// print 函数输出操作结果，或者在运行错误时输出错误
client.set('color', 'red', redis.print)
client.get('color', function(err, val) {
  if (err) throw err;
  console.log('Got: ' + val);
})

// 哈希表 也称为哈希映射， 存储和获取数据
// 哈希表本质上是存放标识的表， 这些标识被称为 ‘键’ ，与相应的 ‘值’ 相关

// 设定哈希表元素
client.hmset('camping', {
  shelter: '2-preson tent',
  cooking: 'campostive'
}, redis.print)

// 获取cooking 的值
client.hget('camping', 'cooking', function(err, val) {
  if (err) throw err;
  console.log('Will be cooking with ' + val);
})

// 获取哈希表的 ‘键’
client.hkeys('camping', function(err, keys) {
  if (err) throw err;
  keys.forEach(function(key, i) {
    console.log(' ' + key);
  })
})

// 链表是Redis 支持的另一种数据结构。如果内存足够大， Redis 链表可以存放40多亿条数据
client.lpush('tasks', 'Learn MySQL', redis.print);
client.lpush('tasks', 'Learn Redis', redis.print);
client.lpush('tasks', 'Learn MongoDB', redis.print);

client.lrange('tasks', 0, -1, function(err, items) {
  if (err) throw err;
  items.forEach(function(item, i) {
    console.log(item);
  })
})

// 集合石一组无序的字符串组
// 集合获取数据的性能比链表好
client.sadd('myFriends', 'xuhongcan', redis.print)
client.sadd('myFriends', 'liupeng', redis.print)
client.sadd('myFriends', 'panyoubei', redis.print)

client.smembers('myFriends', function(err, members) {
  if (err) throw err;
  console.log(members);
})
