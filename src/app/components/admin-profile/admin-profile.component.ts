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
  imageToggle: boolean = false;
  imageButton: any;
  message: string;
  imagePath: any;
  imgFormat: any;
  imageUrl: any;
  imageSelected: boolean;

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

  ngOnInit() {}

  backButton = () => {
    this.imageToggle = false;
    this.imageUrl = '';
    this.imageSelected = false;
  };

  editProfile = () => {
    console.log('Edit Profile');
  };

  goToDashboard = () => {
    console.log('Go To Dashboard');
    this.router.navigate(['administrator/admin-home']);
  };

  removeDisplayImage = () => {
    this.imageUrl = '';
    this.imageSelected = false;
  };

  uploadImage = (userId) => {
    const image = this.imagePath;
    this.userService.addProfileImageRequest(userId, image).then((response) => {
      response.subscribe((response) => {
        console.log(response);
        this.imageToggle = !this.imageToggle;
        this.imageSource = this.imageUrl;
        this.imageButton = this.removeProfileImage;
        this.imageUrl = '';
        this.imageSelected = false;
        this.getUserProfile();
      });
    });
  };

  getImageFile = (files) => {
    console.log(files);
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    var reader = new FileReader();
    this.imagePath = files[0];
    this.imgFormat = files[0].type;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
      this.imageSelected = true;
    };
  };

  imageToggleAction = () => {
    console.log('Clicked');
    this.imageToggle = !this.imageToggle;
    console.log('Image Toggle Status: ', this.imageToggle);
  };

  removeImage = (imageId) => {
    console.log('Remove');
    this.userService.deleteProfileImageRequest(imageId).then((response) => {
      console.log(response);
      response.subscribe((data) => {
        console.log(data);
        this.imageSource = '../../../assets/images/default_profile.jpg';
        this.imageButton = this.addImage;
      });
    });
  };

  addImage = {
    name: 'Add Image',
    color: 'primary',
    toDo: (image = null) => {
      this.imageToggle = true;
    },
  };

  removeProfileImage = {
    name: 'Remove Image',
    color: 'danger',
    toDo: (image = null) => {
      const imageId = image.id;
      this.removeImage(imageId);
    },
  };

  getUserProfile = () => {
    this.userService.userProfileRequest().then((response) => {
      response.subscribe(
        (userProfileData) => {
          const user = userProfileData['user'];
          const image = userProfileData['user']['ProfileImage'];

          this.userData = user ? new UserModel(user) : null;
          this.profileImageData = image ? new ProfileImage(image) : null;
          this.imageSource = this.profileImageData
            ? `${this.url}/image/profileImage/${this.profileImageData.filename}`
            : '../../../assets/images/default_profile.jpg';
          this.alt = this.profileImageData ? 'profile-image' : 'default-image';

          if (this.profileImageData !== null) {
            this.imageButton = this.removeProfileImage;
            console.log(this.imageButton);
          } else if (this.profileImageData === null) {
            this.imageButton = this.addImage;
            console.log(this.imageButton);
          }
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
