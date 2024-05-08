// highchart-dispatch.component.ts

import { Component, OnInit } from '@angular/core';
import { HighchartsService } from '../../Services/highcharts.service';
import { GraphdetailsService } from '../../Services/graphdetails.service';
//import { HighchartsService } from './highcharts.service';

@Component({
  selector: 'app-highchart-dispatch',
  standalone: true,
  imports: [],
  templateUrl: './highchart-dispatch.component.html',
  styleUrl: './highchart-dispatch.component.css'
})
export class HighchartDispatchComponent implements OnInit {

  constructor(private highchartsService: HighchartsService,  private graphdetailsservices:GraphdetailsService) { }
  public GraphDetails: any;
  
  ngOnInit(): void {
    this.DetailsloadList();
    this.highchartsService.init();
   }
  
   updateChartWithData() {
     if (!this.GraphDetails) return; // Make sure GraphDetails has been populated
     const totalOrders = this.GraphDetails.ALL_ORDERS;
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
          description: 'Dispatch'
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
          color: '#964B00', // Brown color
          data:[ 
            {
              y: parseInt(this.GraphDetails?.Single_Dispatch?? 0)/100,
              color: '#4CB5AE' // Brown color
            },
            {
              y: parseInt(this.GraphDetails?.Double_Dispatch?? 0)/100,
              color: '#4CB5AE' // Brown color
            },
            {
              y: parseInt(this.GraphDetails?.Triple_Dispatch?? 0)/100,
              color: '#4CB5AE' // Brown color
            },
            {
              y: parseInt(this.GraphDetails?.Triple_Plus_Dispatch?? 0)/100,
              color: '#4CB5AE' // Brown color
            },
            {
              y: parseInt(this.GraphDetails?.ManualDispatch?? 0)/100,
              color: '#4CB5AE' // Brown color
            }
          ]
        },

        {
          name: 'Percentage',
          type: 'column', // Specify type for column chart
          data: [
            {
              y: (this.GraphDetails.Single_Dispatch / totalOrders) * 100,
              color: '#79D769' // Yellow color
            },
            {
              y: (this.GraphDetails.Double_Dispatch / totalOrders) * 100,
              color: '#79D769' // Yellow color
            },
            {
              y: (this.GraphDetails.Triple_Dispatch / totalOrders) * 100,
              color: '#79D769' // Yellow color
            },
            {
              y: (this.GraphDetails.Triple_Plus_Dispatch / totalOrders) * 100,
              color: '#79D769' // Yellow color
            },
            {
              y: (this.GraphDetails.ManualDispatch / totalOrders) * 100,
              color: '#79D769' // Yellow color
            }
          ]
        }
      ]
    };
    this.highchartsService.createChart('dispatchcontainer', options);
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