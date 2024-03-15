import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import path from 'node:path';
import { OrderListComponent } from './kfc/order-list/order-list.component';
import { LoginComponent } from './kfc/login/login.component';
import { AccountingComponent } from './kfc/accounting/accounting.component';
import { RiderSettingComponent } from './kfc/rider-setting/rider-setting.component';
import { ReportsComponent } from './kfc/reports/reports.component';
import { StatisticsComponent } from './kfc/statistics/statistics.component';
import { HighchartComponent } from './kfc/highchart/highchart.component';
import { RiderRatingComponent } from './kfc/rider-rating/rider-rating.component';
import { RiderMapTVComponent } from './kfc/rider-map-tv/rider-map-tv.component';
import { AlertComponent } from './header/alert/alert.component';
import { HighchartSpeedservicesComponent } from './kfc/highchart-speedservices/highchart-speedservices.component';
import { HighchartStoremeterComponent } from './kfc/highchart-storemeter/highchart-storemeter.component';

export const routes: Routes = [

    // ***  KFC Module Start *** //

    { path: '', redirectTo: '/Login', pathMatch: 'full' },

    {
        path: 'Login',
        component: LoginComponent
    },

    {
        path: 'Index',
        component: OrderListComponent
        
    },

    {
        path: 'Accounting',
        component: AccountingComponent
    },

    {
        path: 'RiderSetting',
        component: RiderSettingComponent
    },

    {
        path: 'Reports',
        component: ReportsComponent
    },

    {
        path: 'Statistics',
        component: StatisticsComponent
    },

    {
        path: 'Highchart',
        component: HighchartComponent
    },

    {
        path: 'RiderRating',
        component: RiderRatingComponent
    },

    {
        path: 'RiderMapTV',
        component: RiderMapTVComponent
    },

    {
        path: 'Alert',
        component: AlertComponent
    },

    {
        path: 'HighchartStoremeter',
        component: HighchartStoremeterComponent
    }

    // ***  KFC Module End *** //

];


