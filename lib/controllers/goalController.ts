import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { GoalSchema } from '../models/goalModel';

const Goal = mongoose.model('Goal', GoalSchema);
mongoose.set('useFindAndModify', false);

export class GoalController {

    public test(req: Request, res: Response) {
        res.sendStatus(201);
    }

    public addNewGoal(req: Request, res: Response) {
        let newGoal = new Goal(req.body);

        newGoal.save((err, goal) => {
            if (err) {
                res.send(err);
            }
            res.json(goal);
        });

        console.log("new goal created: " + req.body.goalName);
    }

    public getGoals(req, res) {

        console.log("user is: " + req.user);
        Goal.find({}, (err, goal) => {
            if (err) {
                res.send(err);
            }
            res.json(goal);
        });
    }

    public getGoalWithId(req: Request, res: Response) {
        Goal.findById(req.params.goalId, (err, goal) => {
            console.log("Trying to get goal with id " + req.params.goalId);
            if (err) {
                res.send(err);
            }
            res.json(goal);
        });
    }

    public getGoalsWithTag(req: Request, res: Response) {
        Goal.find({ "tag": req.params.tag }, (err, goals) => {
            if (err) {
                res.send(err);
            }
            res.json(goals);
        });
    }

    public getGoalsWithUserId(req: Request, res: Response) {
        Goal.find({ "userId": mongoose.Types.ObjectId(req.params.userId) }, (err, goals) => {
            if (err) {
                res.send(err);
            }
            res.json(goals);
        });
    }

    public updateGoal(req: Request, res: Response) {
        Goal.findOneAndUpdate({ _id: req.params.goalId },
            req.body,
            { new: true },
            (err, goal) => {
                if (err) {
                    res.send(err);
                }
                res.json(goal);
            });
    }

    public deleteGoal(req: Request, res: Response) {
        console.log("delete goal: " + req.params.goalId);

        Goal.deleteOne({ _id: req.params.goalId },
            (err) => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Successfully deleted goal!' });
            });

    }
}