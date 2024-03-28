
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class OrderlistService {

  
  private apiUrl = 'http://localhost:41420/api/OrderDetails/SearchOrders';

  constructor(private http: HttpClient, private Loginservice: LoginService) { }

  GetOrderlist(body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Changed content type
      'Authorization': `Bearer ${this.Loginservice.getToken()}`
    });

    return this.http.post(this.apiUrl, body, { headers });
  }

}
