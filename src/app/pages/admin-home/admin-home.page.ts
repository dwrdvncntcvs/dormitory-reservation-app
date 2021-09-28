import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {
  userData;
  userProfileImage;
  dashboardToggle: boolean = false;
  adminToggle: boolean = false;
  ownerToggle: boolean = false;
  tenantToggle: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    this.toggle('dashboard')
  }

  toggle = (toBeDisplay) => {
    if (toBeDisplay === 'dashboard') {
      this.dashboardToggle = true;
      this.adminToggle = false;
      this.tenantToggle = false;
      this.ownerToggle = false;
    } else if (toBeDisplay === 'admin') {
      this.dashboardToggle = false;
      this.adminToggle = true;
      this.tenantToggle = false;
      this.ownerToggle = false;
    } else if (toBeDisplay === 'tenant') {
      this.dashboardToggle = false;
      this.adminToggle = false;
      this.tenantToggle = true;
      this.ownerToggle = false;
    } else if (toBeDisplay === 'owner') {
      this.dashboardToggle = false;
      this.adminToggle = false;
      this.tenantToggle = false;
      this.ownerToggle = true;
    }
  };

  ngOnInit = () => {};

  ionViewDidEnter = () => {
    this.userService.userProfileRequest().then((response) => {
      console.log(response);
      response.subscribe((userData) => {
        console.log(userData);
        this.userData = userData['user'];
        this.userProfileImage = userData['user'].ProfileImage;
      });
    });
  };

  signOutAction = () => {
    this.userService.logOutRequest();
    this.router.navigateByUrl('admin-login');
  };
}
