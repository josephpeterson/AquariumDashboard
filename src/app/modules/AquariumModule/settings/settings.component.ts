import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Aquarium } from 'src/app/models/Aquarium';
import { SettingsComponentData } from './settings.component.data';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { CameraConfiguration, CameraExposureModes } from 'src/app/models/CameraConfiguration';
import { Observable, Subject } from 'rxjs';

import { take, takeUntil } from 'rxjs/operators';
import { Species } from 'src/app/models/Species';
import { AquariumService } from 'src/app/services/aquarium.service';
import { ConfirmModalComponent } from 'src/app/modules/SharedModule/modals/confirm-modal/confirm-modal.component';
import { CreateSpeciesModalComponent } from 'src/app/modules/SharedModule/modals/create-species-modal/create-species-modal.component';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'settings-page-component',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})


export class SettingsComponent implements OnInit {

  public date = new FormControl(new Date());
  public serializedDate = new FormControl((new Date()).toISOString());
  public aquarium$ = this.data.aquarium;
  public componentLifeCycle = new Subject();


  public aquariumSize: number
  public aquariumType: string
  public aquariumName: string
  public updating = this.data.updating;

  public cameraConfig: CameraConfiguration = new CameraConfiguration();

  public deleting = this.data.deleting;
  public deleteError = this.data.deleteError;

  public faSpinner = faSpinner;

  private aquarium: Aquarium;

  constructor(private _aquariumService: AquariumService,private notifier: NotificationService,
    public data: SettingsComponentData, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.aquarium$.pipe(takeUntil(this.componentLifeCycle)).subscribe(aq => {
      if (!aq) return;
      this.aquarium = aq;
      this.aquariumSize = aq.gallons;
      this.aquariumName = aq.name.trim();
      this.aquariumType = aq.type.trim();
    });
    this.data.deleted.subscribe(val => {
      if (val)
        this.data.reset();
    })

  }
  ngOnDestroy() {
    this.componentLifeCycle.next();
    this.componentLifeCycle.unsubscribe();
  }

  saveChanges() {
    var newAquarium: Aquarium = new Aquarium();

    newAquarium = {
      ...newAquarium,
      id: this.aquarium.id,
      startDate: this.date.value,
      gallons: this.aquariumSize,
      type: this.aquariumType.trim(),
      name: this.aquariumName.trim()
    };
    this.data.save(newAquarium);
  }
  resetDefault() {
    this.cameraConfig = new CameraConfiguration();
  }
  aquariumExport() {

  }
  aquariumDelete() {
    var dialog = this.dialog.open(ConfirmModalComponent, {
    });
    dialog.componentInstance.title = "Delete Aquarium";
    dialog.componentInstance.body = "Are you sure you would like to delete this aquarium?";

    dialog.afterClosed().pipe(take(1)).subscribe((confirm: boolean) => {
      if (confirm) {
        this.data.delete(this.aquarium);
      }
    });
  }
  snapshotManage() {

  }
  snapshotDeleteAll() {

  }

  speciesClickRow(species: Species) {
    var dialog = this.dialog.open(CreateSpeciesModalComponent, {
      width: "60%"
    }).componentInstance;
    dialog.selectedSpeciesId = species.id;
  }
  speciesClickNew() {
    var dialog = this.dialog.open(CreateSpeciesModalComponent, {
      width: "60%"
    }).componentInstance;
    dialog.addingSpecies = true;
  }

}

