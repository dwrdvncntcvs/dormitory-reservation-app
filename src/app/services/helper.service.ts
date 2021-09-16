import { HostListener, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  activePlatform: string;
  screenHeight: number;
  screenWidth: any;
  constructor(private router: Router, private platform: Platform) {}

  checkRole(role, userRole) {
    if (role !== userRole) {
      console.log("Role: " + role)
      console.log("User Role: " + userRole);
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
      }
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
      }
      return platformProps;
    }
  }
}
