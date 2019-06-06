import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email:string;
  password:string;
  invisible:string;

  constructor(private userService:UserService,
              private router:Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.invisible = "invisible";
  }

  register() {
    this.userService
        .checkregister(this.email, this.password)
        .subscribe((res:any) => {
          if (res.token) {
            this.authService.setAuthenticationToken(res.token);
            this.router.navigate(['/']);
          } else {
            this.invisible = "visible";
          }
    })
  }

}
