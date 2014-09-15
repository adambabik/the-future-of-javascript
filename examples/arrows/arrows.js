/*jshint ignore: start */

'use strict';

var arr = [1, 2, 3, 4];
var res;

res = arr.map(x => x * 2);
console.log('arr mul by 2', res);

res = arr.map(x => {
	return x * 2;
});
console.log('arr mul by 2 using statement body', res);

// Watch out on this!
var fun = null;
var obj = {
	name: "obj",
	createFun: function () {
		// `=>` has only lexical `this`!
		// I.e. `this` is specified when defining an arrow function.
		fun = () => {
			return `Hello, ${this.name}!`;
		};
	}
};
obj.createFun();
console.log(fun());
console.log(fun.bind(this)(), '`bind()` does not work, because of NO dynamic `this`!');

// Destructuring
//

// Array
var swapVec2 = ([x, y]) => [y, x];
var vec2 = [1, 2];
console.log('spaw vec2', vec2, '=>', swapVec2(vec2));

// Object
var swapPoint2D = ({x, y}) => ({y, x});
var point = { x: 2, y: 6 };
console.log('spawPoint2D', point, '=>', swapPoint2D(point));

var {x, y} = point;
console.log(`Coordinates: x = ${x} y = ${y}`);

// Works with parameters
function len({ x, y }) {
	return Math.sqrt(x*x + y*y);
}
var point2D = { x: 4, y: 3 };
console.log('length =', len(point2D));

// rest + spread
var max = (...items) => {
	console.log('items is array =', Array.isArray(items));
	return Math.max.call(null, ...items); // the same: Math.max.apply(null, items);
};
console.log('Max', max(14, 3, 13, 12, 9));

