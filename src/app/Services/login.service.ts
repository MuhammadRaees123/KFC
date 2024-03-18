import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  // private apiUrl = 'https://icoremis.techinnsoft.com';
  // private apiUrl = 'http://172.16.35.5:9977/api/token';
   private apiUrl = 'http://localhost:41420';
  
// 2
private authToken: string | null = null;
// 3
  constructor(private http: HttpClient) { }
  // 4

  login(email: any, password: any ): Observable<any> {
    const loginData = {
      email: email,
      password: password,
      grant_type: "password" // Adding the grant_type parameter
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      //'tenant': 'root',

    });

    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);
    body.set('grant_type', 'password');
///api/tokens
    return this.http.post(`${this.apiUrl}/token`, body.toString(),{headers: headers}).pipe(
      map((response: any) => {
        console.log('Login Response:', response); // Log the response
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

    // // Function to set the authentication token in local storage
    // setToken(token: string): void {
    //   localStorage.setItem('authToken', token);
    // }

    // Function to set the authentication token in Global storage
  setToken(token: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  // 8 

    // // Function to get the authentication token from local storage
    // getToken(): string | null {
    //   return localStorage.getItem('authToken');
    // }

    // Function to get the authentication token from global storage
  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  // 9

    // // Function to remove the authentication token from local storage
    // removeToken(): void {
    //   localStorage.removeItem('authToken');
    // }

  // Function to remove the authentication token from Global storage
  removeToken(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  // 10
}