import { Component } from '@angular/core';
import { SidebaarComponent } from '../sidebaar/sidebaar.component';
import { RiderSettingHeaderComponent } from '../../header/rider-setting-header/rider-setting-header.component';
import { RidersettengService } from '../../Services/ridersetteng.service';
import { RiderSetting } from '../../Interface/order-list';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../Services/filter.service';

@Component({
  selector: 'app-rider-setting',
  standalone: true,
  imports: [SidebaarComponent,RiderSettingHeaderComponent, CommonModule, FormsModule],
  templateUrl: './rider-setting.component.html',
  styleUrl: './rider-setting.component.css'
})
export class RiderSettingComponent {

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

  // FirstName= 'Rana';
  // LastName= 'Billal';
  // MiddleName = 'Khatak';
  // ContectNumber = '03127654321';
  // Branch= 'MallRoad';

  constructor( private ridersetting: RidersettengService,  private BranchDetails: FilterService) { 

  }
    // Fetching Data From Api of Order Details
public setting: RiderSetting[] = [];
public branchList: any[] = [];
public statusList: any[] = [];

ngOnInit() {
  this.loadList();
  this.fetchBranchList();  // ************************ \\
  this.StatusChange();
}

public Branchid: number = 144; // Set default value to 0
public ID: any;

applyFilter() {
  this.loadList(); // Call loadList function when the Filter button is clicked
}

loadList() {
  const body = {
    BranchId: this.Branchid,
    DriverId: 0,
    IS_ALL: false,
    IS_ARRIVED: true,
    IS_DELIVERED: true,
    IS_DISPATCHED: true,
    IS_NEWORDER: true,
    IS_RECEIVED: true,
    IS_REJECTED: false,
    StatusId: this.ID,
    UserName: 'farhanh',
  };

  this.ridersetting.GetRiderSetting(body).subscribe(
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
}
status='';

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

    // Fetching Status List 
    StatusChange() {
      this.BranchDetails.GetStatusChange().subscribe( // ************************ \\
        (response) => {
          console.log('Response received of Status:', response['RiderStatus']);
       if (response['RiderStatus'] != null && response['RiderStatus'] != undefined) {
            console.log('Status Data received:', response['RiderStatus']);
                   // Ensure that response is always an array
                   this.statusList = response['RiderStatus'];
          }
          console.log('Status Data Assign to statusList Variable',this.statusList); // Logging array of branches
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }

  
}
