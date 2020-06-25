import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ConnectionError } from 'src/app/models/ConnectionError';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  constructor() { }

  public title: string = "This is the default title";
  public body: string = "This is the default body";

  ngOnInit() {
  }
}