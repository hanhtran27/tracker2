import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    hash: {type: String, unique: false, required: true}
});
