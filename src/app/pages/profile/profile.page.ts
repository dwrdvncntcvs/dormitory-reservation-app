import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  ionViewDidEnter = () => {
    this.getUserData();
  }

  getUserData = () => {
    return this.userService.userProfileRequest().then((response) => {
      console.log(response);
      response.subscribe((userProfile) => {
        console.log(userProfile);
        this.userData = userProfile['user'];
        console.log(this.userData);
      });
    });
  };

  signOutAction = () => {
    this.userService.logOutRequest();
    this.userData = null;
  };
}
