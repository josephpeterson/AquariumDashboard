import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { AquariumService } from 'src/app/services/aquarium-service/aquarium.service';

@Component({
  selector: 'aquarium-preview-scroller',
  templateUrl: './aquarium-preview-scroller.component.html',
  styleUrls: ['./aquarium-preview-scroller.component.scss']
})
export class AquariumPreviewScrollerComponent implements OnInit {
 
  @ViewChild("scroller") scroller;

  data: AquariumSnapshot[] = []

  selectedId: number = 0;


  constructor(public aquariumService: AquariumService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    //Load snapshots
    var promise = this.aquariumService.getSnapshots();
    promise.then(data => {
      this.data = data;
    });
  }


  //Deprecated
  scrollScroller(event: WheelEvent) {
    var scroller:HTMLDivElement = this.scroller.nativeElement;
    scroller.scrollTop += event.deltaY;
    event.preventDefault();
  }
  handleKey(event: KeyboardEvent) {
    event.preventDefault();
    event.key === 'ArrowUp' ? this.propagate(-1):this.propagate(1);
  }

  setSelectedId(id: number) {
    
    //Handle overflow
    if(id < 0)
      id = this.data.length-1;
    else if(id >= this.data.length)
      id = 0;
    this.selectedId = id;
  }
  propagate(num: number) {
    this.setSelectedId(this.selectedId + num);
    var snapshots:HTMLDivElement[] = this.scroller.nativeElement.getElementsByClassName("content");
    snapshots[this.selectedId].scrollIntoView({behavior: "auto", block: "end", inline: "nearest"});
  }

  
  getSnapshotSrc(snapshot: AquariumSnapshot)
  {
    return this.aquariumService.GetPhotoSource(snapshot);
  }

  takeSnapshot(event){
    var ele = event.target;
    ele.disabled = true;
    var a = this.aquariumService.takeSnapshot();
    a.then(data => {
      //this.data.push(data);
    }).catch(e => {

    }).finally(() => {
      ele.disabled = false;
    });
  }
  deleteSnapshot(event) {
    var ele = event.target;
    ele.disabled = true;
  }
}

