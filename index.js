var async = require('async');
module.exports = function() {
	var keys = {};
	return {
		incr : function(key, cb) {
			if(typeof(keys[key]) === "undefined") {
				keys[key] = 0;
			}
			if(typeof(keys[key]) !== "number") {
				return cb(new Error("value is not an integer or out of range"));
			}
			keys[key] += 1;
			return cb(null,keys[key]);
		},
		decr : function(key, cb) {
			if(typeof(keys[key]) === "undefined") {
				keys[key] = 0;
			}
			if(typeof(keys[key]) !== "number") {
				return cb(new Error("value is not an integer or out of range"));
			}
			keys[key] -= 1;
			return cb(null,keys[key]);
		},
		set : function(key, value) {
			keys[key] = value;
		},
		get : function(key, cb) {
			if(typeof(keys[key]) === "undefined") {
				return cb(null,null);
			}
			if(typeof(keys[key]) === "number" || typeof(keys[key]) === "string") {
				return cb(null,keys[key]);
			}
		},
		mget : function(keys, cb) {
			async.map(keys,this.get,cb);
		}
	};
}