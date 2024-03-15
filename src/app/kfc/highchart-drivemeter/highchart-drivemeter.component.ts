import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import 'highcharts/highcharts-more'; // Import Highcharts-more module if needed
import HighchartsMore from 'highcharts/highcharts-more'; // Import Highcharts More module

@Component({
  selector: 'app-highchart-drivemeter',
  standalone: true,
  imports: [],
  templateUrl: './highchart-drivemeter.component.html',
  styleUrl: './highchart-drivemeter.component.css'
})
export class HighchartDrivemeterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.initChart();
  }

  initChart(): void {
    HighchartsMore(Highcharts); // Initialize Highcharts More module

    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'gauge',
        plotBorderWidth: 0,
        plotShadow: false
      },
      credits: {
        enabled: false
      },
      title: {
        text: ''
      },
      pane: {
        startAngle: -150,
        endAngle: 150
      },
      yAxis: [{
        min: 0,
        max: 200,
        lineColor: '#339',
        tickColor: '#339',
        minorTickColor: '#339',
        offset: -25,
        lineWidth: 2,
        labels: {
          distance: -20,
        },
        tickLength: 5,
        minorTickLength: 5,
        endOnTick: false
      }, {
        min: 0,
        max: 124,
        tickPosition: 'outside',
        lineColor: '#933',
        lineWidth: 2,
        minorTickPosition: 'outside',
        tickColor: '#933',
        minorTickColor: '#933',
        tickLength: 5,
        minorTickLength: 5,
        labels: {
          distance: 12,
        },
        offset: -20,
        endOnTick: false
      }],
      series: [{
        type: 'gauge',
        name: 'Speed',
        data: [80],
        dataLabels: {
          formatter: function () {
            var kmh = this.y;
            if (kmh !== null && kmh !== undefined) {
              var mph = Math.round(kmh * 0.621);
              return '<span style="color:#339">' +
                kmh + ' km/h</span><br/>' +
                '<span style="color:#933">' + mph + ' mph</span>';
            } else {
              return ''; // or any other default value or error handling
            }
          },
          backgroundColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, '#DDD'],
              [1, '#FFF']
            ]
          }
        },
        tooltip: {
          valueSuffix: ' km/h'
        }
      }]
    };

    const chartFunction = (chart: Highcharts.Chart): void => {
      setInterval(() => {
        const point = chart.series[0].points[0];
        if (point.y !== undefined){
          const inc = Math.round((Math.random() - 0.5) * 20);
        let newVal = point.y + inc;
        if (newVal < 0 || newVal > 200) {
          newVal = point.y - inc;
        }
        point.update(newVal);
      }
      }, 3000);
    };

    Highcharts.chart('drivemetercontainer', chartOptions, chartFunction);
  }
}
