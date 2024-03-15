import { Component } from '@angular/core';
import { SidebaarComponent } from '../sidebaar/sidebaar.component';
import { RiderRatingHeaderComponent } from '../../header/rider-rating-header/rider-rating-header.component';
import { RiderSettingHeaderComponent } from '../../header/rider-setting-header/rider-setting-header.component';

@Component({
  selector: 'app-rider-setting',
  standalone: true,
  imports: [SidebaarComponent,RiderSettingHeaderComponent],
  templateUrl: './rider-setting.component.html',
  styleUrl: './rider-setting.component.css'
})
export class RiderSettingComponent {

  FirstName= 'Rana';
  LastName= 'Billal';
  MiddleName = 'Khatak';
  ContectNumber = '03127654321';
  Branch= 'MallRoad';
  
}
