import { Component } from '@angular/core';
import { SidebaarComponent } from '../sidebaar/sidebaar.component';
import { RiderratingService } from '../../Services/riderrating.service';
import { Ratinglist } from '../../Interface/order-list';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../Services/filter.service';

@Component({
  selector: 'app-rider-rating',
  standalone: true,
  imports: [SidebaarComponent, CommonModule, FormsModule],
  templateUrl: './rider-rating.component.html',
  styleUrl: './rider-rating.component.css'
})
export class RiderRatingComponent {

  constructor(private Riderratting: RiderratingService, private filterServices: FilterService) {}

  // Start Header Show and Hide method
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
// End Heaer show and hide method part 

  // Fetching Data From Api of Order Details
public branchRiders: Ratinglist[] = [];
public regionRiders: Ratinglist[] = [];
public nationRiders: Ratinglist[] = [];
public AreaCoachdata: any;
public BranchAreaCoachdata: any;

ngOnInit() {
  this.loadList();
  this.AreaCoachList();
  this.BranchAreaCoachList();

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



loadList() {
  const body = {
      AreaCoachId: this.id,
      BranchId: this.BranchID,
      Criteria: this.criteria,
      //EndTime: "2024-03-27T09:32:52.779Z",
      EndTimeInString: "9:59",
      //EndTimeToString: "4/2/2024",
      //FromDate: "2024-03-27T05:00:00.000Z",
      FromDateInString: this.SrtartDat,
      RegionId: this.region,
      //StartTime: "2024-03-27T09:32:52.779Z",
      StartTimeInString: "10:0",
      //StartTimeString: "4/1/2024",
      //ToDate: "2024-03-28T04:59:00.000Z",
      ToDateInString: this.EndDate,
      UserName: "farhanh"
  };

  this.Riderratting.GetRiderRating(body).subscribe(
    response => {
      console.log('Response:', response); // Log the response to check if data is received
      if (response) {

        // Branch Rider data Fetching From API
        if(response['BranchRiders']){
          console.log('BranchRiders Data received:', response['BranchRiders']); // Log the received data
          this.branchRiders = response['BranchRiders'];
        }

        // Region Rider data Fetching From API
        if(response['RegionRiders']){
        console.log('RegionRiders Data received:', response['RegionRiders']); // Log the received data
        this.regionRiders = response['RegionRiders'];
      }

      // Nation Rider data Fetching From API
      if(response['NationRiders']){
        console.log('NationRiders Data received:', response['NationRiders']); // Log the received data
        this.nationRiders = response['NationRiders'];
      }
    } else {
      console.log('No data received');
    }
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}

  // Area Coach Fetching Methods 
  AreaCoachList() {
    const body = {
      Criteria: 0,
      RegionId: this.region,
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
    BranchAreaCoachList() {
      const body = {
        id: this.id,
        RegionId: this.region,
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
