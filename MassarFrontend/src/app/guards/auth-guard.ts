import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

import {map, take} from "rxjs";
import { AuthServiceService } from 'src/app/services/auth-service.service';
/*
export const authGuard: CanActivateFn = (
  route,
  state
) => {
  const router = inject(Router);
  const authService = inject(AuthServiceService);

  return authService.AuthenticatedUser$.pipe(
    take(1), // take the first one and then unsubscribe automatically
    map(user => {
      // check if route is restricted by role
      //const  roles  = route.data['roles'];
      const { roles } = route.data;
      if(user && user.role && roles.includes(user.role.name)) {
       return true;
      }
      if(user) {
       return  router.createUrlTree(['/forbidden']);
      }
      return  router.createUrlTree(['/signin']);
    })
  )
};*/