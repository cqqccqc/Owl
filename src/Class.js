"use strict";

var Owl = require('./Core');

var Class = function (Super, properties) {

	var _class, _proto, _props;

	_class = function () {
		this._init.apply(this, arguments);
	};
	_props = properties || {};

	if (Owl.isFunction(Super)) {
		// Check if constructor
		_proto = Class.create(Super.prototype);
		_class.prototype = Class.assign(_proto, _props);
		_class.prototype._super = Super.prototype.init;
	} else if (Owl.isObject(Super)) {
						
		// Check if Array
		if (Owl.isArray(Super)) { }
		
		// plain object
		else {
			_class.prototype = Super;
			_class.prototype._super = function () { };
		}
	}
	// default constructor method
	_class.prototype._init = _class.prototype._init ||
			function () { if (Owl.isFunction(this._super)) this._super.apply(this, arguments); };
	return _class;
};

Class.create = Object.create || function (proto) {
	var F = function () { };
	F.prototype = proto;
	return new F();
};

Class.mixin = Class.assign = Object.assign || function (target, sources) {
	var sourceList = Array.prototype.slice.call(sources, 1);
	sourceList.forEach(function (source) {
		if (Owl.isArray(source)) {
			return;
		}
		for (var prop in source) {
			target[prop] = source[prop];
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
			o[prop] = target[prop];
		}
		return o;
	};

	var deepClone = function (target) {
		var o;
		if (typeof target === "object") {
			if (target === null) {
				o = null;
			} else if (Owl.isArray(target)) {
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