/// <reference path="../typings/node/node.d.ts"/>
"use strict";

var AWS = require("aws-sdk");

var bucket = process.env.S3BUCKET;

module.exports = function(msg, done) {
	var s3 = new AWS.S3();
  var now = new Date();
  var params = {
    Bucket: bucket,
    Key: msg.messageId + "/" + now.getTime(),
    Metadata: {
      status: msg.status,
      acknowledgedTimestamp: msg.acknowledgedTimestamp
    },
    Body: msg.content
  };
  
  s3.putObject(params, function(err, data) {
    done(err, data);
  });
};
