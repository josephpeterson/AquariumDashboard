import { Component, OnInit } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { take } from 'rxjs/operators';
import { AquariumPhoto } from 'src/app/models/AquariumPhoto';

@Component({
  selector: 'aquarium-photos',
  templateUrl: './aquarium-photos.component.html',
  styleUrls: ['./aquarium-photos.component.scss']
})
export class AquariumPhotosComponent implements OnInit {

  public aquarium: Aquarium;
  public photos: AquariumPhoto[];

  constructor(public aquariumService: AquariumService,
    public dialog: MatDialog,
    public store: Store<AppState>
  ) { }
  ngOnInit() {
    this.store.select(getSelectedAquarium).pipe(take(1)).subscribe(aq => {
      this.aquarium = aq

      this.loadAquariumPhotos();
    });
  }

  loadAquariumPhotos() {
    this.aquariumService.getAquariumPhotos(this.aquarium.id).subscribe((data:AquariumPhoto[]) => {
      this.photos = data;
      console.log(data);
    },err => {
      
      console.log(err);
    })
  }
  getPhotoPermalink(photo) {
    return this.aquariumService.getPhotoPermalink(photo, "1");
  }
}