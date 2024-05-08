import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { SidebaarComponent } from '../sidebaar/sidebaar.component';
import { IndexHeaderComponent } from '../../header/index-header/index-header.component';
import { CommonModule } from '@angular/common';
import { OrderlistService } from '../../Services/orderlist.service';
import { OrderList } from '../../Interface/order-list';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../Services/filter.service';
import { UserComponent } from '../user/user.component';
//import { RouterModule } from '@angular/router';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

interface SortOrderList {
  OrderNo: number;
  OrderStatus: string; // Add the OrderStatus property
  BookedTime: string;
  RiderFirstName: string;
  [key: string]: any;
}

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [SidebaarComponent,IndexHeaderComponent, CommonModule, FormsModule, UserComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})

export class OrderListComponent implements OnInit {

//  Method For Auto Refresh
  alive = true; // Variable to control the interval
  startAutoRefresh() {
    interval(10000) // Interval of 30 seconds
      .pipe(
        takeWhile(() => this.alive) // Take while the component is alive
      )
      .subscribe(() => {
        this.loadList(); // Call your function here
        //this.fetchBranchRider();
      });
  }

  ngOnDestroy() {
    this.alive = false; // Set alive to false when component is destroyed
  }  

  // For Hide And Show Table
  showDetails: boolean = false;
  toggleDetails() {
    if (!this.showDetails) {
        this.showDetails = true;
    }
}

  filter='Filter';
  user= localStorage.getItem('userName')
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
  CurrntDate: string = new Date().toString();
  NextDate: string = new Date().toLocaleDateString('en-US');
  
  constructor(private renderer: Renderer2, private el: ElementRef,private orderService: OrderlistService, private BranchDetails: FilterService) {}
  openModal() {
    const modal = this.el.nativeElement.querySelector('#staticBackdrop');
    this.renderer.addClass(modal, 'show');
    this.renderer.setStyle(modal, 'display', 'block');
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }
  closeModal() {
    const modal = this.el.nativeElement.querySelector('#staticBackdrop');
    this.renderer.removeClass(modal, 'show');
    this.renderer.setStyle(modal, 'display', 'none');
    this.renderer.setStyle(document.body, 'overflow', 'auto');
  }
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

  //  Order List Data Sorting in Ascending and Decending Order.
  sortlist: SortOrderList[] = [];
  selectedSortOption: string = 'Order_asc'; // Default selected option
  sortData() {
    const [column, order] = this.selectedSortOption.split('_');
    switch (column) {
      case 'Order':
        if (order === 'asc') {
          this.list.sort((a, b) => (a.OrderNo ?? 0) - (b.OrderNo ?? 0));
        } else {
          this.list.sort((a, b) => (b.OrderNo ?? 0) - (a.OrderNo ?? 0));
        }
        break;
      case 'Rider':
        if (order === 'asc') {
          this.list.sort((a, b) => (a.RiderFirstName ?? '').localeCompare(b.RiderFirstName ?? ''));
        } else {
          this.list.sort((a, b) => (b.RiderFirstName ?? '').localeCompare(a.RiderFirstName ?? ''));
        }
        break;
      case 'Date':
        if (order === 'asc') {
          this.list.sort((a, b) => new Date(a.BookedTime?? 0).getTime() - new Date(b.BookedTime?? 0).getTime());
        } else {
          this.list.sort((a, b) => new Date(b.BookedTime?? 0).getTime() - new Date(a.BookedTime?? 0).getTime());
        }
        break;
      default:
        break;
    }
  }
  
