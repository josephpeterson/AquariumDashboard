import { Component } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { select, Store } from '@ngrx/store';
import { getSelectedAquarium, getConnectionError, getDidDelete, getDeleteError, isLoadingAquariums } from 'src/app/store/aquarium/aquarium.selector';
import { getAllSnapshots, isLoadingSnapshots, isDeletingSnapshot, isTakingSnapshot, getDidTake, getTakeError } from 'src/app/store/snapshot/snapshot.selector';
import { AppState } from 'src/app/app.state';
import { SnapshotResetAction, SnapshotLoadByAquariumAction, SnapshotDeleteAction } from 'src/app/store/snapshot/snapshot.actions';
import { Snapshot } from 'src/app/models/Snapshot';
import { AquariumFeeding } from './AquariumFeeding';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';

const ELEMENT_DATA: AquariumFeeding[] = [
    new AquariumFeeding(),
    new AquariumFeeding(),
    new AquariumFeeding(),
    new AquariumFeeding(),
    new AquariumFeeding(),
];
@Component({
    selector: 'feed-table',
    templateUrl: './feed-table.component.html',
    styleUrls: ['./feed-table.component.scss']
})
export class FeedTableComponent {
    public aquarium: Aquarium;

    public loading$: Observable<boolean> = this.store.select(isLoadingAquariums);

    public columns = [
        { label: "Food", name: "food" },
        { label: "Amount", name: "amount" },
        { label: "Date", name: "date" },
    ]
    displayedColumns: string[] = ['amount', 'food', 'date'];

    dataSource = new MatTableDataSource(ELEMENT_DATA);

    constructor(private store: Store<AppState>) {
    }
}