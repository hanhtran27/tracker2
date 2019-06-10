"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var goalModel_1 = require("../models/goalModel");
var Goal = mongoose.model('Goal', goalModel_1.GoalSchema);
mongoose.set('useFindAndModify', false);
var GoalController = /** @class */ (function () {
    function GoalController() {
    }
    GoalController.prototype.test = function (req, res) {
        res.sendStatus(201);
    };
    GoalController.prototype.addNewGoal = function (req, res) {
        var newGoal = new Goal(req.body);
        newGoal.save(function (err, goal) {
            if (err) {
                res.send(err);
            }
            res.json(goal);
        });
        console.log("new goal created: " + req.body.goalName);
    };
    GoalController.prototype.getGoals = function (req, res) {
        console.log("user is: " + req.user);
        Goal.find({}, function (err, goal) {
            if (err) {
                res.send(err);
            }
            res.json(goal);
        });
    };
    GoalController.prototype.getGoalWithId = function (req, res) {
        Goal.findById(req.params.goalId, function (err, goal) {
            console.log("Trying to get goal with id " + req.params.goalId);
            if (err) {
                res.send(err);
            }
            res.json(goal);
        });
    };
    GoalController.prototype.getGoalsWithTag = function (req, res) {
        Goal.find({ "tag": req.params.tag }, function (err, goals) {
            if (err) {
                res.send(err);
            }
            res.json(goals);
        });
    };
    GoalController.prototype.getGoalsWithUserId = function (req, res) {
        Goal.find({ "userId": mongoose.Types.ObjectId(req.params.userId) }, function (err, goals) {
            if (err) {
                res.send(err);
            }
            res.json(goals);
        });
    };
    GoalController.prototype.updateGoal = function (req, res) {
        Goal.findOneAndUpdate({ _id: req.params.goalId }, req.body, { "new": true }, function (err, goal) {
            if (err) {
                res.send(err);
            }
            res.json(goal);
        });
    };
    GoalController.prototype.deleteGoal = function (req, res) {
        console.log("delete goal: " + req.params.goalId);
        Goal.deleteOne({ _id: req.params.goalId }, function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted goal!' });
        });
    };
    return GoalController;
}());
exports.GoalController = GoalController;
