"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var DataAccess_1 = require("./DataAccess");
// const PORT = 8080;
var port = process.env.PORT || 8080;
console.log("trying to connect to MongoDB");
DataAccess_1.DataAccess.connect();
app_1["default"].listen(port, function () {
    console.log('Express server listening on port ' + port);
});
