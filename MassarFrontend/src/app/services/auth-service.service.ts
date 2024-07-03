import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user'; 
import { StorageService } from './storage.service'; 
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { AuthResponseData } from '../models/auth-response-data';
import { Router } from '@angular/router'; 
import { RegisterUser } from '../models/register-user';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  AuthenticatedUser$ = new BehaviorSubject<User | null>(null); 

  constructor(
    private http: HttpClient, 
    private storageService: StorageService, 
    private router: Router,
    @Inject('BaseURL') private baseURL: any,
  ) { }

 
  login(email: string, password: string) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
        'Authorization': 'Basic ' + window.btoa(email + ':' + password) 
      }),
      withCredentials: true 
    };
    
    return this.http.post<AuthResponseData>(this.baseURL + 'auth/login', null, httpOptions).pipe(
      catchError(err => {
        let errorMessage = 'An unknown error occurred!';
        
       
        errorMessage = 'The email address or password you entered is invalid';
       
        return throwError(() => new Error(errorMessage));
      }),
      tap(user => {
        const extractedUser: User = {
          email: user.email,
          id: user.id,
          role: {
            name: user.roles.find(role => role.includes('ROLE')) || '',
            permissions: user.roles.filter(permission => !permission.includes('ROLE'))
          }
        };
        this.storageService.saveUser(extractedUser); 
        this.AuthenticatedUser$.next(extractedUser); 
      })
    );
  }
  
  // Method to register a new user
  register(user: RegisterUser) {
    return this.http.post<RegisterUser>(this.baseURL + 'auth/register', user).pipe(
      catchError(err => {
        let errorMessage = 'An unknown error occurred!';
        if (err.error.message === 'User already exists') {
          errorMessage = 'This email address is already registered';
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  // Method to automatically log in a user if they are already authenticated
  autoLogin() {
    const userData = this.storageService.getSavedUser();
    if (!userData) {
      return;
    }
    this.AuthenticatedUser$.next(userData); // Update BehaviorSubject with authenticated user
  }

  // Method to log out the current user
  logout() {
    this.http.request('post', this.baseURL + 'auth/signout', {
      withCredentials: true // Include credentials (cookies) in the request
    }).subscribe({
      next: () => {
        this.storageService.clean(); // Clear local storage
        this.AuthenticatedUser$.next(null); // Reset authenticated user
        this.router.navigate(['/signin']); // Navigate to the sign-in page
      }
    });
  }
}
