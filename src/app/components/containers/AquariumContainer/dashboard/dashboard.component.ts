import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { Observable } from 'rxjs';
import { Aquarium } from 'src/app/models/Aquarium';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { AppState } from 'src/app/app.state';
import { take } from 'rxjs/operators';
import { AquariumService } from 'src/app/services/aquarium-service/aquarium.service';


@Component({
  selector: 'dashboard-page-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {
 
  faExclamationTriangle  = faExclamationTriangle;

  public latestSnapshot: AquariumSnapshot;
  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private aquariumService: AquariumService
  ) {}

  ngOnInit() {
    this.aquarium$.pipe(take(1)).subscribe(aq => {
      this.aquariumService.getLatestSnapshot(aq.id).subscribe(snapshot => {
        this.latestSnapshot = snapshot;
      });
    });
  }



  clickUpdateParameters() {

  }
  getAgeText() {
    var ms = (new Date().getTime() - new Date(this.latestSnapshot.date).getTime());
    return millisecondsToStr(ms);
  }
}

function millisecondsToStr(milliseconds) {
  // TIP: to find current time in milliseconds, use:
  // var  current_time_milliseconds = new Date().getTime();

  function numberEnding (number) {
      return (number > 1) ? 's' : '';
  }

  var temp = Math.floor(milliseconds / 1000);
  var years = Math.floor(temp / 31536000);
  if (years) {
      return years + ' year' + numberEnding(years);
  }
  //TODO: Months! Maybe weeks? 
  var days = Math.floor((temp %= 31536000) / 86400);
  if (days) {
      return days + ' day' + numberEnding(days);
  }
  var hours = Math.floor((temp %= 86400) / 3600);
  if (hours) {
      return hours + ' hour' + numberEnding(hours);
  }
  var minutes = Math.floor((temp %= 3600) / 60);
  if (minutes) {
      return minutes + ' minute' + numberEnding(minutes);
  }
  var seconds = temp % 60;
  if (seconds) {
      return seconds + ' second' + numberEnding(seconds);
  }
  return 'less than a second'; //'just now' //or other string you like;
}