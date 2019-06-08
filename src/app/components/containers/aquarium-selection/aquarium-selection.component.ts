import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Aquarium } from 'src/app/models/Aquarium';
import { ErrorMessageModalComponent } from '../../modals/error-message-modal/error-message-modal.component';
import { ConnectionError } from 'src/app/models/ConnectionError';
import { AquariumSelectionComponentData } from './aquarium-selection.component.data';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CreateAquariumModelComponent } from '../../modals/create-aquarium-modal/create-aquarium-modal.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'aquarium-selection-component',
  templateUrl: './aquarium-selection.component.html',
  styleUrls: ['./aquarium-selection.component.scss']
})
export class AquariumSelectionComponent implements OnInit {
  constructor(public data: AquariumSelectionComponentData, public dialog: MatDialog, ) { }

  public aquariums = this.data.aquariums;
  public loading = this.data.loading;
  public connectionError = this.data.connectionError;

  @Input("autoload")
  public autoload: boolean = true;

  //Font-Awesome Icons
  faCoffee = faPlus;

  ngOnInit() {
    if (this.autoload)
      this.loadAquariums();
    //this.displayCreateAquariumDialog();
  }
  displayErrorDialog(error) {
    var dialog = this.dialog.open(ErrorMessageModalComponent, {
    }).componentInstance;
    dialog.error = new ConnectionError(error);
  }
  selectAquarium(aquarium: Aquarium) {
    this.data.select(aquarium);
  }
  loadAquariums() {
    this.data.load();
    this.connectionError.pipe(take(2)).subscribe(
      error => {
        if (error)
          this.displayErrorDialog(error);
      });
  }

  displayCreateAquariumDialog() {
    var dialog = this.dialog.open(CreateAquariumModelComponent, {
      width: "40%"
    });

    dialog.componentInstance.aquariumSize = 10;
    dialog.componentInstance.aquariumType = "Normal";

    dialog.afterClosed().pipe(take(1)).subscribe(() => {
      //this.data.load(); //Shouldn't have to do this if we just add to the store
    });
    //dialog.error = new ConnectionError(error);
  }
}

