import { Component, OnInit, Input } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { WaterChange } from 'src/app/models/WaterChange';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'water-change-table',
  templateUrl: './water-change-table.component.html',
  styleUrls: ['./water-change-table.component.scss']
})
export class WaterChangeTableComponent implements OnInit {

  @Input() aquarium: Aquarium;

  public columns: Array<any> = [
    { name: 'select', visible: true },
    { name: 'amount', visible: true },
    { name: 'date', visible: true },
  ];



  constructor(
    private _aquariumService: AquariumService
  ) { }

  ngOnInit() {
  }
  loadWaterChanges() {
    return this._aquariumService.getWaterChangesByAquarium(this.aquarium.id);
  }
}
