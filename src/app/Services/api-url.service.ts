import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {

  private apiUrl: string = 'http://localhost:41420'; // Default API URL

  constructor() { }

  getApiUrl(): string {
    return this.apiUrl;
  }

  setApiUrl(url: string): void {
    this.apiUrl = url;
  }
}
