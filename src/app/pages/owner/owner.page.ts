import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserData } from 'src/app/models/userData';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.page.html',
  styleUrls: ['./owner.page.scss'],
})
export class OwnerPage implements OnInit {
  userData: any;
  isVerifiedDisp: string;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit = () => {};

  ionViewDidEnter = () => {
    this.activatedRoute.paramMap.subscribe((params) => {
      console.log(params);
      const isVerified = params['params'].isVerified;
      this.getAllUsers('owner', isVerified);
      if (isVerified === true) {
        this.isVerifiedDisp = "Verified"
      } else {
        this.isVerifiedDisp = "Not Verified"
      }
    });
  };

  ionViewWillLeave = () => {
    this.userData = null;
  };

  getAllUsers = (role, filter) => {
    this.userService.getAllUserRequest(role, filter).then((response) => {
      response.subscribe(
        (userData) => {
          console.log('User Data: ', userData['ownerUsers']);
          const userArr = userData;
          let arrValue;
          if (userArr === []) {
            arrValue = null;
          } else {
            arrValue = new UserData(userArr, role);
          }
          console.log('Current User Data: ', arrValue['ownerData']);
          this.userData = arrValue['ownerData'];
        },
        (err) => {
          console.log(err);
        }
      );
    });
  };
}
