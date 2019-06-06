"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
exports.RecordSchema = new Schema({
    goalId: { type: mongoose.Schema.Types.ObjectId },
    finishedUnits: { type: Number },
    finishedDate: { type: Date }
});
