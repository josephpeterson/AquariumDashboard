import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { LoginModalComponent } from '../../shared/modals/login-modal/login-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ForgotPasswordModalComponent } from '../../shared/modals/forgot-password-modal/forgot-password-modal.component';



@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private dialog: MatDialog,private auth: AuthService, private router: Router) { }

  public error: string;
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

      //todo make this more scaleable
      var previousRoute = localStorage["unauthorizedRoute"];
      if (previousRoute) {
        delete localStorage["unauthorizedRoute"];
        this.router.navigateByUrl(previousRoute)
      }
      else
        this.router.navigateByUrl("dashboard");
    }, (err: HttpErrorResponse) => {
      this.disabled = false;

      switch (err.status) {
        case 401:
          this.error = "Invalid login information";
          break;
        default:
          console.log(err);
          this.error = err.statusText;
      }
    });
  }

  forgotPassword() {
    this.dialog.open(ForgotPasswordModalComponent, {
      width: "30%",
      data: this.email,
      restoreFocus: false
    });
  }
}

