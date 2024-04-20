import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import HC_exportData from 'highcharts/modules/export-data';
import HC_accessibility from 'highcharts/modules/accessibility';
import { GraphdetailsService } from '../../Services/graphdetails.service';

@Component({
  selector: 'app-highchart-speedservices',
  standalone: true,
  imports: [],
  templateUrl: './highchart-speedservices.component.html',
  styleUrl: './highchart-speedservices.component.css'
})
export class HighchartSpeedservicesComponent {

  constructor(private graphdetailsservices:GraphdetailsService) { }
  public GraphDetails: any;

  ngOnInit(): void {
    this.DetailsloadList();
    HC_exporting(Highcharts);
    HC_exportData(Highcharts);
    HC_accessibility(Highcharts);
  }
    
  updateChartWithData() {
    //alert(this.GraphDetails)
     if (!this.GraphDetails) return; // Make sure GraphDetails has been populated
     const speedless20 = this.GraphDetails.SERVICE_SPEED_TIME_LESS_5 + this.GraphDetails.SERVICE_SPEED_TIME_5_10 + this.GraphDetails.SERVICE_SPEED_TIME_10_20 ;
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
          data: [
            //406292, 260000, 107000, 68300
            parseInt(speedless20?? 0),
            parseInt(this.GraphDetails?.SERVICE_SPEED_TIME_20_30?? 0),
            parseInt(this.GraphDetails?.SERVICE_SPEED_TIME_30_40?? 0),
            parseInt(this.GraphDetails?.SERVICE_SPEED_TIME_GREATER_40?? 0)
          ]
        },
        // {
        //   name: 'Percentage',
        //   data: [51086, 136000, 5500, 141000, 107180]
        // }
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
