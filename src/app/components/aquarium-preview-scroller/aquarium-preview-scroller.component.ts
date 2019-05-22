import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { AquariumService } from 'src/app/services/aquarium-service/aquarium.service';
import { SnapshotPreviewScrollerComponentData } from './aquarium-preview-scroller.component.data';
import { Snapshot } from 'src/app/models/Snapshot';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'aquarium-preview-scroller',
  templateUrl: './aquarium-preview-scroller.component.html',
  styleUrls: ['./aquarium-preview-scroller.component.scss']
})
export class AquariumPreviewScrollerComponent implements OnInit {

  @ViewChild("scroller") scroller;

  selectedId: number = 0;


  public photoSnapshots: Snapshot[]
  public loading$: Observable<boolean> = this.dataSource.loading$;
  public data$: Observable<Snapshot[]> = this.dataSource.snapshots$;
  public deleting$: Observable<boolean> = this.dataSource.deleting$;
  public deleteError$: Observable<HttpErrorResponse> = this.dataSource.deleteError$;
  public taken$: Observable<boolean> = this.dataSource.taken$;
  public taking$: Observable<boolean> = this.dataSource.taking$;
  public takeError$: Observable<HttpErrorResponse> = this.dataSource.takeError$;


  constructor(public dataSource: SnapshotPreviewScrollerComponentData,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.data$.subscribe(data => {
      var photos = data.filter(snapshot => (snapshot.photoId != null));
      this.photoSnapshots = photos.sort((a, b) => b.id - a.id);
    });
    this.taken$.subscribe(val => {
      if (!val) return;
      this.setSelectedId(0);
      this.dataSource.reset();
    })
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


  getSnapshotSrc(snapshot: Snapshot) {
    return this.dataSource.getSrc(snapshot);
  }

  takeSnapshot() {
    this.dataSource.take();
  }
  deleteSnapshot(snapshot: Snapshot) {
    this.dataSource.delete(snapshot);
  }
  readableDate(dateString: string) {
    return new Date(dateString).toLocaleTimeString('en-US');
  }
}

