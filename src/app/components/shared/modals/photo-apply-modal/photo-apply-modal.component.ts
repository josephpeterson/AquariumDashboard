import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PhotoContent } from 'src/app/models/PhotoContent';
import { AquariumService } from 'src/app/services/aquarium.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-photo-apply-modal',
  templateUrl: './photo-apply-modal.component.html',
  styleUrls: ['./photo-apply-modal.component.scss']
})
export class PhotoApplyModalComponent implements OnInit {
  
  public useSelection: number;
  public error: string;

  public options = Options;
  public disabled: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public photo: PhotoContent,
    public aquariumService: AquariumService,
    private _dialog: MatDialogRef<PhotoApplyModalComponent>) { }

  ngOnInit() {
  }

  clickSubmit()  {
    this.disabled = true;
    if(this.useSelection == 0)
    {
      this.aquariumService.updateAccountThumbnail(this.photo).subscribe(res => {
        this._dialog.close();
      },(err:HttpErrorResponse) => {
        this.disabled = false;
        this.error = err.message;
      });
    }
  }
}

const Options = [
  "Profile Picture",
  "Fish Photo",
  "Snapshot Photo",
]