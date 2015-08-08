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

	it("has extend function to mix object", function () {
		var target = {},
			src1 = {
				a: 'a',
				b: 'b',
				c: [1, 2]
			};
		expect(owl.extend(target, src1)).toEqual(src1);
		expect(owl.extend(target, src1, src1)).toEqual(src1);
	});

	it("has trim function to trim string", function() {
		expect(owl.trim(" aaa ")).toBe("aaa");
		expect(owl.trim(" aaa ", "bbb")).toBe("bbbaaabbb");
		expect(owl.trim(" aaa ", {})).toBe("aaa");
	});
});
