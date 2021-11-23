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
  editToggle: boolean = false;

  userData: UserModel = null;
  profileImageData: ProfileImage = null;

  public dashboardBtnStatus: Boolean = false;

  buttonStatus = () => {
    if (this.router.url === '/administrator/admin-home') {
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
        this.ngOnInit();
      },
    },
    {
      name: 'Sign Out',
      color: 'danger',
      buttonStatus: false,
      toDo: () => {
        this.signOutAction();
      },
    },
  ];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.getUserProfile();
  }

  backButton = () => {
    this.imageToggle = false;
    this.imageUrl = '';
    this.imageSelected = false;
  };

  editToggleAction = () => {
    this.editToggle = !this.editToggle;
  };

  editProfile = () => {
    this.editToggleAction();
  };

  goToDashboard = () => {
    this.router.navigate(['administrator/admin-home']);
    this.ngOnInit();
  };

  removeDisplayImage = () => {
    this.imageUrl = '';
    this.imageSelected = false;
  };

  uploadImage = (userId) => {
    const image = this.imagePath;
    this.userService.addProfileImageRequest(userId, image).then((response) => {
      response.subscribe((response) => {
        this.ngOnInit();
        this.imageToggle = !this.imageToggle;
        this.imageButton = this.removeProfileImage;
        this.imageUrl = '';
        this.imageSelected = false;
      });
    });
  };

  getImageFile = (files) => {
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
    this.imageToggle = !this.imageToggle;
  };

  removeImage = (imageId) => {
    this.userService.deleteProfileImageRequest(imageId).then((response) => {
      response.subscribe((data) => {
        this.ngOnInit();
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
      if (image === null) {
        return;
      }
      const imageId = image.id;
      this.removeImage(imageId);
    },
  };

  editProfileNameAction = (name) => {
    const value = name.value;
    this.userService.editProfileName(value).then((response) => {
      response.subscribe((responseData) => {
        this.editToggle = !this.editToggle;
        this.ngOnInit();
      });
    });
  };

  editProfileUsernameAction = (username) => {
    const value = username.value;

    this.userService.editProfileUsername(value).then((response) => {
      response.subscribe((responseData) => {
        this.editToggle = !this.editToggle;
        this.ngOnInit();
      });
    });
  };

  editProfileAddressAction = (address) => {
    const value = address.value;
    this.userService.editProfileAddress(value).then((response) => {
      response.subscribe((responseData) => {
        this.editToggle = !this.editToggle;
        this.ngOnInit();
      });
    });
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
            ? this.profileImageData.filepath
            : '../../../assets/images/default_profile.jpg';
          this.alt = this.profileImageData ? 'profile-image' : 'default-image';

          if (this.profileImageData !== null) {
            this.imageButton = this.removeProfileImage;
          } else if (this.profileImageData === null) {
            this.imageButton = this.addImage;
          }
        },
        (err) => {}
      );
    });
  };

  signOutAction = () => {
    this.userService.logOutRequest();
    this.router.navigate(['/dormRes']);
  };
}
