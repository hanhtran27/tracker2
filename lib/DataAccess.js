"use strict";
exports.__esModule = true;
var Mongoose = require("mongoose");
var DataAccess = /** @class */ (function () {
    function DataAccess() {
        DataAccess.connect();
    }
    DataAccess.connect = function () {
        if (this.mongooseInstance)
            return this.mongooseInstance;
        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.on("open", function () {
            console.log("Connected to mongodb.");
        });
        this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING, { useNewUrlParser: true });
        return this.mongooseInstance;
    };
    // static DB_CONNECTION_STRING:string = 'mongodb://localhost:3000/sample';
    DataAccess.DB_CONNECTION_STRING = 'mongodb+srv://admin:admin123@cluster0-vddun.azure.mongodb.net/sample?retryWrites=true&w=majority';
    return DataAccess;
}());
exports.DataAccess = DataAccess;
