import { AuthGuard } from './../../guards/auth.guard';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { api } from 'src/api';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { UserData } from 'src/app/models/userData';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {
  url = api.url;

  nVUserData: UserData;
  vUserData: UserData;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit = () => {};

  ionViewDidEnter = () => {
    this.getAllUsers('all', false);
    this.getAllUsers('all', true);
  };

  goToUser = (role, isVerified) => {
    console.log(
      'Go to user with role of ' + role + 'and isVerified' + isVerified
    );
    this.router.navigate([
      `administrator/users/${role}/isVerified/${isVerified}`,
    ]);
  };

  goToOwner = (isVerified: boolean) => {
    console.log('Go to Owner');
    this.router.navigate(['administrator/owner/isVerified/', isVerified]);
  };

  goToTenant = (isVerified: boolean) => {
    console.log('Go Tenant');
    this.router.navigate(['administrator/tenant/isVerified/', isVerified]);
  };

  getAllUsers = (role, filter) => {
    this.userService.getAllUserRequest(role, filter).then((response) => {
      console.log(response);
      response.subscribe(
        (userProfiles) => {
          console.log(userProfiles);
          if (filter === true) {
            this.vUserData = new UserData(userProfiles, role);
          } else if (filter === false) {
            this.nVUserData = new UserData(userProfiles, role);
          }
        },
        (err) => console.log(err)
      );
    });
  };
}
