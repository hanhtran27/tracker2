import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('User', UserSchema);
mongoose.set('useFindAndModify', false);

export class UserController {
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

    public getUsers(req: Request, res: Response) {
        User.find({}, (err, user) => {
            if(err){
                res.send(err);
            }
            res.json(user);
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
