"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var recordModel_1 = require("../models/recordModel");
var Record = mongoose.model("Record", recordModel_1.RecordSchema);
mongoose.set('useFindAndModify', false);
var RecordController = /** @class */ (function () {
    function RecordController() {
    }
    RecordController.prototype.addNewRecord = function (req, res) {
        console.log("creating new record... ");
        var newRecord = new Record(req.body);
        newRecord.save(function (err, record) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            res.json(record);
        });
    };
    RecordController.prototype.getRecords = function (req, res) {
        Record.find({}, function (err, records) {
            if (err) {
                res.send(err);
            }
            res.json(records);
        });
    };
    RecordController.prototype.getRecordWithId = function (req, res) {
        Record.findById(req.params.recordId, function (err, record) {
            if (err) {
                res.send(err);
            }
            res.json(record);
        });
    };
    RecordController.prototype.getRecordsWithGoalId = function (req, res) {
        Record.find({ "goalId": mongoose.Types.ObjectId.ObjectId(req.params.goalId) }, function (err, records) {
            if (err) {
                res.send(err);
            }
            res.json(records);
        });
    };
    RecordController.prototype.updateRecord = function (req, res) {
        Record.findOneAndUpdate({ _id: req.params.recordId }, req.body, { "new": true }, function (err, record) {
            if (err) {
                res.send(err);
            }
            res.json(record);
        });
    };
    RecordController.prototype.deleteRecord = function (req, res) {
        Record.deleteOne({ _id: req.params.recordId }, function (err, record) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted record!' });
        });
    };
    return RecordController;
}());
exports.RecordController = RecordController;
