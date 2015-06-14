"use strict";

module.exports = function(app) {
  app.get("/healthcheck", function(req, res) {
    res.status(200).end("Server OK!");
  });
}
