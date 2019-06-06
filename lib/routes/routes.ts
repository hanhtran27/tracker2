import { GoalController } from "../controllers/goalController";
import { UserController } from "../controllers/userController";
import { RecordController } from "../controllers/recordController";
import {RegisterController} from "../controllers/registerController";
import {LoginController} from "../controllers/loginController";


class Routes {
    public goalController: GoalController = new GoalController();
    public userController: UserController = new UserController();
    public recordController: RecordController = new RecordController();
    public registerController: RegisterController = new RegisterController();
    public loginController: LoginController = new LoginController();
    
    public routes(app): void {

        //GOALS
        app.route('/')
            .get(this.goalController.test)
        

        app.route('/goals')
            //get all goals
            .get(this.goalController.getGoals)

        app.route('/goals/tag/:tag')    //fixme: should have user id 
            //get goals with same tag
            .get(this.goalController.getGoalsWithTag)

        // /goals?userId="agdsgdaf"
        app.route('/goals/user/:userId')
            //get goals of a same user
            .get(this.goalController.getGoalsWithUserId)

        //create a goal
        app.route('/goal')         
            .post(this.goalController.addNewGoal)

        app.route('/goal/:goalId')
            //get specific goal
            .get(this.goalController.getGoalWithId)
            // Update a goal  
            .put(this.goalController.updateGoal)
            // Delete a goal 
            .delete(this.goalController.deleteGoal)


        //USERS

        app.route('/users')
            //get all users
            .get(this.userController.getUsers)

        app.route('/user')
            //create a user
            .post(this.userController.addNewUser)

        app.route('/user/:userId')
            //get specific user
            .get(this.userController.getUserWithId)
            // Update a user
            .put(this.userController.updateUser)
            // Delete a user
            .delete(this.userController.deleteUser)

        //Records 

        //create a record
        app.route('/record')
            .post(this.recordController.addNewRecord)
        
        //get all records
        app.route('/records')
            .get(this.recordController.getRecords)

        app.route('/record/:recordId')
            //get specific record
            .get(this.recordController.getRecordWithId)
            //Update a record
            .put(this.recordController.updateRecord)
            // Delete a record
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