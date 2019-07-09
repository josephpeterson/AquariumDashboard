import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Aquarium } from 'src/app/models/Aquarium';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'select-aquarium-modal',
  templateUrl: './select-aquarium-modal.component.html',
  styleUrls: ['./select-aquarium-modal.component.scss']
})
export class SelectAquariumModalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SelectAquariumModalComponent>){}
  public aquariumName;
  public aquariumType;
  public aquariumDate = new FormControl(new Date());
  public aquariumSize;

  ngOnInit() {

  }

  makeSelection(aq: Aquarium) {
    this.dialogRef.close(aq);
  }
}