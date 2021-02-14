import { Component, OnInit, ViewChild } from '@angular/core';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { Observable, Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { isLoadingSnapshots, getAllSnapshots } from 'src/app/store/snapshot/snapshot.selector';
import { take, takeUntil } from 'rxjs/operators';
import { SnapshotLoadByAquariumAction } from 'src/app/store/snapshot/snapshot.actions';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { Aquarium } from 'src/app/models/Aquarium';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumPhoto } from 'src/app/models/AquariumPhoto';
import * as moment from 'moment';
import { PhotoExpandedModalComponent } from '../../SharedModule/modals/photo-expanded-modal/photo-expanded-modal.component';


@Component({
  selector: 'device-snapshot-carousel',
  templateUrl: './device-snapshot-carousel.component.html',
  styleUrls: ['./device-snapshot-carousel.component.scss']
})
//This replaces the deprecated snapshot carousel
export class DeviceSnapshotCarouselComponent implements OnInit {

  @ViewChild("scroller") scroller;

  selectedId: number = 0;
  loadCount: number = 500;

  public aquarium: Aquarium;
  public componentLifeCycle = new Subject();


  public photoSnapshots: AquariumSnapshot[]
  public loading$: Observable<boolean> = this.store.select(isLoadingSnapshots);
  public data$: Observable<AquariumSnapshot[]> = this.store.select(getAllSnapshots);
  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);


  constructor(private store: Store<AppState>, private dialog: MatDialog, public aquariumService: AquariumService) { }

  ngOnInit() {
    this.data$.pipe(takeUntil(this.componentLifeCycle)).subscribe(data => {
      //var photos = data.filter(snapshot => (snapshot.
       // photo != null));
     this.photoSnapshots = data.sort((a, b) => b.id - a.id);
    });
    this.aquarium$.pipe(take(1)).subscribe(aq => {
      this.store.dispatch(new SnapshotLoadByAquariumAction(aq.id,0,this.loadCount));
      this.aquarium = aq;
    });


  }

  ngOnDestroy() {
    this.componentLifeCycle.next();
    this.componentLifeCycle.unsubscribe();
  }


  //Deprecated
  scrollScroller(event: WheelEvent) {
    var scroller: HTMLDivElement = this.scroller.nativeElement;
    scroller.scrollTop += event.deltaY;
    event.preventDefault();
  }
  handleKey(event: KeyboardEvent) {
    event.preventDefault();
    event.key === 'ArrowUp' ? this.propagate(-1) : this.propagate(1);
  }

  setSelectedId(id: number) {

    //Handle overflow
    if (id < 0)
      id = this.photoSnapshots.length - 1;
    else if (id >= this.photoSnapshots.length)
    {
      id = 0;
    }
    this.selectedId = id;
  }
  propagate(num: number) {
    this.setSelectedId(this.selectedId + num);
    var snapshots: HTMLDivElement[] = this.scroller.nativeElement.getElementsByClassName("content");
    snapshots[this.selectedId].scrollIntoView({ behavior: "auto", block: "end", inline: "nearest" });
  }
  readableDate(dateString: string) {
    var d = moment.utc(dateString ).local().format('YYYY-MM-DD HH:mm:ss');
    return moment(d).calendar();
  }

  generateChart() {

  }

  clickExpandedImage(photo: AquariumPhoto) {
    var dialog = this.dialog.open(PhotoExpandedModalComponent, {
      panelClass: "expanded-photo-dialog",
      data: photo.photo
    });
  }

  addNewSnapshot(snapshot: AquariumSnapshot) {
    //this.photoSnapshots.push(snapshot);
  }
}

