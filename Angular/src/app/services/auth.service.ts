import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: boolean;

  constructor() { }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  setAuthenticationToken(token: string) {
    localStorage.setItem('token', token);
  }

  clearAuthenticationToken() {
    localStorage.removeItem('token');
  }
}
