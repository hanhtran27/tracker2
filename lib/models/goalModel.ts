import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const GoalSchema = new Schema({
  userId:{type:String},
  goalName:{type:String},
  tag:{type:String},
  goalNumber:{type:Number},
  goalUnit:{type:String},
  startDate:{type:Date},
  dueDate:{type:Date}
});
