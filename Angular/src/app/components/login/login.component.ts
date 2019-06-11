import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;
  invisible:string;

  constructor(private userService:UserService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.invisible = "invisible";
  }

  login(): void {
    // redirect to node login api when clicking login button:
    window.location.href = 'http://localhost:8080/auth/google';
  }

  logout(): void {
    // redirect to node logout api when clicking login button:
    window.location.href = 'http://localhost:8080/auth/logout';
  }

  //delete later! not used
  login1() {
    this.userService
        .checklogin(this.email, this.password)
        .subscribe((res:any) => {
          if (res.status) {
            this.authService.setAuthenticationToken(res.token);
            this.router.navigate(['/']);
          } else {
            console.info("Failed!");
            this.invisible = "visible";
          }
        });
  }

}
