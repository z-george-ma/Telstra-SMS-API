/// <reference path="../typings/mocha/mocha.d.ts"/>
"use strict";

var should = require("should");

describe("First time auth", function() {
  var actualOutput;
  
  var auth = require("../lib/telstra_auth");
  var request = function (uri, callback) {
    callback(null, {
      statusCode: 200
    }, JSON.stringify({
      access_token: "abc",
      expiryTime: 3600
    }));
  };
  
  before(function(done) {
    auth(request, function(err, token) {
      actualOutput = token;
      done();
    });
  });

  it("send request and return result", function() {
	  actualOutput.should.eql("abc");
  });
});


describe("Multiple auth request", function() {
  var requestCalled = 0;
  
  var auth = require("../lib/telstra_auth");  
  var request = function (uri, callback) {
    requestCalled++;
    setTimeout(function() {
      callback(null, {
        statusCode: 200
      }, JSON.stringify({
        access_token: "abc",
        expiryTime: 3600
      }));
    }, 1000);
  };
  
  before(function(done) {
    var count = 0;
    auth(request, function(err, token) {
      count++;
      if (count == 3)
        done();
    });
    auth(request, function(err, token) {
      count++;
      if (count == 3)
        done();
    });    
    auth(request, function(err, token) {
      count++;
      if (count == 3)
        done();
    }); 
  });

  it("send request once and return result", function() {
	  requestCalled.should.eql(1);
  });
});
