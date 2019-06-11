import { Component, OnInit } from '@angular/core';
import { Goal } from '../../models/goal.model';
import { GoalService } from '../../services/goal.service';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.css']
})
export class GoalListComponent implements OnInit {

  goals: Goal[];
  loggedIn: boolean;

  // inject goalService
  constructor(private goalService: GoalService) {
    this.loggedIn = false;
  }

  ngOnInit() {
    // call goal service to get all goals
    this.goalService.getGoals()
      .subscribe(goalsResult => this.processServerResponse(goalsResult));
  }

  processServerResponse(result) {
    if (result.status === 200) {
      this.goals = result.body;
      this.loggedIn = true;
    }

  }
  // add a new goal
  addGoal(goalName: HTMLInputElement,
    tag: HTMLInputElement,
    goalNumber: HTMLInputElement,
    goalUnit: HTMLInputElement,
    startDate: HTMLInputElement,
    dueDate: HTMLInputElement) {

    let newGoal = new Goal(goalName.value, tag.value, goalNumber.valueAsNumber, goalUnit.value, startDate.valueAsDate, dueDate.valueAsDate);

    //validate inputs

    //add goal
    this.goalService.addGoal(newGoal)
      .subscribe(goalResult => this.goals.push(goalResult.body));

    goalName.value = "";
    tag.value = "";
    goalNumber.value = "";
    goalUnit.value = "";
    startDate.value = "";
    dueDate.value = "";
  }


}