  //  Declare Veriables that assingning a API Data 
public list: OrderList[] = [];
public branchList: any[] = [];
public branchRider: any[] = [];
public SingleOrder: any[] = [];
public adminlog: any[] = [];
public assignlog: any[] =[];
public OrderDetail:any;


ngOnInit() {
  this.startAutoRefresh();
  this.loadList();
  this.fetchBranchList();  // ************************ \\
  this.fetchBranchRider(this.Branchid);
  this.SingleOrerloadList();

  // Method of Tomorrow date display by default && Calculate tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    // Set EndDate to tomorrow's date in the format YYYY-MM-DD && Set SrtartTime to "10:00 AM" && // Set EndTime to "09:59 AM"
    this.EndDate = tomorrow.toISOString().split('T')[0]; 
     this.SrtartTime = '10:00';
     this.EndTime = '09:59';
}

// Declare Keys 
pageSize: number = 5; // Initialize with default page size
public Branchid: number = 144; // Set default value to 0
SrtartDat:string = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD;
EndDate:any;
value: number = 1;
public BranchRideriD: any;
SrtartTime?:string;
EndTime?:String;
public DeliveryOrderID: any;
selectedBranchRiderId:any;

//  Reset Values Method
    resetForm() {
      this.Branchid = 144;
      this.value = 1;
      this.BranchRideriD = 0;
      this.SrtartDat = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD;
      
      // Reset EndDate to tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.EndDate = tomorrow.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    
      this.SrtartTime = '10:00';
      this.EndTime = '09:59';
  }

//********************** */
//  Set Order details
//********************** */
loadList() {
  const body = {
    BranchId: this.Branchid,
    DriverId: this.BranchRideriD,
    EndTime: this.EndDate,
    EndTimeInString: '9:59:00 AM',
    EndTimeToString: this.EndDate,
    IS_ALL: false,
    IS_ARRIVED: true,
    IS_DELIVERED: true,
    IS_DISPATCHED: true,
    IS_NEWORDER: true,
    IS_RECEIVED: true,
    IS_REJECTED: false,
    StartTime: this.SrtartDat,
    StartTimeInString: '10:00:00 AM',
    StartTimeString: this.SrtartDat,
    StatusId: this.value,
    UserName: 'farhanh',
  };

  this.orderService.GetOrderlist(body).subscribe(
    response => {
      console.log('Response:', response); // Log the response to check if data is received
      if (response  && response.length > 0) {
        console.log('Data received:', response); // Log the received data
        this.list = response;
      }
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}

//********************** */
//  Set Singel Order details
//********************** */
SingleOrerloadList(DeliveryOrderID?:any) {
  this.selectedBranchRiderId = DeliveryOrderID || this.DeliveryOrderID;
  const body = {
    BranchId: this.Branchid,
    DriverId: this.BranchRideriD,
    EndTime: this.EndDate,
    EndTimeInString: '9:59:00 AM',
    EndTimeToString: this.EndDate,
    IS_ALL: false,
    IS_ARRIVED: true,
    IS_DELIVERED: true,
    IS_DISPATCHED: true,
    IS_NEWORDER: true,
    IS_RECEIVED: true,
    IS_REJECTED: false,
    OrderId:this.selectedBranchRiderId,
    StartTime: this.SrtartDat,
    StartTimeInString: '10:00:00 AM',
    StartTimeString: this.SrtartDat,
    StatusId: this.value,
    UserName: 'farhanh',
  };

  this.orderService.GetSingleOrderlist(body).subscribe(
    response => {
      console.log('Single Order details Response:', response); // Log the response to check if data is received
        this.OrderDetail = response;
          console.log('Single Order Data received:', this.OrderDetail);
           // Log the received datas
           
      //  Item detail list
      if(response['ItemsList']){
      this.SingleOrder = response['ItemsList'];
        console.log('ItemsList Order Data received:', response['ItemsList']); // Log the received datas
    }
    // Admin Log Details
    if(response['OrderLog']){
      this.adminlog = response['OrderLog'];
        console.log('OrderLog Order Data received:', response['OrderLog']); // Log the received datas
    }
    // Auto assign Log Details
    if(response['AutoAssigLog']){
      this.assignlog = response['AutoAssigLog'];
        console.log('AutoAssigLog Order Data received:', response['AutoAssigLog']); // Log the received datas
    }
      }  ,
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}

//*********************************************** */
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

//*********************************************** */
// Fetching Branch Riders 
fetchBranchRider(branchId: number) {
  const body = {
    BranchId: branchId,
  }; 
  this.BranchDetails.GetBranchRider(body).subscribe( // ************************ \\
    (response) => {
      console.log('Response received of Branches Rider:', response['RidersList']);
   if (response['RidersList'] != null && response['RidersList'] != undefined) {
        console.log('Branches Data received:', response['RidersList']);
               // Ensure that response is always an array
               this.branchRider = response['RidersList'];
      }
      console.log('Branch Rider Data Assign to branchList Variable',this.branchRider); // Logging array of branches
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}

// ***************************************
// Start Method to set format of the time
// ***************************************
formatTime(dateTimeString: string): string {
  // Parse the string to a Date object
  const dateTime = new Date(dateTimeString);
  // Format the time portion of the Date object
  const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 
  return formattedTime; // Return the formatted time string
}
// **************************************
// End Method to set format of the time
// **************************************

// Store DeliveryOrderID 
selectedDeliveryOrderID?: number; // Property to store the selected DeliveryOrderID
updateSelectedDeliveryOrderID(DeliveryOrderID: number) {
  this.selectedDeliveryOrderID = DeliveryOrderID;
}
isCheckboxChecked(DeliveryOrderID: number): boolean {
  return this.selectedDeliveryOrderID === DeliveryOrderID;
}

}
