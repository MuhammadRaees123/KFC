import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = 'http://localhost:41420/api/OrderDetails/GetBranchPerformanceReport';
  private apiUrlrider = 'http://localhost:41420/api/OrderDetails/GetRiderPerformance';
  private apiUrllocation = 'http://localhost:41420/api/OrderDetails/GetOrderDistanceReport';
//  private apiUrlOrderDetails = 'http://localhost:41420/api/OrderDetails/GetRiderOrderDetailsForReport';


  constructor(private http: HttpClient, private Loginservice: LoginService) { }

// Fetching Data of Branch Performance 
  GetReports(body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Changed content type
      'Authorization': `Bearer ${this.Loginservice.getToken()}`
    });
    return this.http.post(this.apiUrl, body, { headers });
  }

  // Fetching Data of Branch Rider Performance 

  GetRierPerformance(body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Changed content type
      'Authorization': `Bearer ${this.Loginservice.getToken()}`
    });
    return this.http.post(this.apiUrlrider, body, { headers });
  }

  // Fetching Data of Order Location 

  GetOrderlocation(body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Changed content type
      'Authorization': `Bearer ${this.Loginservice.getToken()}`
    });
    return this.http.post(this.apiUrllocation, body, { headers });
  }

//  // Fetching Data of Order Location 
//  GetOrderDetails(body: any): Observable<any> {
//   const headers = new HttpHeaders({
//     'Content-Type': 'application/json', // Changed content type
//     'Authorization': `Bearer ${this.Loginservice.getToken()}`
//   });
//   return this.http.post(this.apiUrlOrderDetails, body, { headers });
// }

  
}
