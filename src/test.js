var Owl = require('./Owl.js');

// Test Class
var SuperType = function () { };
SuperType.prototype.sayHi = function () {
	return "Hi";
}
var Construct2 = new Owl.Class(SuperType);
var instance2 = new Construct2;
instance2.sayHi();

var SuperType3 = function () { };
SuperType3.prototype.sayHi = function () {
	return "Hi";
}
var properties = {
	a: 1,
	b: 2,
	c: function () { return "c"; }
};
var Construct3 = new Owl.Class(SuperType3, properties);

var instance3 = new Construct3;
instance3.a;
instance3.b;
instance3.c();