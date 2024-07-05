import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { AuthResponseData } from 'src/app/models/auth-response-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  errorMessage: string = ''; // Initialize errorMessage

  AuthUserSub: Subscription | undefined; // Initialize AuthUserSub as Subscription or undefined

  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit() {
    // Auto-login if there's a saved user
    this.authService.autoLogin();

    // Subscribe to the AuthenticatedUser$ observable to monitor authentication state
    this.AuthUserSub = this.authService.AuthenticatedUser$.subscribe({
      next: user => {
        // If a user is authenticated, navigate based on their role
        if (user) {
          this.navigateBasedOnRole(user);
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

    // Call the login method from authService
    this.authService.login(email, password).subscribe(
      (userData: AuthResponseData) => {
        if (userData) {
          this.navigateBasedOnRole(userData); // Navigate based on the user's role
        } else {
          this.router.navigate(['/']); // Navigate to the default route if user data is not available
        }
      },
      (error: any) => {
        // Handle login errors
        this.errorMessage = error.message;
        this.router.navigate(['/']); // Navigate to the default route on error
      }
    );
  }

  navigateBasedOnRole(user: any /* ajustez le type de user en fonction de votre modèle User */) {
    if (user.role === 'ROLE_Admin') {
      this.router.navigate(['/admin']);
    } else if (user.role === 'ROLE_Participant') {
      this.router.navigate(['/participant']);
    } else if (user.role === 'ROLE_Randonneur') {
      this.router.navigate(['/randonneur']);
    } else {
      this.router.navigate(['/']); // Naviguer vers la route par défaut si le rôle est inconnu
    }
  }

  // Lifecycle hook that is called when the component is destroyed
  ngOnDestroy() {
    // Unsubscribe from the AuthenticatedUser$ observable to prevent memory leaks
    if (this.AuthUserSub) {
      this.AuthUserSub.unsubscribe();
    }
  }
}