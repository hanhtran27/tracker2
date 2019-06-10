import { GoalController } from "../controllers/goalController";
import { UserController } from "../controllers/userController";
import { RecordController } from "../controllers/recordController";
import {RegisterController} from "../controllers/registerController";
import {LoginController} from "../controllers/loginController";
import GooglePassportObj from '../GooglePassport';


let passport = require('passport');

class Routes {
    public goalController: GoalController = new GoalController();
    public userController: UserController = new UserController();
    public recordController: RecordController = new RecordController();
    public registerController: RegisterController = new RegisterController();
    public loginController: LoginController = new LoginController();
    public googlePassportObj:GooglePassportObj = new GooglePassportObj();
    
    private validateAuth(req, res, next):void {
        if (req.isAuthenticated()) { console.log("user is authenticated"); return next(); }
        console.log("user is not authenticated");
        res.redirect('/');
      }

    public routes(app): void {

        app.route('/')
            .get(this.goalController.test)
        
        app.route('/auth/google')
            .get(passport.authenticate('google',
            {scope:['https://www.googleapis.com/auth/plus.login', 'email'] }))
        
        app.route('/auth/google/callback')
            .get(passport.authenticate('google',
            // redirect to goals if succeed, otherwise, created 
            {successRedirect:'/goals',failureRedirect:'/'}))

        app.route('/goals')
            .get(this.goalController.getGoals)

        app.route('/goals/tag/:tag')    
            .get(this.goalController.getGoalsWithTag)

        // goals?userId="agdsgdaf"
        app.route('/goals/user/:userId')
            .get(this.goalController.getGoalsWithUserId)

        //create a goal
        app.route('/goal')         
            .post(this.goalController.addNewGoal)

        app.route('/goal/:goalId')
            .get(this.goalController.getGoalWithId)
            .put(this.goalController.updateGoal)
            .delete(this.goalController.deleteGoal)


        //USERS
        app.route('/users')
            .get(this.userController.getUsers)

        app.route('/user')
            .post(this.userController.addNewUser)

        app.route('/user/:userId')
            .get(this.userController.getUserWithId)
            .put(this.userController.updateUser)
            .delete(this.userController.deleteUser)


        app.route('/record')
            .post(this.recordController.addNewRecord)
        
        app.route('/records')
            .get(this.recordController.getRecords)

        app.route('/record/:recordId')
            .get(this.recordController.getRecordWithId)
            .put(this.recordController.updateRecord)
            .delete(this.recordController.deleteRecord)

        //get records of a same goal
        app.route('/records/goal/:goalId') //
            .get(this.recordController.getRecordsWithGoalId)

        app.route('/register')
            .post(this.registerController.register)
            
        app.route('/login')
            .post(this.loginController.login)

    }
}

export {Routes};