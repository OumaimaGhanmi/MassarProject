import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterUser } from 'src/app/models/register-user';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit,OnDestroy{
  successMessage!: string; 
  errorMessage!: string; 
  AuthUserSub!: Subscription; 
  registerForm!: FormGroup; 
  constructor( private authService: AuthServiceService, 
    private router: Router, 
    private formBuilder: FormBuilder ){
    
  }
  ngOnInit(): void {
    
    this.AuthUserSub = this.authService.AuthenticatedUser$.subscribe({
      next: user => {
       
        if (user) {
          this.router.navigate(['/']);
        }
      }
    });
    
    this.initForm();
    
  }
  initForm(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', Validators.required],
      tel: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

 
  onSubmitSignup() {
    // Create a new user object from the form values
    const newUser: RegisterUser = {
      firstname: this.registerForm.value.firstname,
      lastname: this.registerForm.value.lastname,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      address: this.registerForm.value.address,
      age: this.registerForm.value.age,
      tel: this.registerForm.value.tel
    };
   
    // Call the register method from AuthService
    this.authService.register(newUser).subscribe({
      next: response => {
        // On successful registration, show success message, clear error message, reset the form, and stop loading
        this.successMessage = 'Registration successful!';
        this.errorMessage = '';
        this.registerForm.reset();
       
        
      },
      error: err => {
        // On error, set the error message, clear success message, and stop loading
        this.errorMessage = err.message;
        this.successMessage = '';
       
      }
    });
  }

  // Lifecycle hook that is called when the component is destroyed
  ngOnDestroy() {
    // Unsubscribe from the AuthenticatedUser$ observable to prevent memory leaks
    this.AuthUserSub.unsubscribe();
  }

}
