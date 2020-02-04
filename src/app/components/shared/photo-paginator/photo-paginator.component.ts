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
import { PhotoContent } from 'src/app/models/PhotoContent';
import { NotifierService } from 'angular-notifier';
import { HttpErrorResponse } from '@angular/common/http';
import { PhotoTimelapseOptions } from 'src/app/models/PhotoTimelapseOptions';
import { CreateTimelapseModalComponent } from '../modals/create-timelapse-modal/create-timelapse-modal.component';

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

  public selection: PhotoContent[] = [];
  public selecting: boolean = false;

  @Input("source") source;

  constructor(public aquariumService: AquariumService,
    public dialog: MatDialog,
    public notifier: NotifierService,
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


  public toggleSelection(photo: PhotoContent) {
    console.log("wat");
    this.setSelected(photo, !this.isSelected(photo));
  }
  public setSelected(photo: PhotoContent, selected: boolean) {

    if (!selected && this.isSelected(photo))
      this.selection.splice(this.selection.indexOf(photo), 1);
    else if (selected)
      this.selection.push(photo);
  }
  public isSelected(photo: PhotoContent) {
    return this.selection.indexOf(photo) != -1;
  }
  public toggleSelecting() {
    this.selecting = !this.selecting;
    if (!this.selecting)
      this.clearSelection();
  }
  public clearSelection() {
    this.selection = [];
  }

  public clickCreateTimelapse() {
    this.dialog.open(CreateTimelapseModalComponent,{
      data: this.selection
    });
  }
}