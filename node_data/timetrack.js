var qs = require('querystring')

exports.sendHtml = function(res, html) {
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Content-Length', Buffer.byteLength(html))
  res.end(html)
}

exports.parseReceivedData = function(req, callback) {
  var body = '';
  req.setEncoding('utf-8');
  req.on('data', function(chunk) {
    body += chunk;
  })
  req.on('end', function() {
    var data = qs.parse(body)
    callback(data)
  })
}

// 渲染表单
exports.actionForm = function(id, path, label) {
  html = '<form method="POST" action="' + path + '">'
     + '<input type="hidden" name="id" value="' + id + '"/>'
     + '<input type="submit" value="' + label + '"/>'
     + '</form>'
  return html
}

// 添加数据
exports.add = function(db, req, res) {
  exports.parseReceivedData(req, function(work) {
    db.query(
      "INSERT INTO work (hours, date, description) " +
      " VALUES (?, ?, ?)",
      [work.hours, work.date, work.description],
      function(err) {
        if (err) throw err;
        exports.show(db, res)
      }
    )
  })
}

// 删除数据
exports.delete = function(db, req, res) {
  exports.parseReceivedData(req, function(work) {
    db.query(
      "DELETE FROM work WHERE id=? ",
      [work.id],
      function(err) {
        if (err) throw err;
        exports.show(db, res)
      }
    )
  })
}

// 修改数据
exports.archive = function(db, req, res) {
  exports.parseReceivedData(req, function(work) {
    db.query(
      "UPDATE work SET archived=1 WHERE id=? ",
      [work.id],
      function(err) {
        if (err) throw err;
        exports.show(db, res)
      }
    )
  })
}

exports.show = function(db, res, showArchived) {
  console.log('show');
  var query = "SELECT * FROM work " +
              "WHERE archived=? " +
              "ORDER BY date DESC ";
  var archiveValue = showArchived ? 1 : 0;
  db.query(query, [showArchived], function(err, rows) {
    if (err) throw err;
    html = (showArchived) ? ' ' : '<a href="/archive">Archived work</a><br/>';
    html += exports.workHitHtml(rows);
    html += exports.workFormHtml();
    exports.sendHtml(res, html)
  })
}

exports.showArchived = function(db, res) {
  exports.show(db, res, true)
}

exports.workHitHtml = function(rows) {
  console.log(rows);
  var html = '<table>';
  for (var index in rows) {
    html += '<tr>';
    html += '<td>' + rows[index].date + '</td>';
    html += '<td>' + rows[index].hours + '</td>'
    html += '<td>' + rows[index].description + '</td>'
    if (!rows[index].archived) {
      html += '<td>' + exports.workArchiveFrom(rows[index].id) + '</td>'
    }
    html += '<td>' + exports.workDeleteFrom(rows[index].id) + '</td>'
    html += '</tr>'
  }
  html += '</table>'
  return html
}

exports.workFormHtml = function() {
  var html = '<form method="POST" action="/">'
           + '<p>Date (YYYY-MM-DD):<br/><input name="date" type="text"/></p>'
           + '<p>Descriptions:<br/><textarea name="description"></textarea></p>'
           + '<input type="submit" value="Add"/>'
           + '</form>'
   return html
}

exports.workArchiveFrom = function(id) {
  return exports.actionForm(id, '/archived', 'Archive')
}

exports.workDeleteFrom = function(id) {
  return exports.actionForm(id, '/delete', 'Delete')
}
