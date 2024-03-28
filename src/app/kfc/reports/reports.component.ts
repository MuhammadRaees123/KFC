import { Component } from '@angular/core';
import { SidebaarComponent } from '../sidebaar/sidebaar.component';
import { CommonModule } from '@angular/common';
import { ReportHeaderComponent } from '../../header/report-header/report-header.component';
import { ReportService } from '../../Services/report.service';
import { FormsModule } from '@angular/forms';
import { Reportlist } from '../../Interface/order-list';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [SidebaarComponent,ReportHeaderComponent, CommonModule, FormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

  constructor( private reportservice: ReportService) { }

  FirstName= 'Rana';
  LastName= 'Billal';
  MiddleName = 'Khatak';
  ContectNumber = '03127654321';
  Branch= 'MallRoad';


  
  currentTab: string = 'Lead'; // Default to Personal Details tab

  openPage(pageName: string, event: MouseEvent) {
    this.currentTab = pageName;
    this.activateTab(event.target as HTMLElement);
  }

  activateTab(elmnt: HTMLElement) {
    const tablinks = document.querySelectorAll('.tablink.nav-link');
    tablinks.forEach(tab => tab.classList.remove('active'));
    elmnt.classList.add('active');
  }

     // Fetching Data From Api of Order Details

public setting: Reportlist[] = [];
public performance: Reportlist[] = [];
public orderlocation: Reportlist[] = [];
public OrderDetails: Reportlist[] = [];

ngOnInit() {
  this.loadList();
  this.RiderloadList();
}

loadList() {
  const body = {
    AreaCoachId: 44,
    BranchId: 0,
    ConsiderArea: 1,
    Criteria: 0,
    DriverId: 0,
    EndTime: '2024-03-27',
    EndTimeInString: '9:59:00 AM',
    EndTimeToString: '3/27/2024',
    FromDate: '2024-03-01',
    FromDateInString: '03/01/2024',
    RegionId: 3,
    StartTime: '2024-03-01',
    StartTimeInString: '9:59:00 AM',
    StartTimeString: '3/01/2024',
    ToDate: '2024-03-27',
    ToDateInString: '03/27/2024',
    UserName: 'farhanh',
  };

  this.reportservice.GetReports(body).subscribe(
    response => {
      console.log('Response:', response); // Log the response to check if data is received
      if (response  && response.length > 0) {
        console.log('Data received:', response); // Log the received data
        this.setting = response;
      }
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );

  // Fetching data for order location
  this.reportservice.GetOrderlocation(body).subscribe(
    response => {
      console.log('Response:', response); // Log the response to check if data is received
      if (response  && response.length > 0) {
        console.log('Data received:', response); // Log the received data
        this.orderlocation = response;
      }
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );

    // Fetching data for order location
    // this.reportservice.GetOrderDetails(body).subscribe(
    //   response => {
    //     console.log('Response:', response); // Log the response to check if data is received
    //     if (response  && response.length > 0) {
    //       console.log('Data received:', response); // Log the received data
    //       this.OrderDetails = response;
    //     }
    //   },
    //   (error) => {
    //     console.error('Error fetching data:', error);
    //   }
    // );
}

// Rider Performance 


RiderloadList() {
  const body = {
    AreaCoachId: 44,
    BranchId: 0,
    ConsiderArea: 1,
    Criteria: 0,
    DriverId: 0,
    EndTime: '2024-03-27',
    EndTimeInString: '9:59:00 AM',
    EndTimeToString: '3/27/2024',
    FromDate: '2024-03-01',
    FromDateInString: '03/01/2024',
    RegionId: 3,
    StartTime: '2024-03-01',
    StartTimeInString: '9:59:00 AM',
    StartTimeString: '3/01/2024',
    ToDate: '2024-03-27',
    ToDateInString: '03/27/2024',
    UserName: 'farhanh',
  };

  this.reportservice.GetRierPerformance(body).subscribe(
    response => {
      console.log('Response:', response); // Log the response to check if data is received
      if (response  && response.length > 0) {
        console.log('Data received:', response); // Log the received data
        this.performance = response;
      }
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}
  

}
