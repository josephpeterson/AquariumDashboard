import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Options } from 'ng5-slider';
import { Substrate } from 'src/app/models/Substrate';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumPlan } from 'src/app/models/AquariumPlan';
import { Equipment } from 'src/app/models/Equipment';
import { AquariumService } from 'src/app/services/aquarium.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-aquarium',
  templateUrl: './create-aquarium.component.html',
  styleUrls: ['./create-aquarium.component.scss']
})
export class CreateAquariumComponent implements OnInit {

  public Substrate_Types = Substrate_Types;
  public Light_Types = Light_Types;
  public Equipment_Types = Equipment_Types;

  public disabled: boolean;
  public error: string;
  public date = new FormControl(new Date());
  public substrateOption = new FormControl();
  public lightOption = new FormControl();
  public equipmentOption = new FormControl();
  public equipmentProductOption = new FormControl();
  public equipmentProductSubBrand = new FormControl();

  public aquarium = new Aquarium();
  public substrate = new Substrate();
  public plan = new AquariumPlan();
  public equipment:Equipment[] = [];

  public salinity_options: Options = {
    floor: 0,
    ceil: 2,
    translate: (value: number): string => {
      switch(value){
        case 2: return "Saltwater";
        case 1: return "Brackish";
        default: return "Freshwater";
      }
    }
  };


  constructor(private aquariumService: AquariumService,
      private router: Router,
      private location: Location) { }

  ngOnInit() {
    this.aquarium.gallons = 0;
    this.aquarium.name = "";
    this.aquarium.waterSalinity = 0;
  }

  

  public clickAddEquipment() {
    if(this.equipmentOption.value) {
      var e = new Equipment();
      e.type = this.equipmentOption.value;
      e.productBrand = this.equipmentProductOption.value;
      e.subBrand = this.equipmentProductSubBrand.value;
      this.equipment = this.equipment.concat([e]);

      this.equipmentOption.setValue("");
      this.equipmentProductOption.setValue("");
      this.equipmentProductSubBrand.setValue("");
    }
  }

  public clickBack() {
    this.location.back();
  }
  public clickSubmit() {
    this.aquarium.startDate = this.date.value;
    
    if(this.substrateOption.value) {
      this.substrate.type = this.substrateOption.value;
      this.aquarium.substrate = this.substrate;  
    }
    else
      this.aquarium.substrate = new Substrate();

    this.aquarium.plan = this.plan;

    //Add light to equipment
    var equipment = this.equipment.concat([]);
    if(this.lightOption.value)
    {
      var light = new Equipment();
      light.productBrand = this.lightOption.value;
      light.type = "Light";
      equipment = this.equipment.concat([light]);
    }

    this.aquarium.equipment = equipment;
    console.log(this.aquarium);


    this.disable();
    delete this.error;
    this.aquariumService.createAquarium(this.aquarium).subscribe(res => {
      this.router.navigate(["aquarium",res.id]);
    },(err:HttpErrorResponse) => {
      console.log(err);
      this.error = err.error ? err.error:err.message;
      this.enable();
    });
  }
  private disable() {
    this.disabled = true;
    this.substrateOption.disable();
    this.lightOption.disable();
    this.equipmentOption.disable();
    this.equipmentProductOption.disable();
    this.equipmentProductSubBrand.disable();
  }
  private enable() {
    this.disabled = false;
    this.substrateOption.enable();
    this.lightOption.enable();
    this.equipmentOption.enable();
    this.equipmentProductOption.enable();
    this.equipmentProductSubBrand.enable();
  }

}



const Substrate_Types = [
  "Sand",
  "Dirt",
  "Gravel",
]
const Light_Types = [
  "Orbit Marine Aquarium LED Light",
  "Finnex Planted+ 24/7",
  "Satellite Freshwater LED Plus",
  "Finnex FugeRay Planted+",
  "Galaxyhydro Led 55x3w Dimmable 165w ",
  "Aquatic Life LED Aquarium Light",
  "Lightimetunnel 165W Aquarium LED Light",
  "VIPARSPECTRA Timer Control 165W",
  "Beamswork LED 1W HI Lumen Aquarium Light Marine",
  "NICREW LED Aquarium Light",
  "Fluval Bluetooth Freshwater Light LED",
  "Honpal LED Aquarium Light",
]
const Equipment_Types = [
  "Wavemaker",
  "Atomic Diffuser",
  "Inline Diffuser",
  "Heater",
]