import { Component } from '@angular/core';
import { SidebaarComponent } from '../sidebaar/sidebaar.component';
import { RiderRatingHeaderComponent } from '../../header/rider-rating-header/rider-rating-header.component';
import { RiderratingService } from '../../Services/riderrating.service';
import { Ratinglist } from '../../Interface/order-list';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rider-rating',
  standalone: true,
  imports: [SidebaarComponent,RiderRatingHeaderComponent, CommonModule, FormsModule],
  templateUrl: './rider-rating.component.html',
  styleUrl: './rider-rating.component.css'
})
export class RiderRatingComponent {

  constructor(private Riderratting: RiderratingService) {}

  // Fetching Data From Api of Order Details

public Rating: Ratinglist[] = [];

ngOnInit() {
  this.loadList();
}

loadList() {
  const body = {
      AreaCoachId: 44,
      BranchId: 74,
      Criteria: 0,
      EndTime: "2024-03-27T09:32:52.779Z",
      EndTimeInString: "9:59",
      EndTimeToString: "3/27/2024",
      FromDate: "2024-03-27T05:00:00.000Z",
      FromDateInString: "03/27/2024",
      RegionId: 0,
      StartTime: "2024-03-27T09:32:52.779Z",
      StartTimeInString: "10:0",
      StartTimeString: "3/27/2024",
      ToDate: "2024-03-28T04:59:00.000Z",
      ToDateInString: "03/28/2024",
      UserName: "farhanh"
  };

  this.Riderratting.GetRiderRating(body).subscribe(
    response => {
      console.log('Response:', response); // Log the response to check if data is received
      if (response  && response.length > 0) {
        console.log('Data received:', response); // Log the received data
        this.Rating = response;
      }
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}


}
