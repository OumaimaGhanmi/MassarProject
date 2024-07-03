import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


 isAuth: boolean = false;

 showAdminBoard = false;

 
 constructor(private authService: AuthServiceService, private router:Router) { }

 ngOnInit(): void {
   
   this.authService.autoLogin();

   this.authService.AuthenticatedUser$.subscribe({
     next: user => { 
     
       if(user) {
     
         this.showAdminBoard = user.role.name === 'ROLE_ADMIN';
         this.isAuth = true;
       } else {
 
         this.showAdminBoard=false;
         this.isAuth = false;
       }
     }
   })
 }

 onSignOut() {
   this.authService.logout();
 }
}
