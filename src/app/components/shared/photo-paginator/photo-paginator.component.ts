import { Component, OnInit, Input } from '@angular/core';
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

@Component({
  selector: 'photo-paginator',
  templateUrl: './photo-paginator.component.html',
  styleUrls: ['./photo-paginator.component.scss']
})
export class PhotoPaginator implements OnInit {

  public aquarium: Aquarium;
  public photos: AquariumPhoto[] = [];
  public completed: boolean = false;
  public loading: boolean;
  public pagination: PaginationSliver = new PaginationSliver();

  @Input("source") source;

  constructor(public aquariumService: AquariumService,
    public dialog: MatDialog,
    public store: Store<AppState>
  ) { }
  ngOnInit() {
    this.pagination.descending = true;

    this.store.select(getSelectedAquarium).pipe(take(1)).subscribe(aq => {
      this.aquarium = aq

      this.loadAquariumPhotos();
    });
  }

  loadAquariumPhotos() {
    this.loading = true;
    this.source.bind(this.aquariumService)(this.aquarium.id, this.pagination).subscribe((data: AquariumPhoto[]) => {
      this.loading = false;
      if (data.length < this.pagination.count) {
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
      data: photo.photo,
    });
  }
  getPhotoPermalink(photo) {
    return this.aquariumService.getPhotoPermalink(photo, "1");
  }
}