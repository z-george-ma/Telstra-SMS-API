/// <reference path="../typings/node/node.d.ts"/>
"use strict";

var Q = require("q");

var token, promise;
	
var authUri = (process.env.TURL || "https://api.telstra.com") + 
				"/v1/oauth/token?client_id=" +
				process.env.TKEY + 
				"&client_secret=" + 
				process.env.TSECRET +
				"&grant_type=client_credentials&scope=SMS";
				
module.exports = function(request, done) {
	var time = new Date();
	if (token && token.expiryTime < time) {
		return done(null, token.accessToken);
	}
	
	if (!promise) {
		var deferred = Q.defer();
		
		request(authUri, function(err, response, body) {
			if (!err && response.statusCode == 200) {
				var ret = JSON.parse(body);
				time.setSeconds(time.getSeconds() + parseInt(ret.expires_in));
				token = {
					accessToken: ret.access_token,
					expiryTime: time
				};
				
				deferred.resolve(ret.access_token);
			} else {
				deferred.reject(err);
			}
		});
		
		promise = deferred.promise;
	}
	
	promise.then(function(token) {
		promise = null;
		done(null, token);
	}).catch(function(err) {
		promise = null;
		done(err);
	});
};
