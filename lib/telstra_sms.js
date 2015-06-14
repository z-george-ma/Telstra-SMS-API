/// <reference path="../typings/node/node.d.ts"/>
"use strict";

var request = require("request");

var smsUri = (process.env.TURL || "https://api.telstra.com") + "/v1/sms/messages";
				
module.exports = function(token, recipient, msg, done) {
	request.post({
    url: smsUri,
    headers: {
      "Authorization": "Bearer " + token,
    },
    json: true,
    body: {
      "to": recipient,
      "body": msg
    }
  }, function(err, response, body) {
		if (!err && response.statusCode < 300) {
			done(null, body);
		} else {
			done(err);
		}
	});
};
