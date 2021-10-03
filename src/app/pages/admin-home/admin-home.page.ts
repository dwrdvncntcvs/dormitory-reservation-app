import { AuthGuard } from './../../guards/auth.guard';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { api } from 'src/api';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { UserData } from 'src/app/models/userData';
import { DormitoryData } from 'src/app/models/dormitoryData';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {
  url = api.url;

  nVUserData: UserData;
  vUserData: UserData;

  vDormitoryData: DormitoryData;
  nVDormitoryData: DormitoryData;

  constructor(
    private userService: UserService,
    private router: Router,
    private dormitoriesService: DormitoriesService
  ) {}

  ngOnInit = () => {};

  ionViewDidEnter = () => {
    this.getAllUsers('all', false);
    this.getAllUsers('all', true);
    this.getAllDormitories(true);
    this.getAllDormitories(false);
  };

  goToDormitory = (gender, isVerified) => {
    console.log(
      'Going to Dormitory for ',
      gender,
      ' that has a verification status of ',
      isVerified
    );
    this.router.navigate([`administrator/dormitories/${gender}/isVerified/${isVerified}`]);
  };

  goToUser = (role, isVerified) => {
    console.log(
      'Go to user with role of ' + role + 'and isVerified' + isVerified
    );
    this.router.navigate([
      `administrator/users/${role}/isVerified/${isVerified}`,
    ]);
  };

  getAllDormitories = (filter) => {
    this.dormitoriesService
      .getAllDormitoriesAdminRequest(filter)
      .then((response) => {
        response.subscribe(
          (dormitoriesData) => {
            if (filter === true) {
              console.log(dormitoriesData);
              this.vDormitoryData = new DormitoryData(dormitoriesData);
            } else if (filter === false) {
              console.log(dormitoriesData);
              this.nVDormitoryData = new DormitoryData(dormitoriesData);
            }
          },
          (err) => {
            console.log(err);
          }
        );
      });
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
