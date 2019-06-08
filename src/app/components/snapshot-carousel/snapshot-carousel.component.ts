import { Component, OnInit, ViewChild } from '@angular/core';
import { Snapshot } from 'src/app/models/Snapshot';
import { Observable, Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SnapshotPreviewScrollerComponentData } from './snapshot-carousel.component.data';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { isLoadingSnapshots, getAllSnapshots } from 'src/app/store/snapshot/snapshot.selector';
import { take, takeUntil } from 'rxjs/operators';
import { SnapshotLoadByAquariumAction } from 'src/app/store/snapshot/snapshot.actions';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { Aquarium } from 'src/app/models/Aquarium';

@Component({
  selector: 'snapshot-carousel',
  templateUrl: './snapshot-carousel.component.html',
  styleUrls: ['./snapshot-carousel.component.scss']
})
export class SnapshotCarouselComponent implements OnInit {

  @ViewChild("scroller") scroller;

  selectedId: number = 0;

  public aquarium: Aquarium;
  public componentLifeCycle = new Subject();


  public photoSnapshots: Snapshot[]
  public loading$: Observable<boolean> = this.store.select(isLoadingSnapshots);
  public data$: Observable<Snapshot[]> = this.store.select(getAllSnapshots);
  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.data$.subscribe(data => {
      var photos = data.filter(snapshot => (snapshot.photoPath != null));
      this.photoSnapshots = photos.sort((a, b) => b.id - a.id);
    });
    this.aquarium$.pipe(take(1)).subscribe(aq => {
      this.store.dispatch(new SnapshotLoadByAquariumAction(aq.id));
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
      id = 0;
    this.selectedId = id;
  }
  propagate(num: number) {
    this.setSelectedId(this.selectedId + num);
    var snapshots: HTMLDivElement[] = this.scroller.nativeElement.getElementsByClassName("content");
    snapshots[this.selectedId].scrollIntoView({ behavior: "auto", block: "end", inline: "nearest" });
  }

  //Move this to the service
  getSnapshotSrc(snapshot: Snapshot) {
    return "http://65.29.174.115/v1/Snapshot/Photo/" + snapshot.id + "?" + snapshot.date;
  }
  readableDate(dateString: string) {
    return new Date(dateString).toLocaleTimeString('en-US');
  }

  generateChart() {
    
  }
}

