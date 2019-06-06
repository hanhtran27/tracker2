import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Goal } from 'src/app/models/goal.model';
import { Record } from '../../models/record.model';
import { GoalService } from 'src/app/services/goal.service';
import { RecordService } from '../../services/record.service';

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.css']
})
export class GoalDetailsComponent implements OnInit {
  @Input() goal: Goal;
  records: Record [];
  finishedPercentage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private goalService: GoalService,
    private recordService: RecordService,
  ) { }

  ngOnInit() {
    this.getGoal();
  }

  getGoal(): void {
    const goalId = this.route.snapshot.paramMap.get('id');
    this.goalService.getGoalById(goalId)
      .subscribe(goal => this.getGoalCallBack(goal));
  }

  getGoalCallBack(goal : Goal): void {
    this.goal = goal;
    this.getRecordsByGoalId(goal._id)
  }

  getRecordsByGoalId(goalId: string): void {
    this.recordService
      .getRecordsByGoalId(goalId)
      .subscribe(records => this.calculateFinishedPercentage(this.goal, records));
  }

  calculateFinishedPercentage(goal: Goal, records: Record []): void {
    this.records = records;
    console.log(goal.goalName);

    let totalFinishedUnits = 0;

    records.forEach(record => {
      totalFinishedUnits += parseInt(record.finishedUnits.toString());
    });

    const finishedPercentage = totalFinishedUnits*100/parseInt(goal.goalNumber.toString());
    this.finishedPercentage = finishedPercentage.toFixed(0) + "%";
  }

  addRecord(finishedUnits: HTMLInputElement, finishedDate: HTMLInputElement): void {
    let goalId = this.goal._id;
    let record = new Record(goalId, finishedUnits.valueAsNumber, finishedDate.valueAsDate);
    this.recordService
      .addRecord(record)
      .subscribe(addGoalResult => this.getRecordsByGoalId(goalId));
      finishedUnits.value = "";
      finishedDate.value = "";
  }

  deleteGoal() {
    console.log("calling deleteGoal with " + this.goal._id);

    // emit a signal to notify parent component(goal-list)
    this.goalService.deleteGoal(this.goal._id)
      .subscribe(() => this.router.navigate(["/myGoals"]));
  }

  updateGoal(goalName: HTMLInputElement,
    tag: HTMLInputElement,
    goalNumber: HTMLInputElement,
    goalUnit: HTMLInputElement,
    startDate: HTMLInputElement,
    dueDate: HTMLInputElement) {

    let newGoal = new Goal(goalName.value, tag.value, goalNumber.valueAsNumber, goalUnit.value, startDate.valueAsDate, dueDate.valueAsDate, this.goal._id);

    this.goalService.updateGoal(newGoal)
      .subscribe(() => this.ngOnInit()); 
  }




}
