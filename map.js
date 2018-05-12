const http = require('http');
const async = require('async');

async.map(process.argv.slice(2), function (url, done) {
  http.get(url, function (res) {
    var body = '';
    res.on('data', function (chunk) {
      body += chunk
    });
    res.on('end', function () {
      done(null, body);
    });
  }).on('error', function (err) {
    done(err);
  });
}, function (err, results) {
  if (err) {
    console.log(err);
  }
  console.log(results);
});
