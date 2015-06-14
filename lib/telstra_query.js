/// <reference path="../typings/node/node.d.ts"/>
"use strict";

var request = require("request");

var smsUri = (process.env.TURL || "https://api.telstra.com") + "/v1/sms/messages/";
				
module.exports = function(token, options, done) {
  var url = smsUri + options.messageId;

  if (options.response) {
    url += "/response";
  }

	request.get({
    url: url,
    headers: {
      "Authorization": "Bearer " + token,
    },
    json: true
  }, function(err, response, body) {
		if (!err && response.statusCode == 200) {
			done(null, body);
		} else {
			done(err);
		}
	});
};
