"use strict";

var Owl = require('./Core');

var Class = function () {
	var _class = function () {
		this.init.apply(this, arguments);
	};

	_class.prototype.init = _class.prototype.init || function () { };

	return _class;
};

Class.create = Object.create || function (proto) {
	var F = function () { };
	F.prototype = proto;
	return new F();
};

Class.assign = Object.assign || function (target, sources) {
	var sourceList = Array.prototype.slice.call(sources, 1);
	sourceList.forEach(function (source) {
		if (Object.prototype.toString.apply(source) !== "[object Array]") {
			return;
		}
		for (var prop in source) {
			target[prop] = Class.clone(source[prop], true);
		}
	});
	return target;
};

Class.clone = function (obj, deep) {
	var _deep = deep || false;
	var res;

	var shallowClone = function (target) {
		var o = {};
		for (var prop in target) {
			if (target.hasOwnProperty(prop)) {
				o[prop] = target[prop];
			}
		}
		return o;
	};

	var deepClone = function (target) {
		var o;
		if (typeof target === "object") {
			if (target === null) {
				o = null
			} else if (Object.prototype.toString.apply(target) === "[object Array]") {
				o = [];
				for (var i = 0; i < target.length; i++) {
					o.push(deepClone(target[i]));
				}
			} else {
				o = {};
				for (var k in target) {
					o[k] = deepClone(target[k]);
				}
			}
		} else {
			o = target;
		}
		return o;
	};

	if (_deep) {
		res = deepClone(obj);
	} else {
		res = shallowClone(obj);
	}
	return res;
};

Owl.Class = Class;
exports = module.exports = Owl;