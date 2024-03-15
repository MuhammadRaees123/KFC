import { Injectable } from '@angular/core';
import { PaneOptions } from '../Interface/pane-options';

@Injectable({
  providedIn: 'root'
})
export class HighchartStoremeterService {

  getDefaultPaneOptions(): PaneOptions[] {
    return [
      {
        startAngle: -150,
        endAngle: 150,
        background: null,
        center: ['25%', '50%'],
        size: '70%'
      },
      {
        startAngle: -150,
        endAngle: 150,
        background: null,
        center: ['75%', '50%'],
        size: '70%'
      }
    ];
  }
}