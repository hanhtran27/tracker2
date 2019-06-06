import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { RecordSchema } from '../models/recordModel';

const Record = mongoose.model("Record", RecordSchema);
mongoose.set('useFindAndModify', false);

export class RecordController {

    public addNewRecord(req: Request, res: Response) {
        console.log("creating new record... ");
        let newRecord = new Record(req.body);
        newRecord.save((err, record) => {
            if (err) {
                res.send(err);
                console.log(err);
            }
            res.json(record);
        });
    }

    public getRecords(req: Request, res: Response) {
        Record.find({}, (err, records) => {
            if (err) {
                res.send(err);
            }
            res.json(records);
        });
    }

    public getRecordWithId(req: Request, res: Response) {
        Record.findById(req.params.recordId, (err, record) => {
            if (err) {
                res.send(err);
            }
            res.json(record);
        });
    }

    public getRecordsWithGoalId(req: Request, res: Response) {
        Record.find({"goalId": mongoose.Types.ObjectId.ObjectId(req.params.goalId)}, (err, records) => {
            if (err) {
                res.send(err);
            }
            res.json(records);
        });
    }

    public updateRecord(req: Request, res: Response) {
        Record.findOneAndUpdate({ _id: req.params.recordId },
        req.body, 
        { new: true }, 
        (err, record) => {
            if (err) {
                res.send(err);
            }
            res.json(record);
        });
    }

    public deleteRecord(req: Request, res: Response) {           
        Record.deleteOne({ _id: req.params.recordId }, 
            (err, record) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted record!'});
        });
    }
}