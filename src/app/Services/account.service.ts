// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { LoginService } from './login.service';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AccountService {

//   private apiUrl = 'http://localhost:41420/api/OrderDetails/GetRiderAccounts';

//   constructor(private http: HttpClient, private Loginservice: LoginService) { }

//   GetOrderAccount(body: any): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json', // Changed content type
//       'Authorization': `Bearer ${this.Loginservice.getToken()}`
//     });

//     return this.http.post(this.apiUrl, body, { headers });
//   }
// }

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'http://localhost:41420/api/OrderDetails/GetRiderAccounts';
  private apiUrlDetails = 'http://localhost:41420/api/OrderDetails/GetRiderOrderDetails';

  constructor(private http: HttpClient, private loginService: LoginService) { }

  GetOrderAccount(body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginService.getToken()}`
    });

    return this.http.post(this.apiUrl, body, { headers });
  }

  // Accounting Details Data Fetching Services Method 
  GetOrderAccountDetails(body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginService.getToken()}`
    });

    return this.http.post(this.apiUrlDetails, body, { headers });
  }
}

