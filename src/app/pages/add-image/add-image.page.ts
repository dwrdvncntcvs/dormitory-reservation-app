import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { ImageService } from 'src/app/services/image.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.page.html',
  styleUrls: ['./add-image.page.scss'],
})
export class AddImagePage implements OnInit {
  dormitoryId: number;
  imagePath: any;
  imgFormat: any;
  imgURL: any;
  currentPlatform: string;
  isCreated: boolean = false;

  successMessage: string = '';
  errorMessage: string = '';

  image = {
    name: '',
  };

  buttons = [
    {
      name: 'Upload Image',
      state: () => {
        const isCreated = false;
        return isCreated === !this.isCreated;
      },
      toDo: (dormitoryId: number) => {
        this.uploadImageAction(dormitoryId);
      },
    },
    {
      name: 'Add Another Image',
      state: () => {
        const isCreated = true;
        return isCreated === !this.isCreated;
      },
      toDo: (dormitoryId: number) => {
        this.addAnotherImageAction();
      },
    },
    {
      name: 'Done',
      state: () => {
        const isCreated = true;
        return isCreated === !this.isCreated;
      },
      toDo: (dormitoryId: number) => {
        this.doneCreatingImage(dormitoryId);
      },
    },
  ];

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

  fadeOuterrorMsg() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 4000);
  }

  fadeOutsuccessMsg() {
    setTimeout(() => {
      this.successMessage = '';
    }, 4000);
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

  addAnotherImageAction = () => {
    this.isCreated = false;
    this.image.name = '';
    this.imgURL = '';
    this.imagePath = '';
  };

  doneCreatingImage = (dormitoryId: number) => {
    this.router.navigate([`/owner-tabs/dormitory-detail/${dormitoryId}`]);
    this.modalController.dismiss();
  };

  uploadImageAction = (dormitoryId) => {
    const image = this.imagePath;
    if (image === undefined) {
      return (
        this.fadeOuterrorMsg(),
        (this.errorMessage = 'Please Add Image to Upload')
      );
    }
    const ext = this.imagePath.type;
    const idObj = {
      id: dormitoryId,
    };

    this.loadingService.createNewLoading('Uploading dormitory image');
    this.dormitoriesService
      .addDormitoryImageRequest(image, this.image, idObj, ext)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            this.fadeOutsuccessMsg();
            this.successMessage = responseData['msg'];
            this.loadingService.dismissLoading();
            this.fadeOuterrorMsg();
            this.errorMessage = '';
            this.isCreated = true;
          },
          (err) => {
            this.fadeOuterrorMsg();
            this.errorMessage = err['error'].msg;
            this.loadingService.dismissLoading();
            this.fadeOutsuccessMsg();
            this.successMessage = '';
          }
        );
      });
  };
}
