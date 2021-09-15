import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  userRole = '';

  //Sample
  canActivate(route: ActivatedRouteSnapshot) {
    return this.userService.loadStoredToken().then((token) => {
      if (token === null) {
        this.router.navigateByUrl('dormRes/home');
      } else {
        console.log('Can Activate: ' + token);
        const decoded_token = helper.decodeToken(token);
        console.log('Decoded token: ' + decoded_token.role);
        this.userRole = decoded_token.role;
        return true
      }
    });
  }
}
