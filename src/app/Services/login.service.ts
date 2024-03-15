import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


 // private apiUrl = 'https://icoremis.techinnsoft.com';
  private apiUrl = 'http://172.16.35.5:9977/api/token';
  
// 2
private authToken: string | null = null;
// 3
  constructor(private http: HttpClient) { }
  // 4

  login(email: any, password: any): Observable<any> {
    const loginData = {
      email: email,
      password: password,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'tenant': 'root',
    });

    return this.http.post(`${this.apiUrl}/api/tokens`, loginData,{headers}).pipe(
      map((response: any) => {
        if (response && response.token) {
          this.authToken = response.token;
          this.setToken(this.authToken || ""); 
        }
        return response;
      })
    );;
  }

  // 5

  logout(): Observable<any> {
    this.setToken("");
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  // 6
  isLoggedIn(): boolean {
    console.log('isloggedin', this.authToken);
    this.authToken = this.getToken();
    // Check if the user is logged in based on the presence of a token
    return !!this.authToken;
  }

  // 7

  setToken(token: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  // 8 

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  // 9
  removeToken(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  // 10
}
