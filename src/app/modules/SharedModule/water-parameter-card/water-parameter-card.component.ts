import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { take } from 'rxjs/operators';
import Chart from 'chart.js';

import { faCaretRight, faCaretLeft, faInfo, faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { CreateWaterParameterModalComponent } from '../modals/create-water-parameter-modal/create-water-parameter-modal.component';

@Component({
  selector: 'water-parameter-card',
  templateUrl: './water-parameter-card.component.html',
  styleUrls: ['./water-parameter-card.component.scss']
})
export class WaterParameterCard implements OnInit {

  public aquarium: Aquarium;
  public faCaretRight = faCaretRight;
  public faCaretLeft = faCaretLeft;
  public faInfo = faInfoCircle;
  public faPlus = faPlus;
  public expanded: boolean = false;
  public infoBox: boolean = false;
  public chart;

  @Input("label") public label;
  @Input("info") public info;
  @Input("yLabel") public yLabel;
  @Input("data") public data;
  @Input("chartColor") public chartColor;

  @Input() public addClicked;


  public alakinityValues = {

  }
  @ViewChild('alkalinityChart',{static: true}) canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartContainer',{static: true}) chartContainer: ElementRef<HTMLDivElement>;
  ctx: CanvasRenderingContext2D;


  constructor(public aquariumService: AquariumService,
    public dialog: MatDialog,
    public store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.select(getSelectedAquarium).pipe(take(1)).subscribe(aq => this.aquarium = aq);
    this.createGraph();
  }

  toggleExpansion() {
    this.expanded = !this.expanded;
    this.createGraph();

  }
  toggleInfoBox() {
    this.infoBox = !this.infoBox;
  }


  public createGraph() {
    if (this.chart)
      this.chart.destroy();

    this.chartContainer.nativeElement.style.width = (420 + (this.expanded ? 250 : 0)) + "px";
    this.chartContainer.nativeElement.style.height = "230px";
    this.canvas.nativeElement.width = this.canvas.nativeElement.offsetWidth;
    this.canvas.nativeElement.height = this.canvas.nativeElement.offsetHeight;



    if (this.data == null) {
      /*
      console.log(`Generating test data for graph ${this.label}`);
      this.data = [];
      for (var i = 0; i < 7; i++) {
        var date = new Date();
        date.setDate(date.getDate() - i);
        this.data.push({
          x: date,
          y: Math.floor(Math.random() * 150) / 10
        });
      }
      */
    }

    var labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var chartData = {
      labels: labels,
      datasets: [{
        label: this.yLabel,
        data: this.data,
        fill: true,
        borderColor: this.chartColor,
        tension: 0.1
      }]
    };
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'line',
      data: chartData,
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            type: 'time',
            distribution: 'series',
            time: {
              unit: 'day'
            }
          }],
          yAxes: [{
            ticks: {
              suggestedMin: 5,
            }
          }]
        }
      }
    });

  }
  ngOnChanges() {
    this.createGraph();
}
}
