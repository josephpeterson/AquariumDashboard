import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bugreport-modal',
  templateUrl: './bugreport-modal.component.html',
  styleUrls: ['./bugreport-modal.component.scss']
})
export class BugReportModalComponent implements OnInit {

  constructor() { }

  public body: string = "This is the default body";

  ngOnInit() {
  }
}