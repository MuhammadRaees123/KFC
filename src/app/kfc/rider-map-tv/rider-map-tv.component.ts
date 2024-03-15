import { Component } from '@angular/core';
import { SidebaarComponent } from '../sidebaar/sidebaar.component';
import { CommonModule } from '@angular/common';
import { MapTVHeaderComponent } from '../../header/map-tvheader/map-tvheader.component';

@Component({
  selector: 'app-rider-map-tv',
  standalone: true,
  imports: [SidebaarComponent,MapTVHeaderComponent, CommonModule],
  templateUrl: './rider-map-tv.component.html',
  styleUrl: './rider-map-tv.component.css'
})
export class RiderMapTVComponent {

    
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

}
