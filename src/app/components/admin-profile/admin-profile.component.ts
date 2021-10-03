import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { api } from 'src/api';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from '../../models/userModel';
import { ProfileImage } from 'src/app/models/profileImage';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss'],
})
export class AdminProfileComponent implements OnInit {
  url: string = api.url;
  imageSource: any;
  alt: string;
  addOrRemoveImage: string;
  addOrRemoveImageBtnColor: string;

  userData: UserModel = null;
  profileImageData: ProfileImage = null;

  public dashboardBtnStatus: Boolean = false;

  buttonStatus = () => {
    if (this.router.url === '/administrator/admin-home') {
      console.log(this.router.url);
      const buttonStatus = !this.dashboardBtnStatus;
      return buttonStatus;
    }
  };

  buttons = [
    {
      name: 'Dashboard',
      color: 'primary',
      buttonStatus: this.buttonStatus(),
      toDo: () => {
        this.goToDashboard();
      },
    },
    {
      name: 'Edit',
      color: 'primary',
      buttonStatus: false,
      toDo: () => {
        this.editProfile();
      },
    },
    {
      name: 'Sign Out',
      color: 'danger',
      buttonStatus: false,
      toDo: () => {
        console.log('Sign Out');
        this.signOutAction();
      },
    },
  ];

  constructor(private userService: UserService, private router: Router) {
    this.getUserProfile();
  }

  ngOnInit() {

  }

  editProfile = () => {
    console.log('Edit Profile');
  };

  goToDashboard = () => {
    console.log('Go To Dashboard');
    this.router.navigate(['administrator/admin-home']);
  };

  getUserProfile = () => {
    this.userService.userProfileRequest().then((response) => {
      response.subscribe(
        (userProfileData) => {
          console.log(userProfileData['user']['ProfileImage']);
          const user = userProfileData['user'];
          const image = userProfileData['user']['ProfileImage'];

          this.userData = user ? new UserModel(user) : null;
          this.profileImageData = image ? new ProfileImage(image) : null;
          this.imageSource = this.profileImageData
            ? `${this.url}/image/profileImage/${this.profileImageData.filename}`
            : '../../../assets/images/default_profile.jpg';
          this.alt = this.profileImageData ? 'profile-image' : 'default-image';
          this.addOrRemoveImage = this.profileImageData
            ? 'Remove Image'
            : 'Add Image';
          this.addOrRemoveImageBtnColor = this.profileImageData
            ? 'danger'
            : 'primary';
        },
        (err) => {
          console.log(err);
        }
      );
    });
  };

  signOutAction = () => {
    this.userService.logOutRequest();
    this.router.navigate(['/dormRes']);
  };
}
