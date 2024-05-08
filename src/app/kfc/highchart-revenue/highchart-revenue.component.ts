import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import HC_exportData from 'highcharts/modules/export-data';
import HC_accessibility from 'highcharts/modules/accessibility';
import { GraphdetailsService } from '../../Services/graphdetails.service';

//3
interface OrderChannel {
  PAYMENT: number;
  PAYMENTMODE: string;
}

@Component({
  selector: 'app-highchart-revenue',
  standalone: true,
  imports: [],
  templateUrl: './highchart-revenue.component.html',
  styleUrl: './highchart-revenue.component.css'
})
export class HighchartRevenueComponent implements OnInit {

  constructor(private graphdetailsservices:GraphdetailsService) { }
  // 2
  public RevenueGraphDetails: any;
  public HighchartDetails: any;

ngOnInit(): void {
  this.DetailsloadList();
  HC_exporting(Highcharts);
  HC_exportData(Highcharts);
  HC_accessibility(Highcharts);
}

// 1
  RevenueChartWithData() {
    const chartData = this.RevenueGraphDetails.map((item: OrderChannel) => {
      const percentage = ((item.PAYMENT / this.HighchartDetails.TOTAL_AMOUNT) * 100).toFixed(2);
      return {
        name: `${item.PAYMENTMODE} <br> Revenue:${item.PAYMENT} <br> Percentage:${percentage}%`,
        y: item.PAYMENT
      };
    });
  
    Highcharts.chart('revenuecontainer', {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Source',
        align: 'center'
      },
      tooltip: {
        pointFormat: '{series.name}: {point.y}'
      },
      series: [
        {
          name: 'Order Status',
          data: chartData
        }
      ]
    } as Highcharts.Options);
  }
  
  
  //fetching graph data from API
  DetailsloadList() {
    const body = {
      BranchId: 0,
      AreaCoachId: 0,
      ConsiderArea: 1,
      Criteria: 4,
      //EndTime: '2024-4-15',
      EndTimeInString: '9:59:00 AM',
      ToDateInString: '4/15/2024',
      RegionId: 0,
      //StartTime: '2024-4-14',
      StartTimeInString: '10:00 AM',
      FromDateInString: '4/14/2024',
      UserName: 'farhanh'
    };
  
    this.graphdetailsservices.GetGraphDetails(body).subscribe(
      response => {
        console.log('Response:', response);
        this.HighchartDetails = response;
        // if (response && response.length > 0) {
          console.log('Revenue pai Data Recevied:', response['PaymentMethods']);
          this.RevenueGraphDetails = response['PaymentMethods'];
          console.log('Revenue pai Data Recevied', this.RevenueGraphDetails)
          this.RevenueChartWithData(); // Update chart after data is received
        // }
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }
  }

// constructor() { }

// ngOnInit(): void {
//   HC_exporting(Highcharts);
//   HC_exportData(Highcharts);
//   HC_accessibility(Highcharts);

//   Highcharts.chart('revenuecontainer', {
//     chart: {
//       type: 'pie'
//     },
//     title: {
//       text: 'Revenue',
//       align: 'center'
//     },
//     tooltip: {
//       pointFormat: '{series.name}: {point.y}'
//     },
//     series: [
//       {
//         name: 'Order Status',
//         data: [
//           { name: 'Credit <br> Revenue <br>Percentage', y: 96292 },
//           //{ name: 'Canceled', y: 60000 },
//           { name: 'Cash <br> Revenue <br> Percentage', y: 17000 },
//           //{ name: 'Under Process', y: 8300 },
//           { name: 'Online <br> Revenue <br> Percentage', y: 7500 }
//         ]
//       }
//     ]
//   } as Highcharts.Options);
// }
// }

//************************************************************************************************ */

//   constructor() { }

//   ngOnInit(): void {
//     HC_exporting(Highcharts);
//     HC_exportData(Highcharts);
//     HC_accessibility(Highcharts);

//     // Highcharts.chart('container', {} as Highcharts.Options);
//     Highcharts.chart('revenuecontainer', {
//       chart: {
//         type: 'pie'
//       },
//       title: {
//         text: 'Revenue',
//         align: 'center'
//       },
//       // subtitle: {
//       //   text:
//       //     'Source: <a target="_blank" ' +
//       //     'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>',
//       //   align: 'left'
//       // },
//       xAxis: {
//         categories: ['All', 'Canceled', 'Dispatched', 'Under Process', 'Delivered'],
//         crosshair: true,
//         accessibility: {
//           description: 'Orders'
//         }
//       },
//       yAxis: {
//         min: 0,
//         title: {
//           text: 'Values'
//         }
//       },
//       tooltip: {
//         valueSuffix: ' (1000 MT)'
//       },
//       plotOptions: {
//         column: {
//           pointPadding: 0.2,
//           borderWidth: 0
//         }
//       },
//       series: [
//         {
//           name: 'Order Count',
//           data: [16292, 60000, 17000, 8300, 7500]
//         }
//         // {
//         //   name: 'Percentage',
//         //   data: [51086, 136000, 5500, 141000, 107180]
//         // }
//       ]
//     }as Highcharts.Options);

//   }

// }
