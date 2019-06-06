export class Record {
    goalId: string;
    finishedUnits: Number;
    finishedDate: Date;
    _id: string;

    constructor(goalId: string, finishedUnits: Number, finishedDate: Date, recordId?: string) {
        this.goalId = goalId;
        this.finishedUnits = finishedUnits;
        this.finishedDate = finishedDate;
        if (recordId){
            this._id = recordId;
        }
    }
}
