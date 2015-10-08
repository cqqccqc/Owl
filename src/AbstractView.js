"use strict";
var Owl = require('./Core');
var Event = Owl.Event;

var AbstractView = new Owl.Class(Event, {	
	// some default configuration
	
	// The real construct method
	_init: function () {
		if (Owl.isFunction(this._super)) this._super.apply(this, arguments);
		this.initialize.apply(this, arguments);
	},

	tagName: 'div',

	// override this initialize method
	initialize: function () { },

	render: function () { return this; }


});

Owl.AbstractView = AbstractView;
exports = module.exports = Owl;