"use strict";

// require $ T;
var $ = require('../lib/zepto.js');
var T = require('../lib/template.js');

var Owl = Owl || {};

Owl.$ = $;
Owl.T = T;

Owl.isObject = function (obj) {
	return typeof obj === "object" && obj !== null;
}

Owl.isFunction = function (func) {
	return typeof func === 'function' || false;
};

Owl.isArray = Array.isArray || function (arr) {
	return Object.prototype.toString.apply(arr) === "[object Array]";
};

Owl.isString = function (str) {
	return Object.prototype.toString.apply(str) === "[object String]";
};

var idCounter = 0;
Owl.uniqueId = function (prefix) {
	var id = ++idCounter + '';
	return prefix ? prefix + id : id;
}

exports = module.exports = Owl;