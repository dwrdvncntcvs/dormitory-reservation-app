import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserData } from 'src/app/models/userData';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  userData: any;
  isVerifiedDisp: string;
  roleDisp: string;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit = () => {};

  ionViewDidEnter = () => {
    this.getParamsValue();
  };

  getParamsValue() {
    this.activatedRoute.paramMap.subscribe((params) => {
      console.log(params);
      const role = params['params'].role;
      const isVerified = params['params'].isVerified;
      this.getAllUser(role, isVerified);
      this.toDisplayRole(role);
      this.toDisplayIsVerified(isVerified);
    });
  }

  toDisplayRole = (role) => {
    if (role === 'admin') {
      this.roleDisp = 'Admin';
    } else if (role === 'owner') {
      this.roleDisp = 'Owner';
    } else if (role === 'tenant') {
      this.roleDisp = 'Tenant';
    }
  };

  toDisplayIsVerified = (isVerified) => {
    if (isVerified === 'true') {
      this.isVerifiedDisp = 'Verified';
    } else if (isVerified === 'false') {
      this.isVerifiedDisp = 'Not Verified';
    }
  };

  getAllUser = (role, filter) => {
    this.userService.getAllUserRequest(role, filter).then((response) => {
      response.subscribe(
        (userData) => {
          console.log(userData);
          const userArr = userData;
          let roleData;
          if (role === 'admin') {
            roleData = 'adminData';
          } else if (role === 'owner') {
            roleData = 'ownerData';
          } else if (role === 'tenant') {
            roleData = 'tenantData';
          }
          console.log('Role Data to be passed: ' + roleData);

          let arrValue;
          if (userArr === []) {
            arrValue = null;
          } else {
            arrValue = new UserData(userArr, role);
          }
          console.log('Current User Data: ', arrValue[roleData]);
          this.userData = arrValue[roleData];
        },
        (err) => {
          console.log(err);
        }
      );
    });
  };
}
