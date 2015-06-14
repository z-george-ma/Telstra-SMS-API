"use strict";
var bodyParser = require("body-parser");
var request = require("request");

var s3 = require("./s3");
var auth = require("./telstra_auth");
var sms = require("./telstra_sms");
var query = require("./telstra_query");

module.exports = function(app) {
  app.use(bodyParser.text());
  app.use(bodyParser.json());
  
  app.post("/sms/:recipient", function(req, res) {
    auth(request, function(err, token) {
      if (err) {
        res.status(500).json(err);
      } else {
        sms(token, req.params.recipient, req.body, function(err, data) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json(data);
          }
        });
      }
    });
  });

  app.get("/messages/:id", function(req, res) {
    auth(request, function(err, token) {
      if (err) {
        res.status(500).json(err);
      } else {
        query(token, { messageId: req.params.id }, function(err, data) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json(data);
          }
        });
      }
    });
  });

  app.get("/messages/:id/response", function(req, res) {
    auth(request, function(err, token) {
      if (err) {
        res.status(500).json(err);
      } else {
        query(token, { messageId: req.params.id, response: true }, function(err, data) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json(data);
          }
        });
      }
    });
  })
  
  app.post("/callback", function(req, res) {
    s3(req.body, function(err, data) {
      if (err) {
        res.status(500).json(err);
      }
      else {
        res.status(200).end();
      }
    });
  });
};
