/* global define */
/* global $ */
/* global global */
// (function (factory) {
// 	var root = (typeof self === "object" && self.self === self && self) ||
// 		(typeof global === "object" && global.global === global && global);
// 		
// 	// For AMD
// 	if(typeof define === "function" && define.amd) {
// 		define([], function() {
// 			
// 			
// 		});
// 	// For Node.js or CommonJS.
// 	} else if(typeof exports !== "undefined") {
// 	
// 	// For Global
// 	} else {
// 		root.Owl = factory(root, {}, $);
// 	}
// } (function (root, Owl, $) {
// 	
// }));
var Class = require('./Class');

var Person = new Class.Class(null, {
	age: 1,
	init: function () {
		console.log('init');
	}
});

var person = new Person;
console.log(person);