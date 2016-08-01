var mongodb = require('../node_modules/mongodb');

var server = new mongodb.Server('127.0.0.1', 27017, {})
var client = new mongodb.Db('mydatabase', server, {w: 1})
var id = ''

client.open(function(err) {
  if (err) throw err;
  client.collection('test_insert', function(err, collection) {
    if (err) throw err;
    console.log('We ...');

    collection.insert(
      {
        title: 'Could be more strong!',
        body: 'Hard working and keep learing'
      },
      {safe: true}, function(err, docs) {
        if (err) throw err;
        // console.log(docs);
        // console.log('Document ID is: ' + docs.ops[0]._id);
        id = docs.ops[0]._id
      });

      collection.update(
        {_id: id},
        {$set: {
            title: 'Be strong'
          }
        },
        {safe: true},
        function(err) {
          if (err) throw err;
        }
      )

      collection.find({title: 'Be strong'}).toArray(function(err, results) {
        console.log(results);
      })
      // console.log(collection.find({title: 'Be strong'}));
  })
})
