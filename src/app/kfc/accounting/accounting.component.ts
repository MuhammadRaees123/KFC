import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { SidebaarComponent } from '../sidebaar/sidebaar.component';
import { AccountingHeaderComponent } from '../../header/accounting-header/accounting-header.component';
import { AccountDetails, Accounts, ListofBranch } from '../../Interface/order-list';
import { AccountService } from '../../Services/account.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../Services/filter.service';




@Component({
  selector: 'app-accounting',
  standalone: true,
  imports: [SidebaarComponent,AccountingHeaderComponent, CommonModule, FormsModule],
  templateUrl: './accounting.component.html',
  styleUrl: './accounting.component.css'
})
export class AccountingComponent implements OnInit {



 // Start Header Part

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

  // Ends Headers Part 
  constructor(private renderer: Renderer2, private el: ElementRef, private accountServices: AccountService, private BranchDetails: FilterService ) {}

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

  // Fetching Data From Api of Order Details

public orders: Accounts[] = [];
public ordersDetails: AccountDetails[] = [];
//public branchList: ListofBranch[] = [];
public branchList: any[] = [];

//Branchid:any;
public Branchid: number = 0; // Set default value to 0
//SrtartDat:any;
SrtartDat: string = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
EndDate?: string;
//BranchRiderId: any;
BranchRiderId: any;
selectedBranchRiderId: any;

// Order accounts Fetching Methods 
loadList() {
  const body = {
    BranchId: this.Branchid,
    ToDateInString: this.EndDate,
    FromDateInString: this.SrtartDat,
    UserName: 'farhanh'
  };

  this.accountServices.GetOrderAccount(body).subscribe(
    response => {
      console.log('Response:', response);
      if (response && response.length > 0) {
        console.log('Data received:', response);
        this.orders = response;
      }
    },
    error => {
      console.error('Error fetching data:', error);
    }
  );
}

  // Call loadList on component initialization
  ngOnInit() {
    this.loadList();
    this.DetailsloadList();
    this.fetchBranchList();  // ************************ \\

    // Method of Tomorrow date display by default
    // Calculate tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    // Set EndDate to tomorrow's date in the format YYYY-MM-DD
    this.EndDate = tomorrow.toISOString().split('T')[0]; 
  }

  // Order accounts Fetching Methods 
DetailsloadList(branchRiderId?: any) {
  this.selectedBranchRiderId = branchRiderId || this.BranchRiderId;
  const body = {
    BranchId: this.Branchid,
    Criteria: 0,
    DriverId:this.selectedBranchRiderId,
    ToDateInString: this.EndDate,
    RegionId: 0,
    FromDateInString: this.SrtartDat,
    UserName: 'farhanh'
  };

  this.accountServices.GetOrderAccountDetails(body).subscribe(
    response => {
      console.log('Response:', response);
      if (response && response.length > 0) {
        console.log('Data received:', response);
        this.ordersDetails = response;
      }
    },
    error => {
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
