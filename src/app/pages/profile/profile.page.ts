import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';
import { api } from 'src/api';
import { HelperService } from 'src/app/services/helper.service';
import { LoadingService } from 'src/app/services/loading.service';

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
  verificationSuccess: string = '';
  errorMessage: string = '';

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
    plainConfirmPassword: '',
  };

  @ViewChild('file', { static: false }) file: ElementRef;
  constructor(
    private userService: UserService,
    private router: Router,
    private imageService: ImageService,
    private platform: Platform,
    private loadingService: LoadingService
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

  doRefresh(event) {
    this.ionViewDidEnter();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  refreshAction = () => {
    this.loadingService.createNewLoading('Refreshing profile...');
    this.ionViewDidEnter();
    setTimeout(() => {
      this.loadingService.dismissLoading();
    }, 2000);
  };

  openEditToggle = () => {
    this.getUserData();
    this.editToggle = !this.editToggle;
    this.verifyProfileToggle = false;
    if (this.editToggle === true) {
      this.verifyProfileToggle = false;
      this.imagePath = null;
      this.imgURL = null;
      this.imgFormat = null;
      this.documents.selectedDocument = '';
    }
  };

  openVerifyProfileToggle = () => {
    this.verifyProfileToggle = !this.verifyProfileToggle;
    this.editToggle = false;
    this.imagePath = null;
    this.imgURL = null;
    this.imgFormat = null;
    if (this.verifyProfileToggle === false) {
      this.imagePath = null;
      this.imgURL = null;
      this.imgFormat = null;
      this.documents.selectedDocument = '';
    }
  };

  removeMessage = () => {
    setTimeout(() => {
      this.errorMessage = '';
      this.verificationSuccess = ''
    }, 5000);
  };

  addUserDocumentAction = () => {
    const image = this.imagePath;

    if (image === null || image === undefined) {
      this.errorMessage = 'Please select and upload your document image here';
      this.removeMessage();
      return;
    }

    const ext = this.imagePath.type;
    const documentName = this.documents.selectedDocument;
    const documentType = this.documents.selectedDocument;

    this.loadingService.createNewLoading('Uploading documents please wait...')
    this.userService
      .addUserDocumentRequest(image, ext, documentName, documentType)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            this.getUserData();
            this.loadingService.dismissLoading();
            this.verificationSuccess =
              'Your application for verification has been sent! Please check your email for updates.';
            this.verifyProfileToggle = false;
            this.removeMessage();
          },
          (err) => {
            this.errorMessage = err['error'].message;
            this.removeMessage();
          }
        );
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
  };

  getGalleryPhoto = async () => {
    const imgObj = await this.imageService.getGalleryPhoto();
    this.imagePath = imgObj.imagePath;
    this.imgURL = imgObj.imageURL;
  };

  getUserData = () => {
    return this.userService.userProfileRequest().then((response) => {
      response.subscribe((userProfile) => {
        this.userData = userProfile['user'];
        this.editNameStr = this.userData['name'];
        this.editUsernameStr = this.userData['username'];
        this.editAddressStr = this.userData['address'];
        this.profileImageData = this.userData['ProfileImage'];
        if (this.profileImageData === null) {
          return;
        }
        this.profileImageUrl = this.profileImageData.filepath;
      });
    });
  };

  editNameAction = () => {
    this.userService
      .editProfileNameRequest(this.editNameStr)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            this.getUserData();
          },
          (err) => {}
        );
      });
  };

  editUsernameAction = () => {
    this.userService
      .editProfileUsernameRequest(this.editUsernameStr)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            this.getUserData();
          },
          (err) => {}
        );
      });
  };

  editAddressAction = () => {
    this.userService
      .editProfileAddressRequest(this.editAddressStr)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            this.getUserData();
          },
          (err) => {}
        );
      });
  };

  uploadImageAction = (userId: number) => {
    const image = this.imagePath;
    if (image === null || image === undefined) {
      return;
    }

    const ext = this.imagePath.type;
    this.loadingService.createNewLoading('Uploading Image Please wait...')

    this.userService.addProfileImageRequest(userId, image).then((response) => {
      response.subscribe(
        (responseData) => {
          this.getUserData();
          this.loadingService.dismissLoading();
        },
        (err) => {}
      );
    });
  };

  removeProfileImageAction = (imageId: number) => {
    this.userService.deleteProfileImageRequest(imageId).then((response) => {
      response.subscribe(
        (responseData) => {
          this.getUserData();
        },
        (err) => {}
      );
    });
  };

  changePasswordAction = (userId: number) => {
    const plainPassword = this.password.plainPassword;
    const plainConfirmPassword = this.password.plainConfirmPassword;
    if (plainPassword !== plainConfirmPassword) {
      return;
    }

    this.userService.changePasswordRequest(this.password, userId).subscribe(
      (responseData) => {
        this.getUserData();
        this.password.plainPassword = '';
        this.password.plainConfirmPassword = '';
      },
      (err) => {}
    );
  };

  signOutAction = () => {
    this.userService.logOutRequest();
    this.userData = null;
  };
}
