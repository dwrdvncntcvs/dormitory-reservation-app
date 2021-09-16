import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-tenant-tabs',
  templateUrl: './tenant-tabs.page.html',
  styleUrls: ['./tenant-tabs.page.scss'],
})
export class TenantTabsPage implements OnInit {
  role = 'tenant';

  activePlatform: string;
  screenHeight: number;
  screenWidth: number;

  constructor(
    private authGuard: AuthGuard,
    private router: Router,
    private helperService: HelperService
  ) {
    this.helperService.checkRole(this.role, this.authGuard.userRole);

    this.activePlatform = this.helperService.checkPlatform().platform;
    this.screenHeight = this.helperService.checkPlatform().height;
    this.screenWidth = this.helperService.checkPlatform().width;
  }

  ngOnInit() {}
}
