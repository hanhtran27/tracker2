"use strict";
exports.__esModule = true;
var googleOauth2_1 = require("./googleOauth2");
var userController_1 = require("./controllers/userController");
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// Creates a Passport configuration for Google
var GooglePassport = /** @class */ (function () {
    function GooglePassport() {
        var _this = this;
        this.clientId = googleOauth2_1["default"].id;
        this.secretId = googleOauth2_1["default"].secret;
        passport.use(new GoogleStrategy({
            clientID: this.clientId,
            clientSecret: this.secretId,
            callbackURL: "/auth/google/callback",
            profileFields: ['id', 'displayName', 'emails']
        }, function (accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                //console.log('validating google profile:' + JSON.stringify(profile));
                _this.userId = profile.id;
                _this.displayName = profile.displayName;
                _this.email = profile.emails[0].value;
                console.log("get new google user, enter db now:");
                var userController = new userController_1.UserController();
                userController.addUser(profile.emails[0].value, profile.displayName, profile.id);
                return done(null, profile);
            });
        }));
        passport.serializeUser(function (user, done) {
            console.log("serialize now");
            done(null, user.id);
        });
        passport.deserializeUser(this.lookupUser);
    }
    GooglePassport.prototype.lookupUser = function (id, done) {
        console.log("DEserialize now ID: " + id);
        var userController = new userController_1.UserController();
        userController.getUser(id, done);
    };
    return GooglePassport;
}());
exports["default"] = GooglePassport;
