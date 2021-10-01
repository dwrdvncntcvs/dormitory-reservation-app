import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserData } from 'src/app/models/userData';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.page.html',
  styleUrls: ['./tenant.page.scss'],
})
export class TenantPage implements OnInit {
  userData: any;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit = () => {};

  ionViewDidEnter = () => {
    this.activatedRoute.paramMap.subscribe((params) => {
      console.log(params);
      const isVerified = params['params'].isVerified;
      this.getAllUsers('tenant', isVerified);
    });
  };

  getAllUsers = (role, filter) => {
    this.userService.getAllUserRequest(role, filter).then((response) => {
      response.subscribe(
        (userData) => {
          console.log('User Data: ', userData['tenantUsers']);
          const userArr = userData;
          let arrValue;
          if (userArr === []) {
            arrValue = null;
          } else {
            arrValue = new UserData(userArr, role);
          }
          console.log('Current User Data: ', arrValue);
          this.userData = arrValue['tenantData'];
          console.log(this.userData);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  };
}
