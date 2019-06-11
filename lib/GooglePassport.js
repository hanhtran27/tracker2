"use strict";
exports.__esModule = true;
var googleOauth2_1 = require("./googleOauth2");
var userController_1 = require("./controllers/userController");
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// Creates a Passport configuration for Google
var GooglePassport = /** @class */ (function () {
    function GooglePassport() {
        passport.use(new GoogleStrategy({
            clientID: googleOauth2_1["default"].id,
            clientSecret: googleOauth2_1["default"].secret,
            callbackURL: "/auth/google/callback",
            profileFields: ['id', 'displayName', 'emails']
        }, function (accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                console.log('validating google profile:' + JSON.stringify(profile));
                // When google sends us a user profile here, store it in Mongo User table so that we can look up the
                // profile for next user's requests, and dont' need to ask user to sign in with google
                // all the time. When user logout, delete the entry in User table.
                var userController = new userController_1.UserController();
                userController.addUser(profile.emails[0].value, profile.displayName, profile.id);
                return done(null, profile);
            });
        }));
        // store user googleId in client browser
        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });
        // when client send any request with email in the header, search in Mongo User table
        passport.deserializeUser(this.lookupUser);
    }
    GooglePassport.prototype.lookupUser = function (id, done) {
        var userController = new userController_1.UserController();
        userController.getUser(id, done);
    };
    return GooglePassport;
}());
exports["default"] = GooglePassport;
