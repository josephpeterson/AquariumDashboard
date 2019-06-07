import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Aquarium } from 'src/app/models/Aquarium';
import { SettingsComponentData } from './settings.component.data';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { CameraConfiguration, CameraExposureModes } from 'src/app/models/CameraConfiguration';
import { Observable } from 'rxjs';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'settings-page-component',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})


export class SettingsComponent implements OnInit {

  public date = new FormControl(new Date());
  public serializedDate = new FormControl((new Date()).toISOString());
  public aquarium$ = this.data.aquarium;

  public aquariumSize: number
  public aquariumType: string
  public aquariumName: string
  public updating = this.data.updating;

  public cameraConfig: CameraConfiguration = new CameraConfiguration();

  public deleting = this.data.deleting;
  public deleteError = this.data.deleteError;

  public faSpinner = faSpinner;

  private aquarium: Aquarium;

  public applicationLog$: Observable<string> = this.data.applicationLog;

  public exposureModes = CameraExposureModes;

  

  constructor(public data: SettingsComponentData, public dialog: MatDialog,private router: Router) { }

  ngOnInit() {
    this.aquarium$.subscribe(aq => {
      if(!aq) return;
      this.aquarium = aq;
      this.aquariumSize = aq.gallons;
      this.aquariumName = aq.name.trim();
      this.aquariumType = aq.type.trim();
      if(aq.cameraConfiguration)
        this.cameraConfig = aq.cameraConfiguration;

    });
    this.data.deleted.subscribe(val => {
      if(val)
        this.data.reset();
    })
  }

  saveChanges() {
    var newAquarium: Aquarium = new Aquarium();

    newAquarium = {
      ...newAquarium,
      id: this.aquarium.id,
      startDate: this.date.value,
      gallons: this.aquariumSize,
      type: this.aquariumType.trim(),
      name: this.aquariumName.trim(),
      cameraConfiguration: this.cameraConfig
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

    dialog.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.data.delete(this.aquarium);
      }
    });
  }
  snapshotManage() {

  }
  snapshotDeleteAll() {

  }
}

