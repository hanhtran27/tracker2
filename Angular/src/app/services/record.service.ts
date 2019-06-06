import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Record } from '../models/record.model';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private postRecordUrl = 'http://localhost:8080/record';
  private getRecordsByGoalIdUrl = 'http://localhost:8080/records/goal/'
  private deleteRecordUrl = 'http://localhost:8080/record/'
  private updateRecordUrl = 'http://localhost:8080/record/'
  constructor(private http: HttpClient) { }

  addRecord(record: Record): Observable<Record> {
    return this.http.post<Record>(this.postRecordUrl, record);
  }

  deleteRecord(recordId: string): Observable<{}> {
    return this.http.delete<Record>(this.deleteRecordUrl +  recordId);
  }

  getRecordsByGoalId(goalId: string): Observable<Record []> {
    return this.http.get<Record []>(this.getRecordsByGoalIdUrl + goalId);
  }

  updateRecord(record: Record): Observable<{}> {
    return this.http.put(this.updateRecordUrl + record._id, record);
  }
}
