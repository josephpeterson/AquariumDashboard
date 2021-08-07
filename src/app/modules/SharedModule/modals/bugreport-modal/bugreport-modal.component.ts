import { Component, OnInit } from '@angular/core';
import { BugReport } from 'src/app/models/BugReport';
import { AquariumService } from 'src/app/services/aquarium.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'bugreport-modal',
  templateUrl: './bugreport-modal.component.html',
  styleUrls: ['./bugreport-modal.component.scss']
})
export class BugReportModalComponent implements OnInit {

  public bug: BugReport = new BugReport();
  public error: string;
  public disabled: boolean;

  constructor(private _aquariumService: AquariumService,
    private _self: MatDialogRef<BugReportModalComponent>) { }

  ngOnInit() {
  }

  public clickSubmit() {
    delete this.error;
    this.disabled = true;

    this.bug.urlLocation = window.location.href;
    
    this._aquariumService.submitBugReport(this.bug).subscribe(report => {
      this.disabled = false;
      this._self.close(report);
    }, err => {
      this.error = err.message;
      this.disabled = false;
    });
    return true;
  }
}