import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CreateAquariumModalComponentData } from './create-aquarium-model.component.data';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { ConnectionError } from 'src/app/models/ConnectionError';
import { Aquarium } from 'src/app/models/Aquarium';

@Component({
  selector: 'create-aquarium-modal',
  templateUrl: './create-aquarium-modal.component.html',
  styleUrls: ['./create-aquarium-modal.component.scss']
})
export class CreateAquariumModelComponent implements OnInit {

  constructor(public data:CreateAquariumModalComponentData,
    public dialogRef: MatDialogRef<CreateAquariumModelComponent>){
    dialogRef.disableClose = true;
    this.data.reset();
  }
  
  public error: ConnectionError;

  public loading = this.data.loading;
  public createError:Observable<HttpErrorResponse> = this.data.createError;
  public connectionError = this.data.connectionError;

  public aquariumName;
  public aquariumType;
  public aquariumDate = new FormControl(new Date());
  public aquariumSize;

  ngOnInit() {
    this.data.wasCreated.subscribe(success => {
      if(success)
        this.dialogRef.close();
    });
  }

  createAquarium() {
    var aq:Aquarium = new Aquarium();
    aq.name = this.aquariumName;
    aq.startDate = this.aquariumDate.value;
    aq.gallons = this.aquariumSize;
    aq.type = this.aquariumType;
    this.data.create(aq); 
  }
}