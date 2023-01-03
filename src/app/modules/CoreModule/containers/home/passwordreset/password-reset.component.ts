import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { AquariumAccount } from 'src/app/modules/SharedDeviceModule/models/AquariumAccount';



@Component({
  selector: 'password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {


  constructor(private auth: AuthService, private router: Router,private route: ActivatedRoute) { }

  public error: string;
  public requestToken: string;
  public password: string;
  public password2: string;

  public disabled: boolean = false;

  public faUser = faUser;
  public faLock = faLock;

  ngOnInit() {
    this.upgradeResetToken();
  }

  upgradeResetToken() {
    var resetToken = this.route.snapshot.params.resetToken;
    this.auth.resetPasswordHandshake(resetToken).subscribe(res => {
      this.requestToken = res;
    },err => {
      this.error = err.message;
      this.router.navigateByUrl("/");
    })
  }

  submitRequest() {
    this.disabled = true;
    this.auth.submitPasswordResetRequest(this.requestToken,this.password).subscribe((res:AquariumAccount) => {
      this.auth.login(res.username,this.password).subscribe(() => {
        this.router.navigateByUrl("/");
      },err => {
        console.error(err);
      this.error = err.message;
      this.router.navigateByUrl("/");
      })
    },err => {
      console.error(err);
      this.error = err.message;
      this.router.navigateByUrl("/");
    })
  }
}

