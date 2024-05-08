import { Component } from '@angular/core';
import { SidebaarComponent } from '../sidebaar/sidebaar.component';
import { RiderSettingHeaderComponent } from '../../header/rider-setting-header/rider-setting-header.component';
import { RidersettengService } from '../../Services/ridersetteng.service';
import { RiderSetting } from '../../Interface/order-list';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../Services/filter.service';
import { UserComponent } from '../user/user.component';

// export interface RiderSetting {
//   // Other properties...
//   selectedStatusId?: number;
// }

@Component({
  selector: 'app-rider-setting',
  standalone: true,
  imports: [SidebaarComponent,RiderSettingHeaderComponent, CommonModule, FormsModule, UserComponent],
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
  //this.updateloadList(item: any);
}

public Branchid: number = 144; // Set default value to 0
public ID: any;
public Id: any;
public BranchRiderID: any;
public Address: any;

//  Reset Values Method
resetForm() {
  this.Branchid = 144;
  this.ID = 1;
}

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

    // Update Rider settings
    updateloadList(item: any) {
      const body = {
        Address: item.Address,
        BranchID_Old: item.BranchID_Old,
        BranchName: item.BranchName,
        BranchRiderID: item.BranchRiderID,
        BranchRiderID_Old: item.BranchRiderID_Old,
        CellNumber: item.CellNumber,
        FirstName: item.FirstName,
        IsDeleted: item.IsDeleted,
        IsOnDuty: item.IsOnDuty,
        IsOnJob: item.IsOnJob,
        LastName: item.LastName,
        MiddleName: item.MiddleName,
        Status: item.Status,
        appToken: item.appToken,
        imei: item.imei,
        isOnline: item.isOnline,
        locationLat: item.locationLat,
        locationLon: item.locationLon,
        password: item.password,
        token: item.token,
        userName: item.userName,
        DriverId: item.DriverId,
        RiderStatus: item.RiderStatus, // You can set this dynamically as per your requirement
        UserName: 'farhanh'
      };
    
      this.ridersetting.GetupdateRiderSetting(body).subscribe(
        response => {
          console.log('Response:', response);
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }

    public BranchID_Old : any;
    public BranchName : any;
    public BranchRiderID_Old : any;
    public CellNumber : any;
    public FirstName : any;
    public IsDeleted : any;
    public IsOnDuty : any;
    public IsOnJob : any;
    public LastName : any;
    public MiddleName : any;
    public Status : any;
    public appToken : any;
    public imei : any;
    public isOnline : any;
    public locationLat : any;
    public locationLon : any;
    public password : any;
    public token : any;
    public userName : any;
    public DriverId : any;

    updateOtherProperties(item: any) {
      // Update other properties based on the selected item
      this.BranchRiderID = item.BranchRiderID;
      //this.Address = item.Address;
      this.Address= item.Address;
      this.BranchID_Old= item.BranchID_Old;
      this.BranchName= item.BranchName;
      this.BranchRiderID_Old = item.BranchRiderID_Old;
      this.CellNumber = item.CellNumber;
      this.FirstName = item.FirstName;
      this.IsDeleted = item.IsDeleted;
      this.IsOnDuty = item.IsOnDuty;
      this.IsOnJob = item.IsOnJob;
      this.LastName = item.LastName;
      this.MiddleName = item.MiddleName;
      this.Status = item.Status;
      this.appToken = item.appToken;
      this.imei = item.imei
      this.isOnline = item.isOnline;
      this.locationLat = item.locationLat;
      this.locationLon = item.locationLon;
      this.password = item.password;
      this.token = item.token;
      this.userName = item.userName;
      this.DriverId = item.DriverId;

      
      // Then call the function to update the rider
      this.updateloadList(item);
    }
    
  
}
