import { Component, OnInit } from '@angular/core';
import { SignupRequest } from 'src/app/models/SignupRequest';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'signup-component',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public error: string;
  public disabled: boolean = false;
  public newUser: SignupRequest;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.newUser = new SignupRequest();
  }

  clickSignup() {
    this.disabled = true;
    this.auth.signup(this.newUser).subscribe(val => {
      this.router.navigateByUrl("dashboard");
    },
    err => {
      this.disabled = false;
      this.error = "Could not sign up";
    });
  }
}

