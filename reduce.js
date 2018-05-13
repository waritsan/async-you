const http = require('http');
const async = require('async');
const url = process.argv[2];
// number=array[i]
// result += res.number

async.reduce(['one', 'two', 'three'], 0, function (memo, item, done) {
  var body = '';
  http.get(url + '?number=' + item, function (res) {
    res.on('data', function (chunk) {
      body += chunk.toString();
    });
    res.on('end', function () {
      done(null, memo + Number(body));
    });
  }).on('error', function (err) {
    done(err);
  });
}, function done(err, results) {
  if (err) console.log(err);
  console.log(results);
});
