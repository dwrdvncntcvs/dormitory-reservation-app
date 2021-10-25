import { DormitoriesService } from './../../services/dormitories.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { api } from 'src/api';
import { ImagePage } from '../image/image.page';
import { IonSlides, ModalController, Platform } from '@ionic/angular';
import { DormitoryModel } from 'src/app/models/dormitoryModel';
import { UserModel } from 'src/app/models/userModel';
import { MapService } from 'src/app/services/map.service';
import { LocationModel } from 'src/app/models/locationModel';
import { DormitoryProfileImageModel } from 'src/app/models/dormitoryProfileImageModel';
import { Location } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/services/user.service';
import { icon } from 'leaflet';
import { ImageService } from 'src/app/services/image.service';

const helper = new JwtHelperService();

@Component({
  selector: 'app-dormitory-detail',
  templateUrl: './dormitory-detail.page.html',
  styleUrls: ['./dormitory-detail.page.scss'],
})
export class DormitoryDetailPage implements OnInit {
  dormId: number;
  map: any;
  lat: number;
  lng: number;

  dormitoryData: DormitoryModel;
  userData: UserModel;
  amenitiesData = [];
  dormImagesData = [];
  roomsData = [];
  dormitoryLocationData: LocationModel;
  dormitoryLandmarkData: any;
  dormitoryProfileImage: DormitoryProfileImageModel;

  imagePath: any;
  imgURL: any;
  imgFormat: any;

  deleteDormProfileToggle: boolean = false;
  deleteRoomToggle: boolean = false;
  deleteAmenityToggle: boolean = false;
  deleteLandmarkToggle: boolean = false;
  paymentToggle: boolean = false;
  payToggle: boolean = false;
  nextToggle: boolean = false;
  isPaymentPending: boolean = false;

  numberToPay = '09456792203';

  url = api.url;
  dormitoryStatus: boolean;
  currentDormitoryStatus: string;
  errorMessage: string;
  userRole: string;
  currentPlatform: string;

  ionSlideIndex: number;

  @ViewChild(IonSlides) slides: IonSlides;

  paymentField = {
    sender: '',
    recipientNumber: '',
    amount: '',
    referenceNumber: '',
  };

  instructions = [
    {
      id: 1,
      phrase: `Use this number ${this.numberToPay} to send your payment.`,
    },
    {
      id: 2,
      phrase: `The amount to be paid is Php 100.00 and it will be valid for 1 year.`,
    },
    {
      id: 3,
      phrase: `Fill up all the required information and provide your GCash reciept.`,
    },
    {
      id: 4,
      phrase: `You'll be notified through email once the admin verified your payment`,
    },
  ];

  comments: any[] = [
    {
      profile:
        'https://biographymask.com/wp-content/uploads/2020/12/Cong-TV-Youtuber.jpg',
      username: 'CONG TV',
      email: 'qwerty@gmail.com',
      comment:
        'A dormitory (originated from the Latin word dormitorium often abbreviated to dorm) is a building primarily providing sleeping and residential quarters for large numbers of people such as boarding school',
    },
    {
      profile: 'https://c.tenor.com/viomEP7TXHgAAAAC/junnie-boy-kuryente.gif',
      username: 'JUNNIE BOY',
      email: 'qwerty@gmail.com',
      comment:
        'A dormitory (originated from the Latin word dormitorium often abbreviated to dorm) is a building primarily providing sleeping and residential quarters for large numbers of people such as boarding school',
    },
    {
      profile:
        'https://www.tvguidetime.com/wp-content/webp-express/webp-images/uploads/2021/03/Boss-Keng.png.webp',
      username: 'BOSS KENG',
      email: 'qwerty@gmail.com',
      comment:
        'A dormitory (originated from the Latin word dormitorium often abbreviated to dorm) is a building primarily providing sleeping and residential quarters for large numbers of people such as boarding school',
    },
    {
      profile:
        'https://pbs.twimg.com/media/EYd_Qn-UEAESsd0?format=jpg&name=medium',
      username: 'MAVIE',
      email: 'qwerty@gmail.com',
      comment:
        'A dormitory (originated from the Latin word dormitorium often abbreviated to dorm) is a building primarily providing sleeping and residential quarters for large numbers of people such as boarding school',
    },
    {
      profile:
        'https://pbs.twimg.com/profile_images/1285130736878497792/8loWWNQr_400x400.jpg',
      username: 'DUDUT',
      email: 'qwerty@gmail.com',
      comment:
        'A dormitory (originated from the Latin word dormitorium often abbreviated to dorm) is a building primarily providing sleeping and residential quarters for large numbers of people such as boarding school',
    },
  ];

