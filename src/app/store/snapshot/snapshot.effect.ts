import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { map, catchError, mergeMap } from 'rxjs/operators'
import { AquariumService } from 'src/app/services/aquarium.service';
import { of } from 'rxjs'
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { SnapshotLoadByAquariumAction, SnapshotActions, SnapshotLoadSuccessAction, SnapshotLoadFailedAction, SnapshotDeleteAction, SnapshotDeleteSuccessAction, SnapshotDeleteFailedAction, SnapshotTakeAction, SnapshotTakeSuccessAction, SnapshotTakeFailedAction } from './snapshot.actions';

@Injectable()
export class SnapshotEffects {
    constructor(private aquariumService: AquariumService,
        private actions$: Actions) {

    }

    @Effect()
    loadSnapshotsByAquarium$ = this.actions$.pipe(ofType<SnapshotLoadByAquariumAction>(SnapshotActions.LoadByAquarium),
        mergeMap((action: SnapshotLoadByAquariumAction) => this.aquariumService.getSnapshots(action.payload,action.offset,action.count).pipe(
            map((snapshots: AquariumSnapshot[]) => new SnapshotLoadSuccessAction(snapshots)),
            catchError(error => of(new SnapshotLoadFailedAction(error)))
        )));
    @Effect()
    deleteSnapshot$ = this.actions$.pipe(ofType<SnapshotDeleteAction>(SnapshotActions.Delete),
        mergeMap((action: SnapshotDeleteAction) => this.aquariumService.deleteSnapshot(action.payload).pipe(
            map(() => new SnapshotDeleteSuccessAction(action.payload)),
            catchError(error => of(new SnapshotDeleteFailedAction(error)))
        )));
    @Effect()
    takeSnapshot$ = this.actions$.pipe(ofType<SnapshotTakeAction>(SnapshotActions.Take),
        mergeMap((action: SnapshotTakeAction) => this.aquariumService.takeSnapshot(action.payload.id).pipe(
            map((newSnapshot: AquariumSnapshot) => {
                //We can map the aquarium to the snapshot here
                newSnapshot.aquarium = action.payload;
                return new SnapshotTakeSuccessAction(newSnapshot)
            }),
            catchError(error => of(new SnapshotTakeFailedAction(error)))
        )));
}