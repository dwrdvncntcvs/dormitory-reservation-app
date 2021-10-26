import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData: any;

  imagePath: any;
  imgURL: any;
  imgFormat: any;

  verifyProfileToggle: boolean = false;

  currentPlatform: string;

  documents = {
    selectedDocument: '',
  };
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
        });
      });
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
        console.log(this.userData);
      });
    });
  };

  signOutAction = () => {
    this.userService.logOutRequest();
    this.userData = null;
  };
}
