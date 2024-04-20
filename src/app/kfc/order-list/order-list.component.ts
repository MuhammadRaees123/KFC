import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { SidebaarComponent } from '../sidebaar/sidebaar.component';
import { IndexHeaderComponent } from '../../header/index-header/index-header.component';
import { CommonModule } from '@angular/common';
import { OrderlistService } from '../../Services/orderlist.service';
import { OrderList } from '../../Interface/order-list';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../Services/filter.service';
//import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [SidebaarComponent,IndexHeaderComponent, CommonModule, FormsModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {

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
  

  CurrntDate: string = new Date().toString();

  NextDate: string = new Date().toLocaleDateString('en-US');

  //hdnDateFrom = DateTime.Today.ToString("MM/dd/yyyy");




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

// Fetching Data From Api of Order Details

public list: OrderList[] = [];
public branchList: any[] = [];
public branchRider: any[] = [];
public SingleOrder: any[] = [];
public adminlog: any[] = [];
public assignlog: any[] =[];
public OrderDetail:any;


ngOnInit() {
  this.loadList();
  this.fetchBranchList();  // ************************ \\
  this.fetchBranchRider();
  this.SingleOrerloadList();

  // Method of Tomorrow date display by default
    // Calculate tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    // Set EndDate to tomorrow's date in the format YYYY-MM-DD
    this.EndDate = tomorrow.toISOString().split('T')[0]; 

     // Set SrtartTime to "10:00 AM"
     this.SrtartTime = '10:00';

     // Set EndTime to "09:59 AM"
     this.EndTime = '09:59';
}

//Branchid:any;
public Branchid: number = 0; // Set default value to 0
SrtartDat:string = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD;
EndDate:any;
value: any;
public BranchRideriD: number = 0;
SrtartTime?:string;
EndTime?:String;
DeliveryOrderID: any;
selectedBranchRiderId:any;

//********************** */
//  Set Order details
//********************** */
loadList() {
  const body = {
    BranchId: this.Branchid,
    DriverId: this.BranchRideriD,
    EndTime: this.EndDate,
    //EndTime: '2024-04-04',
    EndTimeInString: '9:59:00 AM',
    EndTimeToString: this.EndDate,
    //EndTimeToString: '04/05/2024',
    IS_ALL: false,
    IS_ARRIVED: true,
    IS_DELIVERED: true,
    IS_DISPATCHED: true,
    IS_NEWORDER: true,
    IS_RECEIVED: true,
    IS_REJECTED: false,
    //StartTime: '2024-04-04',
    StartTime: this.SrtartDat,
    StartTimeInString: '10:00:00 AM',
    //StartTimeString: '04/04/2024',
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
//  Set Singer Order details
//********************** */
SingleOrerloadList(DeliveryOrderID?:any) {
  this.selectedBranchRiderId = DeliveryOrderID || this.DeliveryOrderID;
  const body = {
    BranchId: this.Branchid,
    DriverId: this.BranchRideriD,
    EndTime: this.EndDate,
    //EndTime: '2024-04-04',
    EndTimeInString: '9:59:00 AM',
    EndTimeToString: this.EndDate,
    //EndTimeToString: '04/05/2024',
    IS_ALL: false,
    IS_ARRIVED: true,
    IS_DELIVERED: true,
    IS_DISPATCHED: true,
    IS_NEWORDER: true,
    IS_RECEIVED: true,
    IS_REJECTED: false,
    //StartTime: '2024-04-04',
    OrderId:this.selectedBranchRiderId,
    StartTime: this.SrtartDat,
    StartTimeInString: '10:00:00 AM',
    //StartTimeString: '04/04/2024',
    StartTimeString: this.SrtartDat,
    StatusId: this.value,
    UserName: 'farhanh',
  };

  this.orderService.GetSingleOrderlist(body).subscribe(
    response => {
      console.log('Single Order details Response:', response); // Log the response to check if data is received
        this.OrderDetail = response;
          console.log('Single Order Data received:', this.OrderDetail); // Log the received datas
      
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
// Fetching Branch List 
fetchBranchRider() {
  const body = {
    BranchId: this.Branchid,
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

// *************************
// Method to format the time
formatTime(dateTimeString: string): string {
  // Parse the string to a Date object
  const dateTime = new Date(dateTimeString);

  // Format the time portion of the Date object
  const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return formattedTime; // Return the formatted time string
}
//**************************** */

// Inside your Angular component class

selectedDeliveryOrderID?: number; // Property to store the selected DeliveryOrderID

updateSelectedDeliveryOrderID(DeliveryOrderID: number) {
  this.selectedDeliveryOrderID = DeliveryOrderID;
}

isCheckboxChecked(DeliveryOrderID: number): boolean {
  return this.selectedDeliveryOrderID === DeliveryOrderID;
}

}
