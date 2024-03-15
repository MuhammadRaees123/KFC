import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-rider-setting-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rider-setting-header.component.html',
  styleUrl: './rider-setting-header.component.css'
})
export class RiderSettingHeaderComponent {

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
  

}
