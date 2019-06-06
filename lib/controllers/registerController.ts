import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('User', UserSchema);

export class RegisterController {

    public async register(req: Request, res:Response) {

        await User.find({'email': req.body.email}, (err, user) => {
            if (err) throw err;
            if (user.length > 0) {
                res.json({status: "Email already exists!"});  
            }
        });
        console.log("Creating user with email " + req.body.email);
        let user = User(req.body);
        user.save((err: any, result: any) => {
            if (err) throw err;
            res.json({
                // token: user.userName + user.hash
                token: user.hash    //fixme: token value should not related to hash or email value
            });
        });
    }
}