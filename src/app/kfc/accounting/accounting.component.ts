import { Component, ElementRef, Renderer2 } from '@angular/core';
import { SidebaarComponent } from '../sidebaar/sidebaar.component';
import { AccountingHeaderComponent } from '../../header/accounting-header/accounting-header.component';
import { Accounts } from '../../Interface/order-list';
import { AccountService } from '../../Services/account.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accounting',
  standalone: true,
  imports: [SidebaarComponent,AccountingHeaderComponent, CommonModule, FormsModule],
  templateUrl: './accounting.component.html',
  styleUrl: './accounting.component.css'
})
export class AccountingComponent {

  RiderName= 'Rana Billal';
  Branch='Mall Road';
  TotalOrders = '12';
  TotalAmount = '3500';

  constructor(private renderer: Renderer2, private el: ElementRef, private accountServices: AccountService) {}

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

  // Fetching Data From Api of Order Details

public orders: Accounts[] = [];

// ngOnInit() {
//   this.loadList();
// }

loadList() {
  const body = {
    BranchId: 158,
    //Criteria: 0,
    EndTime: '2024-03-26',
    ToDateInString: '03/26/2024',
    //RegionId: 0,
    StartTime: '2024-03-01',
    FromDateInString: '03/01/2024',
    UserName: 'farhanh'
  };

  this.accountServices.GetOrderAccount(body).subscribe(
    response => {
      console.log('Response:', response);
      if (response && response.length > 0) {
        console.log('Data received:', response);
        this.orders = response;
      }
    },
    error => {
      console.error('Error fetching data:', error);
    }
  );
}

  // Call loadList on component initialization
  ngOnInit() {
    this.loadList();
  }

}
