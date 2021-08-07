import { Component, OnInit } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { take } from 'rxjs/operators';

@Component({
  selector: 'aquarium-photos-container',
  templateUrl: './aquarium-photos-container.component.html',
  styleUrls: ['./aquarium-photos-container.component.scss']
})
export class AquariumPhotosContainerComponent implements OnInit {

  public aquarium: Aquarium;

  constructor(public aquariumService: AquariumService,
    public dialog: MatDialog,
    public store: Store<AppState>
  ) { }
  ngOnInit() {
    this.store.select(getSelectedAquarium).pipe(take(1)).subscribe(aq => this.aquarium = aq);
  }
}