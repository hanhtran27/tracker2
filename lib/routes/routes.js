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
    Routes.prototype.validateAuth = function (req, res, next) {
        if (req.isAuthenticated()) {
            console.log("user is authenticated");
            return next();
        }
        console.log("user is not authenticated");
        res.redirect('/');
    };
    Routes.prototype.checkSignIn = function (req, res, next) {
        /*
        if(req.session.user){
           next();     //If session exists, proceed to page
        } else {
           var err = new Error("Not logged in!");
           console.log(req.session.user);
           next(err);  //Error, trying to access unauthorized page!
        }
        */
        passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] });
    };
    Routes.prototype.logIn = function (req, res, next) {
        console.log('set session.user to khanh now');
        req.session.user = 1;
        res.redirect('/goals');
    };
    Routes.prototype.logOut = function (req, res, next) {
        req.session.user = null;
        res.redirect('/');
    };
    Routes.prototype.routes = function (app) {
        app.route('/testLogin')
            .get(this.logIn);
        app.route('/testLogout')
            .get(this.logOut);
        app.route('/')
            .get(this.goalController.test);
        app.route('/auth/google')
            .get(passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));
        app.route('/auth/google/callback')
            .get(passport.authenticate('google', 
        // redirect to goals if succeed, otherwise, created 
        { successRedirect: '/goals', failureRedirect: '/' }));
        app.route('/goals')
            .get(passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }), this.goalController.getGoals);
        app.route('/goals/tag/:tag')
            .get(this.goalController.getGoalsWithTag);
        // goals?userId="agdsgdaf"
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
