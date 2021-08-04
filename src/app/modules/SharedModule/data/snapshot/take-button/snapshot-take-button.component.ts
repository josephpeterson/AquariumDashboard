import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { isTakingSnapshot, getDidTake, getTakeError } from 'src/app/store/snapshot/snapshot.selector';
import { SnapshotTakeAction } from 'src/app/store/snapshot/snapshot.actions';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { faCamera, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    selector: 'snapshot-take-button',
    templateUrl: './snapshot-take-button.component.html',
    styleUrls: ['./snapshot-take-button.component.scss']
})
export class SnapshotTakeButtonComponent implements OnInit {
    private aquarium;

    public faCamera: IconDefinition = faCamera;

    //Store data
    public aquarium$ = this.store.select(getSelectedAquarium);
    public taking$ = this.store.select(isTakingSnapshot);
    public takeError$ = this.store.select(getTakeError);

    @Output() onPhotoTaken = new EventEmitter();


    ngOnInit() {
        this.aquarium$.pipe(take(1)).subscribe(aq => this.aquarium = aq);
    }
    takeSnapshot() {
        this.store.dispatch(new SnapshotTakeAction(this.aquarium));
        //Bind error
        var err = false;
        this.takeError$.pipe(take(2)).subscribe(error => {
            if (error) {
                this.notifier.notify("error", error.message);
                err = true;
            }
        });
        var start = Date.now();
        this.taking$.pipe(take(2)).subscribe(val => {
            if (val || err) return;
            var eta = Date.now() - start;
            this.notifier.notify("success", "Snapshot taken successfully (" + eta + "ms)");
            this.onPhotoTaken.emit(val);
        });
    }
    constructor(private notifier: NotificationService, private store: Store<AppState>) { }
}

