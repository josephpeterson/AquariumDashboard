import { Component, OnInit } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { select, Store } from '@ngrx/store';
import { getSelectedAquarium, getConnectionError, getDidDelete, getDeleteError } from 'src/app/store/aquarium/aquarium.selector';
import { getAllSnapshots, isLoadingSnapshots, isDeletingSnapshot, isTakingSnapshot, getDidTake, getTakeError } from 'src/app/store/snapshot/snapshot.selector';
import { AppState } from 'src/app/app.state';
import { SnapshotResetAction, SnapshotLoadByAquariumAction, SnapshotDeleteAction } from 'src/app/store/snapshot/snapshot.actions';
import { Snapshot } from 'src/app/models/Snapshot';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


const FOOD_BRANDS = [
    "brand1",
    "brand2",
    "brand3",
]
@Component({
    selector: 'feeding-list',
    templateUrl: './feeding-list.component.html',
    styleUrls: ['./feeding-list.component.scss']
})
export class FeedingListComponent implements OnInit {
    public aquarium: Aquarium;

    public aquarium$ = this.store.pipe(select(getSelectedAquarium));

    public newFeeding = {
        foodBrand: new FormControl(),
        foodName: new FormControl(),
    }
    public newFeedingFish = new FormControl()

    public fish = ["fish1", "fish2", "fish3"]

    public foodBrands = FOOD_BRANDS;

    filteredOptions: Observable<string[]>;


    constructor(private store: Store<AppState>) {
        this.aquarium$.subscribe(aq => {
            if (!aq) return;
            this.aquarium = aq;
        })
    }
    ngOnInit() {
        this.filteredOptions = this.newFeeding.foodBrand.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );
    }
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.foodBrands.filter(option => option.toLowerCase().includes(filterValue));
    }


}