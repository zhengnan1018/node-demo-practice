var redis = require('../node_modules/redis');
var client = redis.createClient(6379, '172.31.162.96');

console.log(client);

client.on('error', function(err) {
  console.error('Error: ' + err);
})
