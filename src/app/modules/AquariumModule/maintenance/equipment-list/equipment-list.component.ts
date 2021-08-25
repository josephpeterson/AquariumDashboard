import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss']
})
export class EquipmentListComponent {


  constructor(private store: Store<AppState>,
    private dialog: MatDialog) {

  }
}