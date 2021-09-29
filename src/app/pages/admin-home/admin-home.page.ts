import { AuthGuard } from './../../guards/auth.guard';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { api } from 'src/api';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {
  url = api.url;

  userData;
  userProfileImage;

  //Toggle
  dashboardToggle: boolean = false;
  adminToggle: boolean = false;
  ownerToggle: boolean = false;
  tenantToggle: boolean = false;
  toggleMore: boolean = false;

  //Users Array of Objects
  userAccountData;
  adminData;
  ownerData;
  tenantData;

  constructor(private userService: UserService, private router: Router) {}

  getAllUser = (role, filter = 'true') => {
    this.userService.getAllUserRequest(role, filter).then((response) => {
      console.log(response);
      response.subscribe((usersData) => {
        console.log(usersData);
        this.userAccountData = usersData;
        if (role === 'admin') {
          this.adminData = this.userAccountData.adminUsers;
        } else if (role === 'owner') {
          this.ownerData = this.userAccountData.ownerUsers;
        } else if (role === 'tenant') {
          this.tenantData = this.userAccountData.tenantUsers;
        }
      });
    });
  };

  toggle = (toBeDisplay) => {
    if (toBeDisplay === 'dashboard') {
      this.dashboardToggle = true;
      this.adminToggle = false;
      this.tenantToggle = false;
      this.ownerToggle = false;
      this.getAllUser('all');
    } else if (toBeDisplay === 'admin') {
      this.dashboardToggle = false;
      this.adminToggle = true;
      this.tenantToggle = false;
      this.ownerToggle = false;
      this.getAllUser(toBeDisplay);
    } else if (toBeDisplay === 'tenant') {
      this.dashboardToggle = false;
      this.adminToggle = false;
      this.tenantToggle = true;
      this.ownerToggle = false;
      this.getAllUser(toBeDisplay);
    } else if (toBeDisplay === 'owner') {
      this.dashboardToggle = false;
      this.adminToggle = false;
      this.tenantToggle = false;
      this.ownerToggle = true;
      this.getAllUser(toBeDisplay);
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
        if (this.userData.role !== 'admin') {
          this.router.navigate(['dormRes/home']);
        }
      });
    });
    this.toggle('dashboard');
  };

  signOutAction = () => {
    this.userService.logOutRequest();
    this.router.navigateByUrl('admin-login');
  };
}
