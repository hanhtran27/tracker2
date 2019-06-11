import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Goal } from '../models/goal.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GoalService {

  private getGoalsUrl = 'http://localhost:8080/goals';
  private getGoalUrl = 'http://localhost:8080/goal/';
  private postGoalUrl = 'http://localhost:8080/goal';
  private deleteGoalUrl = 'http://localhost:8080/goal/';
  private updateGoalUrl = 'http://localhost:8080/goal/';
  
  //inject HttpClient
  constructor(private http: HttpClient) { }

  getGoals(): Observable<HttpResponse<Goal[]>> {
    return this.http.get<Goal[]>(this.getGoalsUrl, {observe: 'response', withCredentials: true });
  }

  addGoal(goal: Goal): Observable<HttpResponse<Goal>> {
    return this.http.post<Goal>(this.postGoalUrl, goal, {observe: 'response', withCredentials: true });
  }

  deleteGoal(goalId: string): Observable<{}> {
    return this.http.delete(this.deleteGoalUrl + goalId, {observe: 'response', withCredentials: true });
  }

  updateGoal(goal: Goal): Observable<{}> {
    return this.http.put(this.updateGoalUrl + goal._id, goal, {observe: 'response', withCredentials: true });
  }

  getGoalById(goalId: string): Observable<HttpResponse<Goal>> {
    return this.http.get<Goal>(this.getGoalUrl + goalId, {observe: 'response', withCredentials: true });
  }
}

