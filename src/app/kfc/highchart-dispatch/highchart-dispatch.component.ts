// highchart-dispatch.component.ts

import { Component, OnInit } from '@angular/core';
import { HighchartsService } from '../../Services/highcharts.service';
//import { HighchartsService } from './highcharts.service';

@Component({
  selector: 'app-highchart-dispatch',
  standalone: true,
  imports: [],
  templateUrl: './highchart-dispatch.component.html',
  styleUrl: './highchart-dispatch.component.css'
})
export class HighchartDispatchComponent implements OnInit {

  constructor(private highchartsService: HighchartsService) { }

  ngOnInit(): void {
    this.highchartsService.init();

    const options: Highcharts.Options = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Dispatch',
        align: 'center'
      },
      xAxis: {
        categories: ['Single Dispatch', 'Double Dispatch', 'Triple Dispatch', '3+ Dispatch', 'Manual Dispatch'],
        crosshair: true,
        accessibility: {
          description: 'Countries'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Values'
        }
      },
      tooltip: {
        valueSuffix: ' (1000 MT)'
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [
        {
          name: 'Order Count',
          type: 'column', // Specify type for column chart
          data: [406292, 260000, 107000, 68300, 27500]
        },
        {
          name: 'Percentage',
          type: 'column', // Specify type for column chart
          data: [51086, 136000, 5500, 141000, 107180]
        }
      ]
    };

    this.highchartsService.createChart('dispatchcontainer', options);
  }
}