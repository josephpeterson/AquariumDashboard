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
  public waterChanges: WaterChange[] = [];
  public loading: boolean = false;

  public columns: Array<any> = [
    { name: 'select', visible: true },
    { name: 'amount', visible: true },
    { name: 'date', visible: true },
  ];
  public displayedColumns: any[] = this.columns.filter(col => col.visible).map(col => col.name);
  private selection: SelectionModel<WaterChange> = new SelectionModel<WaterChange>(true, []);



  constructor(
    private _aquariumService: AquariumService
  ) { }

  ngOnInit() {
    this.loadWaterChanges();
  }
  loadWaterChanges() {
    this.loading = true;
    this._aquariumService.getWaterChangesByAquarium(this.aquarium.id).subscribe(waterChanges => {
      this.waterChanges = waterChanges;
      this.loading = false;
    },err => {
      console.error(err);
      this.loading = false;
    });
  }


  toggleSelection(row) {
    this.selection.toggle(row);
  }
  getSelectedItems() {
    return this.selection.selected;
  }
}
