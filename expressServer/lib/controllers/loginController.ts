import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('User', UserSchema);

export class LoginController {

    public login(req: Request, res: Response) {
        console.log("Loggin in ...")
        User.find(
            {'email':req.body.email, 'hash':req.body.hash},
            (err, result) => {
                if (err) throw (err);

                if (result.length != 0) {
                    let token:String = req.body.email + req.body.hash;
                    res.json({status: true, token: token});
                    console.log("Log in successed!")
                } else {
                    res.json({status: false});     
                    console.log("No such user exist...")   
                }    
            }
        );
    }
}