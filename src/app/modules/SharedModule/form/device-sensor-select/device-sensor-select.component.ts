import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Species } from 'src/app/models/Species';
import { select, Store } from '@ngrx/store';
import { getAllSpecies } from 'src/app/store/species/species.selector';
import { Subject } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Fish } from 'src/app/models/Fish';
import { SpeciesLoadAction } from 'src/app/store/species/species.actions';
import { TypeCheckCompiler } from '@angular/compiler/src/view_compiler/type_check_compiler';
import { CreateSpeciesModalComponent } from '../../modals/create-species-modal/create-species-modal.component';
import { DeviceSensor } from 'src/app/models/DeviceSensor';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';

@Component({
    selector: 'device-sensor-select',
    templateUrl: './device-sensor-select.component.html',
    styleUrls: ['./device-sensor-select.component.scss'],
})
export class DeviceSensorSelectComponent {
    public availableDeviceSensors: DeviceSensor[] = [];

    public aquarium$ = this.store.pipe(select(getSelectedAquarium));
    public componentLifeCycle$ = new Subject();

    public selectControl: FormControl = new FormControl();

    @Input() set disabled(condition: boolean) {
        if (condition)
            this.selectControl.disable();
        else
            this.selectControl.enable();
    }
    @Input() inputModelId: number; //so we can look up by ID instead of object
    @Input() inputModel: DeviceSensor;
    @Output() inputModelChange = new EventEmitter<DeviceSensor>(); //This needs to match inputModel

    constructor(private store: Store<AppState>,private dialog:MatDialog) {
    }
    ngOnInit() {
        this.selectControl.valueChanges.pipe(takeUntil(this.componentLifeCycle$)).subscribe(val => {
            this.inputModelChange.emit(val);
        });
        this.aquarium$.pipe(takeUntil(this.componentLifeCycle$)).subscribe(aquarium => {
            this.availableDeviceSensors = aquarium.device.sensors;
            if(this.inputModel || this.inputModelId) {
                var s = aquarium.device.sensors.filter(s => this.inputModelId == s.id || s.id == this.inputModel?.id)[0];
                this.inputModel = s;
                this.selectControl.setValue(s);
            }
        })
        this.selectControl.setValue(this.inputModel);
    }

    ngOnDestory() {
        this.componentLifeCycle$.next();
        this.componentLifeCycle$.unsubscribe();
    }
}