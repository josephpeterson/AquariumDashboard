import { Component, OnInit } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { take } from 'rxjs/operators';
import { AquariumPhoto } from 'src/app/models/AquariumPhoto';
import { PaginationSliver } from 'src/app/models/PaginationSliver';
import { PhotoExpandedModalComponent } from 'src/app/components/shared/modals/photo-expanded-modal/photo-expanded-modal.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'aquarium-photos',
  templateUrl: './aquarium-photos.component.html',
  styleUrls: ['./aquarium-photos.component.scss']
})
export class AquariumPhotosComponent implements OnInit {

  public aquarium: Aquarium;
  public photos: AquariumPhoto[] = [];
  public completed: boolean = false;
  public loading: boolean;
  public pagination: PaginationSliver = new PaginationSliver();

  constructor(public aquariumService: AquariumService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public store: Store<AppState>
  ) { }
  ngOnInit() {

    var photoId = this.route.snapshot.params.photoId;


    this.pagination.descending = true;

    this.store.select(getSelectedAquarium).pipe(take(1)).subscribe(aq => {
      this.aquarium = aq

      this.loadAquariumPhotos();
    });
  }

  loadAquariumPhotos() {
    this.loading = true;
    this.aquariumService.getAquariumPhotos(this.aquarium.id, this.pagination).subscribe((data: AquariumPhoto[]) => {
      this.loading = false;
      if (data.length == 0) {
        this.completed = true;
      }
      this.photos = this.photos.concat(data);
      console.log(data);
    }, err => {
      this.loading = false;
      console.log(err);
    })
  }
  clickLoadMore() {
    this.pagination.start += this.pagination.count;
    this.loadAquariumPhotos();
  }
  clickExpandedImage(photo: AquariumPhoto) {
    var dialog = this.dialog.open(PhotoExpandedModalComponent, {
      panelClass: "expanded-photo-dialog",
      data: photo.photo
    });
  }
  getPhotoPermalink(photo) {
    return this.aquariumService.getPhotoPermalink(photo, "1");
  }
}