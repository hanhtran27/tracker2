import { Component, OnInit, HostBinding, Input, EventEmitter, Output } from '@angular/core';
import { Goal } from '../../models/goal.model';
import { Record } from '../../models/record.model';
import { RecordService } from '../../services/record.service';
import { GoalService } from '../../services/goal.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {

  @HostBinding('attr.class') cssClass = 'row';

  // configure goal with input
  // Goal is from app component
  @Input() goal: Goal;
  records: Record[];
  finishedPercentage: Number;
  progressBarWidth: String;
  overDue: boolean;
  daysLeft: Number;

  @Output() deletedClick = new EventEmitter<boolean>();
  @Output() updatedClick = new EventEmitter<boolean>();

  constructor(private recordService: RecordService, private goalService: GoalService) {
  }

  addRecord(finishedUnits: number, finishedDate: Date): void {
    let goalId = this.goal._id;
    let record = new Record(goalId, finishedUnits, finishedDate);
    this.recordService
      .addRecord(record)
      .subscribe(addGoalResult => this.getRecodsByGoalId(goalId));
  }

  getRecodsByGoalId(goalId: string): void {
    this.recordService
      .getRecordsByGoalId(goalId)
      .subscribe(records => this.calculateFinishedPercentage(this.goal, records));
  }

  calculateFinishedPercentage(goal: Goal, records: Record[]): void {
    this.records = records;

    let totalFinishedUnits = 0;

    records.forEach(record => {
      totalFinishedUnits += parseInt(record.finishedUnits.toString());
    });

    let finishedPercentage = totalFinishedUnits * 100 / parseInt(goal.goalNumber.toString());
    this.finishedPercentage = finishedPercentage;
    this.progressBarWidth = finishedPercentage.toFixed(0) + '%';
  }

  ngOnInit() {
    this.progressBarWidth = "0%";
  }

  ngAfterViewInit() {
    this.getRecodsByGoalId(this.goal._id);

    let dueDate = new Date(this.goal.dueDate);
    if (dueDate.getTime() < Date.now()) {
      this.overDue = true;
    } else {
      this.overDue = false;
    }

    this.daysLeft= Math.round((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  }
}


