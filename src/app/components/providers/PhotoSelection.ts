import { Component, OnInit, Input } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { take } from 'rxjs/operators';
import { AquariumPhoto } from 'src/app/models/AquariumPhoto';
import { PaginationSliver } from 'src/app/models/PaginationSliver';
import { PhotoExpandedModalComponent } from 'src/app/components/shared/modals/photo-expanded-modal/photo-expanded-modal.component';
import { PhotoContent } from 'src/app/models/PhotoContent';
import { NotifierService } from 'angular-notifier';
import { HttpErrorResponse } from '@angular/common/http';
import { PhotoTimelapseOptions } from 'src/app/models/PhotoTimelapseOptions';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { FishPhoto } from 'src/app/models/FishPhoto';

export class PhotoSelection  {

  public selection: any[] = [];
  public selecting: boolean = false;

  constructor() { }
  public toggleSelection(photo: any) {
    console.log("wat");
    this.setSelected(photo, !this.isSelected(photo));
  }
  public setSelected(photo: any, selected: boolean) {

    if (!selected && this.isSelected(photo))
      this.selection.splice(this.selection.indexOf(photo), 1);
    else if (selected)
      this.selection.push(photo);
  }
  public isSelected(photo: any) {
    return this.selection.indexOf(photo) != -1;
  }
  public toggleSelecting() {
    this.selecting = !this.selecting;
    if (!this.selecting)
      this.clearSelection();
  }
  public clearSelection() {
    this.selection = [];
  }
}