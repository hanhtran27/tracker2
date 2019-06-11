"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var userModel_1 = require("../models/userModel");
var User = mongoose.model('User', userModel_1.UserSchema);
mongoose.set('useFindAndModify', false);
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.addUser = function (emal, nam, gId) {
        var newUser = new User({ email: emal, name: nam, googleId: gId, hash: "1234" });
        console.log('track new google user:' + emal);
        newUser.save(function (err, user) {
            if (err) {
                console.log("failed to track google user to db");
            }
        });
    };
    UserController.prototype.getUser = function (id, done) {
        User.find({ "googleId": id }, function (err, user) {
            if (err) {
                console.log("ERROR: Can't track google user " + err);
                done(null, false);
            }
            console.log("Deserialized user:" + user);
            done(null, user[0]);
        });
    };
    UserController.prototype.removeUser = function (id) {
        User.deleteOne({ "googleId": id }, function (err) {
            if (err) {
                console.log("ERROR: can't untrack google user " + err);
            }
            console.log("untracked user with id: " + id);
        });
    };
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
        User.find({ "googleId": req.user.googleId }, function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user[0]);
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
