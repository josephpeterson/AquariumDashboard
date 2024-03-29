import { Component, OnInit, Input } from '@angular/core';

import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { isTakingSnapshot, getDidTake, getTakeError } from 'src/app/store/snapshot/snapshot.selector';
import { SnapshotTakeAction } from 'src/app/store/snapshot/snapshot.actions';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { faCamera, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { Aquarium } from 'src/app/models/Aquarium';
import { Fish } from 'src/app/models/Fish';
import { FishAddModalComponent } from '../../../modals/fish-add-modal/fish-add-modal.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    selector: 'fish-create-button',
    templateUrl: './fish-create-button.component.html',
    styleUrls: ['./fish-create-button.component.scss']
})
export class FishCreateButtonComponent implements OnInit {
    @Input() aquarium: Aquarium;

    ngOnInit() {
        if (!this.aquarium)
            this.store.select(getSelectedAquarium)
                .pipe(take(1))
                .subscribe(aq => this.aquarium = aq);
    }
    clickCreateFish() {
        var fish = new Fish();
        fish.aquariumId = this.aquarium.id;
        fish.date = new Date();
        var inst = this.dialog.open(FishAddModalComponent, {
            height: "70%",
            width: "60%",
        });
        inst.componentInstance.fish = fish;
        //inst.componentInstance.clickAddFish();
    }
    constructor(private store: Store<AppState>, private dialog: MatDialog) { }
}

