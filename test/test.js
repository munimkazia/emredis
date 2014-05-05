var assert = require('assert');
var emredis = require('../');

describe("String Operations",function() {
	describe("#incr",function(){
		it('should create a zero value and increment by 1 if key is not defined', function(done){
			var redis = new emredis();
			redis.incr('newkey',function(err,res) {
				if(err){
					return done(err);
				}
				assert.equal(1,res);
				done();
			});
		});
		it('should throw an error for non numeric keys', function(done){
			var redis = new emredis();
			redis.set('newkey','string value');
			redis.incr('newkey',function(err,res) {
				if(err){
					return done();
				} else {
					throw "No error returned";
				}
			});
		});
	});

	describe("#decr",function(){
		it('should create a zero value and decrement by 1 if key is not defined', function(done){
			var redis = new emredis();
			redis.decr('newkey',function(err,res) {
				if(err){
					return done(err);
				}
				assert.equal(-1,res);
				done();
			});
		});
		it('should throw an error for non numeric keys', function(done){
			var redis = new emredis();
			redis.set('newkey','string value');
			redis.decr('newkey',function(err,res) {
				if(err){
					return done();
				} else {
					throw "No error returned";
				}
			});
		});
	});

	describe("#set",function(){
		it('should set a numerical value',function(done){
			var redis = new emredis();
			redis.set('newkey',10);
			redis.get('newkey',function(err,res) {
				if(err) {
					return done(err)
				}
				assert.equal(10,res);
				done();
			});
		});
		it('should set a string value',function(done){
			var redis = new emredis();
			redis.set('newkey',"hello");
			redis.get('newkey',function(err,res) {
				if(err) {
					return done(err)
				}
				assert.equal("hello",res);
				done();
			});
		});
	});
	describe("#get", function(){
		it('should return null for an undefined value',function(done){
			var redis = new emredis();
			redis.get("newkey1",function(err,res){
				if(err) {
					return done(err)
				}
				assert.equal(null,res);
				done();
			})
		})
	});
	describe("#mget", function(){
		it('should return multiple values',function(done){
			var redis = new emredis();
			redis.set('key1',"hello");
			redis.set('key2',10);
			redis.mget(["key1","key2","key3"],function(err,res){
				if(err) {
					return done(err)
				}
				assert.equal(3,res.length);
				assert.equal("hello",res[0]);
				assert.equal(10,res[1]);
				assert.equal(null,res[2])
				done();
			});
		});
	});
});