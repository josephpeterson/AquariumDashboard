import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AquariumService } from 'src/app/services/aquarium.service';

@Component({
  selector: 'run-ato-modal',
  templateUrl: './run-ato-modal.component.html',
  styleUrls: ['./run-ato-modal.component.scss']
})
export class RunATOModalComponent implements OnInit {

  public runtime: number;
  constructor(@Inject(MAT_DIALOG_DATA) private data,
    private _self: MatDialogRef<RunATOModalComponent>,
    private _aquariumService: AquariumService) {
  }
  ngOnInit() {
  }
}
