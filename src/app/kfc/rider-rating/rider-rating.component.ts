import { Component } from '@angular/core';
import { SidebaarComponent } from '../sidebaar/sidebaar.component';
import { RiderRatingHeaderComponent } from '../../header/rider-rating-header/rider-rating-header.component';

@Component({
  selector: 'app-rider-rating',
  standalone: true,
  imports: [SidebaarComponent,RiderRatingHeaderComponent],
  templateUrl: './rider-rating.component.html',
  styleUrl: './rider-rating.component.css'
})
export class RiderRatingComponent {

}
