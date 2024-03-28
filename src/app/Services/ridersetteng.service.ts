import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RidersettengService {
  private apiUrl = 'http://localhost:41420/api/OrderDetails/GetRiderSettingRiderList';

  constructor(private http: HttpClient, private Loginservice: LoginService) { }

  GetRiderSetting(body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Changed content type
      'Authorization': `Bearer ${this.Loginservice.getToken()}`
    });

    return this.http.post(this.apiUrl, body, { headers });
  }
}
