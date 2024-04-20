import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RidermaptvService {
  private apiUrl = 'http://localhost:41420/api/OrderDetails/GetMapSumamryModel';
  private apiUrlOrder = 'http://localhost:41420/api/OrderDetails/GetBranchOrderList';
  private apiUrlRider = 'http://localhost:41420/api/OrderDetails/GetBranchRiderList';

  constructor(private http: HttpClient, private Loginservice: LoginService) { }

  GetRiderMapDetails(body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Changed content type
      'Authorization': `Bearer ${this.Loginservice.getToken()}`
    });

    return this.http.post(this.apiUrl, body, { headers });
  }

// Delivery Order Details 
  GetRiderOrderlist(body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Changed content type
      'Authorization': `Bearer ${this.Loginservice.getToken()}`
    });

    return this.http.post(this.apiUrlOrder, body, { headers });
  }

  // Rider Status Details

  GetRiderStatus(body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Changed content type
      'Authorization': `Bearer ${this.Loginservice.getToken()}`
    });

    return this.http.post(this.apiUrlRider, body, { headers });
  }
  
}
