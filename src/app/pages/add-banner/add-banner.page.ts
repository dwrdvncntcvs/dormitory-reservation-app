import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { ImageService } from 'src/app/services/image.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.page.html',
  styleUrls: ['./add-banner.page.scss'],
})
export class AddBannerPage implements OnInit {
  dormitoryId: number;
  imagePath: any;
  imgFormat: any;
  imgURL: any;
  currentPlatform: string;
  errorMessage: string = '';

  constructor(
    private imageService: ImageService,
    private modalController: ModalController,
    private platform: Platform,
    private navParams: NavParams,
    private dormitoriesService: DormitoriesService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.checkPlatform();
    this.getParamsValue();
  }

  fadeOuterroMsg() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
  checkPlatform = async () => {
    const plt = this.platform;
    await plt.ready();
    if (plt.is('android')) {
      this.currentPlatform = 'android';
    } else if (plt.is('desktop')) {
      this.currentPlatform = 'desktop';
    }
  };

  getParamsValue = () => {
    const paramValue = this.navParams.get('dormitoryId');
    this.dormitoryId = paramValue;
  };

  getImageFile = (file) => {
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

  closeModal = () => {
    this.modalController.dismiss();
  };

  uploadBannerImageAction = (dormitoryId: number) => {
    const image = this.imagePath;
    if (image === undefined) {
      return (
        this.fadeOuterroMsg(),
        (this.errorMessage = 'Please Add Image to Upload')
      );
    }
    const ext = this.imagePath.type;
    const idObj = {
      id: dormitoryId,
    };
    this.loadingService.createNewLoading('Uploading banner please wait...');
    this.dormitoriesService
      .addDormitoryBannerRequest(image, idObj, ext)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            this.loadingService.dismissLoading();
            this.router.navigate([
              `owner-tabs/dormitory-detail/${dormitoryId}`,
            ]);

            this.modalController.dismiss();
          },
          (err) => {
            this.loadingService.dismissLoading();
            this.errorMessage = err['error'].msg;
            this.fadeOuterroMsg();
          }
        );
      });
  };
}
