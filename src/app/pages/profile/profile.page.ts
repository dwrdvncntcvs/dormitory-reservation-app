import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';
import { api } from 'src/api';

const api_url = api.url;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileImageData: any;
  userData: any;
  profileImageUrl: string;

  imagePath: any;
  imgURL: any;
  imgFormat: any;

  verifyProfileToggle: boolean = false;
  editToggle: boolean = false;

  currentPlatform: string;

  editNameStr: string;
  editUsernameStr: string;
  editAddressStr: string;

  documents = {
    selectedDocument: '',
  };

  password = {
    plainPassword: '',
    plainConfirmPassword: ''
  }

  @ViewChild('file', { static: false }) file: ElementRef;
  constructor(
    private userService: UserService,
    private router: Router,
    private imageService: ImageService,
    private platform: Platform
  ) {}

  ngOnInit() {}

  ionViewDidEnter = () => {
    this.checkPlatform();
    this.getUserData();
  };

  checkPlatform = () => {
    const plt = this.platform;
    if (plt.is('desktop')) {
      this.currentPlatform = 'desktop';
    } else if (plt.is('android')) {
      this.currentPlatform = 'android';
    }
  };

  openEditToggle = () => {
    this.getUserData();
    this.editToggle = !this.editToggle;
    if (this.editToggle === true) {
      this.verifyProfileToggle = false;
    }
  };

  openVerifyProfileToggle = () => {
    this.verifyProfileToggle = !this.verifyProfileToggle;
    if (this.verifyProfileToggle === false) {
      this.imagePath = null;
      this.imgURL = null;
      this.imgFormat = null;
      this.documents.selectedDocument = '';
    }
  };

  addUserDocumentAction = () => {
    const image = this.imagePath;
    const ext = this.imagePath.type;
    const documentName = this.documents.selectedDocument;
    const documentType = this.documents.selectedDocument;

    this.userService
      .addUserDocumentRequest(image, ext, documentName, documentType)
      .then((response) => {
        response.subscribe((responseData) => {
          console.log(responseData);
          this.getUserData();
          this.verifyProfileToggle = false;
        });
      });
  };

  removeSelectedImage = () => {
    this.imagePath = undefined;
    this.imgURL = undefined;
    this.file.nativeElement.value = '';
  };

  getImageFile = (file: any) => {
    const files = this.imageService.getImageFile(file);

    var reader = new FileReader();
    this.imagePath = files[0];
    this.imgFormat = files[0].type;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  };

  getCameraPhoto = async () => {
    const imgObj = await this.imageService.getCameraPhoto();
    this.imagePath = imgObj.imagePath;
    this.imgURL = imgObj.imageURL;
    console.log('IMAGE PATH: ' + this.imagePath);
    console.log('IMAGE URL: ' + this.imgURL);
  };

  getGalleryPhoto = async () => {
    const imgObj = await this.imageService.getGalleryPhoto();
    this.imagePath = imgObj.imagePath;
    this.imgURL = imgObj.imageURL;
    console.log('IMAGE PATH: ' + this.imagePath);
    console.log('IMAGE URL: ' + this.imgURL);
  };

  getUserData = () => {
    return this.userService.userProfileRequest().then((response) => {
      console.log(response);
      response.subscribe((userProfile) => {
        console.log(userProfile);
        this.userData = userProfile['user'];
        this.editNameStr = this.userData['name'];
        this.editUsernameStr = this.userData['username'];
        this.editAddressStr = this.userData['address'];
        this.profileImageData = this.userData['ProfileImage']
        if (this.profileImageData === null) {
          return;
        }
        const filename = this.profileImageData['filename'];
        this.profileImageUrl = `${api_url}/image/profileImage/${filename}`;
        console.log(this.userData);
      });
    });
  };

  editNameAction = () => {
    console.log('Name: ', this.editNameStr);
    this.userService
      .editProfileNameRequest(this.editNameStr)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            console.log(responseData);
            this.getUserData();
          },
          (err) => {
            console.log(err);
          }
        );
      });
  };

  editUsernameAction = () => {
    console.log('Username: ', this.editUsernameStr);
    this.userService
      .editProfileUsernameRequest(this.editUsernameStr)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            console.log(responseData);
            this.getUserData();
          },
          (err) => {
            console.log(err);
          }
        );
      });
  };

  editAddressAction = () => {
    console.log('Address: ', this.editAddressStr);
    this.userService
      .editProfileAddressRequest(this.editAddressStr)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            console.log(responseData);
            this.getUserData();
          },
          (err) => {
            console.log(err);
          }
        );
      });
  };

  uploadImageAction = (userId: number) => {
    const image = this.imagePath;
    if (image === null || image === undefined) {
      console.log('None');
      return;
    }

    const ext = this.imagePath.type;
    console.log('Image Path: ', image);
    console.log('Extension: ', ext);
    console.log('User ID: ', userId);

    this.userService.addProfileImageRequest(userId, image).then((response) => {
      response.subscribe(
        (responseData) => {
          console.log(responseData);
          this.getUserData();
        },
        (err) => {
          console.log(err);
        }
      );
    });
  };

  removeProfileImageAction = (imageId: number) => {
    this.userService.deleteProfileImageRequest(imageId).then((response) => {
      response.subscribe(
        (responseData) => {
          console.log(responseData);
          this.getUserData();
        },
        (err) => {
          console.log(err);
        }
      );
    });
  };

  changePasswordAction = (userId: number) => {
    const plainPassword = this.password.plainPassword;
    const plainConfirmPassword = this.password.plainConfirmPassword;
    if (plainPassword !== plainConfirmPassword) {
      console.log("Error");
      return;
    }
    console.log("Password: ", this.password.plainPassword);
    console.log("Confirm Password: ", plainConfirmPassword)

    this.userService
      .changePasswordRequest(this.password, userId)
      .subscribe((responseData) => {
        console.log(responseData);
        this.getUserData();
        this.password.plainPassword = '';
        this.password.plainConfirmPassword = '';
      }, err => {
        console.log(err);
      });
  }

  signOutAction = () => {
    this.userService.logOutRequest();
    this.userData = null;
  };
}
