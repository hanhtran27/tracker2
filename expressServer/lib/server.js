"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var DataAccess_1 = require("./DataAccess");
var PORT = 8080;
console.log("trying to connect to MongoDB");
DataAccess_1.DataAccess.connect();
app_1["default"].listen(PORT, function () {
    console.log('Express server listening on port ' + PORT);
});
