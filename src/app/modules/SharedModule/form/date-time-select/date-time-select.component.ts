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
import { CreateSpeciesModalComponent } from '../../modals/create-species-modal/create-species-modal.component';
import { DeviceSensor } from 'src/app/models/DeviceSensor';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import * as moment from 'moment';

@Component({
    selector: 'date-time-select',
    templateUrl: './date-time-select.component.html',
    styleUrls: ['./date-time-select.component.scss'],
})
export class DateTimeSelectComponent {
    public selectControl: FormControl = new FormControl();
    
    @Input() disabled: boolean;
    @Input() inputModel: string;
    @Output() inputModelChange = new EventEmitter(); //This needs to match inputModel

    constructor() {
    }

    ngOnInit() {
        if(this.inputModel)
            this.inputModel = moment(this.inputModel).format("HH:mm:ss");
    }
}