import { Component, OnInit } from '@angular/core';
import { Goal } from '../../models/goal.model';
import { GoalService } from '../../services/goal.service';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.css']
})
export class GoalListComponent implements OnInit {

  goals: Goal[];

  // inject goalService
  constructor(private goalService: GoalService) { }

  ngOnInit() {
    // call goal service to get all goals
    this.goalService.getGoals()
      .subscribe(goalsResult => this.goals = goalsResult);
  }
   
  // add a new goal
  addGoal(goalName: HTMLInputElement,
    tag: HTMLInputElement,
    goalNumber: HTMLInputElement,
    goalUnit: HTMLInputElement,
    startDate: HTMLInputElement,
    dueDate: HTMLInputElement) {

    let newGoal = new Goal(goalName.value, tag.value, goalNumber.valueAsNumber, goalUnit.value, startDate.valueAsDate, dueDate.valueAsDate);

    this.goalService.addGoal(newGoal)
      .subscribe(goalResult => this.goals.push(goalResult));
    
    goalName.value = "";
    tag.value = "";
    goalNumber.value = "";
    goalUnit.value = "";
    startDate.valueAsDate = "";
    dueDate.valueAsDate = "";
  }

  
}


