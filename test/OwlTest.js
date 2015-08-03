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

	it("has mixin function to mix object", function () {
		var target = {},
			src1 = {
				a: 'a',
				b: 'b',
				c: [1, 2]
			};
		expect(owl.mixin(target, src1)).toEqual(src1);
	});
});