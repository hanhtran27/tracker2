import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('User', UserSchema);
mongoose.set('useFindAndModify', false);

export class UserController {
    
    public addUser(emal: String, nam: String, gId: String) {

        let newUser = new User({email: emal, name: nam, googleId: gId, hash: "1234" });
        console.log('track new google user:' + emal);
        newUser.save((err, user) => {
            if (err) {
                console.log("failed to track google user to db");
            }
            
        });
    }

    public getUser(id: String, done) {
        User.find({"googleId": id}, (err, user) => {
            if (err) {
                console.log("ERROR: Can't track google user " + err)
                done(null, false);
            }
            console.log("Deserialized user:" + user);
            done(null, user[0]);
        });
    }

    public removeUser(id: String) {
        User.deleteOne({ "googleId": id }, 
            (err) => {
            if(err){
                console.log("ERROR: can't untrack google user " + err);
            }
            console.log("untracked user with id: " + id);
        });
    }

    public addNewUser(req: Request, res: Response) {
        let newUser = new User(req.body);

        console.log("creating new user " + req.body.email);
        newUser.save((err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public getUsers(req, res: Response) {
        User.find({"googleId": req.user.googleId}, (err, user) => {
            if(err){
                res.send(err);
            }
            res.json(user[0]);
        });
    }

    public getUserWithId(req: Request, res: Response) {
        User.findById(req.params.userId, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public updateUser(req: Request, res: Response) {
        User.findOneAndUpdate({ _id: req.params.userId },
        req.body, 
        { new: true }, 
        (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public deleteUser(req: Request, res: Response) {           
        User.deleteOne({ _id: req.params.userId }, 
            (err) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted user!'});
        });
    }
}
