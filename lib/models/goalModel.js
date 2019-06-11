"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
exports.GoalSchema = new Schema({
    userId: { type: String },
    goalName: { type: String },
    tag: { type: String },
    goalNumber: { type: Number },
    goalUnit: { type: String },
    startDate: { type: Date },
    dueDate: { type: Date }
});
