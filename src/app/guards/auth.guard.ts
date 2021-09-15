import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { from, Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  //Sample
  canActivate(route: ActivatedRouteSnapshot) {
    return this.userService.loadStoredToken().then((token) => {
      if (token === null) {
        this.router.navigateByUrl('dormRes/home');
      } else {
        console.log('Can Activate: ' + token);
        return true;
      }
    });
  }
}
