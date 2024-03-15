import { Component } from '@angular/core';
import { SidebaarComponent } from '../sidebaar/sidebaar.component';
import { CommonModule } from '@angular/common';
import { ReportHeaderComponent } from '../../header/report-header/report-header.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [SidebaarComponent,ReportHeaderComponent, CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

  FirstName= 'Rana';
  LastName= 'Billal';
  MiddleName = 'Khatak';
  ContectNumber = '03127654321';
  Branch= 'MallRoad';
  
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
