import { Component } from '@angular/core';
import { SidebaarComponent } from '../sidebaar/sidebaar.component';
import { RiderSettingHeaderComponent } from '../../header/rider-setting-header/rider-setting-header.component';
import { RidersettengService } from '../../Services/ridersetteng.service';
import { RiderSetting } from '../../Interface/order-list';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rider-setting',
  standalone: true,
  imports: [SidebaarComponent,RiderSettingHeaderComponent, CommonModule, FormsModule],
  templateUrl: './rider-setting.component.html',
  styleUrl: './rider-setting.component.css'
})
export class RiderSettingComponent {

  FirstName= 'Rana';
  LastName= 'Billal';
  MiddleName = 'Khatak';
  ContectNumber = '03127654321';
  Branch= 'MallRoad';

  constructor( private ridersetting: RidersettengService) { }

    // Fetching Data From Api of Order Details

public setting: RiderSetting[] = [];

ngOnInit() {
  this.loadList();
}

loadList() {
  const body = {
    BranchId: 158,
    DriverId: 0,
    EndTime: '2024-03-23',
    EndTimeInString: '9:59:00 AM',
    EndTimeToString: '03/23/2024',
    IS_ALL: false,
    IS_ARRIVED: true,
    IS_DELIVERED: true,
    IS_DISPATCHED: true,
    IS_NEWORDER: true,
    IS_RECEIVED: true,
    IS_REJECTED: false,
    StartTime: '2024-03-22',
    StartTimeInString: '10:00:00 AM',
    StartTimeString: '03/22/2024',
    StatusId: 0,
    UserName: 'farhanh',
  };

  this.ridersetting.GetRiderSetting(body).subscribe(
    response => {
      console.log('Response:', response); // Log the response to check if data is received
      if (response  && response.length > 0) {
        console.log('Data received:', response); // Log the received data
        this.setting = response;
      }
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}

  
}
