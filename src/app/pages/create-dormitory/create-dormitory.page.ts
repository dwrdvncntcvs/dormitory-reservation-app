import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';

const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

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
    private domSanitizer: DomSanitizer,
    private platform: Platform
  ) {
    this.getPlatform();
  }

  ngOnInit() {}

  getPlatform = async () => {
    const platform = await this.platform;
    if (platform.is('android')) {
      this.currentPlatform = 'android';
    } else if (platform.is('desktop')) {
      this.currentPlatform = 'web'
    }
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
      this.imgURL = reader.result;
    };
  };

  getCameraPhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });
    console.log(image.base64String);

    const url = `data:image/${image.format};base64,${image.base64String}`;
    this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(url);
    console.log(image);

    const blob = b64toBlob(image.base64String, image.format);
    console.log(blob);
    this.imagePath = blob;
  };

  getGalleryPhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });
    console.log(image.base64String);

    const url = `data:image/${image.format};base64,${image.base64String}`;
    this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(url);
    console.log(image);

    const blob = b64toBlob(image.base64String, image.format);
    console.log(blob);
    this.imagePath = blob;
  };

  createDormitoryAction(file = null) {
    let image = this.imagePath;
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
