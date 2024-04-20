import { Component } from '@angular/core';
import { SidebaarComponent } from '../sidebaar/sidebaar.component';
import { CommonModule } from '@angular/common';
import { MapTVHeaderComponent } from '../../header/map-tvheader/map-tvheader.component';
import { RidermaptvService } from '../../Services/ridermaptv.service';
import { AssignRidermap, Ridermap } from '../../Interface/order-list';
import { FilterService } from '../../Services/filter.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rider-map-tv',
  standalone: true,
  imports: [SidebaarComponent,MapTVHeaderComponent, CommonModule, FormsModule],
  templateUrl: './rider-map-tv.component.html',
  styleUrl: './rider-map-tv.component.css'
})
export class RiderMapTVComponent {

  constructor(private RiderMapservices: RidermaptvService, private BranchDetails: FilterService) {}
    
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

  // Start Header tab opening and closeing logic

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
    // End Header tab opening and closeing logic
  


  // Fetching Data From Api of Order Details

public OrderMap: any ;
public dispatchedOrders: AssignRidermap[] = [];
public unassignedOrders: AssignRidermap[] = [];
public delayedOrders: AssignRidermap[] = [];
public assignedOrders: AssignRidermap[] = [];
public FreeRiderStatus:any;
public AssignRiderStatus:any;
public InprogressRiderStatus:any;
public ReturningRiderStatus:any;
public BreakBranchRiderStatus: any;
public DelayedRiderStatus: any;
public OfflineRiderStatus: any;
public branchList: any[] = [];


ngOnInit() {
  this.loadList();
  this.loadOrerList();
  this.fetchBranchList();  // ************************ \\
}
 // Get Delivery Order Calculation

 //Branchid:any;
 public Branchid: number = 0; // Set default value to 0

loadList() {
  const body = {
    BranchId: this.Branchid,
    IS_ALL: false,
    IS_ARRIVED: true,
    IS_DELIVERED: false,
    IS_DISPATCHED: true,
    IS_NEWORDER: true,
    IS_RECEIVED: true,
    IS_REJECTED: false,
    UserName: 'farhanh',
  };

  this.RiderMapservices.GetRiderMapDetails(body).subscribe(
    response => {
      console.log('Response:', response); // Log the response to check if data is received
        console.log('Data received:', response); // Log the received data
        this.OrderMap = response;
        console.log('List Data received:', this.OrderMap); // List received data
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}

// Get Branch Order List

loadOrerList() {
  const body = {
    BranchId: this.Branchid,
    UserName: 'farhanh',
  };

  // Get Delivery Order Details
  this.RiderMapservices.GetRiderOrderlist(body).subscribe(
    response => {
      console.log('Response:', response); // Log the response to check if data is received
      if (response) {
        if (response['DispatchedOrders']) {
          console.log('Dispatched Orders received:', response['DispatchedOrders']); // Log the received data
          this.dispatchedOrders = response['DispatchedOrders'];
        }
        if (response['UnassginedOrders']) {
          console.log('Unassigned Orders received:', response['UnassginedOrders']); // Log the received data
          // Handle Unassigned Orders, if needed
          this.unassignedOrders = response['UnassginedOrders'];
        }
        if (response['DelayedOrders']) {
          console.log('Delayed Orders received:', response['DelayedOrders']); // Log the received data
          // Handle Delayed Orders, if needed
          this.delayedOrders = response['DelayedOrders'];
        }
        if (response['AssignedOrders']) {
          console.log('Assigned Orders received:', response['AssignedOrders']); // Log the received data
          // Handle Delayed Orders, if needed
          this.assignedOrders = response['AssignedOrders'];
        }
      } else {
        console.log('No data received');
      }
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );

  // Get Rider Status Details
  this.RiderMapservices.GetRiderStatus(body).subscribe(
    response => {
      console.log('Response:', response); // Log the response to check if data is received
      if (response) {

        // Free Rider data received
        if(response['FreeBranchRiderList']){
        console.log('Free Rider Data received:', response['FreeBranchRiderList']); // Log the received data
        this.FreeRiderStatus = response['FreeBranchRiderList'];
      }

      // InProgress Rider data received
      if(response['InProgressBranchRiderList']){
        console.log('InProgress Rider Data received:', response['InProgressBranchRiderList']); // Log the received data
        this.InprogressRiderStatus = response['InProgressBranchRiderList'];
      }
    
      // Returning Rider data received
      if(response['ReturningBranchRiderList']){
        console.log('Returning Rider Data received:', response['ReturningBranchRiderList']); // Log the received data
        this.ReturningRiderStatus = response['ReturningBranchRiderList'];
      }

      // Break Rider data received
      if(response['BreakBranchRiderList']){
        console.log('Break Branch Rider Data received:', response['BreakBranchRiderList']); // Log the received data
        this.BreakBranchRiderStatus = response['BreakBranchRiderList'];
      }

      // Delayed Rider data received
      if(response['DelayedBranchRiderList']){
        console.log('Break Branch Rider Data received:', response['DelayedBranchRiderList']); // Log the received data
        this.DelayedRiderStatus = response['DelayedBranchRiderList'];
      }

      // Delayed Rider data received
      if(response['OfflineBranchRiderList']){
        console.log('Break Branch Rider Data received:', response['OfflineBranchRiderList']); // Log the received data
        this.OfflineRiderStatus = response['OfflineBranchRiderList'];
      }
    }
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}

// Fetching Branch List 

fetchBranchList() {

  this.BranchDetails.GetBranchlist().subscribe( // ************************ \\
    (response) => {
      console.log('Response received of Branches:', response);
   if (response != null && response != undefined) {
        console.log('Branches Data received:', response);
               // Ensure that response is always an array
               this.branchList = response;
      }
      console.log('Branch Data Assign to branchList Variable',this.branchList); // Logging array of branches
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}
}
