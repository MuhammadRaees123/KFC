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
    //alert(this.GraphDetails)
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
          data:[ 
            //51086, 46000, 5500, 33000, 27180
            parseInt(this.GraphDetails?.Single_Dispatch?? 0),
            parseInt(this.GraphDetails?.Double_Dispatch?? 0),
            parseInt(this.GraphDetails?.Triple_Dispatch?? 0),
            parseInt(this.GraphDetails?.Triple_Plus_Dispatch?? 0),
            parseInt(this.GraphDetails?.ManualDispatch?? 0)
          ]

        },
        {
          name: 'Percentage',
          type: 'column', // Specify type for column chart
          data: [
            //40086, 44000, 5500, 31000, 17180,
            (this.GraphDetails.Single_Dispatch / totalOrders) * 100,
            (this.GraphDetails.Double_Dispatch / totalOrders) * 100,
            (this.GraphDetails.Triple_Dispatch / totalOrders) * 100,
            (this.GraphDetails.Triple_Plus_Dispatch / totalOrders) * 100,
            (this.GraphDetails.ManualDispatch / totalOrders) * 100
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