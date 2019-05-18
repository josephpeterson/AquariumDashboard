import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Aquarium } from 'src/app/models/Aquarium';
import { ErrorMessageModalComponent } from '../error-message-modal/error-message-modal.component';
import { ConnectionError } from 'src/app/models/ConnectionError';
import { AquariumSelectionComponentData } from './aquarium-selection.component.data';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CreateAquariumModelComponent } from '../create-aquarium-modal/create-aquarium-modal.component';

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

  //Font-Awesome Icons
  faCoffee = faPlus;

  ngOnInit() {
    this.loadAquariums();
    this.connectionError.subscribe(
      error => {
      if(error)
        this.displayErrorDialog(error);
    });

    //this.displayCreateAquariumDialog();
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

  displayCreateAquariumDialog() {
    var dialog = this.dialog.open(CreateAquariumModelComponent,{
    });

    dialog.afterClosed().subscribe(() => {
      //this.data.load(); //Shouldn't have to do this if we just add to the store
    });
    //dialog.error = new ConnectionError(error);
  }
}

