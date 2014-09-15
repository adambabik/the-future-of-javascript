'use strict';

var co = require('co');
var thunkify = require('thunkify');
var request = require('request');
var get = thunkify(request.get);

var cmd = process.argv[2];

if (cmd === 'sequential' || cmd === 'seq') {
  // Sequential
  co(function *(){
    var a = yield get('http://google.com');
    console.log(a[0].statusCode);
    var b = yield get('http://yahoo.com');
    console.log(b[0].statusCode);
    var c = yield get('http://cloudup.com');
    console.log(c[0].statusCode);
  })();
} else if (cmd === 'concurrent') {
  // Concurrent
  co(function *(){
    var a = get('http://google.com');
    var b = get('http://yahoo.com');
    var c = get('http://cloudup.com');
    var res = (yield [a, b, c]).map(function (item) {
      return item.statusCode;
    });
    console.log(res);
  })();
} else if (cmd === 'error') {
  // Error handling
  co(function *(){
    try {
      var res = yield get('http://badhost.invalid');
      console.log(res);
    } catch(e) {
      console.log(e.code); // ENOTFOUND
   }
  })();
}
