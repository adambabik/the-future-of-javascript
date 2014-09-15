/*jshint ignore: start */

'use strict';

// Creates *inclusive* Range instance.
function Range(start, end=Infinity) {
  if (!(this instanceof Range)) {
    return new Range(start, end);
  }
  this.start = start;
  this.end = end;
}

// Using the iterator.
Range.prototype[Symbol.iterator] = function () {
  var cur = this.start;
  var end = this.end;
  return {
    next () {
      var val = cur++;
      return {
        value: val,
        done: val > end
      };
    }
  };
};

Range.prototype.step = function (step) {
  var val = this.start;
  var end = this.end;
  return {
    // Using the generator.
    [Symbol.iterator]: function *() {
      while (val <= end) {
        yield val;
        val += step;
      }
    }
  };
};

for (var n of Range(-5, 5)) {
  console.log(n);
}

console.log('Range with step = 2');

for (var n of new Range(1, 10).step(2)) {
  console.log(n);
}

console.log('Infinite range with step = 3');

for (var n of new Range(1).step(3)) {
  if (n > 10) break;
  console.log(n);
}
