import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { HelperService } from 'src/app/services/helper.service';
import { ImageService } from 'src/app/services/image.service';
import { LoadingService } from 'src/app/services/loading.service';

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
  errorMessage: string = '';

  document = {
    documentType: '',
  };

  dormDocumentForm = {
    documentType: ['Barangay Clearance', 'Building Permit', 'Business Permit'],
    imagePath: [],
    imgURL: [],
  };

  documentArr: any[] = [1, 2, 3];

  @ViewChild('file', { static: false }) file: ElementRef;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private router: Router,
    private dormitoriesService: DormitoriesService,
    private imageService: ImageService,
    private platform: Platform,
    private loadingService: LoadingService
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

  fadeOuterrorMsg() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 4000);
  }

  getPlatform = async () => {
    const platform = await this.platform;
    if (platform.is('android')) {
      this.currentPlatform = 'android';
    } else if (platform.is('desktop')) {
      this.currentPlatform = 'web';
    }
  };

  getParamsValue = () => {
    const paramValue = this.navParams.get('dormitoryId');
    this.dormitoryId = paramValue;
  };

  getImageFile = (file, i) => {
    const files = this.imageService.getImageFile(file);

    var reader = new FileReader();
    this.imagePath = files[0];
    this.dormDocumentForm.imagePath[i] = this.imagePath;
    this.imgFormat = files[0].type;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.dormDocumentForm.imgURL[i] = this.imgURL;
    };
  };

  getCameraPhoto = async (i) => {
    const imgObj = await this.imageService.getCameraPhoto();
    this.imagePath = imgObj.imagePath;
    this.imgURL = imgObj.imageURL;

    this.dormDocumentForm.imagePath[i] = this.imagePath;
    this.dormDocumentForm.imgURL[i] = this.imgURL;
  };

  getGalleryPhoto = async (i) => {
    const imgObj = await this.imageService.getGalleryPhoto();
    this.imagePath = imgObj.imagePath;
    this.imgURL = imgObj.imageURL;

    this.dormDocumentForm.imagePath[i] = this.imagePath;
    this.dormDocumentForm.imgURL[i] = this.imgURL;
  };

  closeModal = () => {
    this.modalController.dismiss();
  };

  isThereImageValue = (newDocumentArray) => {
    for (let i = 0; i < newDocumentArray.length; i++) {
      if (newDocumentArray[i].path === undefined) {
        return false;
      }
    }
    return true;
  };

  removeDocumentDetails = () => {
    this.dormDocumentForm.imagePath = [];
    this.dormDocumentForm.imgURL = [];
    this.file.nativeElement.value = '';
    this.errorMessage = '';
  };

  uploadDocumentAction = (dormitoryId) => {
    const documentName = this.dormDocumentForm.documentType;
    const imagePath = this.dormDocumentForm.imagePath;
    const newDocumentArray = documentName.map((value, i) => {
      const documentObj = { name: value, path: imagePath[i] };
      return documentObj;
    });

    const thereIsImages = this.isThereImageValue(newDocumentArray);

    if (thereIsImages === false) {
      this.errorMessage = 'Please fill all the requirements';
      this.fadeOuterrorMsg();
      return;
    } else if (thereIsImages === true) {
      this.loadingService.createNewLoading(
        'Adding new documents please wait...'
      );
      for (let i = 0; i < newDocumentArray.length; i++) {
        const dormitoryData = { id: dormitoryId };
        const image = newDocumentArray[i].path;
        const ext = newDocumentArray[i].path.type;
        const documentType = {
          documentType: newDocumentArray[i].name,
        };

        this.dormitoriesService
          .createDormDocumentRequest(image, documentType, dormitoryData, ext)
          .then((response) => {
            response.subscribe(
              (responseData) => {
                this.removeDocumentDetails();
                this.router.navigate([
                  `owner-tabs/dormitory-detail/${dormitoryId}`,
                ]);
              },
              (error) => {
                this.removeDocumentDetails();
              }
            );
          });
      }
    }
  };

  removeSelectedImage = (index: number) => {
    this.dormDocumentForm.imagePath[index] = undefined;
    this.dormDocumentForm.imgURL[index] = undefined;
    this.file.nativeElement.value = '';
  };
}
