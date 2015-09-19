"use strict";

var Owl = Owl || {};

Owl.isObject = function (obj) {
	return typeof obj === "object" && obj !== null;
}

Owl.isFunction = function (func) {
	return typeof func === 'function' || false;
};

Owl.isArray = Array.isArray || function (arr) {
	return 	Object.prototype.toString.apply(arr) === "[object Array]";
};

Owl.isString = function (str) {
	return Object.prototype.toString.apply(str) === "[object String]";
};

exports = module.exports = Owl;