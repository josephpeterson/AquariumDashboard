import { Component, OnInit, Input, Inject } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AquariumLoadByIdAction } from 'src/app/store/aquarium/aquarium.actions';
import { getAquariumById, getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { takeUntil } from 'rxjs/operators';
import { Aquarium } from 'src/app/models/Aquarium';
import { Fish } from 'src/app/models/Fish';
import { Subject } from 'rxjs';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'manage-aquarium-device-modal',
  templateUrl: './manage-aquarium-device-modal.component.html',
  styleUrls: ['./manage-aquarium-device-modal.component.scss']
})
export class ManageAquariumDeviceModalComponent {
  
  public aquarium:Aquarium;

  constructor(@Inject(MAT_DIALOG_DATA) data: Aquarium) {
    this.aquarium = data;
  }
}