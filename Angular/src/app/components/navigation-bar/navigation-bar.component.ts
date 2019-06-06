import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  loginout:string;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.initLoginText();
  }
  home() {
    console.info("home clicked!");
    this.router.navigate(['/']);
  } 
  
  goals() {
    console.info("goals clicked!");
    this.router.navigate(['/myGoals']);
  }

  about() {
    console.info("about clicked!");
    this.router.navigate(['/about']);
  }

  login() {
    console.info("login clicked!");
    this.authService.clearAuthenticationToken();
    this.loginout = "Login";
    this.router.navigate(['/login']);
  }

  private initLoginText():void {
    if (this.authService.isLoggedIn()) {
      this.loginout = "Logout";
    } else {
      this.loginout = "Login"
    }
  }
}
