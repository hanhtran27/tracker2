"use strict";
exports.__esModule = true;
var goalController_1 = require("../controllers/goalController");
var userController_1 = require("../controllers/userController");
var recordController_1 = require("../controllers/recordController");
var registerController_1 = require("../controllers/registerController");
var loginController_1 = require("../controllers/loginController");
var Routes = /** @class */ (function () {
    function Routes() {
        this.goalController = new goalController_1.GoalController();
        this.userController = new userController_1.UserController();
        this.recordController = new recordController_1.RecordController();
        this.registerController = new registerController_1.RegisterController();
        this.loginController = new loginController_1.LoginController();
    }
    Routes.prototype.routes = function (app) {
        //GOALS
        app.route('/')
            .get(this.goalController.test);
        app.route('/goals')
            //get all goals
            .get(this.goalController.getGoals);
        app.route('/goals/tag/:tag') //fixme: should have user id 
            //get goals with same tag
            .get(this.goalController.getGoalsWithTag);
        // /goals?userId="agdsgdaf"
        app.route('/goals/user/:userId')
            //get goals of a same user
            .get(this.goalController.getGoalsWithUserId);
        //create a goal
        app.route('/goal')
            .post(this.goalController.addNewGoal);
        app.route('/goal/:goalId')
            //get specific goal
            .get(this.goalController.getGoalWithId)
            // Update a goal  
            .put(this.goalController.updateGoal)["delete"](this.goalController.deleteGoal);
        //USERS
        app.route('/users')
            //get all users
            .get(this.userController.getUsers);
        app.route('/user')
            //create a user
            .post(this.userController.addNewUser);
        app.route('/user/:userId')
            //get specific user
            .get(this.userController.getUserWithId)
            // Update a user
            .put(this.userController.updateUser)["delete"](this.userController.deleteUser);
        //Records 
        //create a record
        app.route('/record')
            .post(this.recordController.addNewRecord);
        //get all records
        app.route('/records')
            .get(this.recordController.getRecords);
        app.route('/record/:recordId')
            //get specific record
            .get(this.recordController.getRecordWithId)
            //Update a record
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
