export class Goal {
    _id: string;
    goalName: string;
    tag: string;
    goalNumber: Number;
    goalUnit: string;
    startDate: Date;
    dueDate: Date;

    constructor(goalName: string, tag: string, goalNumber: Number, goalUnit: string, startDate: Date, dueDate: Date, goalId?: string) {
        this.goalName = goalName;
        this.tag = tag;
        this.goalNumber = goalNumber;
        this.goalUnit = goalUnit;
        this.startDate = startDate;
        this.dueDate = dueDate;
        if(goalId){
            this._id = goalId;
        }
    }
}
