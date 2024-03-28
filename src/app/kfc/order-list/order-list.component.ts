import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { SidebaarComponent } from '../sidebaar/sidebaar.component';
import { IndexHeaderComponent } from '../../header/index-header/index-header.component';
import { CommonModule } from '@angular/common';
import { OrderlistService } from '../../Services/orderlist.service';
import { OrderList } from '../../Interface/order-list';
import { FormsModule } from '@angular/forms';
//import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [SidebaarComponent,IndexHeaderComponent, CommonModule, FormsModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {

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


  CurrntDate: string = new Date().toString();

  NextDate: string = new Date().toLocaleDateString('en-US');

  //hdnDateFrom = DateTime.Today.ToString("MM/dd/yyyy");




  constructor(private renderer: Renderer2, private el: ElementRef,private orderService: OrderlistService) {}


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

// Fetching Data From Api of Order Details

public list: OrderList[] = [];

ngOnInit() {
  this.loadList();
}

loadList() {
  const body = {
    BranchId: 158,
    DriverId: 0,
    EndTime: '2024-03-29',
    EndTimeInString: '9:59:00 AM',
    EndTimeToString: '03/29/2024',
    IS_ALL: false,
    IS_ARRIVED: true,
    IS_DELIVERED: true,
    IS_DISPATCHED: true,
    IS_NEWORDER: true,
    IS_RECEIVED: true,
    IS_REJECTED: false,
    StartTime: '2024-03-28',
    StartTimeInString: '10:00:00 AM',
    StartTimeString: '03/28/2024',
    StatusId: 0,
    UserName: 'farhanh',
  };

  this.orderService.GetOrderlist(body).subscribe(
    response => {
      console.log('Response:', response); // Log the response to check if data is received
      if (response  && response.length > 0) {
        console.log('Data received:', response); // Log the received data
        this.list = response;
      }
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}

}
