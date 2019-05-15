import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Aquarium } from 'src/app/models/Aquarium';
import { ErrorMessageModalComponent } from '../error-message-modal/error-message-modal.component';
import { ConnectionError } from 'src/app/models/ConnectionError';
import { AquariumSelectionComponentData } from './aquarium-selection.component.data';

@Component({
  selector: 'aquarium-selection-component',
  templateUrl: './aquarium-selection.component.html',
  styleUrls: ['./aquarium-selection.component.scss']
})
export class AquariumSelectionComponent implements OnInit {
  constructor(public data: AquariumSelectionComponentData,public dialog: MatDialog,) {}

  public aquariums = this.data.aquariums;
  public loading = this.data.loading;
  public connectionError = this.data.connectionError;

  ngOnInit() {
    this.loadAquariums();
    this.connectionError.subscribe(
      error => {
      if(error)
        this.displayErrorDialog(error);
    });
  }
  displayErrorDialog(error) {
    var dialog = this.dialog.open(ErrorMessageModalComponent,{
    }).componentInstance;
    dialog.error = new ConnectionError(error);
  }
  selectAquarium(aquarium: Aquarium) {
    this.data.select(aquarium);
  }
  loadAquariums() {
    this.data.load();
  }
}

