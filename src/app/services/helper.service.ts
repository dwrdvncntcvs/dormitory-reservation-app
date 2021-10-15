import { HostListener, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { UserService } from './user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  activePlatform: string;
  screenHeight: number;
  screenWidth: any;
  constructor(
    private router: Router,
    private platform: Platform,
    private userService: UserService
  ) {}

  checkRole(role, userRole) {
    if (role !== userRole) {
      console.log('Role: ' + role);
      console.log('User Role: ' + userRole);
      this.router.navigateByUrl('dormRes/home');
    }
  }

  @HostListener('window:resize', ['$event'])
  checkPlatform() {
    if (this.platform.is('desktop')) {
      this.activePlatform = 'web';
      this.screenHeight = this.platform.height();
      this.screenWidth = this.platform.width();
      const platformProps = {
        platform: this.activePlatform,
        height: this.screenHeight,
        width: this.screenWidth,
      };
      return platformProps;
    }
    if (this.platform.is('android')) {
      this.activePlatform = 'android';
      this.screenHeight = this.platform.height();
      this.screenWidth = this.platform.width();
      const platformProps = {
        platform: this.activePlatform,
        height: this.screenHeight,
        width: this.screenWidth,
      };
      return platformProps;
    }
  }

  checkUserRole = async () => {
    const token = await this.userService.loadStoredToken();
    const decoded_token = helper.decodeToken(token);
    console.log('Decode Token: ', decoded_token);
    if (decoded_token.role === 'owner') {
      this.router.navigateByUrl('/owner-tabs/dormitory-list');
    } else if (decoded_token.role === 'admin') {
      this.router.navigateByUrl('/administrator/admin-home');
    } else if (decoded_token.role === 'tenant') {
      this.router.navigateByUrl('/dormRes/home');
    }
  };
}
