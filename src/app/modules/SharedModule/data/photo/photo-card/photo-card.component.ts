import { Component, OnInit, Input } from '@angular/core';
import { PhotoContent } from 'src/app/models/PhotoContent';
import { AquariumService } from 'src/app/services/aquarium.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { PhotoExpandedModalComponent } from '../../../modals/photo-expanded-modal/photo-expanded-modal.component';

@Component({
  selector: 'photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss']
})
export class PhotoCardComponent implements OnInit {

  @Input() photo: PhotoContent;

  constructor(private aquariumService: AquariumService,
    private dialog: MatDialog) { }

  ngOnInit() {
  }

  getPermalink() {
    console.log(this.photo);
      return this.aquariumService.getPhotoPermalink(this.photo,0.25);
  }
  getPhotoDate() {
    return moment(this.photo.date).local().calendar();
  }
  expandPhoto() {
    var dialog = this.dialog.open(PhotoExpandedModalComponent, {
      panelClass: "expanded-photo-dialog",
      data: this.photo 
    });
  }
}
