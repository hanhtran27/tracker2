"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var routes_1 = require("./routes/routes");
var cors = require("cors");
// import * as session from 'express-session';
var passport = require('passport');
var App = /** @class */ (function () {
    function App() {
        //define routes
        this.routes = new routes_1.Routes();
        this.app = express();
        this.config();
        this.routes.routes(this.app);
    }
    App.prototype.config = function () {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
        // this.app.use('/', express.static(__dirname+'/dist'));
        // this.app.use(session({ secret: 'keyboard cat' }));
        this.app.use(passport.initialize());
        this.app.use(passport.session()); // persisten login session
    };
    return App;
}());
exports["default"] = new App().app;
