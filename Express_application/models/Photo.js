var mongoose = require('../node_modules/mongoose')
mongoose.connect('mongodb://localhost/photo_app', function(err) {
  if (err) return err;
  console.log('connected');
})

var schema = new mongoose.Schema({
  name: String,
  imagePath: String,
})

module.export = mongoose.model('Photo', schema)
