import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Fish } from 'src/app/models/Fish';
import { FishService } from 'src/app/services/fish.service';

@Component({
    selector: 'fish-select',
    templateUrl: './fish-select.component.html',
    styleUrls: ['./fish-select.component.scss'],
})
export class FishSelectComponent {
    public availableFish: Fish[];
    public componentLifeCycle$ = new Subject();
    @Input() public control: FormControl = new FormControl();
    
    constructor(private fishService: FishService) {
    }
    ngOnInit() {

        this.fishService.getAllFish().subscribe(res => this.availableFish = res,() => {

        });
    }
    ngOnDestory() {
        this.componentLifeCycle$.next();
        this.componentLifeCycle$.unsubscribe();
    }
}