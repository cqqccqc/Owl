'use strict';
var chai = require('chai');
var Owl = require('../src/Class.js');

describe("This test if for Class module", function () {

	it("creates a construct method", function () {
		var Construct1 = new Owl.Class();
		chai.expect(Construct1).to.be.a('function');
		var instance1 = new Construct1;
		chai.expect(instance1 instanceof Construct1).to.be.true;

		var SuperType2 = function () { };
		SuperType2.prototype.sayHi = function () {
			return "Hi";
		}
		var Construct2 = new Owl.Class(SuperType2);
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
		var Construct3 = new Owl.Class(SuperType3, properties);
		chai.expect(Construct3).to.be.a('function');
		var instance3 = new Construct3;
		chai.expect(instance3.a).to.equal(1);
		chai.expect(instance3.b).to.equal(2);
		chai.expect(instance3.c()).to.equal("c");
	});

	it("prototype has init method", function () {
		var Construct = new Owl.Class;
		chai.expect(Construct).to.be.a('function');
	});

	it("has create function", function () {
		var obj = Owl.Class.create({ a: 1 });
		chai.expect(obj.__proto__).to.eql({ a: 1 });
	});


	it("has assign method", function () {
		var origin1 = { a: 1 };
		var origin2 = { b: 2 };
		var origin3 = { c: 3 };

		var target = { a: 0 };
		chai.expect(Owl.Class.assign(target, origin1, origin2, origin3)).to.eql({
			a: 1,
			b: 2,
			c: 3
		});

		var arr = [];

		chai.expect(Owl.Class.assign({}, arr)).to.eql({});
	});

	it("can shallow clone an object", function () {
		var source = {
			a: 1,
			b: 2,
			c: function () { },
			d: function () { }
		};
		var target = Owl.Class.clone(source, false);
		chai.expect(target).to.eql(source);
	});

	it("can deep Clone an object", function () {
		var source = {
			a: 1,
			b: 2,
			c: [1, 2]
		};
		var target = Owl.Class.clone(source, true);
		source.c.push(3);
		chai.expect(target).to.eql({
			a: 1,
			b: 2,
			c: [1, 2]
		});
	});

});