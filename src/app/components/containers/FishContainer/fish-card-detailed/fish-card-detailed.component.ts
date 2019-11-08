import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Fish } from 'src/app/models/Fish';
import { AquariumService } from 'src/app/services/aquarium.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'fish-card-detailed',
  templateUrl: './fish-card-detailed.component.html',
  styleUrls: ['./fish-card-detailed.component.scss']
})
export class FishCardDetailedComponent implements OnInit {

  public faExclamationTriangle = faExclamationTriangle;

  @Input() public fishId: number
  //public fish$: Observable<Fish> = new Observable<Fish>();
  public fish: Fish;
  public error: string;

  constructor(private aquariumService: AquariumService) { }

  ngOnInit() {
    this.loadFish();
  }


  loadFish() {
    delete this.error;
    this.aquariumService.getFishById(this.fishId).subscribe(fish => {
      this.fish = fish;
      console.log("wat");
    }, (err: HttpErrorResponse) => {
      this.error = err.message;
    });
  }
  getFishThumbnailSource(fish: Fish) {
    var val = this.aquariumService.getPhotoPermalink(fish.thumbnailPhotoId, "1");
    return val;
  }
  getFishAge() {
    return Math.floor((Date.now() - new Date(this.fish.date).getTime()) / 1000 / 60 / 60 / 24);
  }
  getReadableDate(date) {
    return moment().diff(date, "days");
  }
}
