import { Component } from '@angular/core';
import { SidebaarComponent } from '../sidebaar/sidebaar.component';
import { CommonModule } from '@angular/common';
import { ReportHeaderComponent } from '../../header/report-header/report-header.component';
import { ReportService } from '../../Services/report.service';
import { FormsModule } from '@angular/forms';
import { Reportlist } from '../../Interface/order-list';
import { FilterService } from '../../Services/filter.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [SidebaarComponent, CommonModule, FormsModule, UserComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

  constructor( private reportservice: ReportService, private filterServices: FilterService) { }

  // Start Header and Filter Hiden and sho method
  filter='Filter';
  user= 'User';

// In your component class

  CurrentTab: string = ''; // Default to empty string

  OpenPage(pageName: string, event: MouseEvent) {
      if (this.CurrentTab === pageName) {
          // Toggle visibility if clicking the same tab again
          this.CurrentTab = '';
      } else {
          this.CurrentTab = pageName;
      }
      this.activateTab(event.target as HTMLElement);
  }

  ActivateTab(elmnt: HTMLElement) {
      const tablinks = document.querySelectorAll('.tablink.nav-link');
      tablinks.forEach(tab => tab.classList.remove('active'));
      elmnt.classList.add('active');
  }
  // End Header and Filter Hiden and sho method

   // Start Tab Hiden and show method
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
// End Tab Hiden and show method

     // Fetching Data From Api of Order Details
public setting: Reportlist[] = [];
public performance: Reportlist[] = [];
public orderlocation: Reportlist[] = [];
public OrderDetails: Reportlist[] = [];
public AreaCoachdata: any;
public BranchAreaCoachdata: any;

ngOnInit() {
  this.loadList();
  this.RiderloadList();
  this.AreaCoachList(this.region);
  this.BranchAreaCoachList(this.region);

  // Method of Tomorrow date display by default
    // Calculate tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    // Set EndDate to tomorrow's date in the format YYYY-MM-DD
    this.EndDate = tomorrow.toISOString().split('T')[0]; 
}

public criteria: number = 0; // Set default value to 0
SrtartDat:string = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
EndDate:any;
public region: any;
public id: any;
public BranchID: any;

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

loadList() {
  const body = {
    AreaCoachId: this.id,
    BranchId: this.BranchID,
    //ConsiderArea: 1,
    Criteria: this.criteria,
    //DriverId: 0,
    EndTimeInString: '9:59:00 AM',
    ToDateInString: this.EndDate,
    StartTimeInString: '10:00:00 AM',
    FromDateInString: this.SrtartDat,
    RegionId: this.region,
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
    AreaCoachId: this.id,
    BranchId: this.BranchID,
    ConsiderArea: 1,
    Criteria: this.criteria,
    DriverId: 0,
    EndTimeInString: '9:59:00 AM',
    ToDateInString: this.EndDate,
    RegionId: this.region,
    StartTimeInString: '9:59:00 AM',
    FromDateInString: this.SrtartDat,
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

}
