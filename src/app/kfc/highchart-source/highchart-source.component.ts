import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import HC_exportData from 'highcharts/modules/export-data';
import HC_accessibility from 'highcharts/modules/accessibility';
import { GraphdetailsService } from '../../Services/graphdetails.service';

interface OrderChannel {
  Payment: number;
  Source: string;
  OrderCount: number;
}

@Component({
  selector: 'app-highchart-source',
  standalone: true,
  imports: [],
  templateUrl: './highchart-source.component.html',
  styleUrl: './highchart-source.component.css'
})
export class HighchartSourceComponent {
  

  constructor(private graphdetailsservices:GraphdetailsService) { }
  public GraphDetails: any;
  public HighchartDetails: any;

ngOnInit(): void {
  this.DetailsloadList();
  HC_exporting(Highcharts);
  HC_exportData(Highcharts);
  HC_accessibility(Highcharts);
}

// Define an interface to describe the structure of objects in GraphDetails


updateChartWithData() {
  const chartData = this.GraphDetails.map((item: OrderChannel) => {
    const percentage = ((item.OrderCount / this.HighchartDetails.ALL_ORDERS) * 100).toFixed(2);
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
        console.log('Source pai Data Recevied:', response['OrderChanels']);
        this.GraphDetails = response['OrderChanels'];
        console.log('Source pai Data Recevied', this.GraphDetails)
        this.updateChartWithData(); // Update chart after data is received
      // }
    },
    error => {
      console.error('Error fetching data:', error);
    }
  );
}
}