import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ConnectionError } from 'src/app/models/ConnectionError';

@Component({
  selector: 'error-message-modal',
  templateUrl: './error-message-modal.component.html',
  styleUrls: ['./error-message-modal.component.scss']
})
export class ErrorMessageModalComponent implements OnInit {

  constructor() { }
  
  public error: ConnectionError;

  ngOnInit() {
  }
}