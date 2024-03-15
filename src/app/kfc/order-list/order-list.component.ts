import { Component, ElementRef, Renderer2 } from '@angular/core';
import { SidebaarComponent } from '../sidebaar/sidebaar.component';
import { IndexHeaderComponent } from '../../header/index-header/index-header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [SidebaarComponent,IndexHeaderComponent, CommonModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {

  Orders= '14';
  OrderNo='101';
  Status = 'Receved';
  Date = '28/02/24';
  Time = 'Date';
  Customer= 'Ali';
  Address= 'I-11';
  DispatchBy= 'Auto';
  Driver= 'Hamza';
  RemainingTime= '30';

  constructor(private renderer: Renderer2, private el: ElementRef) {}

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


  lat = 33.69436013654506; // Latitude of KFC
  lng = 73.01065077441409; // Longitude of KFC
  zoom = 15;

}
