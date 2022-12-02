import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Species } from 'src/app/models/Species';
import { select, Store } from '@ngrx/store';
import { getAllSpecies } from 'src/app/store/species/species.selector';
import { Subject } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateSpeciesModalComponent } from '../../modals/create-species-modal/create-species-modal.component';
import { Fish } from 'src/app/models/Fish';
import { SpeciesLoadAction } from 'src/app/store/species/species.actions';
import { AquariumService } from 'src/app/services/aquarium.service';

@Component({
    selector: 'generic-select',
    templateUrl: './generic-select.component.html',
    styleUrls: ['./generic-select.component.scss'],
})
export class GenericSelectComponent {
    public listOptions: any[] = [];
    public loading: boolean = false;

    public componentLifeCycle$ = new Subject();

    public selectControl: FormControl = new FormControl();


    @Input() set disabled(condition: boolean) {
        if (condition)
            this.selectControl.disable();
        else
            this.selectControl.enable();
    }

    @Input() inputModel: string;
    @Output() inputModelChange = new EventEmitter<string>();

    @Output() onChange = new EventEmitter();
    //@Input() value: Species;
    @Input() selectType: string;
    @Input() label: string;

    constructor(private _aquariumService: AquariumService) {
    }
    ngOnInit() {
        this.selectControl.valueChanges.pipe(takeUntil(this.componentLifeCycle$)).subscribe(val => {
            this.inputModelChange.emit(val);
            this.onChange.emit(val);
        });
        this.load();
        this.selectControl.setValue(this.inputModel);
    }
    load() {
        this.loading = true;

        this._aquariumService.getSelectOptionsByType(this.selectType).subscribe((data: any[]) => {
            this.listOptions = data;
        });
    }
    ngOnDestory() {
        this.componentLifeCycle$.next();
        this.componentLifeCycle$.unsubscribe();
    }
}