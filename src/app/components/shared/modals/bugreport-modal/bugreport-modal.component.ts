import { Component, OnInit } from '@angular/core';
import { BugReport } from 'src/app/models/BugReport';

@Component({
  selector: 'bugreport-modal',
  templateUrl: './bugreport-modal.component.html',
  styleUrls: ['./bugreport-modal.component.scss']
})
export class BugReportModalComponent implements OnInit {

  constructor() { }

  public body: string = "This is the default body";
  public bug: BugReport = new BugReport();

  ngOnInit() {
  }
}