import { Component, OnInit, Input } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';


export class VisualAquariumComponentOptions {
  public waterAdded: number;
  public waterRemoved: number;
  public waterLevel: number;
}
@Component({
  selector: 'visual-aquarium',
  templateUrl: './visual-aquarium.component.html',
  styleUrls: ['./visual-aquarium.component.scss']
})
export class VisualAquariumComponent implements OnInit {
  @Input() public options: VisualAquariumComponentOptions;
  @Input() public aquarium: Aquarium;

  constructor() { }

  ngOnInit() {
  }

  public getWaterLevel() {
    var level = this.options.waterLevel;
    var added = this.options.waterAdded;
    var removed = this.options.waterRemoved;
    var percentage = Math.round(level / this.aquarium.gallons * 100) + "%";
    return percentage;
  }

}