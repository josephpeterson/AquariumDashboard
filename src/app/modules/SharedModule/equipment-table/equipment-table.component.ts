import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'equipment-table',
  templateUrl: './equipment-table.component.html',
  styleUrls: ['./equipment-table.component.scss']
})
export class EquipmentTableComponent implements OnInit {
  displayedColumns: string[] = ['type', 'productBrand', 'subBrand'];
  
  @Input("equipment") dataSource;

  constructor() { }

  ngOnInit() {
  }

}
