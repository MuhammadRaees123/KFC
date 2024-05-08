import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import HC_exportData from 'highcharts/modules/export-data';
import HC_accessibility from 'highcharts/modules/accessibility';
import { GraphdetailsService } from '../../Services/graphdetails.service';

@Component({
  selector: 'app-highchart-drivetime',
  standalone: true,
  imports: [],
  templateUrl: './highchart-drivetime.component.html',
  styleUrl: './highchart-drivetime.component.css'
})
export class HighchartDrivetimeComponent {

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
    Highcharts.chart('drivecontainer', {
      chart: {
        type: 'column'
      },
      title: {
        text: '',
        align: 'center'
      },
      
      xAxis: {
        categories: ['<8', '8-12', '13-20', '20+'],
        crosshair: true,
        accessibility: {
          description: 'Drive Time'
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
          data: [
            {
              y: parseInt(this.GraphDetails?.DRIVE_TIME_LESS_5?? 0),
              color: '#4CB5AE' // Brown color
            },
            {
              y: parseInt(this.GraphDetails?.DRIVE_TIME_5_10?? 0),
              color: '#4CB5AE' // Brown color
            },
            {
              y: parseInt(this.GraphDetails?.DRIVE_TIME_10_20?? 0),
              color: '#4CB5AE' // Brown color
            },
            {
              y: parseInt(this.GraphDetails?.DRIVE_TIME_20_30?? 0),
              color: '#4CB5AE' // Brown color
            },
           ]
        },
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
