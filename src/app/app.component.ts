import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private storage: Storage,
    private platform: Platform
  ) {
    this.storage.create();
    this.appIntroduction();
  }

  appIntroduction = async () => {
    const message: string = 'Welcome to Dormitory Reservation!';
    let lat: number = null;
    let lng: number = null;
    let device: string;
    await this.platform.ready();

    const desktop = this.platform.is('desktop');
    const android = this.platform.is('android');

    if (desktop) {
      device = 'Desktop';
      this.getDesktopLocation(message, lat, lng, device);
    } else if (android) {
      this.getMobileLocation();
    }
  };

  getMobileLocation = () => {
    console.log('Mobile Location');
  };

  getDesktopLocation = (
    message: string,
    lat: number,
    lng: number,
    device: string
  ) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          lat = position.coords.latitude;
          lng = position.coords.longitude;
          console.log('');
          this.appIntorMessage(message, lat, lng, device);
          console.log('');
        },
        (err) => {
          console.log('');
          this.appIntorMessage(message, lat, lng, device);
          console.log('');
        }
      );
    }
  };

  appIntorMessage = (
    message: string,
    lat: number,
    lng: number,
    device: string
  ) => {
    console.log(message.toLocaleUpperCase());
    console.log(' ◾ Your are using', device);
    console.log(` ◾ Your current location:`, lat, lng);
    console.log(
      ' ◾ Here you will be able to find available houses for you to rent under Batangas City. '
    );
    console.log(' ◾ Here you will also be able to be an owner or tenant.');
  };
}
