import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-create-dormitory',
  templateUrl: './create-dormitory.page.html',
  styleUrls: ['./create-dormitory.page.scss'],
})
export class CreateDormitoryPage implements OnInit {
  public imagePath;
  imgURL: any;
  image;
  public imgFormat;
  public message: string;
  currentPlatform;
  toggle = false;
  role = 'owner';

  errorMessage: string;

  dormitoryForm = {
    name: '',
    address: '',
    contactNumber: '',
    allowedGender: '',
  };

  dormDocumentForm = {
    documentType: '',
  };

  @ViewChild('file', { static: false }) file: HTMLInputElement;
  constructor(
    private dormitoriesService: DormitoriesService,
    private router: Router,
    private platform: Platform,
    private helperService: HelperService,
    private authGuard: AuthGuard,
    private imageService: ImageService
  ) {
    this.getPlatform();
  }

  ngOnInit() {}

  ionViewDidEnter = () => {
    this.helperService.checkRole(this.role, this.authGuard.userRole);
  };

  useToggle() {
    this.toggle = !this.toggle;
  }

  getPlatform = async () => {
    const platform = await this.platform;
    if (platform.is('android')) {
      this.currentPlatform = 'android';
    } else if (platform.is('desktop')) {
      this.currentPlatform = 'web';
    }
  };

  getImageFile = (file) => {
    const files = this.imageService.getImageFile(file);
    console.log(file)

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
    console.log("IMAGE PATH: " + this.imagePath);
    console.log("IMAGE URL: " + this.imgURL);
  };

  getGalleryPhoto = async () => {
    const imgObj = await this.imageService.getGalleryPhoto();
    this.imagePath = imgObj.imagePath;
    this.imgURL = imgObj.imageURL;
    console.log("IMAGE PATH: " + this.imagePath);
    console.log("IMAGE URL: " + this.imgURL);
  };

  createDormitoryAction(file = null) {
    let image = this.imagePath;
    if (image === undefined) {
      return (this.errorMessage = 'Please Add Image to Upload');
    }
    let ext = this.imagePath.type;
    console.log('Image: ', image);
    console.log('Extension: ', ext);
    console.log(this.dormitoryForm);
    this.dormitoriesService
      .createDormitoryRequest(this.dormitoryForm)
      .then((response) => {
        response.subscribe(
          (data) => {
            console.log('Data: ', data);
            this.dormitoriesService
              .createDormDocumentRequest(
                image,
                this.dormDocumentForm,
                data['dormitory'],
                ext
              )
              .then((response) => {
                response.subscribe(
                  (dormDocument) => {
                    console.log(dormDocument);
                    this.router.navigate(['owner-tabs/dormitory-list']);
                    this.dormitoryForm.name = '';
                    this.dormitoryForm.address = '';
                    this.dormitoryForm.contactNumber = '';
                    this.dormitoryForm.allowedGender = '';
                    this.dormDocumentForm.documentType = '';
                    file.value = '';
                    this.imgURL = '';
                  },
                  (err) => {
                    console.log(err);
                    this.dormitoryForm.name = '';
                    this.dormitoryForm.address = '';
                    this.dormitoryForm.contactNumber = '';
                    this.dormitoryForm.allowedGender = '';
                    this.dormDocumentForm.documentType = '';
                    file.value = '';
                    this.imgURL = '';
                  }
                );
              });
          },
          (error) => {
            console.log('Error: ', error);
            this.dormitoryForm.name = '';
            this.dormitoryForm.address = '';
            this.dormitoryForm.contactNumber = '';
            this.dormitoryForm.allowedGender = '';
            this.dormDocumentForm.documentType = '';
            file.value = '';
            this.imgURL = '';
          }
        );
      });
  }
}
