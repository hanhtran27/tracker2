import Mongoose = require("mongoose");

interface IUserModel extends Mongoose.Document {
    userId: string;
    email: string;
    hash: string;
    
}
export {IUserModel};