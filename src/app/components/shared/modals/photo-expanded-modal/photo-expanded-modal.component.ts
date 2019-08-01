import { Component, OnInit, Input } from '@angular/core';
import { AquariumPhoto } from 'src/app/models/AquariumPhoto';
import { Subject } from 'rxjs';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { environment } from 'src/environments/environment';
import { AquariumService } from 'src/app/services/aquarium.service';

@Component({
  selector: 'photo-expanded-modal',
  templateUrl: './photo-expanded-modal.component.html',
  styleUrls: ['./photo-expanded-modal.component.scss']
})
export class PhotoExpandedModalComponent implements OnInit {

  @Input() photo: AquariumPhoto;
  @Input() photoId: number;
  public imageSrc: string;
  public componentLifecycle = new Subject();

  constructor(private _aquariumService: AquariumService) {
  }
  ngOnInit() {
    if (this.photoId) {
      this.imageSrc = this._aquariumService.getPhotoPermalink(this.photoId);
    }
    else if(this.photo)
      this.imageSrc = this._aquariumService.getPhotoPermalink(this.photo.id);
  }
}