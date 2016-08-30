var Photo = require('../../models/Photo');
var path = require('path');
var fs = require('fs');
var join = path.join;

exports.submit = function(dir) {
  return function(req, res, next) {
    var img = req.files.photo.image;
    var name = req.body.photo.name || img.name;
    var path = join(dir, image.name);

    fs.rename(img.path, path, function(err) {
      if (err) return next(err)

      Photo.create({
        name: name,
        path: img.path
      }, function(err) {
        if (err) return next(err);
        res.redirect('/');
      });
    })
  }
}
