import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import 'highcharts/highcharts-more'; // Import Highcharts-more module if needed
import HighchartsMore from 'highcharts/highcharts-more'; // Import Highcharts More module
import { GraphdetailsService } from '../../Services/graphdetails.service';

@Component({
  selector: 'app-highchart-drivemeter',
  standalone: true,
  imports: [],
  templateUrl: './highchart-drivemeter.component.html',
  styleUrl: './highchart-drivemeter.component.css'
})
export class HighchartDrivemeterComponent implements OnInit {

  constructor(private graphdetailsservices:GraphdetailsService) { }
  public GraphDetails: any;

  ngOnInit(): void {
    this.DetailsloadList();
  }

  initChart(percentageInStoreLess7: number): void {
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
      yAxis: [
         {
        min: 0,
        max: 100,
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
        name: 'Percentage',
        data: [percentageInStoreLess7],
        dataLabels: {
          formatter: function () {
            var kmh = this.y;
            if (typeof kmh === 'number') {
              var percentage = Math.round(kmh); // Round the percentage to an integer
              return '<span style="color:#339">' + percentage + '%</span><br/>';
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
          valueSuffix: '%'
        }
      }]
    };
    
    Highcharts.chart('drivemetercontainer', chartOptions);
  }

   //fetching graph data from API
   DetailsloadList() {
    const body = {
      BranchId: 0,
      AreaCoachId: 0,
      ConsiderArea: 1,
      Criteria: 4,
      EndTimeInString: '9:59:00 AM',
      ToDateInString: '4/15/2024',
      RegionId: 0,
      StartTimeInString: '10:00 AM',
      FromDateInString: '4/14/2024',
      UserName: 'farhanh'
    };
    this.graphdetailsservices.GetGraphDetails(body).subscribe(
      response => {
        console.log('Response:', response);
        if (response && response.DRIVE_TIME_LESS_10 !== undefined) {
          console.log('Data received:', response);
          this.GraphDetails = response;
          console.log('Graphdetails Data', this.GraphDetails);
          const percentageInStoreLess7 = (response.DRIVE_TIME_LESS_10 / response.ALL_ORDERS) * 100;
          console.log('Percentage Data in store time', percentageInStoreLess7);
          this.initChart(percentageInStoreLess7); // Pass the value to initChart// percentageInStoreLess7
        }
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

}
