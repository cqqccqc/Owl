'use strict';
var chai = require('chai');
var Class = require('../src/Class.js');

describe("This test if for Class module", function () {
	
	it("creates a construct method", function () {
		var construct = new Class.Class();
		chai.expect(construct).to.be.a('function');
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
		var origin1 = {a: 1};
		var origin2 = {b: 2};
		var origin3 = {c: 3};
		
		var target = {a: 0};
		chai.expect(Class.Class.assign(target, origin1, origin2, origin3)).to.eql({
			a:1,
			b:2,
			c:3
		});
		
		var arr = [];
		
		chai.expect(Class.Class.assign({}, arr)).to.eql({});
	});
	
	it("can shallow clone an object", function () {
		var source = {
			a: 1,
			b: 2,
			c: function (){},
			d: function () {}
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