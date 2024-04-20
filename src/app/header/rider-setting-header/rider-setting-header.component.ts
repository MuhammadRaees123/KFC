import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FilterService } from '../../Services/filter.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rider-setting-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rider-setting-header.component.html',
  styleUrl: './rider-setting-header.component.css'
})
export class RiderSettingHeaderComponent {

  constructor( private BranchDetails: FilterService) { 
  }

  public branchList: any[] = [];

  ngOnInit() {
    this.fetchBranchList();  // ************************ \\
  }


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
  

  // Fetching Branch List 
  public Branchid: any;
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
