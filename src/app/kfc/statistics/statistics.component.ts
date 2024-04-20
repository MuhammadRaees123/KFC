import { Component, OnInit } from '@angular/core';
import { SidebaarComponent } from '../sidebaar/sidebaar.component';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import HC_exportData from 'highcharts/modules/export-data';
import HC_accessibility from 'highcharts/modules/accessibility';
import { HighchartOrderdetailsComponent } from '../highchart-orderdetails/highchart-orderdetails.component';
import { HighchartSpeedservicesComponent } from '../highchart-speedservices/highchart-speedservices.component';
import { HighchartDrivetimeComponent } from '../highchart-drivetime/highchart-drivetime.component';
import { HighchartStoretimeComponent } from '../highchart-storetime/highchart-storetime.component';
import { HighchartDispatchComponent } from '../highchart-dispatch/highchart-dispatch.component';
import { HighchartRevenueComponent } from '../highchart-revenue/highchart-revenue.component';
import { HighchartSourceComponent } from '../highchart-source/highchart-source.component';
import { StatisticsHeaderComponent } from '../../header/statistics-header/statistics-header.component';
import { HighchartAVGTimeComponent } from '../highchart-avgtime/highchart-avgtime.component';
import { HighchartStoremeterComponent } from '../highchart-storemeter/highchart-storemeter.component';
import { HighchartDrivemeterComponent } from '../highchart-drivemeter/highchart-drivemeter.component';
import { HighchartDelivertimeComponent } from '../highchart-delivertime/highchart-delivertime.component';
import { HighchartTimedeliverComponent } from '../highchart-timedeliver/highchart-timedeliver.component';
import { GraphdetailsService } from '../../Services/graphdetails.service';


@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [SidebaarComponent,StatisticsHeaderComponent,HighchartStoretimeComponent,HighchartOrderdetailsComponent,
    HighchartSpeedservicesComponent,HighchartDrivetimeComponent,HighchartDispatchComponent,HighchartRevenueComponent,
    HighchartSourceComponent,HighchartAVGTimeComponent,HighchartStoremeterComponent,HighchartDrivemeterComponent,HighchartDelivertimeComponent,
    HighchartTimedeliverComponent
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit  {

  // * * * * * * * *  Start Order Details High Charts  * * * * * * * * //
  public GraphDetails: any;
  constructor(private graphdetailsservices:GraphdetailsService) {}

  ngOnInit() {
    this.DetailsloadList();
    HC_exporting(Highcharts);
    HC_exportData(Highcharts);
    HC_accessibility(Highcharts);

    // Highcharts.chart('container', {} as Highcharts.Options);
    Highcharts.chart('container', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Dispatch',
        align: 'center'
      },
      // subtitle: {
      //   text:
      //     'Source: <a target="_blank" ' +
      //     'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>',
      //   align: 'left'
      // },
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
          data: [406292, 260000, 107000, 68300, 27500]
        },
        {
          name: 'Percentage',
          data: [51086, 136000, 5500, 141000, 107180]
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
          //if (response && response.length > 0) {
            console.log('Data received:', response);
            this.GraphDetails = response;
          //}
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
    }
    

}
