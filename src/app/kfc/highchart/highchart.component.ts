import { Component } from '@angular/core';
import { HighchartDispatchComponent } from '../highchart-dispatch/highchart-dispatch.component';
import { HighchartRevenueComponent } from '../highchart-revenue/highchart-revenue.component';
import { HighchartSourceComponent } from '../highchart-source/highchart-source.component';
import { HighchartStoremeterComponent } from '../highchart-storemeter/highchart-storemeter.component';

@Component({
  selector: 'app-highchart',
  standalone: true,
  imports: [HighchartStoremeterComponent],
  templateUrl: './highchart.component.html',
  styleUrl: './highchart.component.css'
})
export class HighchartComponent {

}
