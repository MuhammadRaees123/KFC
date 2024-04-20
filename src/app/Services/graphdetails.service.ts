import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphdetailsService {
  private GraphapiUrl = 'http://localhost:41420/api/OrderDetails/FilterGraphDetail';

  constructor(private http: HttpClient, private Loginservice: LoginService) { }

//   GetGraphDetails(): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/x-www-form-urlencoded',
//       //'tenant': 'root',

//     });

//     const body = new URLSearchParams();
//     body.set('BranchId','0' );
//     body.set('AreaCoachId', '0');
//     body.set('ConsiderArea', '1');
//     body.set('Criteria','4' );
//     body.set('EndTimeInString', '9:59:00 AM');
//     body.set('ToDateInString', '4/15/2024');
//     body.set('RegionId', '0');
//     body.set('StartTimeInString', '10:00 AM');
//     body.set('FromDateInString', '4/14/2024');
//     body.set('UserName','4' );
// ///api/tokens
//     return this.http.post(`${this.GraphapiUrl}`, body.toString(),{headers: headers}).pipe(
//       map((response: any) => {
//         console.log('Login Response:', response); // Log the response
//         return response;
//       })
//     );

//     //return this.http.post(this.GraphapiUrl, body, { headers });
//   }
  //******************* */

  GetGraphDetails(body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.Loginservice.getToken()}`
    });

    return this.http.post(this.GraphapiUrl, body, { headers });
  }
  
}
