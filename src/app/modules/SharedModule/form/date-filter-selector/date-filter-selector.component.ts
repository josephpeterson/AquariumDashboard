import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WaterChange } from 'src/app/models/WaterChange';
import { AquariumService } from 'src/app/services/aquarium.service';
import { Aquarium } from 'src/app/models/Aquarium';
import { VisualAquariumComponentOptions } from 'src/app/modules/SharedModule/visual-aquarium/visual-aquarium.component';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'date-filter-selector',
  templateUrl: './date-filter-selector.component.html',
  styleUrls: ['./date-filter-selector.component.scss']
})
export class DateFilterSelectorComponent implements OnInit {
  
  campaignOne: FormGroup;

  public days:number = 7;

  @Input("range") public range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  @Input("maxDate") public maxDate = new Date();

  @Output() public updated = new EventEmitter();


  constructor(
    private _aquariumService: AquariumService,
  ) {
    const today = new Date();

    const end = moment(today).subtract(30,'d').toDate();

    this.campaignOne = new FormGroup({
      start: new FormControl(end),
      end: new FormControl(today)
    });
  }

  ngOnInit() {
  }
  public openPicker() {
   
  }
  public onClose() {
    this.updated.emit({
      startDate: this.range.value.start,
      endDate: this.range.value.end,
    });
  }

  
}
