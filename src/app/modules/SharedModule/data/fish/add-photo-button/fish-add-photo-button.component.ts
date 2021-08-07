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
import { FishPhotoModal } from '../../../modals/fish-photo-modal/fish-photo-modal.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    selector: 'fish-add-photo-button',
    templateUrl: './fish-add-photo-button.component.html',
    styleUrls: ['./fish-add-photo-button.component.scss']
})
export class FishAddPhotoButtonComponent implements OnInit {
    @Input() fish: Fish;

    ngOnInit() {

    }
    clickUploadPhoto() {
        var dialog = this.dialog.open(FishPhotoModal, {
        });
        dialog.componentInstance.fishId = this.fish.id;
    }
    constructor(private notifier: NotificationService, private store: Store<AppState>, private dialog: MatDialog) { }
}

