import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'login-modal-component',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  public disabled: boolean = false;
  public error: string;
  public email: string;
  public password: string;

  public faUser = faUser;
  public faLock = faLock;

  constructor(private dialog: MatDialog, 
    private auth: AuthService,
    private _dialog: MatDialogRef<LoginModalComponent>,
    private router: Router) { }



  ngOnInit() {

  }


  public clickSubmit() {
    this.disabled = true;
    this.auth.login(this.email, this.password).subscribe(() => {

      //todo make this more scaleable
      var previousRoute = localStorage["unauthorizedRoute"];
      if (previousRoute) {
        delete localStorage["unauthorizedRoute"];
        this.router.navigateByUrl(previousRoute)
      }
      else
        this.router.navigateByUrl("dashboard");


      this._dialog.close();
    }, (err: HttpErrorResponse) => {
      this.disabled = false;

      switch (err.status) {
        case 401:
          this.error = "Incorrect username/password.";
          break;
        case 0:
          this.error = "Aquarium service is currently unavailable. Please try again later.";
          break;
        case 404:
          this.error = "Could not contact aquarium service. Plelase try again later.";
          break;
        case 500:
          this.error = "An unknown error occured within the aquarium service. Please try again later.";
          break;
        default:
          console.log(err);
          this.error = err.statusText;
      }
    });
  }
  public clickForgotPassword() {

  }
}

