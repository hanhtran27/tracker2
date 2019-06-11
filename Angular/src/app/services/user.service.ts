import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpResponse } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginUrl = 'http://localhost:8080/login';
  registerUrl = 'http://localhost:8080/register';

  constructor(private http:HttpClient) { }

  getUser():Observable<HttpResponse<User>> {
    return this.http.get<User>(this.loginUrl, {observe: 'response', withCredentials: true });
  }

  // unused below, delete later
  checklogin(email:string, password:string):Observable<any> {
    //convert password to hash
    let hash_l = Md5.hashStr(password);
    let login = {email:email, hash:hash_l};
    return this.http.post(this.loginUrl, login, httpOptions);
  }

  checkregister(email:string, password:string):Observable<any> {
    let hash_r = Md5.hashStr(password);
    let register = {email:email, hash:hash_r};
    return this.http.post(this.registerUrl, register, httpOptions);
  }
}
