import { Component, OnInit } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { select, Store } from '@ngrx/store';
import { getSelectedAquarium, getConnectionError, getDidDelete, getDeleteError } from 'src/app/store/aquarium/aquarium.selector';
import { getAllSnapshots, isLoadingSnapshots, isDeletingSnapshot, isTakingSnapshot, getDidTake, getTakeError } from 'src/app/store/snapshot/snapshot.selector';
import { AppState } from 'src/app/app.state';
import { SnapshotResetAction, SnapshotLoadByAquariumAction, SnapshotDeleteAction } from 'src/app/store/snapshot/snapshot.actions';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


const FOOD_BRANDS = [
    "brand1",
    "brand2",
    "brand3",
]
@Component({
    selector: 'dosing-list',
    templateUrl: './dosing-list.component.html',
    styleUrls: ['./dosing-list.component.scss']
})
export class DosingListComponent implements OnInit {

    public aquarium$ = this.store.pipe(select(getSelectedAquarium));



    constructor(private store: Store<AppState>) {
     
    }
    ngOnInit() {
       
    }
    
}