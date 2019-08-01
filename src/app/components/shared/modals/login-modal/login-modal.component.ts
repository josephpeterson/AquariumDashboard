import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { take, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  error: string;

  constructor(private dialog: MatDialogRef<LoginModalComponent>, private auth: AuthService) { }

  public password: string;
  public email: string;
  public disabled: boolean = false;

  ngOnInit() {

  }

  clickLogin() {
    this.disabled = true;
    this.auth.login(this.email, this.password).subscribe(val => {
      this.dialog.close(val);
    },
    err => {
      this.disabled = false;
      this.error = "Invalid login";
    });
  }
}