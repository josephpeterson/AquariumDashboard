import { Component, Input } from '@angular/core';

import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getDeleteError, isDeletingSnapshot } from 'src/app/store/snapshot/snapshot.selector';
import { SnapshotDeleteAction } from 'src/app/store/snapshot/snapshot.actions';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { HttpErrorResponse } from '@angular/common/http';
import { faTrashAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    selector: 'snapshot-delete-button',
    templateUrl: './snapshot-delete-button.component.html',
    styleUrls: ['./snapshot-delete-button.component.scss']
})
export class SnapshotDeleteButtonComponent
{
    @Input() snapshot: AquariumSnapshot;

    //Store data
    public aquarium$ = this.store.select(getSelectedAquarium);
    public deleting$ = this.store.select(isDeletingSnapshot);
    public deleteError$ = this.store.select(getDeleteError);

    public faTrashAlt:IconDefinition = faTrashAlt

    deleteSnapshot() {
        this.store.dispatch(new SnapshotDeleteAction(this.snapshot));
        this.deleteError$.pipe(take(2)).subscribe(error => {
            if (error) this.handleError(error);
        });
    }
    handleError(error: HttpErrorResponse) {
        this.notifier.notify("error","Could not delete snapshot");
        console.log(error.message,error);
    }
    constructor(private notifier: NotificationService,private store: Store<AppState>) {}
}

