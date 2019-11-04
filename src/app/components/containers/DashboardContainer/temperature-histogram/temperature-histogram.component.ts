import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-temperature-histogram',
  templateUrl: './temperature-histogram.component.html',
  styleUrls: ['./temperature-histogram.component.scss']
})
export class TemperatureHistogramComponent implements OnInit {

  chart = []; // This will hold our chart info

  
  constructor() { }

  ngOnInit() {
  }

}
