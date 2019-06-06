"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var userModel_1 = require("../models/userModel");
var User = mongoose.model('User', userModel_1.UserSchema);
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController.prototype.login = function (req, res) {
        console.log("Loggin in ...");
        User.find({ 'email': req.body.email, 'hash': req.body.hash }, function (err, result) {
            if (err)
                throw (err);
            if (result.length != 0) {
                var token = req.body.email + req.body.hash;
                res.json({ status: true, token: token });
                console.log("Log in successed!");
            }
            else {
                res.json({ status: false });
                console.log("No such user exist...");
            }
        });
    };
    return LoginController;
}());
exports.LoginController = LoginController;
