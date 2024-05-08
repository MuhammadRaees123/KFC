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
import { HighchartsService } from '../../Services/highcharts.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../Services/filter.service';
import 'highcharts/highcharts-more'; // Import Highcharts-more module if needed
import HighchartsMore from 'highcharts/highcharts-more'; // Import Highcharts More module
import { UserComponent } from '../user/user.component';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

interface OrderChannel {
  Payment: number;
  Source: string;
  OrderCount: number;
  PAYMENT: number;
  PAYMENTMODE: string;
}

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [SidebaarComponent,StatisticsHeaderComponent,HighchartStoretimeComponent,HighchartOrderdetailsComponent,
    HighchartSpeedservicesComponent,HighchartDrivetimeComponent,HighchartDispatchComponent,HighchartRevenueComponent,
    HighchartSourceComponent,HighchartAVGTimeComponent,HighchartStoremeterComponent,HighchartDrivemeterComponent,HighchartDelivertimeComponent,
    HighchartTimedeliverComponent,CommonModule,FormsModule,UserComponent
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit  {

  //  Method For Auto Refresh
  alive = true; // Variable to control the interval
  startAutoRefresh() {
    interval(60000) // Interval of 30 seconds
      .pipe(
        takeWhile(() => this.alive) // Take while the component is alive
      )
      .subscribe(() => {
        this.DetailsloadList(); // Call your function here
        this.AreaCoachList(this.region);
        this.BranchAreaCoachList(this.id); 
        this.guadgeloadList();
      });
  }

  ngOnDestroy() {
    this.alive = false; // Set alive to false when component is destroyed
  } 

  // * * * * * * * *  Start Header and Filters of Order Details High Charts  * * * * * * * * //
  filter='Filter';
  user= 'User';

// In your component class

  currentTab: string = ''; // Default to empty string

  openPage(pageName: string, event: MouseEvent) {
      if (this.currentTab === pageName) {
          // Toggle visibility if clicking the same tab again
          this.currentTab = '';
      } else {
          this.currentTab = pageName;
      }
      this.activateTab(event.target as HTMLElement);
  }

  activateTab(elmnt: HTMLElement) {
      const tablinks = document.querySelectorAll('.tablink.nav-link');
      tablinks.forEach(tab => tab.classList.remove('active'));
      elmnt.classList.add('active');
  }

  // * * * * * * * *  Start Order Details High Charts  * * * * * * * * //
  //public GraphDetails: any;
  constructor(private highchartsService: HighchartsService,private graphdetailsservices:GraphdetailsService, private filterServices: FilterService) {}
  public GraphDetails: any;
  public SourceGraphDetails: any;
  public AreaCoachdata: any;
  public BranchAreaCoachdata: any;
  public RevenueGraphDetails: any;


  ngOnInit() {
    //this.BranchAreaCoachList();
    this.startAutoRefresh();
    this.DetailsloadList();
    this.highchartsService.init();
    this.guadgeloadList();

    // Method of Tomorrow date display by default
    // Calculate tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    // Set EndDate to tomorrow's date in the format YYYY-MM-DD
    this.EndDate = tomorrow.toISOString().split('T')[0]; 
    //**************************** */
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

  // ********************************** */
  //  Start Avg Time Breakdown HighChart 
  //*********************************** */
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
  // ********************************** */
  //  End Avg Time Breakdown HighChart 
  //*********************************** */

  // ********************************** */
  //  Start Dispatch HighChart 
  //*********************************** */
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
          dataLabels: {
            enabled: true,
            format: '{y:.0f}' // Display values with 2 decimal places
          },
        }
      },
      series: [
        {
          name: 'Order Count',
          type: 'column', // Specify type for column chart
          color: '#4CB5AE', // Brown color
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
          ],
          dataLabels: {
            enabled: true,
            format: '{y:.2f}%' // Display values with 2 decimal places and add '%' symbol
          }
        }
      ]
    };
    this.highchartsService.createChart('dispatchcontainer', options);
  }
  // ********************************** */
  //  End Dispatch HighChart 
  //*********************************** */

  // ********************************** */
  //  Start In Store Time HighChart 
  //*********************************** */
  InstoretimeChartWithData() {
    //alert(this.GraphDetails)
     if (!this.GraphDetails) return; // Make sure GraphDetails has been populated
    Highcharts.chart('storetimecontainer', {
      chart: {
        type: 'column'
      },
      title: {
        text: '',
        align: 'left'
      },
      xAxis: {
        categories: ['< 8', '8-12', '13-20', '20+'],
        crosshair: true,
        accessibility: {
          description: 'Store Time'
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
          dataLabels: {
            enabled: true,
            format: '{y:.0f}' // Display values with 2 decimal places
          },
        }
      },
      series: [
        {
          name: 'Order Count',
          type: 'column',
          color: '#964B00', // Brown color
          data: [
            {
              y: parseInt(this.GraphDetails?.IN_STORE_LESS_7?? 0),
              color: '#4CB5AE' // Brown color
            },
            {
              y: parseInt(this.GraphDetails?.INSTORE_TIME_5_10?? 0),
              color: '#4CB5AE' // Brown color
            },
            {
              y: parseInt(this.GraphDetails?.INSTORE_TIME_10_20?? 0),
              color: '#4CB5AE' // Brown color
            },
            {
              y: parseInt(this.GraphDetails?.INSTORE_TIME_20_30?? 0),
              color: '#4CB5AE' // Brown color
            },
          ],
        }
      ]
    }as Highcharts.Options);
  }
  // ********************************** */
  //  End In Store Time HighChart 
  //*********************************** */

  // ********************************** */
  //  Start Order Details HighChart 
  //*********************************** */
  OrderDetailsChartWithData() {
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
          dataLabels: {
            enabled: true,
            format: '{y:.0f}' // Display values with 2 decimal places
          },
        }
      },
      series: [
        {
          name: 'Order Count',
          type: 'column', // Specify type for column chart
          color: '#964B00', // column color
          data: [
            {
              y: parseInt(this.GraphDetails?.ALL_ORDERS?? 0)/100,
              color: '#4CB5AE' // column color
            },
            {
              y: parseInt(this.GraphDetails?.TOTAL_CANCELED?? 0)/100,
              color: '#4CB5AE' // column color
            },
            {
              y: parseInt(this.GraphDetails?.TotalDispatched?? 0)/100,
              color: '#4CB5AE' // column color
            },
            {
              y: parseInt(this.GraphDetails?.TOTAL_INPROCESS?? 0)/100,
              color: '#4CB5AE' // column color
            },
            {
              y: parseInt(this.GraphDetails?.TOTAL_DELIVERED?? 0)/100,
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
          ],
          dataLabels: {
            enabled: true,
            format: '{y:.2f}%' // Display values with 2 decimal places
          },
        }
      ]
    }as Highcharts.Options);
  }
  // ********************************** */
  //  End Order Details HighChart 
  //*********************************** */

  // ********************************** */
  //  Start Drive Time HighChart 
  //*********************************** */
  DriveTimeChartWithData() {
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
          dataLabels: {
            enabled: true,
            format: '{y:.0f}' // Display values with 2 decimal places
          },
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
           ],
        },
      ]
    }as Highcharts.Options);
  }
  // ********************************** */
  //  End Drive Time HighChart 
  //*********************************** */

  // ********************************** */
  //  Start Speed Service HighChart 
  //*********************************** */
  SpeedServicesChartWithData() {
     if (!this.GraphDetails) return; // Make sure GraphDetails has been populated
     const speedless20 = this.GraphDetails.SERVICE_SPEED_TIME_LESS_5 + this.GraphDetails.SERVICE_SPEED_TIME_5_10 + this.GraphDetails.SERVICE_SPEED_TIME_10_20 ;
   Highcharts.chart('speedcontainer', {
      chart: {
        type: 'column'
      },
      title: {
        text: '',
        align: 'center'
      },
      xAxis: {
        categories: ['<20', '21-30', '31-40', '40+'],
        crosshair: true,
        accessibility: {
          description: 'Speed Services'
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
          dataLabels: {
            enabled: true,
            format: '{y:.0f}' // Display values with 2 decimal places
          },
        }
      },
      series: [
        {
          name: 'Order Count',
          type: 'column', // Specify type for column chart
          color: '#964B00', // column color
          data: [
            {
              y: parseInt(speedless20?? 0),
              color: '#4CB5AE' // column color
            },
            {
              y: parseInt(this.GraphDetails?.SERVICE_SPEED_TIME_20_30?? 0),
              color: '#4CB5AE' // column color
            },
            {
              y: parseInt(this.GraphDetails?.SERVICE_SPEED_TIME_30_40?? 0),
              color: '#4CB5AE' // column color
            },
            {
              y: parseInt(this.GraphDetails?.SERVICE_SPEED_TIME_GREATER_40?? 0),
              color: '#4CB5AE' // column color
            },
          ]
        },
      ]
    }as Highcharts.Options);
  }
  // ********************************** */
  //  End Speed Service HighChart 
  //*********************************** */

  public criteria: number = 0; // Set default value to 0
  public region: any;
  public id: any;
  public BranchID: number = 0;
  SrtartDat:string = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  EndDate:any;

  //  Reset Values Method
  resetForm() {
    this.criteria = 0;
    this.region = 0;
    this.id = 0;
    this.SrtartDat = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD;
    
    // Reset EndDate to tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.EndDate = tomorrow.toISOString().split('T')[0]; // Format: YYYY-MM-DD
     
    this.BranchID = 0;
}

    //fetching graph data from API
    DetailsloadList() {
    const body = {
      BranchId: this.BranchID,
      AreaCoachId: this.id,
      ConsiderArea: 1,
      Criteria: this.criteria,
      EndTimeInString: '9:59:00 AM',
      ToDateInString: this.EndDate,
      RegionId: this.region,
      StartTimeInString: '10:00 AM',
      FromDateInString: this.SrtartDat,
      UserName: 'farhanh'
    };
    
      this.graphdetailsservices.GetGraphDetails(body).subscribe(
        response => {
          console.log('Response:', response);
          
            console.log('Data received:', response);
            this.GraphDetails = response;
            console.log('Response:', this.GraphDetails);
            this.createChart(); // Update chart after data is received
            this.updateChartWithData(); // Update chart after data is received
            this.InstoretimeChartWithData(); // Update chart after data is received
            this.OrderDetailsChartWithData(); // Update chart after data is received
            this.DriveTimeChartWithData(); // Update chart after data is received
            this.SpeedServicesChartWithData(); // Update chart after data is received
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
    }

      // Area Coach Fetching Methods 
  AreaCoachList(Region: number) {
    const body = {
      Criteria: this.criteria,
      RegionId: Region,
    };
    this.filterServices.GetAreaCoach(body).subscribe(
      response => {
          console.log('Data received:', response);
          this.AreaCoachdata = response;
          console.log('Data received:', this.AreaCoachdata);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  // Area Coach Branch Fetching Methods 
  BranchAreaCoachList(Region: number) {
    const body = {
      id: this.id,
      RegionId: Region,
    };
  
    this.filterServices.GetAreaCoachBranches(body).subscribe(
      response => {
        
          console.log('Data received:', response);
          this.BranchAreaCoachdata = response;
        
          console.log('Data received:', this.BranchAreaCoachdata);
          console.log('Branch data received', this.BranchID);
          console.log('Region data received', this.region);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  // ****************************************** */  //    Meter Highchart // ****************************************** */

  
  public GuadgeGraphDetails: any;
  public GuadgeGraphDetailsinstoretime: any;
  public GuadgeGraphDeliverTime: any;
  public GuadgehDeliverTime: any;

  // ********************************** */
  //  Start In Store HighChart 
  //*********************************** */
  initChart(percentageInStoreLess7: number): void {
    HighchartsMore(Highcharts); // Initialize Highcharts More module

    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'gauge',
        plotBorderWidth: 0,
        plotShadow: false
      },
      credits: {
        enabled: false
      },
      title: {
        text: ''
      },
      pane: {
        startAngle: -150,
        endAngle: 150
      },
      yAxis: [
       {
        min: 0,
        max: 100,
        tickPosition: 'outside',
        lineColor: '#339',
        lineWidth: 1,
        minorTickPosition: 'outside',
        tickColor: '#000',
        minorTickColor: '#933',
        tickLength: 5,
        minorTickLength: 5,
        
        labels: {
          distance: -10,
        },
        offset: -20,
        endOnTick: false
      }],
      series: [{
        type: 'gauge',
        name: 'Percentage',
        data: [percentageInStoreLess7],
        dataLabels: {
          formatter: function () {
            var kmh = this.y;
            if (typeof kmh === 'number') {
              var percentage = Math.round(kmh); // Round the percentage to an integer
              if (percentage === 0) {
                return '<span style="color:#339">0%</span><br/>'; // Return 0% if value is 0
              } else {
                return '<span style="color:#339">' + percentage + '%</span><br/>';
              }
            } else {
              return ''; // or any other default value or error handling
            }
          },
          backgroundColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, '#DDD'],
              [1, '#FFF']
            ]
          }
        },
        tooltip: {
          valueSuffix: '%'
        }
      }]
    };
    Highcharts.chart('storemetercontainer', chartOptions);
  }
  // ********************************** */
  //  End In Store HighChart 
  //*********************************** */

  // ********************************** */
  //  Start Drive Time HighChart 
  //*********************************** */
  DriveTimeChart(percentageInStoreLess15: number): void {
    HighchartsMore(Highcharts); // Initialize Highcharts More module
    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'gauge',
        plotBorderWidth: 0,
        plotShadow: false
      },
      credits: {
        enabled: false
      },
      title: {
        text: ''
      },
      pane: {
        startAngle: -150,
        endAngle: 150
      },
      yAxis: [
         {
        min: 0,
        max: 100,
        tickPosition: 'outside',
        lineColor: '#933',
        lineWidth: 2,
        minorTickPosition: 'outside',
        tickColor: '#933',
        minorTickColor: '#933',
        tickLength: 5,
        minorTickLength: 5,
        labels: {
          distance: -10,
        },
        offset: -20,
        endOnTick: false
      }],
      series: [{
        type: 'gauge',
        name: 'Percentage',
        data: [percentageInStoreLess15],
        dataLabels: {
          formatter: function () {
            var kmh = this.y;
            if (typeof kmh === 'number') {
              var percentage = Math.round(kmh); // Round the percentage to an integer
              return '<span style="color:#339">' + percentage + '%</span><br/>';
            } else {
              return ''; // or any other default value or error handling
            }
          },
          backgroundColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, '#DDD'],
              [1, '#FFF']
            ]
          }
        },
        tooltip: {
          valueSuffix: '%'
        }
      }]
    };
    
    Highcharts.chart('drivemetercontainer', chartOptions);
  }

  // ********************************** */
  //  End Drive Time HighChart 
  //*********************************** */

  // ********************************** */
  //  Start Deliver Time HighChart 
  //*********************************** */
  DeliverTimeChart(percentageInStoreLess20: number): void {
    HighchartsMore(Highcharts); // Initialize Highcharts More module

    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'gauge',
        plotBorderWidth: 0,
        plotShadow: false
      },
      credits: {
        enabled: false
      },
      title: {
        text: ''
      },
      pane: {
        startAngle: -150,
        endAngle: 150
      },
      yAxis: [
         {
        min: 0,
        max: 100,
        tickPosition: 'outside',
        lineColor: '#933',
        lineWidth: 2,
        minorTickPosition: 'outside',
        tickColor: '#933',
        minorTickColor: '#933',
        tickLength: 5,
        minorTickLength: 5,
        labels: {
          distance: -10,
        },
        offset: -20,
        endOnTick: false
      }],
      series: [{
        type: 'gauge',
        name: 'Percentage',
        data: [percentageInStoreLess20],
        dataLabels: {
          formatter: function () {
            var kmh = this.y;
            if (typeof kmh === 'number') {
              var percentage = Math.round(kmh); // Round the percentage to an integer
              return '<span style="color:#339">' + percentage + '%</span><br/>';
            } else {
              return ''; // or any other default value or error handling
            }
          },
          backgroundColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, '#DDD'],
              [1, '#FFF']
            ]
          }
        },
        tooltip: {
          valueSuffix: '%'
        }
      }]
    };

    Highcharts.chart('delivertimecontainer', chartOptions);
  }
  // ********************************** */
  //  End Deliver Time HighChart 
  //*********************************** */

  // ********************************** */
  //  Start Deliver Time<30 HighChart 
  //*********************************** */
  DliverlessthirtyChart(percentageInStoreLess30: number): void {
    HighchartsMore(Highcharts); // Initialize Highcharts More module

    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'gauge',
        plotBorderWidth: 0,
        plotShadow: false
      },
      credits: {
        enabled: false
      },
      title: {
        text: ''
      },
      pane: {
        startAngle: -150,
        endAngle: 150
      },
      yAxis: [
         {
        min: 0,
        max: 100,
        tickPosition: 'outside',
        lineColor: '#933',
        lineWidth: 2,
        minorTickPosition: 'outside',
        tickColor: '#933',
        minorTickColor: '#933',
        tickLength: 5,
        minorTickLength: 5,
        labels: {
          distance: -10,
        },
        offset: -20,
        endOnTick: false
      }],
      series: [{
        type: 'gauge',
        name: 'Percentage',
        data: [percentageInStoreLess30],
        dataLabels: {
          formatter: function () {
            var kmh = this.y;
            if (typeof kmh === 'number') {
              var percentage = Math.round(kmh); // Round the percentage to an integer
              return '<span style="color:#339">' + percentage + '%</span><br/>';
            } else {
              return ''; // or any other default value or error handling
            }
          },
          backgroundColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, '#DDD'],
              [1, '#FFF']
            ]
          }
        },
        tooltip: {
          valueSuffix: '%'
        }
      }]
    };
    Highcharts.chart('delivercontainer', chartOptions);
  }
  // ********************************** */
  //  Start Deliver Time<30 HighChart 
  //*********************************** */

  // ********************************** */
  //  Start Source Details HighChart 
  //*********************************** */
  SourceChartWithData() {
    const chartData = this.SourceGraphDetails.map((item: OrderChannel) => {
      const percentage = ((item.OrderCount / this.GraphDetails.ALL_ORDERS) * 100).toFixed(2);
      return {
        name: `${item.Source} <br> Orders Count:${item.OrderCount} <br> Percentage:${percentage}%`,
        y: item.OrderCount
      };
    });
  
    Highcharts.chart('sourcecontainer', {
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
  // ********************************** */
  //  End Source Details HighChart 
  //*********************************** */

  // ********************************** */
  //  Start Revenue Details HighChart 
  //*********************************** */
  RevenueChartWithData() {
    const chartData = this.RevenueGraphDetails.map((item: OrderChannel) => {
      const percentage = ((item.PAYMENT / this.GraphDetails.TOTAL_AMOUNT) * 100).toFixed(2);
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
  // ********************************** */
  //  Start Revenue Details HighChart 
  //*********************************** */

  //fetching graph data from API
  guadgeloadList() {
    const body = {
      BranchId: this.BranchID,
      AreaCoachId: this.id,
      ConsiderArea: 1,
      Criteria: this.criteria,
      EndTimeInString: '9:59:00 AM',
      ToDateInString: this.EndDate,
      RegionId: this.region,
      StartTimeInString: '10:00 AM',
      FromDateInString: this.SrtartDat,
      UserName: 'farhanh'
    };
    this.graphdetailsservices.GetGraphDetails(body).subscribe(
      response => {
        console.log('Response:', response);
        if (response && response.IN_STORE_LESS_7 !== undefined) {
          console.log('Data received:', response);
          this.GuadgeGraphDetails = response;
          console.log('GuadgeGraphDetails Data', this.GuadgeGraphDetails);
          const percentageInStoreLess7 = (response.IN_STORE_LESS_7 / response.ALL_ORDERS) * 100;
          console.log('Percentage Data in store time', percentageInStoreLess7);
          this.initChart(percentageInStoreLess7); // Pass the value to initChart
        }

        if (response && response.DRIVE_TIME_LESS_10 !== undefined) {
          console.log('Data received:', response);
          this.GuadgeGraphDetailsinstoretime = response;
          console.log('GuadgeGraphDetailsinstoretime Data', this.GuadgeGraphDetailsinstoretime);
          const percentageInStoreLess15 = (response.DRIVE_TIME_LESS_10 / response.ALL_ORDERS) * 100;
          console.log('Percentage Data in store time', percentageInStoreLess15);
          this.DriveTimeChart(percentageInStoreLess15); // Pass the value to initChart// percentageInStoreLess7
        }

        if (response && response.DELIVER_LESS_20 !== undefined) {
          console.log('Data received:', response);
          this.GuadgeGraphDeliverTime = response;
          console.log('GuadgeGraphDeliverTime Data', this.GuadgeGraphDeliverTime);
          const percentageInStoreLess20 = (response.DELIVER_LESS_20 / response.ALL_ORDERS) * 100;
          console.log('Percentage Data in store time', percentageInStoreLess20);
          this.DeliverTimeChart(percentageInStoreLess20); // Pass the value to initChart// percentageInStoreLess7
        }

        if (response && response.DELIVER_LESS_30 !== undefined) {
          console.log('Data received:', response);
          this.GuadgehDeliverTime = response;
          console.log('GuadgehDeliverTime Data', this.GuadgehDeliverTime);
          const percentageInStoreLess30 = (response.DELIVER_LESS_30 / response.ALL_ORDERS) * 100;
          console.log('Percentage Data in store time', percentageInStoreLess30);
          this.DliverlessthirtyChart(percentageInStoreLess30); // Pass the value to initChart// percentageInStoreLess7
        }

        //****   Source DEtails Highchart */
        console.log('Source pai Data Recevied:', response['OrderChanels']);
        this.SourceGraphDetails = response['OrderChanels'];
        console.log('Source pai Data Recevied', this.SourceGraphDetails)
        this.SourceChartWithData(); // Update chart after data is received

        //****   Revenue Details Highchart */
        console.log('Revenue pai Data Recevied:', response['PaymentMethods']);
        this.RevenueGraphDetails = response['PaymentMethods'];
        console.log('Revenue pai Data Recevied', this.RevenueGraphDetails)
        this.RevenueChartWithData(); // Update chart after data is received

      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

}
