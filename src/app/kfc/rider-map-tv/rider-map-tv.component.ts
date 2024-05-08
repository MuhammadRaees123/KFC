import { Component } from '@angular/core';
import { SidebaarComponent } from '../sidebaar/sidebaar.component';
import { CommonModule } from '@angular/common';
import { MapTVHeaderComponent } from '../../header/map-tvheader/map-tvheader.component';
import { RidermaptvService } from '../../Services/ridermaptv.service';
import { AssignRidermap, Ridermap } from '../../Interface/order-list';
import { FilterService } from '../../Services/filter.service';
import { FormsModule } from '@angular/forms';
import { UserComponent } from '../user/user.component';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { GooglemapComponent } from '../googlemap/googlemap.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgbPaginationNext } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rider-map-tv',
  standalone: true,
  imports: [SidebaarComponent,MapTVHeaderComponent, CommonModule, FormsModule, UserComponent, GooglemapComponent, GoogleMapsModule],
  templateUrl: './rider-map-tv.component.html',
  styleUrl: './rider-map-tv.component.css'
})
export class RiderMapTVComponent {

  //  Method For Auto Refresh
  alive = true; // Variable to control the interval
  startAutoRefresh() {
    interval(10000) // Interval of 30 seconds
      .pipe(
        takeWhile(() => this.alive) // Take while the component is alive
      )
      .subscribe(() => {
        this.loadList(); // Call your function here
        this.loadOrerList();
      });
  }

  ngOnDestroy() {
    this.alive = false; // Set alive to false when component is destroyed
  } 

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
public BranchInfo: any;
public Lattitude: any;
public Longitude: any;


ngOnInit() {
  this.startAutoRefresh();
  this.loadList();
  this.loadOrerList();
  this.BranchinfoList(this.Branchid);
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

      // Delayed Rider data received // 
      if(response['OfflineBranchRiderList']){
        console.log('Break Branch Rider Data received:', response['OfflineBranchRiderList']); // Log the received data
        this.OfflineRiderStatus = response['OfflineBranchRiderList'];
      }
      if(response['AssignedBranchRiderList']){
        console.log('Break Branch Rider Data received:', response['AssignedBranchRiderList']); // Log the received data
        this.AssignRiderStatus = response['AssignedBranchRiderList'];
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

BranchinfoList(BranchID: number) {
  const body = {
    BranchId: BranchID,
  };

  this.RiderMapservices.GetBranchInfo(body).subscribe(
    response => {
      console.log('Response:', response); // Log the response to check if data is received
        console.log('Data received:', response); // Log the received data
        this.BranchInfo = response;
        this.BranchLatLong(this.BranchInfo.Lat, this.BranchInfo.Lon)

        
        console.log('List Data received:', this.OrderMap); // List received data
        
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}


BranchLatLong(Lat: any, Lon: any)
{
console.log(Lat, Lon);
this.Lattitude = Lat;
this.Longitude = Lon;

}

// public KFCBranch: any = this.Lattitude;

//  GoogleMap Screen
display: any;
center: google.maps.LatLngLiteral = {
  lat: 31.467035,
  lng: 74.307381
};
zoom = 20;
moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
}
move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
}
}


//*************************************************************************************** */


