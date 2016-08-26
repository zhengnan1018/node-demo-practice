var express = require('express');
var router = express.Router();
var path = require('path');

var photosListData = [
  {
    name: 'example photo 1',
    imagePath: path.join(__dirname, '../public/images/photo_1.jpg')
  },
  {
    name: 'example photo 2',
    imagePath: path.join(__dirname, '../public/images/photo_2.jpg')
  }
]
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/photos', function(req, res, next) {
  res.render('photo', { photos: photosListData })
})

module.exports = router;
