"use strict";

var Owl = require('./Core');

var Event = new Owl.Class({

	on: function (event, callback) {

		var events, name;
		if (!Owl.isString(event) || !Owl.isFunction(callback)) {
			return this;
		}
		this._callbacks = this._callbacks || {};
		events = event.split(" ");
		for (var i = 0; i < events.length; i++) {
			name = events[i];
			if (name in this._callbacks) {
			} else {
				this._callbacks[name] = [];
			}
			this._callbacks[name].push(callback);

		}

		return this;
	},

	bind: function () {
		return this.on.apply(this, arguments);
	},

	off: function (event, callback) {

		var events, name, cbList, newCbList, cb, i, j, k;
		if (!Owl.isString(event)) {
			return this;
		}
		if (!this._callbacks) return;

		events = event.split(" ");
		for (i = 0; i < events.length; i++) {
			name = events[i];
			if (name in this._callbacks) {
				cbList = this._callbacks[name];
				if (!callback) {
					delete this._callbacks[name];
					continue;
				}
				
				// check if the callback in the event callback array in a loop
				for (j = k = 0; k < cbList.length; k = ++j) {
					cb = cbList[j];
					if (cb !== callback) {
						continue;
					}
					newCbList = cbList.slice();
					newCbList.splice(j, 1);
					this._callbacks[name] = newCbList;
					break;
				}
			}
		}

		return this;
	},

	unbind: function () {
		return this.off.apply(this, arguments);
	},

	once: function (event, callback) {
		var handler = function () {
			this.off(event, handler);
			return callback.apply(this, arguments);
		}.bind(this);
		return this.on(event, handler);
	},

	listenTo: function (obj, event, callback) {
		obj.bind(event, callback);
		this._listenTo = this._listenTo || [];
		
	},

	stopListening: function (obj, event, callback) {

	},

	trigger: function (event) {
		var events, name, callback;
		if (!Owl.isString(event)) {
			return this;
		}
		events = event.split(" ");
		for (var i = 0; i < events.length; i++) {
			name = events[i];
			if (name in this._callbacks) {
				for (var j = 0; j < this._callbacks[name].length; j++) {
					callback = this._callbacks[name][j];
					callback();
				}
			} else {
				continue;
			}
		}

		return this;
	},

	removeAll: function () {
		this._callbacks = void 0;
		this._listenTo = void 0;
		return this;
	}
});

Owl.Event = Event;
exports = module.exports = Owl;