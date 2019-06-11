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
    
    // function to check if user is logged in. This function is called before any
    // path handler is called.
    private checkIfLoggedIn(req, res, next):void {

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
    }

     private logOut(req, res, next):void {

        // no logout if not yet log in
        if (!req.user) {
            res.redirect('http://localhost:4200/#/login');
            return;
        }
        // clear session to log out
        let userController = new UserController();
        userController.removeUser(req.user.googleId);
        req.logout();
        res.redirect('http://localhost:4200/#/login');
    }

    public routes(app): void {

        // apply this function to all incoming requests(paths)
        app.use(this.checkIfLoggedIn);

        // this path redirect the user to Google to sign in
        app.route('/auth/google')
            .get(passport.authenticate('google',
            {scope:['https://www.googleapis.com/auth/plus.login', 'email'] }));
        
        // Once signed in, Google will call this path. Just redirect user back to the angular app
        app.route('/auth/google/callback')
            .get(passport.authenticate('google'),(req, res) => {
                res.redirect('http://localhost:4200/#/login');
            });

        // log out
        app.route('/auth/logout')
            .get(this.logOut);

        app.route('/goals')
            .get(this.goalController.getGoals);

        app.route('/goals/tag/:tag')    
            .get(this.goalController.getGoalsWithTag)

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