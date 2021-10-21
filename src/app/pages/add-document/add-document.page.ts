import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { HelperService } from 'src/app/services/helper.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.page.html',
  styleUrls: ['./add-document.page.scss'],
})
export class AddDocumentPage implements OnInit {
  dormitoryId: number;
  imagePath: any;
  imgFormat: any;
  imgURL: any;
  currentPlatform: string;

  document = {
    documentType: '',
  };

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private router: Router,
    private dormitoriesService: DormitoriesService,
    private imageService: ImageService,
    private platform: Platform
  ) {
    this.checkPlatform();
  }

  ngOnInit() {}

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

    console.log(file);

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

  closeModal = () => {
    this.modalController.dismiss();
  };

  uploadDocumentAction = (dormitoryId) => {
    const image = this.imagePath;
    const ext = this.imagePath.type;
    const idObj = {
      id: dormitoryId,
    };

    this.dormitoriesService
      .createDormDocumentRequest(image, this.document, idObj, ext)
      .then((response) => {
        response.subscribe(
          (dormDocument) => {
            this.modalController.dismiss();
            console.log(dormDocument);
            this.router.navigate([`owner-tabs/dormitory-detail/${this.dormitoryId}`]);
            this.imgURL = '';
            this.document.documentType = '';
          },
          (err) => {
            console.log(err);
            this.imgURL = '';
            this.document.documentType = '';
          }
        );
      });
  };
}
