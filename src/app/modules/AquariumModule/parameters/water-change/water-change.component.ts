import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WaterChange } from 'src/app/models/WaterChange';
import { AquariumService } from 'src/app/services/aquarium.service';

import { Aquarium } from 'src/app/models/Aquarium';
import { VisualAquariumComponentOptions } from 'src/app/modules/SharedModule/visual-aquarium/visual-aquarium.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'water-change',
  templateUrl: './water-change.component.html',
  styleUrls: ['./water-change.component.scss']
})
export class WaterChangeComponent implements OnInit {

  @Input() aquarium: Aquarium;
  public waterChange: WaterChange = new WaterChange();
  public disabled: boolean;

  @Output() success = new EventEmitter();


  constructor(
    private _aquariumService: AquariumService,
    private notifier: NotificationService
  ) { }

  ngOnInit() {
  }
  public clickSubmit() {
    this.disabled = true;
    this._aquariumService.addWaterChange(this.aquarium.id,this.waterChange).subscribe(data => {
      this.disabled = false;
      this.waterChange = new WaterChange();
      this.notifier.notify("success","Water change successfully added (" + data.id + ")");

      this.success.emit(data);

    },
    err => {
      this.disabled = false;
      console.error(err);
    });
  }
  public getAquariumVisual() {
    var options = new VisualAquariumComponentOptions();
    options.waterAdded = this.waterChange.gallonsAdded;
    options.waterRemoved = this.waterChange.gallonsRemoved;
    options.waterLevel = this.aquarium.gallons/2;
    return options;
  }
}
