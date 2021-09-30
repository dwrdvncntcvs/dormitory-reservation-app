import { AuthGuard } from './../../guards/auth.guard';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { api } from 'src/api';
import { DormitoriesService } from 'src/app/services/dormitories.service';

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
  listToggle: boolean = false;

  //Users Array of Objects
  userAccountData;
  adminData;
  ownerData;
  tenantData;

  numberOfAdmin;
  numberOfOwner;
  numberOfTenant;

  notVerifiedUserData;
  notVerifiedOwnerData;
  notVerifiedTenantData;

  numberOfNotVerifiedOwner;
  numberOfNotVerifiedTenant;

  verifiedDormitories;
  notVerifiedDormitories;

  numberOfVerifiedDormitories;
  numberOfNotVerifiedDormitories;

  constructor(
    private userService: UserService,
    private router: Router,
    private dormitoriesService: DormitoriesService
  ) {}

  getAllUser = (role, filter = 'true') => {
    this.userService.getAllUserRequest(role, filter).then((response) => {
      console.log(response);
      response.subscribe((usersData) => {
        console.log(usersData);
        this.userAccountData = usersData;
        this.adminData = this.userAccountData.adminUsers;
        this.ownerData = this.userAccountData.ownerUsers;
        this.tenantData = this.userAccountData.tenantUsers;
        this.numberOfAdmin = this.adminData.length;
        this.numberOfOwner = this.ownerData.length;
        this.numberOfTenant = this.tenantData.length;
      });
    });
  };

  getAllNotVerifiedUsers = (role, isVerified = false) => {
    this.userService.getAllUserRequest(role, isVerified).then((response) => {
      response.subscribe((notVerifiedUsers) => {
        console.log(notVerifiedUsers);
        this.notVerifiedUserData = notVerifiedUsers;
        this.notVerifiedOwnerData = this.notVerifiedUserData.ownerUsers;
        this.notVerifiedTenantData = this.notVerifiedUserData.tenantUsers;
        this.numberOfNotVerifiedOwner = this.notVerifiedOwnerData.length;
        this.numberOfNotVerifiedTenant = this.notVerifiedTenantData.length;
      });
    });
  };

  getAllDomritories = (filter) => {
    if (filter === true) {
      this.dormitoriesService
        .getAllDormitoriesAdminRequest(filter)
        .then((response) => {
          response.subscribe((dormitoryData) => {
            console.log('TRUE', dormitoryData);
            this.verifiedDormitories = dormitoryData;
            this.numberOfVerifiedDormitories = this.verifiedDormitories.dormitories.length;
            console.log(this.numberOfVerifiedDormitories);
          });
        });
    } else if (filter === false) {
      this.dormitoriesService
        .getAllDormitoriesAdminRequest(filter)
        .then((response) => {
          response.subscribe((dormitoryData) => {
            console.log('FALSE', dormitoryData);
            this.notVerifiedDormitories = dormitoryData;
            console.log(this.notVerifiedDormitories);
            this.numberOfNotVerifiedDormitories =
              this.notVerifiedDormitories.dormitories.length;
            console.log(this.numberOfNotVerifiedDormitories);
          });
        });
    }
  };

  toggle = (toBeDisplay) => {
    if (toBeDisplay === 'dashboard') {
      this.dashboardToggle = true;
      this.adminToggle = false;
      this.tenantToggle = false;
      this.ownerToggle = false;
      this.getAllUser('all');
      this.getAllNotVerifiedUsers('all');
      this.getAllDomritories(true);
      this.getAllDomritories(false);
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
