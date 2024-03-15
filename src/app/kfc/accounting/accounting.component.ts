import { Component, ElementRef, Renderer2 } from '@angular/core';
import { SidebaarComponent } from '../sidebaar/sidebaar.component';
import { AccountingHeaderComponent } from '../../header/accounting-header/accounting-header.component';

@Component({
  selector: 'app-accounting',
  standalone: true,
  imports: [SidebaarComponent,AccountingHeaderComponent],
  templateUrl: './accounting.component.html',
  styleUrl: './accounting.component.css'
})
export class AccountingComponent {

  RiderName= 'Rana Billal';
  Branch='Mall Road';
  TotalOrders = '12';
  TotalAmount = '3500';

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

}
