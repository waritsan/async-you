const http = require('http');
const async = require('async');
const url = process.argv[2];
var requestBody = '';
var count = 0;

async.whilst(function () {
  return !/meerkat/.test(requestBody.trim());
}, function (done) {
  var body = '';
  http.get(url, function (res) {
    res.on('data', function (chunk) {
      body += chunk.toString();
    });
    res.on('end', function () {
      ++count;
      requestBody = body;
      done();
    });
  }).on('error', done);
}, function (err) {
  if (err) return console.log(err);
  console.log(count);
});
