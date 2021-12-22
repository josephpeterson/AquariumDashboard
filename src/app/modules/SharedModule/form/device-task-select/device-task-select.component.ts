import { Component, Output, EventEmitter, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeviceSensor } from 'src/app/models/DeviceSensor';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { DeviceScheduleTask } from 'src/app/models/DeviceScheduleTask';

@Component({
    selector: 'device-task-select',
    templateUrl: './device-task-select.component.html',
    styleUrls: ['./device-task-select.component.scss'],
})
export class DeviceTaskSelectComponent {
    public availableDeviceTasks: DeviceScheduleTask[] = [];

    public aquarium$ = this.store.pipe(select(getSelectedAquarium));
    public componentLifeCycle$ = new Subject();

    public selectControl: FormControl = new FormControl();

    @Input() set disabled(condition: boolean) {
        if (condition)
            this.selectControl.disable();
        else
            this.selectControl.enable();
    }
    @Input() inputModel: DeviceSensor;
    @Output() inputModelChange = new EventEmitter<DeviceScheduleTask>(); //This needs to match inputModel

    constructor(private store: Store<AppState>,private dialog:MatDialog) {
    }
    ngOnInit() {
        this.selectControl.valueChanges.pipe(takeUntil(this.componentLifeCycle$)).subscribe(val => {
            this.inputModelChange.emit(val);
        });
        this.aquarium$.pipe(takeUntil(this.componentLifeCycle$)).subscribe(aquarium => {
            this.availableDeviceTasks = aquarium.device.tasks;
            if(this.inputModel) {
                var s = aquarium.device.tasks.filter(s => s.id == this.inputModel.id)[0];
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