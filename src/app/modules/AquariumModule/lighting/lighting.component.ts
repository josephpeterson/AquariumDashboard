import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LEDElement } from 'src/app/models/LEDElement';
import { LightingConfiguration } from 'src/app/models/LightingConfiguration';
import { AquariumService } from 'src/app/services/aquarium.service';




var map = `\
04 03 02 01                                     25 26 27 28
05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24
48 47 46 45 44 43 42 41 40 39 38 37 36 35 34 33 32 31 30 29
49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68
84 83 72 81 80 79 78 77             76 75 74 73 72 71 70 69 
`.trim();

//To rows
var rows = [];
var r = map.split("\n");
var count = 0;
for(var i=0;i<r.length;i++)
{
  var row = r[i].replace(/\s\s\s/g," XX").split(" ");
  var d = [];
  for(var j=0;j<row.length;j++)
  {
    var id = row[j];
    var l = new LEDElement();
    if(id == "XX")
    {
      l.active = false;
      l.id = 0;
    }
    else
    {
      l.id = parseInt(id);
      l.active = true;
    }
    d.push(l);
  }
  rows[i] = d;
}

@Component({
  selector: 'lighting-page-component',
  templateUrl: './lighting.component.html',
  styleUrls: ['./lighting.component.scss']
})
export class LightingComponent implements OnInit {
 
  rows = rows

  constructor(public aquariumService: AquariumService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    console.log(this.rows);
  }

  sendUpdate()
  {
    //Get all the leds
    var leds = [];
    for(var i=0;i<this.rows.length;i++)
      this.rows[i].forEach(l => {
        if(!l.active)
          return;
          
        var color = hexToRgb(l.color);
        if(color)
        {
          l.r = color.r;
          l.g = color.g;
          l.b = color.b;
        }
        leds.push(l)
      });

      var config: LightingConfiguration = {
        ledData: leds
      }; 

      this.aquariumService.SendLightingConfiguration(config);


  }
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
}