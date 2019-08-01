import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ConnectionError } from 'src/app/models/ConnectionError';
import { Species } from 'src/app/models/Species';

@Component({
  selector: 'manage-species-modal',
  templateUrl: './manage-species-modal.component.html',
  styleUrls: ['./manage-species-modal.component.scss']
})
export class ManageSpeciesModalComponent implements OnInit {

  public selectedSpeciesId;
  public addingSpecies;

  constructor() { }
  ngOnInit() {
  }

  clickSpecies(species: Species) {
    this.selectedSpeciesId = species.id;
  }
  clickNewSpecies() {
    this.selectedSpeciesId = undefined;
    this.addingSpecies = true;
  }
  clickBack() {
    this.selectedSpeciesId = undefined;
    this.addingSpecies = false;
  }
}