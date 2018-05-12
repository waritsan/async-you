const http = require('http');
const async = require('async');
const hostname = process.argv[2];
const port = process.argv[3];
const url = 'http://' + hostname + ':' + port;

async.series({
  post: function (done) {
    async.times(5, function (n, next) {
      _addUser(++n, function (err) {
        next(err);
      });
    }, function next(err) {
      if (err) return done(err);
      done(null, 'saved');
    });
  },
  get: function (done) {
    var body = '';
    http.get(url + '/users', function (res) {
      res.on('data', function (chunk) {
        body += chunk.toString();
      });
      res.on('end', function () {
        done(null, body);
      });
    }).on('error', function (err) {
      done(err);
    });
  }
}, function done(err, result) {
    if (err) return console.log(err);
    console.log(result.get);
});

function _addUser(userId, next) {
  var postData = JSON.stringify({'user_id': userId});
  var opts = {
    hostname: hostname,
    port: port,
    path: '/users/create',
    method: 'POST',
    headers: {
      'Content-Length': postData.length
    }
  }
  var req = http.request(opts, function (res) {
    res.on('data', function(chunk){});
    res.on('end', function () {
      next();
    });
  });
  req.on('err', function (err) {
    next(err);
  });
  req.write(postData);
  req.end();
}
