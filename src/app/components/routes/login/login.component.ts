import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { LoginModalComponent } from '../../shared/modals/login-modal/login-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: string;

  constructor(private auth: AuthService,private router: Router) { }

  public password: string;
  public email: string;
  public disabled: boolean = false;

  public faUser = faUser;
  public faLock = faLock;

  ngOnInit() {

  }

  clickLogin() {
    this.disabled = true;
    this.auth.login(this.email, this.password).subscribe(val => {
      console.log(val);
      this.router.navigateByUrl("dashboard");
    },
      err => {
        this.disabled = false;
        this.error = "Invalid login";
      });
  }
}

