import * as express from "express";
import * as bodyParser from "body-parser";
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
     
    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        //this.app.use(cors());

        
        this.app.use(cors({credentials: true, origin: 'http://localhost:8080'}));

        this.app.use('/', express.static(__dirname+'/dist'));
        this.app.use(session({ secret: 'keyboard cat' }));
        this.app.use(passport.initialize()); 
        this.app.use(passport.session())  // persisten login session
    }
}

export default new App().app;