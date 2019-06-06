"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var userModel_1 = require("../models/userModel");
var User = mongoose.model('User', userModel_1.UserSchema);
mongoose.set('useFindAndModify', false);
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.addNewUser = function (req, res) {
        var newUser = new User(req.body);
        console.log("creating new user " + req.body.email);
        newUser.save(function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    };
    UserController.prototype.getUsers = function (req, res) {
        User.find({}, function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    };
    UserController.prototype.getUserWithId = function (req, res) {
        User.findById(req.params.userId, function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    };
    UserController.prototype.updateUser = function (req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, req.body, { "new": true }, function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    };
    UserController.prototype.deleteUser = function (req, res) {
        User.deleteOne({ _id: req.params.userId }, function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted user!' });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
