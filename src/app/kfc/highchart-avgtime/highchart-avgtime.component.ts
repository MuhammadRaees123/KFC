import { AfterViewInit, Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-highchart-avgtime',
  standalone: true,
  imports: [],
  templateUrl: './highchart-avgtime.component.html',
  styleUrl: './highchart-avgtime.component.css'
})
export class HighchartAVGTimeComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart(): void {
    Highcharts.chart('container', {
      chart: {
        type: 'bar'
      },
      title: {
        text: '',
        align: 'left'
      },
      // subtitle: {
      //   text: 'Source: <a href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population" target="_blank">Wikipedia.org</a>',
      //   align: 'left'
      // },
      xAxis: {
        categories: ['In Store Time', 'Drive Time', 'SOS', 'Door Time', 'Return Time'],
        title: {
          text: null
        },
        gridLineWidth: 1,
        lineWidth: 0
      },
      yAxis: {
        min: 0,
        // title: {
        //   text: 'Population (millions)',
        //   align: 'high'
        // },
        labels: {
          overflow: 'justify'
        },
        gridLineWidth: 0
      },
      tooltip: {
        valueSuffix: ' millions'
      },
      plotOptions: {
        bar: {
          borderRadius: '20%',
          dataLabels: {
            enabled: true
          },
          groupPadding: 0.3
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
          Highcharts.defaultOptions.legend?.backgroundColor || '#FFFFFF',
        shadow: true
      },
      credits: {
        enabled: false
      },
      series: [
      //   {
      //   name: 'Year 1990',
      //   data: [631, 727, 3202, 721]
      // },
      //  {
      //   name: 'Year 2000',
      //   data: [814, 841, 3714, 726]
      // }, 
      {
        name: 'Year 2018',
        data: [1276, 1007, 4561, 746, 4561]
      }]
    }as Highcharts.Options);
  }
}