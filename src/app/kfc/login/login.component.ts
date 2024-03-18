import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    //1 
    @ViewChild('emailInput') emailInput:any;
    @ViewChild('passwordInput') passwordInput:any;
  
    // 2
  
    constructor(private Login:LoginService,private router: Router) {
      if(this.Login.isLoggedIn()){
        this.router.navigate(['/Index']);
      }
     }
  
     // 3
  
     onSubmit(event: Event) {
      event.preventDefault();
  
      // Access form values using ViewChild
      const email = (this.emailInput.nativeElement as HTMLInputElement).value;
      const password = (this.passwordInput.nativeElement as HTMLInputElement).value;
  
      this.Login.login(email,password).subscribe(
                (response) => {
                  debugger;
                  console.log('Login Success:', response); // Log success response
                  this.router.navigate(['/Index']);
                  // Handle successful login
                  //this.toaster.success("Login Successfully!","sucess");
  
                },
                (error) => {
                  console.error('Login Error:', error); // Log error response
                  // Handle login error
                }
              );
    }

}
