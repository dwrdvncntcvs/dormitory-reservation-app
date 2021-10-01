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

  userData: UserData;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit = () => {};

  ionViewDidEnter = () => {
    this.getAllUsers('all', false);
  };

  goToOwner = (isVerified: boolean) => {
    console.log('Go to Owner');
    this.router.navigate(['admin/owner/isVerified/', isVerified]);
  };

  goToTenant = (isVerified: boolean) => {
    console.log('Go Tenant');
    this.router.navigate(['admin/tenant/isVerified/', isVerified]);
  }

  getAllUsers = (role, filter) => {
    this.userService.getAllUserRequest(role, filter).then((response) => {
      console.log(response);
      response.subscribe(
        (userProfiles) => {
          console.log(userProfiles);
          this.userData = new UserData(userProfiles, role);
        },
        (err) => console.log(err)
      );
    });
  };
}
