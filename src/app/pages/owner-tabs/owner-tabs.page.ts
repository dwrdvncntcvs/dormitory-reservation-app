import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-owner-tabs',
  templateUrl: './owner-tabs.page.html',
  styleUrls: ['./owner-tabs.page.scss'],
})
export class OwnerTabsPage implements OnInit {
  role = 'owner';

  activePlatform: any;
  screenHeight: number;
  screenWidth: number;

  constructor(
    private authGuard: AuthGuard,
    private router: Router,
    private helperService: HelperService
  ) {}

  ngOnInit() {
    this.helperService.checkRole(this.role, this.authGuard.userRole);

    this.activePlatform = this.helperService.checkPlatform().platform;
    this.screenHeight = this.helperService.checkPlatform().height;
    this.screenWidth = this.helperService.checkPlatform().width;
  }

  ionViewDidEnter = () => {

  };
}
