import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { AquariumService } from 'src/app/services/aquarium.service';


@Component({
  selector: 'temperature-histogram',
  templateUrl: './temperature-histogram.component.html',
  styleUrls: ['./temperature-histogram.component.scss']
})
export class TemperatureHistogramComponent implements OnInit {

  chartConfig = {
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'month'
        }
      }]
    }
  }; // This will hold our chart info
  public chartData: any = {
    //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //datasets: []
  }
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  chart: Chart;


  constructor(public aquariumService: AquariumService,
    public notifier: NotificationService) { }


  createChart() {
    return this.chart = new Chart(this.ctx, {
      type: 'line',
      data: [{
        x: new Date(),
        y: 1
      }, {
        t: new Date(),
        y: 10
      }],
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            distribution: 'series',
            time: {
              unit: 'month'
            }
          }],
          yAxes: [{
            ticks: {
              suggestedMin: 50,
              suggestedMax: 100
            }
          }]
        }
      }
    });
  }
  populateChart() {
    this.aquariumService.getTemperatureHistogramAll().subscribe(data => {
      //console.log(data);
      //this.chartData.labels = data.map(aq => aq.name);

      this.chartData = {};
      this.chartData.data = [];
      data.forEach(aq => {
        this.chartData.data = this.chartData.data.concat(aq.snapshots.map(s => {
          return {
            x: new Date(s.date),
            y: s.temperature
          }
        }))
      });

      this.chartData.data = [{
        x: new Date(),
        y: 1
      }, {
        t: new Date(),
        y: 10
      }]

      console.log(this.chartConfig);

      this.chart = new Chart(this.ctx, {
        type: 'line',
        data: {
          datasets:
            data.map((aq, i) => {

              var color = "black";
              switch (i) {
                case 0:
                  color = "red";
                  break;
                case 1:
                  color = "blue";
                  break;
                case 2:
                  color = "green";
                  break;
              }
              return {
                label: aq.name,
                fill: false,
                borderColor: color,

                data: aq.snapshots.map(s => {
                  return {
                    x: s.date,
                    y: s.temperature
                  }
                })
              }
            })

        },
        options: {
          scales: {
            xAxes: [{
              type: 'time',
              distribution: 'series',
              time: {
                unit: 'month'
              }
            }],
            yAxes: [{
              ticks: {
                suggestedMin: 50,
                suggestedMax: 100
              }
            }]
          }
        }
      });

    }, err => {
      this.notifier.notify("error", "Could not load temp information");
    });

  }


  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.populateChart();
  }

}
