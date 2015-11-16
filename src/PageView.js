var Owl = require('./Core');
var AbstractView = Owl.AbstractView;
var Class = Owl.Class;

var PageView = new Class(AbstractView, {
	initialize: function () {
		
	},
});

Owl.View = PageView;
module.exports = Owl;