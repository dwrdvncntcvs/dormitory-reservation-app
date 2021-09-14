import { Component, HostListener, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  screenHeight: number;
  screenWidth: number;

  activePlatform: string;

  constructor(private platform: Platform) {
    this.checkPlatform();
  }

  ngOnInit() {}

  @HostListener('window:resize', ['$event'])
  checkPlatform() {
    if (this.platform.is('desktop')) {
      this.activePlatform = 'web';
      this.screenHeight = this.platform.height();
      this.screenWidth = this.platform.width();
    }
    if (this.platform.is('android')) {
      this.activePlatform = 'android';
      this.screenHeight = this.platform.height();
      this.screenWidth = this.platform.width();
    }
  }
}
