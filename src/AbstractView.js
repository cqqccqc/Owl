"use strict";
var Owl = require('./Core');
var Event = Owl.Event;

var AbstractView = new Owl.Class(Event, {	
	// some default configuration
	
	// The real construct method
	_init: function () {
		if (Owl.isFunction(this._super)) this._super.apply(this, arguments);
		this.uniqueId = Owl.uniqueId('view-');
		this._createElement();
		this.initialize.apply(this, arguments);
	},

	id: '',
	tagName: 'div',
	className: '',
	attribute: {},
	model: null,

	$: function (selector) {
		return this.$el.find(selector);
	},
	
	// override this initialize method
	initialize: function () { },

	/**
	 * events: {
	 * 	"event selector": "handler",
	 * 	"event selector": function() { }
	 * }
	 */
	delegateEvents: function () {
		var attr, attrs, event, selector, handler, match;
		if (!Owl.isObject(this.events)) {
			return;
		}
		this.undelegateEvents();
		attrs = this.events;
		for (attr in attrs) {
			match = attr.split(" ");
			event = match[0];
			selector = match[1];

			handler = attrs[attr];
			if (!Owl.isFunction(handler)) handler = this[handler];

			this._delegate(event, selector, handler);
		}
	},

	_delegate: function (eventName, selector, handler) {
		this.$el.on(eventName + '.delegateEvents' + this.uniqueId, selector, handler);
		return this;
	},

	undelegateEvents: function () {
		if (this.$el) this.$el.off('.delegateEvents' + this.cid);
		return this;
	},

	_undelegate: function (eventName, selector, listener) {
		this.$el.off(eventName + '.delegateEvents' + this.cid, selector, listener);
		return this;
    },

	/**
	 * override this function to render view
	 */
	render: function () { return this; },

	remove: function () {
		this.$el.remove(); // remove dom node
		this.removeAll(); // stop all event listener
	},

	_createElement: function () {
		this.el = document.createElement(this.tagName);
		var $el = this.$el = Owl.$(this.el);
		$el.attr('id', this.id);
		$el.attr('class', this.className);
		if (this.attribute) {
			this._setAttributes(this.attribute);
		}
	},

	_setAttributes: function (attributes) {
		this.$el.attr(attributes);
	}
});

Owl.AbstractView = AbstractView;
exports = module.exports = Owl;