var Owl = Owl || {};

Owl.isObject = function (obj) {
	return typeof obj === "object" && obj !== null;
}

Owl.isFunction = function (func) {
	return 	Object.prototype.toString.apply(func) === "[object Function]";
};
Owl.isArray = function (arr) {
	return 	Object.prototype.toString.apply(arr) === "[object Array]";
}

exports = module.exports = Owl;