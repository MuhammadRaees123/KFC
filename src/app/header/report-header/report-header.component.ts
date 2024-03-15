import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-report-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-header.component.html',
  styleUrl: './report-header.component.css'
})
export class ReportHeaderComponent {

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