  constructor(
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private dormitoriesService: DormitoriesService,
    private router: Router,
    private userService: UserService,
    private mapService: MapService,
    private location: Location,
    private imageService: ImageService,
    private platform: Platform,
  ) {
    this.router.navigated = true;
    console.log('ROUTER navigated: ' + this.router.navigated);
  }

  async openPreview(Images, directory) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      cssClass: 'transparent-modal',
      componentProps: {
        value: `${this.url}/image/${directory}/${Images}`,
      },
    });
    modal.present();
  }

  ngOnInit = () => {};

  ionViewDidEnter = () => {
    this.getUserRole();
    this.checkPlatform();
    this.getDormitoryDetail();
  };

  ionViewWillLeave = () => {
    this.deleteDormProfileToggle = false;
    this.deleteRoomToggle = false;
    this.deleteAmenityToggle = false;
    this.deleteLandmarkToggle = false;
    this.paymentToggle = false;
    this.imagePath = null;
    this.imgURL = null;
    this.imgFormat = null;
    this.paymentField.sender = '';
    this.paymentField.referenceNumber = '';
    this.paymentField.recipientNumber = '';
    this.paymentField.amount = '';
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
    console.log('Begin async operation');
    this.ionViewDidEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  openDeleteDormProfileImageToggle = () => {
    this.deleteDormProfileToggle = !this.deleteDormProfileToggle;
  };

  openDeleteRoomToggle = () => {
    this.deleteRoomToggle = !this.deleteRoomToggle;
  };

  openDeleteAmenityToggle = () => {
    this.deleteAmenityToggle = !this.deleteAmenityToggle;
  };

  openDeleteLandmarkToggle = () => {
    this.deleteLandmarkToggle = !this.deleteLandmarkToggle;
  };

  openPaymentToggle = () => {
    this.paymentToggle = !this.paymentToggle;
    if (this.paymentToggle === false) {
      this.payToggle = false;
      this.nextToggle = false;
      this.imagePath = null;
      this.imgURL = null;
      this.imgFormat = null;
      this.paymentField.sender = '';
      this.paymentField.referenceNumber = '';
      this.paymentField.recipientNumber = '';
      this.paymentField.amount = '';
    }
  };

  openPayToggle = () => {
    this.payToggle = !this.payToggle;
    if (this.payToggle === false) {
      this.nextToggle = false;
      this.imagePath = null;
      this.imgURL = null;
      this.imgFormat = null;
      this.paymentField.sender = '';
      this.paymentField.referenceNumber = '';
      this.paymentField.recipientNumber = '';
      this.paymentField.amount = '';
    }
  };

  openNextToggle = () => {
    this.nextToggle = !this.nextToggle;
  };

  getUserRole = async () => {
    const token = await this.userService.loadStoredToken();
    if (token === null) {
      this.userRole = null;
    }
    const decoded_token = helper.decodeToken(token);
    const role = decoded_token.role;
    console.log('ROLE: ', role);
    if (role === 'owner') {
      this.userRole = 'owner';
    } else if (role === 'tenant') {
      this.userRole = 'tenant';
    } else if (role === null) {
      this.userRole = null;
    }
  };

  getMap = (lat, lng) => {
    let latitude = lat;
    let longitude = lng;
    let zoom = 15;
    if (latitude === undefined && longitude === undefined) {
      latitude = 13.7543236494;
      longitude = 121.054866447;
      zoom = 12.5;
    }
    const actualMap = this.mapService.createNewMap(
      'map2',
      latitude,
      longitude,
      zoom
    );
    console.log(actualMap);
    this.map = actualMap;

    this.mapService.createNewTile(actualMap);

    actualMap.whenReady(() => {
      setInterval(() => {
        actualMap.invalidateSize();
      }, 0);
    });
  };

  slideChanged = (slides: IonSlides) => {
    // slides.getActiveIndex().then((index) => {
    //   console.log(index);
    // });
    this.slides.getActiveIndex().then((index) => {
      console.log(index);
      this.ionSlideIndex = index;
    });
  };

  dormitorySwitchAction = (status, dormId) => {
    console.log('Current Dormitory Status: ' + status);
    console.log('Dormitory ID: ', dormId);
    const changed_status = !status;
    this.dormitoriesService
      .dormitorySwitchRequest(changed_status, dormId)
      .then((response) => {
        console.log(response);
        response.subscribe(
          (data) => {
            console.log(data);
            this.dormitoryStatus = !status;
            this.map.remove();
            this.getDormitoryDetail();
          },
          (err) => {
            console.log(err);
            if (err) {
              this.errorMessage = err['error'].msg;
            }
          }
        );
      });
  };

  goBackToHome = () => {
    this.map.remove();
    this.errorMessage = '';
    if (this.userRole === 'owner') {
      this.router.navigate(['/owner-tabs/dormitory-list']);
    } else if (this.userRole === 'tenant' || this.userRole === null) {
      this.location.back();
    }
  };

  getDormitoryDetail = () => {
    this.activatedRoute.paramMap.subscribe((params) => {
      console.log(params);
      const id = params['params'].id;
      return this.dormitoriesService
        .getDormitoryDetails(id)
        .subscribe((dormitoryData) => {
          //Array
          console.log(dormitoryData);
          const amenities = dormitoryData['dormitory']['Amenities'];
          const dormImages = dormitoryData['dormitory']['DormImages'];
          const dormRatings = dormitoryData['dormitory']['DormRatings'];
          const landmarks = dormitoryData['dormitory']['Landmarks'];
          const reservations = dormitoryData['dormitory']['Reservations'];
          const rooms = dormitoryData['dormitory']['Rooms'];
          const payments = dormitoryData['dormitory']['Payments'];
          //Objects
          const dormLocation = dormitoryData['dormitory']['DormLocation'];
          const dormProfileImage =
            dormitoryData['dormitory']['DormProfileImage'];
          const user = dormitoryData['dormitory']['User'];
          const dormitory = dormitoryData['dormitory'];

          this.dormitoryData = new DormitoryModel(dormitory);
          console.log(this.dormitoryData);
          this.userData = new UserModel(user);
          this.amenitiesData = amenities;
          this.dormImagesData = dormImages;
          this.roomsData = rooms;

          this.checkPaymentStatus(payments);
          this.createLocationMarker(dormLocation);
          this.createLandmarkMaker(landmarks);
          this.setDormitoryBanner(dormProfileImage);
          this.checkDormitorystatus(this.dormitoryData);
        });
    });
  };

  //sample status of payments
  checkPaymentStatus = (payment: any[]) => {
    console.log(payment);
    if (payment.length === 0) {
      this.isPaymentPending = false;
    } else {
      const obj = payment.find((payment) => payment.isValid === false);
      console.log(obj);
      if (obj !== undefined) {
        this.isPaymentPending = true;
      } else {
        this.isPaymentPending = false;
      }
    }
  };

  checkDormitorystatus = (dormitoryData: DormitoryModel) => {
    const status = dormitoryData.isAccepting;
    this.dormitoryStatus = status;
    if (status === true) {
      this.currentDormitoryStatus = 'Active';
    } else {
      this.currentDormitoryStatus = 'Not Active';
    }
  };

  setDormitoryBanner = (dormProfileImage: any) => {
    if (dormProfileImage === null) {
      this.dormitoryProfileImage = null;
    } else if (dormProfileImage !== null) {
      this.dormitoryProfileImage = new DormitoryProfileImageModel(
        dormProfileImage
      );
    }
  };

  createLocationMarker = (dormLocation: any) => {
    let lat: number;
    let lng: number;
    if (dormLocation === null) {
      this.dormitoryLocationData = null;
      this.getMap(lat, lng);
    } else if (dormLocation !== null) {
      const dormitoryIcon = icon({
        iconUrl: '../../assets/icon/location.svg',
        iconSize: [40, 40],
      });
      this.dormitoryLocationData = new LocationModel(dormLocation);
      console.log(this.dormitoryLocationData);
      lat = this.dormitoryLocationData.lat;
      lng = this.dormitoryLocationData.lng;
      this.getMap(lat, lng);
      this.mapService
        .createNewMarkerObj(this.map, dormLocation)
        .setIcon(dormitoryIcon);
    }
  };

  createLandmarkMaker = (dormLandmark: any) => {
    console.log('Dorm Landmark: ', dormLandmark);
    if (dormLandmark.length === 0) {
      this.dormitoryLandmarkData = [];
    } else if (dormLandmark.length !== 0) {
      console.log('Landmarks');
      this.dormitoryLandmarkData = dormLandmark;
      for (let landmark of dormLandmark) {
        const dormitoryIcon = icon({
          iconUrl: '../../assets/icon/pin.svg',
          iconSize: [40, 40],
        });
        const location = landmark;
        this.mapService
          .createNewMarkerObj(this.map, location)
          .setIcon(dormitoryIcon);
      }
    }
  };

  goToManageDormitory = (dormitoryId, locationId) => {
    console.log('DORMITORY ID: ', dormitoryId);
    this.map.remove();
    this.router.navigate(['owner-tabs/manage'], {
      queryParams: { dormitoryId: dormitoryId, locationId: locationId },
    });
  };

  deleteDormitoryProfileImageAction = (
    dormitoryId: number,
    dormProfileImageId: number
  ) => {
    this.dormitoriesService
      .deleteDormitoryProfileImage(dormitoryId, dormProfileImageId)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            console.log(responseData);
            this.getDormitoryDetail();
            this.openDeleteDormProfileImageToggle();
          },
          (error) => {
            console.log(error);
          }
        );
      });
  };

  deleteRoomAction = (dormitoryId: number, roomId: number) => {
    console.log('Dormitory ID: ', dormitoryId, 'Room ID: ', roomId);

    this.dormitoriesService
      .deleteDormitoryRoomrequest(dormitoryId, roomId)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            console.log(responseData);
            this.getDormitoryDetail();
            this.openDeleteRoomToggle();
          },
          (err) => {
            console.log(err);
          }
        );
      });
  };

  deleteAmenityAction = (dormitoryId: number, amenityId: number) => {
    console.log('Dormitory ID: ', dormitoryId, 'Amenity ID: ', amenityId);

    this.dormitoriesService
      .deleteDormitoryAmenityRequest(dormitoryId, amenityId)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            console.log(responseData);
            this.getDormitoryDetail();
            this.openDeleteAmenityToggle();
          },
          (err) => {
            console.log(err);
          }
        );
      });
  };

  deleteDormitoryImageAction = (dormitoryId: number, imageId: number) => {
    console.log('Dormitory ID: ', dormitoryId);
    console.log('Image ID: ', imageId);

    this.dormitoriesService
      .deleteDormitoryImageRequest(dormitoryId, imageId)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            console.log(responseData);
            this.getDormitoryDetail();
          },
          (err) => {
            console.log(err);
          }
        );
      });
  };

  removeDormitoryLocationAction = (dormitoryId: number, locationId: number) => {
    this.dormitoriesService
      .removeDormitoryLocationRequest(dormitoryId, locationId)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            console.log(responseData);
            this.map.remove();
            this.getDormitoryDetail();
          },
          (err) => {
            console.log(err);
          }
        );
      });
  };

  deleteDormitoryLandmarkAction = (dormitoryId: number, landmarkId: number) => {
    console.log('Dormitory ID: ', dormitoryId);
    console.log('Landmark ID: ', landmarkId);
    this.dormitoriesService
      .deleteDormitoryLandmarkRequest(dormitoryId, landmarkId)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            console.log('Response: ', responseData);
            this.map.remove();
            this.getDormitoryDetail();
          },
          (err) => {
            console.log(err);
          }
        );
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

  paymentAction = (dormitoryId: number, userId: number) => {
    console.log('User ID: ', userId);
    const imageFile = this.imagePath;
    const ext = this.imagePath.type;

    this.dormitoriesService
      .addDormitoryPaymentRequest(
        dormitoryId,
        userId,
        imageFile,
        this.paymentField,
        ext
      )
      .then((response) => {
        response.subscribe(
          (responseData) => {
            console.log(responseData);
            this.getDormitoryDetail();
          },
          (err) => {
            console.log(err);
          }
        );
      });
  };

  sliderOpts = {
    slidesPerView: 1.25,
    centeredSlides: false,
    loop: false,
    spaceBetween: 15,
  };
}
