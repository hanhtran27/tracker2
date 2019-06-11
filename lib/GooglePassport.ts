import googleAppAuth from './googleOauth2';
import { UserController } from "./controllers/userController";
let passport = require('passport');
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Creates a Passport configuration for Google
class GooglePassport {

  lookupUser(id, done):void {
        let userController = new UserController();
        userController.getUser(id, done);
    }

    constructor() {
        passport.use(new GoogleStrategy({
                clientID: googleAppAuth.id,
                clientSecret: googleAppAuth.secret,
                callbackURL: "/auth/google/callback",   // 
                profileFields: ['id', 'displayName', 'emails']
            },
            (accessToken, refreshToken, profile, done) => {
                process.nextTick( () => {
                    console.log('validating google profile:' + JSON.stringify(profile));
                    
                    // When google sends us a user profile here, store it in Mongo User table so that we can look up the
                    // profile for next user's requests, and dont' need to ask user to sign in with google
                    // all the time. When user logout, delete the entry in User table.
                    let userController = new UserController();
                    userController.addUser(profile.emails[0].value, profile.displayName, profile.id);
                     
                    return done(null, profile);
                });
            }
        ));

        // store user googleId in client browser
        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });

        // when client send any request with email in the header, search in Mongo User table
        passport.deserializeUser(this.lookupUser);
    }
}
export default GooglePassport;