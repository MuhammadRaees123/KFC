import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import HC_exportData from 'highcharts/modules/export-data';
import HC_accessibility from 'highcharts/modules/accessibility';
import { GraphdetailsService } from '../../Services/graphdetails.service';

@Component({
  selector: 'app-highchart-orderdetails',
  standalone: true,
  imports: [],
  templateUrl: './highchart-orderdetails.component.html',
  styleUrl: './highchart-orderdetails.component.css'
})
export class HighchartOrderdetailsComponent {

  constructor(private graphdetailsservices:GraphdetailsService) { }
  public GraphDetails: any;

  ngOnInit(): void {
    this.DetailsloadList();
    HC_exporting(Highcharts);
    HC_exportData(Highcharts);
    HC_accessibility(Highcharts);
  }

  updateChartWithData() {
     if (!this.GraphDetails) return; // Make sure GraphDetails has been populated
     const totalOrders = this.GraphDetails.ALL_ORDERS;
    Highcharts.chart('ordercontainer', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Order Details',
        align: 'center'
      },
      
      xAxis: {
        categories: ['All', 'Canceled', 'Dispatched', 'Under Process', 'Delivered'],
        crosshair: true,
        accessibility: {
          description: 'Order Details'
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
          borderWidth: 0,
          colorByPoint: true, // Set color by point
        }
      },
      series: [
        {
          name: 'Order Count',
          type: 'column', // Specify type for column chart
          color: '#964B00', // column color
          data: [
            {
              y: parseInt(this.GraphDetails?.ALL_ORDERS?? 0),
              color: '#4CB5AE' // column color
            },
            {
              y: parseInt(this.GraphDetails?.TOTAL_CANCELED?? 0),
              color: '#4CB5AE' // column color
            },
            {
              y: parseInt(this.GraphDetails?.TotalDispatched?? 0),
              color: '#4CB5AE' // column color
            },
            {
              y: parseInt(this.GraphDetails?.TOTAL_INPROCESS?? 0),
              color: '#4CB5AE' // column color
            },
            {
              y: parseInt(this.GraphDetails?.TOTAL_DELIVERED?? 0),
              color: '#4CB5AE' // column color
            }
          ]
        },
        {
          name: 'Percentage',
          type: 'column', // Specify type for column chart
          data: [
            {
              y: (this.GraphDetails.ALL_ORDERS / totalOrders) * 100,
              color: '#79D769' // Column color
            },
            {
              y: (this.GraphDetails.TOTAL_CANCELED / totalOrders) * 100,
              color: '#79D769' // Column color
            },
            {
              y: (this.GraphDetails.TotalDispatched / totalOrders) * 100,
              color: '#79D769' // Column color
            },
            {
              y: (this.GraphDetails.TOTAL_INPROCESS / totalOrders) * 100,
              color: '#79D769' // Column color
            },
            {
              y: (this.GraphDetails.TOTAL_DELIVERED / totalOrders) * 100,
              color: '#79D769' // Column color
            },
          ]
        }
      ]
    }as Highcharts.Options);
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
        // if (response && response.length > 0) {
          console.log('Data received:', response);
          this.GraphDetails = response;
          console.log('Graphdetails Data', this.GraphDetails)
          this.updateChartWithData(); // Update chart after data is received
        // }
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

}
