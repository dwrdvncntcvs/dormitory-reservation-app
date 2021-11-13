import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { Platform } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ImageService } from 'src/app/services/image.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-create-dormitory',
  templateUrl: './create-dormitory.page.html',
  styleUrls: ['./create-dormitory.page.scss'],
})
export class CreateDormitoryPage implements OnInit {
  public imagePath = null;
  imgURL: any = null;
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
    documentType: ['Barangay Clearance', 'Building Permit', 'Business Permit'],
    imagePath: [],
    imgURL: [],
  };

  batangas_barangays = [
    { name: 'Barangay 1, Batangas' },
    { name: 'Barangay 2, Batangas' },
    { name: 'Barangay 3, Batangas' },
    { name: 'Barangay 4, Batangas' },
    { name: 'Barangay 5, Batangas' },
    { name: 'Barangay 6, Batangas' },
    { name: 'Barangay 7, Batangas' },
    { name: 'Barangay 8, Batangas' },
    { name: 'Barangay 9, Batangas' },
    { name: 'Barangay 10, Batangas' },
    { name: 'Barangay 11, Batangas' },
    { name: 'Barangay 12, Batangas' },
    { name: 'Barangay 13, Batangas' },
    { name: 'Barangay 14, Batangas' },
    { name: 'Barangay 15, Batangas' },
    { name: 'Barangay 16, Batangas' },
    { name: 'Barangay 17, Batangas' },
    { name: 'Barangay 18, Batangas' },
    { name: 'Barangay 19, Batangas' },
    { name: 'Barangay 20, Batangas' },
    { name: 'Barangay 21, Batangas' },
    { name: 'Barangay 22, Batangas' },
    { name: 'Barangay 23, Batangas' },
    { name: 'Barangay 24, Batangas' },
    { name: 'Alangilan, Batangas' },
    { name: 'Balagtas, Batangas' },
    { name: 'Balete, Batangas' },
    { name: 'Banaba Kanluran, Batangas' },
    { name: 'Banaba Silangan, Batangas' },
    { name: 'Banaba Ibaba, Batangas' },
    { name: 'Bilogo, Batangas' },
    { name: 'Bolbok, Batangas' },
    { name: 'Bukal, Batangas' },
    { name: 'Calicanto, Batangas' },
    { name: 'Catandala, Batangas' },
    { name: 'Concepcion, Batangas' },
    { name: 'Conde Itaas, Batangas' },
    { name: 'Conde Labak, Batangas' },
    { name: 'Cuta, Batangas' },
    { name: 'Dalig, Batangas' },
    { name: 'Dela Paz, Batangas' },
    { name: 'Dela Paz Pulot Aplaya, Batangas' },
    { name: 'Dela Paz Pulot Itaas, Batangas' },
    { name: 'Domoclay, Batangas' },
    { name: 'Dumantay, Batangas' },
    { name: 'Gulod Itaas, Batangas' },
    { name: 'Gulod Labak, Batangas' },
    { name: 'Haligue Kanluran, Batangas' },
    { name: 'Haligue Silangan, Batangas' },
    { name: 'Ilijan, Batangas' },
    { name: 'Kumba, Batangas' },
    { name: 'Kumintang Ibaba, Batangas' },
    { name: 'Kumintang Ilaya, Batangas' },
    { name: 'Libjo, Batangas' },
    { name: 'Liponpon, Verde Island, Batangas' },
    { name: 'Maapas, Batangas' },
    { name: 'Mahabang Dahilig, Batangas' },
    { name: 'Mahabang Parang, Batangas' },
    { name: 'Mahacot Kanluran, Batangas' },
    { name: 'Mahacot Silangan, Batangas' },
    { name: 'Malalim, Batangas' },
    { name: 'Malibayo, Batangas' },
    { name: 'Malitam, Batangas' },
    { name: 'Maruclap, Batangas' },
    { name: 'Mabacong (Matoco), Batangas' },
    { name: 'Pagkilatan, Batangas' },
    { name: 'Paharang Kanluran, Batangas' },
    { name: 'Paharang Silangan, Batangas' },
    { name: 'Pallocan Kanluran, Batangas' },
    { name: 'Pallocan Silangan, Batangas' },
    { name: 'Pinamucan, Batangas' },
    { name: 'Pinamucan Ibaba, Batangas' },
    { name: 'Pinamucan Silangan, Batangas' },
    { name: 'Sampaga, Batangas' },
    { name: 'San Agapito, Verde Island, Batangas' },
    { name: 'San Agustin Kanluran, Verde Island, Batangas' },
    { name: 'San Agustin Silangan, Verde Island, Batangas' },
    { name: 'San Andres, Verde Island, Batangas' },
    { name: 'San Antonio, Verde Island, Batangas' },
    { name: 'San Isidro, Batangas' },
    { name: 'San Jose Sico, Batangas' },
    { name: 'San Miguel, Batangas' },
    { name: 'San Pedro, Batangas' },
    { name: 'Santa Clara, Batangas' },
    { name: 'Santa Rita Aplaya, Batangas' },
    { name: 'Santa Rita Karsada, Batangas' },
    { name: 'Santo Domingo, Batangas' },
    { name: 'Santo Niño, Batangas' },
    { name: 'Simlong, Batangas' },
    { name: 'Sirang Lupa, Batangas' },
    { name: 'Sorosoro Ibaba, Batangas' },
    { name: 'Sorosoro Ilaya, Batangas' },
    { name: 'Sorosoro Karsada, Batangas' },
    { name: 'Tabangao Aplaya (Tabango Proper), Batangas' },
    { name: 'Tabangao Ambulong, Batangas' },
    { name: 'Tabangao Dao, Batangas' },
    { name: 'Talahib Pandayan, Batangas' },
    { name: 'Talahib Payapa, Batangas' },
    { name: 'Talumpok Kanluran, Batangas' },
    { name: 'Talumpok Silangan, Batangas' },
    { name: 'Tinga Itaas, Batangas' },
    { name: 'Tinga Labak, Batangas' },
    { name: 'Tulo, Batangas' },
    { name: 'Wawa, Batangas' },
  ];

  documentArr: any[] = [1, 2, 3];

  @ViewChild('file', { static: false }) file: ElementRef;
  constructor(
    private dormitoriesService: DormitoriesService,
    private router: Router,
    private platform: Platform,
    private helperService: HelperService,
    private authGuard: AuthGuard,
    private imageService: ImageService,
    private loadingService: LoadingService
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

  ionViewDidLeave = () => {
    this.dormitoryForm.name = '';
    this.dormitoryForm.address = '';
    this.dormitoryForm.contactNumber = '';
    this.dormitoryForm.allowedGender = '';
    this.dormDocumentForm.documentType = [
      'Barangay Clearance',
      'Building Permit',
      'Business Permit',
    ];
    this.dormDocumentForm.imagePath = [];
    this.dormDocumentForm.imgURL = [];
  };

  useToggle() {
    this.toggle = !this.toggle;
  }

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
      this.loadingService.createNewLoading('Creating your dormitory please wait...')
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
                        this.router.navigate(['owner-tabs/dormitory-list']);
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
              this.errorMessage = error['error'].msg;
              this.fadeOuterrorMsg();
            }
          );
        });
    }
  }
}
