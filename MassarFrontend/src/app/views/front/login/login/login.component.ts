import { Component, OnDestroy, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {  AuthServiceService } from 'src/app/services/auth-service.service';
import { AuthResponseData } from 'src/app/models/auth-response-data';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit , OnDestroy {
  errorMessage!: string; // Variable to store error messages
  AuthUserSub!: Subscription; // Subscription to the authenticated user observable

 // Inject AuthService and Router in the constructor
 constructor(private authService: AuthServiceService, private router: Router) { }

 // Lifecycle hook that is called after Angular has initialized all data-bound properties
 ngOnInit() {
   
   this.AuthUserSub = this.authService.AuthenticatedUser$.subscribe({
     next: user => {
       
       if (user) {
         this.router.navigate(['']);
       }
     }
   });
 }

 // Method to handle the sign-in form submission
 onSubmitSingin(formLogin: NgForm) {
   // Validate the form
   if (!formLogin.valid) {
     return;
   }

   const email = formLogin.value.email; // Get email from the form
   const password = formLogin.value.password; // Get password from the form

   // Call the login method from AuthService
   this.authService.login(email, password).subscribe({
    next: (authResponse: AuthResponseData) => {
      // Check if 'participant' role exists in roles array
      if (authResponse.roles.includes('Participant')) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/']);
      }
    },
    error: err => {
      this.errorMessage = err;
    }
  });
  
 }

 // Lifecycle hook that is called when the component is destroyed
 ngOnDestroy() {
   // Unsubscribe from the AuthenticatedUser$ observable to prevent memory leaks
   this.AuthUserSub.unsubscribe();
 }
}
 