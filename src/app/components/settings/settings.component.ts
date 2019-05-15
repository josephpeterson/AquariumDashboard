import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Aquarium } from 'src/app/models/Aquarium';
import { SettingsComponentData } from './settings.component.data';

@Component({
  selector: 'settings-page-component',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})


export class SettingsComponent implements OnInit {

  public date = new FormControl(new Date());
  public serializedDate = new FormControl((new Date()).toISOString());
  public aquarium$ = this.data.aquarium;
  @Input("aquariumName") aquariumName: string
  @Input("aquariumSize") aquariumSize: number

  constructor(public data: SettingsComponentData,public dialog: MatDialog) { }

  ngOnInit() {

  }

  saveChanges() {
    this.aquarium$.subscribe(aquarium => {
      var newAquarium:Aquarium = new Aquarium();
      Object.apply(newAquarium, {
        id: aquarium.id,
        date: this.date.value,
        gallons: this.aquariumSize,
        name: this.aquariumName
      });
      this.data.save(newAquarium);
    });
  }

  aquariumExport() {

  }
  aquariumDelete() {

  }
  snapshotManage() {

  }
  snapshotDeleteAll() {

  }
}

