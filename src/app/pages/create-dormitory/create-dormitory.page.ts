import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DormitoriesService } from 'src/app/services/dormitories.service';
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

  errorMessage: string = '';

  dormitoryForm = {
    name: '',
    address: '',
    contactNumber: '',
    allowedGender: '',
  };

  dormDocumentForm = {
    documentType: ['Barangay Clearance', 'Police Clearance', 'Some Clearance'],
    imagePath: [],
    imgURL: [],
  };

  documentArr: any[] = [1, 2, 3];

  @ViewChild('file', { static: false }) file: ElementRef;
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

  removeDocumentDetails = () => {
    this.dormitoryForm.name = '';
    this.dormitoryForm.address = '';
    this.dormitoryForm.allowedGender = '';
    this.dormitoryForm.contactNumber = '';
    this.dormDocumentForm.imagePath = [];
    this.dormDocumentForm.imgURL = [];
    this.file.nativeElement.value = '';
    this.errorMessage = '';
  };

  ionViewDidEnter = () => {
    this.helperService.checkRole(this.role, this.authGuard.userRole);
  };

  useToggle() {
    this.toggle = !this.toggle;
  }

  fadeOuterrorMsg(){
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

  getImageFile = (file, i) => {
    const files = this.imageService.getImageFile(file);
    console.log(file);

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
    console.log('IMAGE PATH: ' + this.imagePath);
    console.log('IMAGE URL: ' + this.imgURL);
    this.dormDocumentForm.imagePath[i] = this.imagePath;
    this.dormDocumentForm.imgURL[i] = this.imgURL;
  };

  getGalleryPhoto = async (i) => {
    const imgObj = await this.imageService.getGalleryPhoto();
    this.imagePath = imgObj.imagePath;
    this.imgURL = imgObj.imageURL;
    console.log('IMAGE PATH: ' + this.imagePath);
    console.log('IMAGE URL: ' + this.imgURL);
    this.dormDocumentForm.imagePath[i] = this.imagePath;
    this.dormDocumentForm.imgURL[i] = this.imgURL;
  };

  removeSelectedImage = (index: number) => {
    this.dormDocumentForm.imagePath[index] = undefined;
    this.dormDocumentForm.imgURL[index] = undefined;
    this.file.nativeElement.value = '';
  };

  isThereImageValue = (newDocumentArray) => {
    for (let i = 0; i < newDocumentArray.length; i++) {
      if (newDocumentArray[i].path === undefined) {
        return false;
      }
    }
    return true;
  };

  createDormitoryAction(file = null) {
    console.log('ARRAY: ', this.dormDocumentForm);
    const documentName = this.dormDocumentForm.documentType;
    const imagePath = this.dormDocumentForm.imagePath;
    const newDocumentArray = documentName.map((value, i) => {
      const documentObj = { name: value, path: imagePath[i] };
      return documentObj;
    });

    const thereIsImages = this.isThereImageValue(newDocumentArray);
    if (thereIsImages === false) {
      console.log('Please Fill the form');
      this.errorMessage = 'Please fill all the forms';
      this.fadeOuterrorMsg();
      return;
    } else if (thereIsImages === true) {
      this.dormitoriesService
        .createDormitoryRequest(this.dormitoryForm)
        .then((response) => {
          response.subscribe(
            (responseData) => {
              console.log(responseData);
              for (let i = 0; i < newDocumentArray.length; i++) {
                const createdDormitory = responseData['dormitory'];
                const image = newDocumentArray[i].path;
                const ext = newDocumentArray[i].path.type;
                const documentType = {
                  documentType: newDocumentArray[i].name,
                };

                this.dormitoriesService
                  .createDormDocumentRequest(
                    image,
                    documentType,
                    createdDormitory,
                    ext
                  )
                  .then((response) => {
                    response.subscribe(
                      (responseData) => {
                        console.log(responseData);
                        this.removeDocumentDetails();
                        this.router.navigate(['owner-tabs/dormitory-list'])
                      },
                      (error) => {
                        console.log(error);
                        this.removeDocumentDetails();
                      }
                    );
                  });
              }
            },
            (error) => {
              console.log(error);
              this.removeDocumentDetails();
              this.errorMessage = 'Please fill all the forms'
              this.fadeOuterrorMsg();
            }
          );
        });
    }
  }
}
