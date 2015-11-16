'use strict';
var chai = require('chai');
var Owl = require('../src/Class.js');

var View = Owl.AbstractView;

describe("This test is for AbstractView", function() {
	it("can create new view", function() {
		var view = new View;
		
		console.log(view);
	});
});