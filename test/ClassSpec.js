'use strict';
var chai = require('chai');
var Class = require('../src/Class.js');

describe("This test if for Class module", function () {

	it("creates a construct method", function () {
		var Construct1 = new Class.Class();
		chai.expect(Construct1).to.be.a('function');
		var instance1 = new Construct1;
		chai.expect(instance1 instanceof Construct1).to.be.true;

		var SuperType2 = function () { };
		SuperType2.prototype.sayHi = function () {
			return "Hi";
		}
		var Construct2 = new Class.Class(SuperType2);
		chai.expect(Construct2).to.be.a('function');
		var instance2 = new Construct2;
		chai.expect(instance2.sayHi()).to.equal("Hi");

		var SuperType3 = function () { };
		SuperType3.prototype.sayHi = function () {
			return "Hi";
		}
		var properties = {
			a: 1,
			b: 2,
			c: function () { return "c"; }
		};
		var Construct3 = new Class.Class(SuperType3, properties);
		chai.expect(Construct3).to.be.a('function');
		var instance3 = new Construct3;
		chai.expect(instance3.a).to.equal(1);
		chai.expect(instance3.b).to.equal(2);
		chai.expect(instance3.c()).to.equal("c");
	});

	it("calls _Super constructor method", function () {
		var Construct = function (a, b, c) {
			this.a = a;
			this.b = b;
			this.c = c;
		};
		var C = new Class.Class(Construct);

		var i = new C(1, 2, 3);
		chai.expect(i.a).to.eq(1);
		chai.expect(i.b).to.eq(2);
		chai.expect(i.c).to.eq(3);
	});

	it("prototype has init method", function () {
		var Construct = new Class.Class;
		chai.expect(Construct).to.be.a('function');
	});

	it("has create function", function () {
		var obj = Class.Class.create({ a: 1 });
		chai.expect(obj.__proto__).to.eql({ a: 1 });
	});


	it("has assign method", function () {
		var origin1 = { a: 1 };
		var origin2 = { b: 2 };
		var origin3 = { c: 3 };

		var target = { a: 0 };
		chai.expect(Class.Class.assign(target, origin1, origin2, origin3)).to.eql({
			a: 1,
			b: 2,
			c: 3
		});

		var arr = [];

		chai.expect(Class.Class.assign({}, arr)).to.eql({});
	});

	it("can shallow clone an object", function () {
		var source = {
			a: 1,
			b: 2,
			c: function () { },
			d: function () { }
		};
		var target = Class.Class.clone(source, false);
		chai.expect(target).to.eql(source);
	});

	it("can deep Clone an object", function () {
		var source = {
			a: 1,
			b: 2,
			c: [1, 2]
		};
		var target = Class.Class.clone(source, true);
		source.c.push(3);
		chai.expect(target).to.eql({
			a: 1,
			b: 2,
			c: [1, 2]
		});
	});

});