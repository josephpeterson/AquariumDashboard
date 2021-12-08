import { Component, OnInit, Inject } from '@angular/core';
import { AquariumService } from 'src/app/services/aquarium.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.scss']
})
export class ForgotPasswordModalComponent implements OnInit {

  public error: string;
  public disabled: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public email,private _dialog: MatDialogRef<ForgotPasswordModalComponent>,public aquariumService: AquariumService) { }

  ngOnInit() {
  }

  clickReset() {
    delete this.error;
    if(!this.email)
    {
      this.error = "You must enter an email address.";
      return;
    }
    this.disabled = true;
    this.aquariumService.sendPasswordResetEmail(this.email).subscribe(val => {
      this._dialog.close();
    },err => {
      this.disabled = false;
      this.error = err.message;
    });
  }
}
