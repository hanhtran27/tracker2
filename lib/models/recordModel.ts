import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const RecordSchema = new Schema({
    goalId: {type: mongoose.Schema.Types.ObjectId},
    finishedUnits: {type: Number},
    finishedDate: {type: Date},
});
