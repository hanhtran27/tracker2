import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { Routes } from "./routes/routes";
import * as cors from "cors";
import * as session from 'express-session';

let passport = require('passport');
class App {
    //install express
    public app: express.Application;
    //define routes
    public routes: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();    
        this.routes.routes(this.app);     
    }
    private checkLogIn (req, res, next) {
        if(req.session.user){
            next();     //If session exists, proceed to page
         } else {
            res.status(400).send("Unauthorized, please log in.");
         }
      }
      
    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        //this.app.use(cors());

        this.app.use(cors({credentials: true, origin: 'http://localhost:4200'}));

        // this.app.use('/', express.static(__dirname+'/dist'));
        this.app.use(session({ secret: 'keyboard cat' }));
        this.app.use(passport.initialize()); 
        this.app.use(passport.session())  // persisten login session
        //this.app.use(this.checkLogIn);

    }

    
}

export default new App().app;