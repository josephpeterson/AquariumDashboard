import { Component, OnInit, Input } from '@angular/core';
import { WaterChange } from 'src/app/models/WaterChange';
import { AquariumService } from 'src/app/services/aquarium.service';
import { NotifierService } from 'angular-notifier';
import { Aquarium } from 'src/app/models/Aquarium';

@Component({
  selector: 'water-change',
  templateUrl: './water-change.component.html',
  styleUrls: ['./water-change.component.scss']
})
export class WaterChangeComponent implements OnInit {

  @Input() aquarium: Aquarium;
  public waterChange: WaterChange = new WaterChange();
  public disabled: boolean;

  constructor(
    private _aquariumService: AquariumService,
    private notifier: NotifierService
  ) { }

  ngOnInit() {
  }
  public clickSubmit() {
    this.disabled = true;
    this._aquariumService.addWaterChange(this.aquarium.id,this.waterChange).subscribe(data => {
      this.disabled = false;
      this.waterChange = new WaterChange();
      this.notifier.notify("success","Water change successfully added (" + data.id + ")");
    },
    err => {
      this.disabled = false;
      console.error(err);
    });
  }
}
