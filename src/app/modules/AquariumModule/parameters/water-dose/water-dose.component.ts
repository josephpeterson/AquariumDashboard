import { Component, OnInit, Input } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { WaterDosing } from 'src/app/models/WaterDosing';
import { AquariumService } from 'src/app/services/aquarium.service';
import { NotificationService } from 'src/app/services/notification.service';


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
    private notifier: NotificationService
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
