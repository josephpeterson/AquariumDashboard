import { Component, OnInit } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AquariumDevice } from 'src/app/models/AquariumDevice';

@Component({
  selector: 'aquarium-device',
  templateUrl: './aquarium-device.component.html',
  styleUrls: ['./aquarium-device.component.scss']
})
export class AquariumDeviceComponent implements OnInit {

  public aquarium: Aquarium;
  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);
  public device: AquariumDevice;
  deviceLog: any;

  constructor(public aquariumService: AquariumService,
    public dialog: MatDialog,
    public store: Store<AppState>
  ) { }
  ngOnInit() {
    this.aquarium$.pipe(take(1)).subscribe(aq => {
      this.aquarium = aq
      this.aquariumService.getAquariumDeviceById(aq.device.id).pipe(take(1)).subscribe(d => {
        this.device = d;
        d.aquarium = aq;
      });
    });
  }
}