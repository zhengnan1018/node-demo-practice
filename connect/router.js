var parse = require('url').parse;

module.exports = function(obj) {
  return function(req, res, next) {
    if (!obj[req.method]) {
      next();
      return;
    }
    var routers = obj[req.method]
    var url = parse(req.url)
    var paths = Object.keys(routers)

    for (var i = 0; i < paths.length; i ++) {
      var path = paths[i];
      var fn = routers[path];
      console.log('Path1: ' + path);
      path = path
              .replace(/\//g, '\\/')
              .replace(/:(\w+)/g, '([^\\/]+)');
      console.log('Path2: ' +  path);
      var re = new RegExp('^' + path + '$');
      var captures = url.pathname.match(re);
      console.log(captures);
      if (captures) {
        var args = [req, res].concat(captures.slice(1))
        console.log(args);
        fn.apply(null, args);
        return;
      }
    }
    next();
  }
}
