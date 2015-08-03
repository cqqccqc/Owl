/* global seajs */
/* global define */
/* global global */

(function (factory) {
    'use strict';
    // root = Window in browser or root = global in other env
    var root = (typeof self === "object" && self.self === self && self) ||
        (typeof global == "object" && global.global === global && global);
    
    // For AMD 
    if (typeof define === "function" && define.amd) {
        define([], function () {
            return factory(root, {});
        });
        // For Node.js 
    } else if (typeof exports !== "undefined") {
        exports = module.exoprts = factory(root, {});
        // For seajs
    } else if (typeof seajs === "object") {
        define(function (require, exports, module) {
            exports = module.exoprts = factory(root, {});
        });
        // For browser global 
    } else {
        root.owl = factory(root, {});
    }

})(function (root, owl) {
    'use strict';

    owl.VERSION = "0.0.1";

    // object function
    owl.clone = function (obj) {
        var o;
        if (typeof obj === "object") {
            if (obj === null) {
                o = null;
            } else {
                if (Object.prototype.toString.call(obj) === "[object Array]") {
                    o = [];
                    for (var i = 0; i < obj.length; i++) {
                        o.push(owl.clone(obj[i]));
                    }
                } else {
                    o = {};
                    for (var prop in obj) {
                        o[prop] = owl.clone(obj[prop]);
                    }
                }
            }
        } else {
            o = obj;
        }
        return o;
    };
    
    
    owl.mixin = function (target, src) {
        var srcList = Array.prototype.slice.call(arguments, 1);
        var listLength = srcList.length;
        for(var i = 0; i < listLength; i++) {
            for(var prop in srcList[i]) {
                if (!target[prop]) {
                    target[prop] = owl.clone(srcList[i][prop]);
                }
            }
        }
        return target;
    };
    
    return owl;
});