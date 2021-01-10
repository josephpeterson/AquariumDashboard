import { Component, OnInit, Input } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { WaterDosing } from 'src/app/models/WaterDosing';
import { AquariumService } from 'src/app/services/aquarium.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'water-dose',
  templateUrl: './water-dose.component.html',
  styleUrls: ['./water-dose.component.scss']
})
export class WaterDoseComponent implements OnInit {

  @Input() aquarium: Aquarium;
  public waterDosing: WaterDosing = new WaterDosing();
  public disabled: boolean;

  constructor(
    private _aquariumService: AquariumService,
    private notifier: NotifierService
  ) { }

  ngOnInit() {
  }
  public clickSubmit() {
    this.disabled = true;
    this._aquariumService.addWaterDosing(this.aquarium.id,this.waterDosing).subscribe(data => {
      this.disabled = false;
      this.waterDosing = new WaterDosing();
      this.notifier.notify("success","Water dosing successfully added (" + data.id + ")");
    },
    err => {
      this.disabled = false;
      console.error(err);
    });
  }

}
