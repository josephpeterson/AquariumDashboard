import { Component, Output, EventEmitter, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { getAllAquariums } from 'src/app/store/aquarium/aquarium.selector';
import { Aquarium } from 'src/app/models/Aquarium';

@Component({
    selector: 'aquarium-select',
    templateUrl: './aquarium-select.component.html',
    styleUrls: ['./aquarium-select.component.scss']
})
export class AquariumSelectComponent {
    public availableAquariums: Aquarium[] = [];

    public aquariums$ = this.store.pipe(select(getAllAquariums));
    public componentLifeCycle$ = new Subject();

    public selectControl: FormControl = new FormControl();
    @Output() onChange = new EventEmitter();
    @Input() value: Aquarium;

    constructor(private store: Store<AppState>) { }
    ngOnInit() {
        this.selectControl.valueChanges.pipe(takeUntil(this.componentLifeCycle$)).subscribe(val => {
            this.onChange.emit(val);
        });

        this.aquariums$.pipe(takeUntil(this.componentLifeCycle$)).subscribe(aquariums => {
            if (!aquariums) return;
            this.availableAquariums = aquariums;
        })
    }
    ngOnDestory() {
        this.componentLifeCycle$.next();
        this.componentLifeCycle$.unsubscribe();
    }
}