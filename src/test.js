var Owl = require('./Owl.js');

// Test Class
var SuperType = function (a) {
	this.a = a;
	console.log(a);
};
SuperType.prototype.sayHi = function () {
	return "Hi";
}
var Construct2 = new Owl.Class(SuperType);
var instance2 = new Construct2("Construct2 Creates instance");
console.log(instance2.a);

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

var eventEmitter = new Owl.Event;
eventEmitter.on("change", function () {
	console.log("change");
});
console.log(eventEmitter.__proto__);

// Test Event
var Controller = Owl.Class(Owl.Event, {

});
var controller = new Controller;
function show(a) { console.log("call show" + a); };
controller.on("change", show.bind(this, 1));
controller.on("change", show.bind(this, 1));
controller.on("change", show.bind(this, 1));
//console.log(controller._callbacks);
controller.off("change", show.bind(this, 1));
console.log(controller._callbacks);

controller.trigger("change");


// Test View
