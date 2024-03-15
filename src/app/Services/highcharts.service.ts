import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import HC_exportData from 'highcharts/modules/export-data';
import HC_accessibility from 'highcharts/modules/accessibility';

@Injectable({
  providedIn: 'root'
})
export class HighchartsService {

  constructor() { }

  init() {
    HC_exporting(Highcharts);
    HC_exportData(Highcharts);
    HC_accessibility(Highcharts);
  }

  createChart(container: string, options: Highcharts.Options) {
    return Highcharts.chart(container, options);
  }
}