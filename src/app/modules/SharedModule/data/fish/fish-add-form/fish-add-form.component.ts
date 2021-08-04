import { Aquarium } from 'src/app/models/Aquarium';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Subject } from 'rxjs';
import { Fish } from 'src/app/models/Fish';
import { AquariumLoadByIdAction } from 'src/app/store/aquarium/aquarium.actions';

import { AquariumService } from 'src/app/services/aquarium.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    selector: 'fish-add-form',
    templateUrl: './fish-add-form.component.html',
    styleUrls: ['./fish-add-form.component.scss']
})
export class FishAddFormComponent implements OnInit {
    @Input("fish") fish: Fish;
    @Input("fishId") fishId;
    @Input("aquarium") aquarium: Aquarium;

    @Output() onSuccess = new EventEmitter();

    public exists = false;

    public componentLifecycle = new Subject();


    constructor(private store: Store<AppState>, private notifier: NotificationService,
        private _aquariumService: AquariumService) {
    }
    ngOnInit() {
        if (!this.fish && this.fishId)
            this._aquariumService.getFishById(this.fishId);
        else {
            this.fish = new Fish();
            if (this.aquarium)
                this.fish.aquariumId = this.aquarium.id;
        }
    }
    ngOnDestory() {
        this.componentLifecycle.next();
        this.componentLifecycle.unsubscribe();
    }

    clickUpdate() {
        var fish = this.fish;

        this._aquariumService.updateFish(fish).subscribe(() => {
            this.notifier.notify("success", "Fish was updated.");
            this.actionSuccess();
        }, err => {
            this.notifier.notify("error", "Unable to update fish.");
            console.log(err);
        });
    }
    clickNew() {
        var fish = this.fish;
        console.log(fish);

        this._aquariumService.createFish(fish).subscribe(fish => {
            this.notifier.notify("success", "Fish added");

            this.store.dispatch(new AquariumLoadByIdAction(fish.aquariumId));
            this.actionSuccess();
        }, err => {
            this.notifier.notify("error", "Could not add fish to aquarium.");
            console.log(err);
        });
    }
    clickDelete() {
        var fish = this.fish;
        this._aquariumService.deleteFish(fish).subscribe(() => {
            this.notifier.notify("success", "Fish deleted");
            this.actionSuccess();
        }, err => {
            this.notifier.notify("error", "Could not delete fish.");
            console.log(err);
        });
    }

    actionSuccess() {
        //Reload store
        this.store.dispatch(new AquariumLoadByIdAction(this.fish.aquariumId));
        this.onSuccess.emit();
    }
}