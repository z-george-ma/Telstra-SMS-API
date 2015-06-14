"use strict";

var app = require("express")();

require("./lib/api")(app);
require("./lib/healthcheck")(app);

app.listen(process.env.PORT || 80);
