import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-create-aquarium',
  templateUrl: './create-aquarium.component.html',
  styleUrls: ['./create-aquarium.component.scss']
})
export class CreateAquariumComponent implements OnInit {

  public Substrate_Types = Substrate_Types;
  public Light_Types = Light_Types;

  public date = new FormControl(new Date());
  public lightOption = new FormControl();

  public salinity: number = 0;
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


  constructor() { }

  ngOnInit() {
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