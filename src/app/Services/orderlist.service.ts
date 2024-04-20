
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class OrderlistService {

  
  private apiUrl = 'http://localhost:41420/api/OrderDetails/SearchOrders';
  private SingleOrderapiUrl = 'http://localhost:41420/api/OrderDetails/SelectSingleOrder';
  

  constructor(private http: HttpClient, private Loginservice: LoginService) { }

  // Get Order details    
  GetOrderlist(body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Changed content type
      'Authorization': `Bearer ${this.Loginservice.getToken()}`
    });

    return this.http.post(this.apiUrl, body, { headers });
  }

    // Get Order details    
    GetSingleOrderlist(body: any): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json', // Changed content type
        'Authorization': `Bearer ${this.Loginservice.getToken()}`
      });
  
      return this.http.post(this.SingleOrderapiUrl, body, { headers });
    }



}
