const async = require('async');
const http = require('http');

async.series({
  requestOne: function (done) {
    fetchUrl(process.argv[2], done);
  },
  requestTwo: function (done) {
    fetchUrl(process.argv[3], done);
  }
}, function (err, results) {
  console.log(results);
});

function fetchUrl(url, done) {
  var body = '';
  http.get(url, function (res) {
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
