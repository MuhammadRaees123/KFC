import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartStoremeterComponent } from './highchart-storemeter/highchart-storemeter.component';
import { BrowserModule } from '@angular/platform-browser';
import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import { AgmCoreModule } from '@agm/core';

// Initialize FusionCharts
FusionChartsModule.fcRoot(FusionCharts, Charts);

@NgModule({
  declarations: [HighchartStoremeterComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FusionChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ]
})
export class KFCModule { }
