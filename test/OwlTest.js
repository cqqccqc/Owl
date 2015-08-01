describe("Owl", function(){
	"use strict";
	it("has clone function to deep clone object", function(){
		var obj = {
			a: [1, 2],
			b: "B",
			c: "3"
		};
		expect(owl.clone(obj)).toEqual(obj);
	});

	it("Should be an array", function () {
		var a = [];
		expect(Object.prototype.toString.call(a) === "[object Array]").toBeTruthy();
	});
});