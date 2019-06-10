import googleAppAuth from './googleOauth2';

import { UserController } from "./controllers/userController";

let passport = require('passport');
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Creates a Passport configuration for Google
class GooglePassport {

    userId: string;
    displayName: string;
    email: string;
    clientId: string;
    secretId: string;
    
    lookupUser(id, done):void {
        console.log("DEserialize now ID: " + id);
        let userController = new UserController();
        userController.getUser(id, done);
    }

    constructor() {
        this.clientId = googleAppAuth.id;
        this.secretId = googleAppAuth.secret;
        passport.use(new GoogleStrategy({
                clientID: this.clientId,
                clientSecret: this.secretId,
                callbackURL: "/auth/google/callback",   // 
                profileFields: ['id', 'displayName', 'emails']
            },
            (accessToken, refreshToken, profile, done) => {
                process.nextTick( () => {
                    //console.log('validating google profile:' + JSON.stringify(profile));
                    this.userId = profile.id;
                    this.displayName = profile.displayName;
                    this.email = profile.emails[0].value;
                    console.log("get new google user, enter db now:");

                    let userController = new UserController();
                    userController.addUser(profile.emails[0].value, profile.displayName, profile.id);
                     
                    return done(null, profile);
                });
            }
        ));

        passport.serializeUser(function(user, done) {
            console.log("serialize now");
            done(null, user.id);
        });

        passport.deserializeUser(this.lookupUser);
    }
}
export default GooglePassport;