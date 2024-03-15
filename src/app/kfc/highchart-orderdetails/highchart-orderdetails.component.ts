import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import HC_exportData from 'highcharts/modules/export-data';
import HC_accessibility from 'highcharts/modules/accessibility';

@Component({
  selector: 'app-highchart-orderdetails',
  standalone: true,
  imports: [],
  templateUrl: './highchart-orderdetails.component.html',
  styleUrl: './highchart-orderdetails.component.css'
})
export class HighchartOrderdetailsComponent {

  constructor() { }

  ngOnInit(): void {
    HC_exporting(Highcharts);
    HC_exportData(Highcharts);
    HC_accessibility(Highcharts);

    // Highcharts.chart('container', {} as Highcharts.Options);
    Highcharts.chart('ordercontainer', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Order Details',
        align: 'center'
      },
      // subtitle: {
      //   text:
      //     'Source: <a target="_blank" ' +
      //     'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>',
      //   align: 'left'
      // },
      xAxis: {
        categories: ['All', 'Canceled', 'Dispatched', 'Under Process', 'Delivered'],
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
          data: [406292, 260000, 107000, 68300, 27500]
        },
        {
          name: 'Percentage',
          data: [51086, 136000, 5500, 141000, 107180]
        }
      ]
    }as Highcharts.Options);

  }

}
