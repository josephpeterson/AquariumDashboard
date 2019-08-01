import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { isTakingSnapshot, getDidTake, getTakeError } from 'src/app/store/snapshot/snapshot.selector';
import { SnapshotTakeAction } from 'src/app/store/snapshot/snapshot.actions';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { faCamera, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ManageFishModalComponent } from 'src/app/components/shared/modals/manage-fish-modal/manage-fish-modal.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'fish-create-button',
    templateUrl: './fish-create-button.component.html',
    styleUrls: ['./fish-create-button.component.scss']
})
export class FishCreateButtonComponent implements OnInit {
    private aquarium;

    //Store data
    public aquarium$ = this.store.select(getSelectedAquarium);

    ngOnInit() {
        this.aquarium$.pipe(take(1)).subscribe(aq => this.aquarium = aq);
    }
    clickCreateFish() {
        var inst = this.dialog.open(ManageFishModalComponent, {
            height: "70%",
            width: "60%",
        });
        inst.componentInstance.aquarium = this.aquarium;
        //inst.componentInstance.clickAddFish();
    }
    constructor(private notifier: NotifierService, private store: Store<AppState>,private dialog: MatDialog) { }
}

