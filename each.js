const http = require('http');
const async = require('async');

async.each(process.argv.slice(2), function (url, done) {
  http.get(url, function (res) {
    var body = '';
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function () {
      done(null, body);
    });
  }).on('error', function (err) {
    done(err);
  });
}, function (err, result) {
  if (err) return console.error(err);
  console.log(result);
});
