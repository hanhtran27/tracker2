import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { Routes } from "./routes/routes";
import * as cors from "cors";


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
        this.app.use(cors());
    }

    
}

export default new App().app;