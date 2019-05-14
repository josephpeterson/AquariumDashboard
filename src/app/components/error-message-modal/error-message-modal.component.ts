import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'error-message-modal',
  templateUrl: './error-message-modal.component.html',
  styleUrls: ['./error-message-modal.component.scss']
})
export class ErrorMessageModalComponent implements OnInit {

  constructor() { }

  public title: string
  public description: string

  public exception;

  ngOnInit() {
  }
}