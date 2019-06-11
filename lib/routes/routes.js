"use strict";
exports.__esModule = true;
var goalController_1 = require("../controllers/goalController");
var userController_1 = require("../controllers/userController");
var recordController_1 = require("../controllers/recordController");
var registerController_1 = require("../controllers/registerController");
var loginController_1 = require("../controllers/loginController");
var GooglePassport_1 = require("../GooglePassport");
var passport = require('passport');
var Routes = /** @class */ (function () {
    function Routes() {
        this.goalController = new goalController_1.GoalController();
        this.userController = new userController_1.UserController();
        this.recordController = new recordController_1.RecordController();
        this.registerController = new registerController_1.RegisterController();
        this.loginController = new loginController_1.LoginController();
        this.googlePassportObj = new GooglePassport_1["default"]();
    }
    // function to check if user is logged in. This function is called before any
    // path handler is called.
    Routes.prototype.checkIfLoggedIn = function (req, res, next) {
        // always allow the log in,logout and the callback path
        if (req.path == "/auth/google"
            || req.path == '/auth/google/callback'
            || req.path == '/auth/logout') {
            // call the next path handler
            return next();
        }
        // return an error without continuing to next path handler
        if (!req.user) {
            res.status(401).send("Unauthorized");
            return;
        }
        next();
    };
    Routes.prototype.logOut = function (req, res, next) {
        // no logout if not yet log in
        if (!req.user) {
            res.redirect('http://localhost:8080/#/login');
            return;
        }
        // clear session to log out
        var userController = new userController_1.UserController();
        userController.removeUser(req.user.googleId);
        req.logout();
        res.redirect('http://localhost:8080/#/login');
    };
    Routes.prototype.routes = function (app) {
        // apply this function to all incoming requests(paths)
        app.use(this.checkIfLoggedIn);
        // this path redirect the user to Google to sign in
        app.route('/auth/google')
            .get(passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));
        // Once signed in, Google will call this path. Just redirect user back to the angular app
        app.route('/auth/google/callback')
            .get(passport.authenticate('google'), function (req, res) {
            res.redirect('http://localhost:8080/#/login');
        });
        // log out
        app.route('/auth/logout')
            .get(this.logOut);
        app.route('/goals')
            .get(this.goalController.getGoals);
        app.route('/goals/tag/:tag')
            .get(this.goalController.getGoalsWithTag);
        app.route('/goals/user/:userId')
            .get(this.goalController.getGoalsWithUserId);
        //create a goal
        app.route('/goal')
            .post(this.goalController.addNewGoal);
        app.route('/goal/:goalId')
            .get(this.goalController.getGoalWithId)
            .put(this.goalController.updateGoal)["delete"](this.goalController.deleteGoal);
        //USERS
        app.route('/users')
            .get(this.userController.getUsers);
        app.route('/user')
            .post(this.userController.addNewUser);
        app.route('/user/:userId')
            .get(this.userController.getUserWithId)
            .put(this.userController.updateUser)["delete"](this.userController.deleteUser);
        app.route('/record')
            .post(this.recordController.addNewRecord);
        app.route('/records')
            .get(this.recordController.getRecords);
        app.route('/record/:recordId')
            .get(this.recordController.getRecordWithId)
            .put(this.recordController.updateRecord)["delete"](this.recordController.deleteRecord);
        //get records of a same goal
        app.route('/records/goal/:goalId') //
            .get(this.recordController.getRecordsWithGoalId);
        app.route('/register')
            .post(this.registerController.register);
        app.route('/login')
            .post(this.loginController.login);
    };
    return Routes;
}());
exports.Routes = Routes;
