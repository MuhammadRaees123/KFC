import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import HC_exportData from 'highcharts/modules/export-data';
import HC_accessibility from 'highcharts/modules/accessibility';

@Component({
  selector: 'app-highchart-speedservices',
  standalone: true,
  imports: [],
  templateUrl: './highchart-speedservices.component.html',
  styleUrl: './highchart-speedservices.component.css'
})
export class HighchartSpeedservicesComponent {

  constructor() { }

  ngOnInit(): void {
    HC_exporting(Highcharts);
    HC_exportData(Highcharts);
    HC_accessibility(Highcharts);

    // Highcharts.chart('container', {} as Highcharts.Options);
    Highcharts.chart('speedcontainer', {
      chart: {
        type: 'column'
      },
      title: {
        text: '',
        align: 'center'
      },
      // subtitle: {
      //   text:
      //     'Source: <a target="_blank" ' +
      //     'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>',
      //   align: 'left'
      // },
      xAxis: {
        categories: ['<20', '21-30', '31-40', '40+'],
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
          data: [406292, 260000, 107000, 68300]
        },
        // {
        //   name: 'Percentage',
        //   data: [51086, 136000, 5500, 141000, 107180]
        // }
      ]
    }as Highcharts.Options);

  }


}
