import { AfterViewInit, Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { GraphdetailsService } from '../../Services/graphdetails.service';

@Component({
  selector: 'app-highchart-avgtime',
  standalone: true,
  imports: [],
  templateUrl: './highchart-avgtime.component.html',
  styleUrl: './highchart-avgtime.component.css'
})
export class HighchartAVGTimeComponent implements AfterViewInit {

  constructor( private graphdetailsservices:GraphdetailsService) { }
  public GraphDetails: any;

  ngOnInit(): void {
    this.DetailsloadList();
   }
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
      credits: {
        enabled: false
      },
      series: [ 
      {
        data: [
          parseInt(this.GraphDetails?.AVG_IN_STORE?? 0),
          parseInt(this.GraphDetails?.AVG_DRIVE?? 0),
          parseInt(this.GraphDetails?.AVG_DELIVER?? 0),
          parseInt(this.GraphDetails?.DoorTime?? 0),
          parseInt(this.GraphDetails?.ReturnTime?? 0)
        ],
        color: '#CBC87B' // Setting the color here
      }]
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
          this.createChart(); // Update chart after data is received
        // }
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }
}