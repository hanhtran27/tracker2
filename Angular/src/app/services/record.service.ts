import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Record } from '../models/record.model';
import { HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private postRecordUrl = 'http://localhost:8080/record';
  private getRecordsByGoalIdUrl = 'http://localhost:8080/records/goal/'
  private deleteRecordUrl = 'http://localhost:8080/record/'
  private updateRecordUrl = 'http://localhost:8080/record/'
  constructor(private http: HttpClient) { }

  addRecord(record: Record): Observable<HttpResponse<Record>> {
    return this.http.post<Record>(this.postRecordUrl, record, {observe: 'response', withCredentials: true });
  }

  deleteRecord(recordId: string): Observable<HttpResponse<{}>> {
    return this.http.delete<Record>(this.deleteRecordUrl +  recordId, {observe: 'response', withCredentials: true });
  }

  getRecordsByGoalId(goalId: string): Observable<HttpResponse<Record []>> {
    return this.http.get<Record []>(this.getRecordsByGoalIdUrl + goalId, {observe: 'response', withCredentials: true });
  }

  updateRecord(record: Record): Observable<HttpResponse<{}>> {
    return this.http.put(this.updateRecordUrl + record._id, record, {observe: 'response', withCredentials: true });
  }
}
