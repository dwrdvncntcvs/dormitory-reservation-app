import { LoadingService } from './../../services/loading.service';
import { DormitoriesService } from './../../services/dormitories.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
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
import { icon, Map } from 'leaflet';
import { ImageService } from 'src/app/services/image.service';
import { ConstantPool, ThrowStmt } from '@angular/compiler';
import { ReservationsPage } from '../reservations/reservations.page';

const helper = new JwtHelperService();

@Component({
  selector: 'app-dormitory-detail',
  templateUrl: './dormitory-detail.page.html',
  styleUrls: ['./dormitory-detail.page.scss'],
})
export class DormitoryDetailPage implements OnInit {
  currentWidth: number;

  dormId: number;
  map: Map;
  lat: number;
  lng: number;

  ratingAveData: any;
  foundUserRating: any;
  ratingsData: any[];
  filteredReservation = [];
  foundReservationDetail: any = null;
  reservationsData: any[];
  questionData: any;
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

  rateToggle: boolean = false;
  deleteDormProfileToggle: boolean = false;
  deleteRoomToggle: boolean = false;
  deleteAmenityToggle: boolean = false;
  deleteLandmarkToggle: boolean = false;
  paymentToggle: boolean = false;
  payToggle: boolean = false;
  nextToggle: boolean = false;
  reservationToggle: boolean = false;
  isPaymentPending: boolean = false;
  editRoomToggle: boolean = false;
  reserveToggle: any = [false];
  isReserved: any = [];
  isRated: boolean = false;
  mobileToggleReservation: boolean = false;
  mobileToggleReminders: boolean = false;

  isPending: boolean = true;
  isAccepted: boolean = false;
  isActive: boolean = false;

  numberToPay = '09456792203';

  url = api.url;
  dormitoryStatus: boolean;
  currentDormitoryStatus: string;
  errorMessage: string = '';
  userRole: string;
  currentPlatform: string;
  dormitoryRating: number;
  totalRating: any;

  reservationStatus: string;
  comment: any = [];
  tenantQuestion: string = '';
  currentUser: any;

  roomSlot: string = '';

  ionSlideIndex: number;

  @ViewChild(IonSlides) slides: IonSlides;

  roomToBeEdit = {
    roomCost: [],
    electricBill: [],
    waterBill: [],
  };

  paymentField = {
    sender: '',
    recipientNumber: '',
    amount: '',
    referenceNumber: '',
  };

  slot = [1, 2, 3, 4, 5, 6];

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

  ratingArr = [
    { rating: 1 },
    { rating: 2 },
    { rating: 3 },
    { rating: 4 },
    { rating: 5 },
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
    private loadingService: LoadingService
  ) {
    this.router.navigated = true;
  }

  async openPreview(images) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      cssClass: 'transparent-modal',
      componentProps: {
        value: images,
      },
    });
    modal.present();
  }

  ngOnInit = () => {};

  ionViewDidEnter = () => {
    this.loadingService.dismissLoading();
    this.modalCtrl.dismiss();
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
    this.roomToBeEdit.roomCost = [];
    this.roomToBeEdit.electricBill = [];
    this.roomToBeEdit.waterBill = [];
    this.roomSlot = '';
    this.foundReservationDetail = null;
    this.filteredReservation = null;
    this.rateToggle = false;
  };

  reservationToggleAction = () => {
    this.reservationToggle = !this.reservationToggle;
  };

  checkPlatform = () => {
    const plt = this.platform;
    if (plt.is('desktop')) {
      this.currentPlatform = 'desktop';
      this.mobileToggleReservation = true;
      this.currentWidth = plt.width();
    } else if (plt.is('android')) {
      this.currentPlatform = 'android';
      this.currentWidth = plt.width();
    }
  };

  activeSegment = (dormitoryId: number) => {
    this.reservationStatus = 'isPending';
    if (this.userRole === 'owner')
      return this.togglePendingReservation(dormitoryId, false, true, false);
  };

  doRefresh(event: any) {
    if (!this.map) {
      this.ionViewDidEnter();
    } else {
      this.map.remove();
      this.ionViewDidEnter();
    }
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  refreshAction = () => {
    this.loadingService.createNewLoading('Refreshing...');
    if (!this.map) {
      this.ionViewDidEnter();
    } else {
      this.map.remove();
      this.ionViewDidEnter();
    }
    setTimeout(() => {
      this.loadingService.dismissLoading();
    }, 2000);
  };

  openModalReservation = async (
    reservationId: number,
    roomId: number,
    dormitoryId: number
  ) => {
    const reservationModal = await this.modalCtrl.create({
      component: ReservationsPage,
      componentProps: { reservationId, roomId, dormitoryId },
      backdropDismiss: false,
    });

    reservationModal.present();
  };

  openMobileToggleReminder = () => {
    this.mobileToggleReminders = !this.mobileToggleReminders;
  };

  openMobileToggleReservation = () => {
    this.mobileToggleReservation = !this.mobileToggleReservation;
  };

  toggleRateAction = () => {
    this.rateToggle = !this.rateToggle;
  };

  togglePendingReservation = (
    dormitoryId: number,
    isActive: boolean,
    isPending: boolean,
    isAccepted: boolean
  ) => {
    this.isPending = true;
    this.filterReservationAction(dormitoryId, isActive, isAccepted, isPending);
  };

  toggleAcceptedReservation = (
    dormitoryId: number,
    isActive: boolean,
    isPending: boolean,
    isAccepted: boolean
  ) => {
    this.isAccepted = true;
    this.filterReservationAction(dormitoryId, isActive, isAccepted, isPending);
  };

  toggleActiveReservation = (
    dormitoryId: number,
    isActive: boolean,
    isPending: boolean,
    isAccepted: boolean
  ) => {
    this.isActive = true;
    this.filterReservationAction(dormitoryId, isActive, isAccepted, isPending);
  };

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

  openEditRoomToggle = () => {
    this.editRoomToggle = !this.editRoomToggle;
    if (this.editRoomToggle === false) {
      this.roomToBeEdit.roomCost = [];
      this.roomToBeEdit.electricBill = [];
      this.roomToBeEdit.waterBill = [];
    }
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

  openReserveToggle = (i: number) => {
    this.reserveToggle[i] = !this.reserveToggle[i];
    if (this.reserveToggle[i] === false) {
      this.roomSlot = '';
    }
  };

  getUserRole = async () => {
    const token = await this.userService.loadStoredToken();
    if (token === null) {
      this.userRole = null;
    }
    const decoded_token = helper.decodeToken(token);
    const role = decoded_token.role;

    if (role === 'owner') {
      this.userRole = 'owner';
      this.getCurrentUser();
    } else if (role === 'tenant') {
      this.userRole = 'tenant';
      this.getCurrentUser();
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

    this.map = actualMap;

    this.mapService.createNewTile(actualMap);

    actualMap.whenReady(() => {
      setInterval(() => {
        actualMap.invalidateSize();
      }, 0);
    });
  };

  slideChanged = (slides: IonSlides) => {
    this.slides.getActiveIndex().then((index) => {
      this.ionSlideIndex = index;
    });
  };

  dormitorySwitchAction = (status, dormId) => {
    const changed_status = !status;
    this.dormitoriesService
      .dormitorySwitchRequest(changed_status, dormId)
      .then((response) => {
        response.subscribe(
          (data) => {
            this.dormitoryStatus = !status;
            this.map.remove();
            this.getDormitoryDetail();
          },
          (err) => {
            this.errorMessage = err['error'].msg;
            if (this.errorMessage !== '') {
              setTimeout(() => {
                this.errorMessage = '';
              }, 3000);
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
      const id = params['params'].id;
      return this.dormitoriesService
        .getDormitoryDetails(id)
        .subscribe((dormitoryData) => {
          const amenities = dormitoryData['dormitory']['Amenities'];
          const dormImages = dormitoryData['dormitory']['DormImages'];
          const dormRatings = dormitoryData['dormitory']['DormRatings'];
          const landmarks = dormitoryData['dormitory']['Landmarks'];
          const reservations = dormitoryData['dormitory']['Reservations'];
          const rooms = dormitoryData['dormitory']['Rooms'];
          const payments = dormitoryData['dormitory']['Payments'];
          const questions = dormitoryData['questions'];

          const ratingAveData = dormitoryData['dormitory']['RatingAve'];
          const dormLocation = dormitoryData['dormitory']['DormLocation'];
          const dormProfileImage =
            dormitoryData['dormitory']['DormProfileImage'];
          const user = dormitoryData['dormitory']['User'];
          const dormitory = dormitoryData['dormitory'];

          this.dormitoryData = new DormitoryModel(dormitory);

          this.userData = new UserModel(user);
          this.amenitiesData = amenities;
          this.dormImagesData = dormImages;
          this.roomsData = rooms;
          this.reservationsData = reservations;
          this.ratingsData = dormRatings;
          this.ratingAveData = ratingAveData;

          this.checkPaymentStatus(payments);
          this.setDormitoryBanner(dormProfileImage);
          this.checkDormitorystatus(this.dormitoryData);
          this.getQuestionData(questions);
          this.getCurrentUser();
          this.getAverageRating(dormRatings);
          this.activeSegment(dormitory.id);
          this.createLocationMarker(dormLocation);
          this.createLandmarkMaker(landmarks);
        });
    });
  };

  updateDormitoryAverageRationAction = (
    totalRating: number,
    dormitoryId: number,
    ratingAveId: number
  ) => {
    this.dormitoriesService
      .updateAverageRatingRequest(totalRating, dormitoryId, ratingAveId)
      .then((response) => {
        response.subscribe(
          (responseData) => {},
          (err) => {}
        );
      });
  };

  getAverageRating = (ratingArr: any[]) => {
    const ratingCompilation = [];

    const rating = ratingArr.map((rating) => {
      const newRating = rating.rating;
      ratingCompilation.push(newRating);
    });

    if (ratingCompilation.length === 0) {
      this.totalRating = 0;
      return;
    }
    const totalRating = ratingCompilation.reduce((a, b) => a + b, 0);

    const averageOfRatings = totalRating / ratingArr.length;

    this.totalRating = averageOfRatings.toFixed(1);
    const dormitoryId = this.dormitoryData.id;
    const ratingAveId = this.ratingAveData.id;
    this.updateDormitoryAverageRationAction(
      this.totalRating,
      dormitoryId,
      ratingAveId
    );
  };

  checkIfUserAlreadyRated = (currentUser: any) => {
    let index = 0;
    for (index; index < this.ratingsData.length; index++) {
      if (currentUser === null || currentUser === undefined) {
        this.isRated = false;
        return;
      }
      if (this.ratingsData[index].userId === currentUser.id) {
        this.isRated = true;
        return;
      }
    }

    this.isRated = false;
    return;
  };

  checkIfUserReservationExist = (currentUser: any) => {
    let index = 0;
    for (index; index < this.reservationsData.length; index++) {
      if (currentUser === null || currentUser === undefined) {
        this.isReserved = false;
        return;
      }
      if (this.reservationsData[index].userId === currentUser.id) {
        this.foundReservationDetail = this.reservationsData[index];

        this.isReserved = true;
        return;
      }
    }
    this.isReserved = false;
    return;
  };

  getQuestionData = (questions: any) => {
    this.questionData = questions;
  };

  checkPaymentStatus = (payment: any[]) => {
    if (payment.length === 0) {
      this.isPaymentPending = false;
    } else {
      const obj = payment.find((payment) => payment.isValid === false);

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
      const location = dormLocation;
      this.dormitoryLocationData = new LocationModel(dormLocation);

      lat = this.dormitoryLocationData.lat;
      lng = this.dormitoryLocationData.lng;
      this.getMap(lat, lng);
      this.mapService
        .createNewMarkerObj(this.map, dormLocation)
        .setIcon(dormitoryIcon)
        .bindTooltip(
          `
           <div style="display:flex; width: auto; height:auto; flex-direction: column;">
             <h5 style="text-align: center; font-weight: bold;">${location.dormitoryName}</h5>
             <p style="text-align: center; margin: 0px 0px 0px 0px;">${location.address}</p>
           </div>
           `
        );
    }
  };

  createLandmarkMaker = (dormLandmark: any) => {
    if (dormLandmark.length === 0) {
      this.dormitoryLandmarkData = [];
    } else if (dormLandmark.length !== 0) {
      this.dormitoryLandmarkData = dormLandmark;
      for (let landmark of dormLandmark) {
        const dormitoryIcon = icon({
          iconUrl: '../../assets/icon/pin.svg',
          iconSize: [40, 40],
        });
        const location = landmark;
        this.mapService
          .createNewMarkerObj(this.map, location)
          .setIcon(dormitoryIcon)
          .bindTooltip(
            `
             <div style="display:flex; width:auto; height:auto; flex-direction: column;">
               <h5 style="text-align: center; font-weight: bold; font-size: 1rem">${location.name}</h5>
             </div>
             `
          );
      }
    }
  };

  goToManageDormitory = (dormitoryId, locationId) => {
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
            this.map.remove();
            this.getDormitoryDetail();
            this.openDeleteDormProfileImageToggle();
          },
          (error) => {}
        );
      });
  };

  deleteRoomAction = (dormitoryId: number, roomId: number) => {
    this.dormitoriesService
      .deleteDormitoryRoomrequest(dormitoryId, roomId)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            this.getDormitoryDetail();
            this.openDeleteRoomToggle();
          },
          (err) => {}
        );
      });
  };

  updateRoomPayment = (dormitoryId: number, roomId: number) => {
    this.roomToBeEdit.roomCost.reverse();
    this.roomToBeEdit.electricBill.reverse();
    this.roomToBeEdit.waterBill.reverse();

    const roomCost = this.roomToBeEdit.roomCost[0];
    const electricBill = this.roomToBeEdit.electricBill[0];
    const waterBill = this.roomToBeEdit.waterBill[0];

    this.dormitoriesService
      .updateDormitoryRoomRequest(
        roomId,
        dormitoryId,
        roomCost,
        electricBill,
        waterBill
      )
      .then((response) => {
        response.subscribe((responseData) => {
          this.map.remove();
          this.getDormitoryDetail();
          this.openEditRoomToggle();
        });
      });
  };

  deleteAmenityAction = (dormitoryId: number, amenityId: number) => {
    this.dormitoriesService
      .deleteDormitoryAmenityRequest(dormitoryId, amenityId)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            this.getDormitoryDetail();
            this.openDeleteAmenityToggle();
          },
          (err) => {}
        );
      });
  };

  deleteDormitoryImageAction = (dormitoryId: number, imageId: number) => {
    this.dormitoriesService
      .deleteDormitoryImageRequest(dormitoryId, imageId)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            this.getDormitoryDetail();
          },
          (err) => {}
        );
      });
  };

  removeDormitoryLocationAction = (dormitoryId: number, locationId: number) => {
    this.dormitoriesService
      .removeDormitoryLocationRequest(dormitoryId, locationId)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            this.map.remove();
            this.getDormitoryDetail();
          },
          (err) => {}
        );
      });
  };

  deleteDormitoryLandmarkAction = (dormitoryId: number, landmarkId: number) => {
    this.dormitoriesService
      .deleteDormitoryLandmarkRequest(dormitoryId, landmarkId)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            this.map.remove();
            this.getDormitoryDetail();
          },
          (err) => {}
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
  };

  getGalleryPhoto = async () => {
    const imgObj = await this.imageService.getGalleryPhoto();
    this.imagePath = imgObj.imagePath;
    this.imgURL = imgObj.imageURL;
  };

  paymentAction = (dormitoryId: number, userId: number) => {
    const imageFile = this.imagePath;
    const ext = this.imagePath.type;

    this.loadingService.createNewLoading('Paying...');
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
            this.getDormitoryDetail();
            this.loadingService.dismissLoading();
            this.payToggle = false;
          },
          (err) => {
            const errorMessage = err['error'].msg;
            this.loadingService.dismissLoading();
            if (errorMessage === 'Invalid Input') {
              this.errorMessage =
                'Please fill the input fields with proper information.';
            } else {
              this.errorMessage = errorMessage;
            }
            setTimeout(() => {
              this.errorMessage = '';
            }, 5000);
          }
        );
      });
  };

  getCurrentUser = () => {
    return this.userService.userProfileRequest().then((response) => {
      response.subscribe((responseData) => {
        this.currentUser = responseData['user'];

        this.checkIfUserReservationExist(this.currentUser);
        this.checkIfUserAlreadyRated(this.currentUser);
      });
    });
  };

  addQuestionAction = (dormitoryId: number) => {
    if (this.tenantQuestion === '') {
      return;
    }
    this.dormitoriesService
      .addDormitoryQuestionRequest(this.tenantQuestion, dormitoryId)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            this.map.remove();
            this.getDormitoryDetail();
            this.tenantQuestion = '';
          },
          (err) => {}
        );
      });
  };

  deleteQuestionAction = (questionId: number, dormitoryId: number) => {
    this.dormitoriesService
      .deleteDormitoryQuestionRequest(questionId, dormitoryId)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            this.map.remove();
            this.getDormitoryDetail();
          },
          (err) => {}
        );
      });
  };

  addCommentAction = (dormitoryId: number, questionId: number) => {
    this.comment.reverse();
    const comment = this.comment[0];
    if (comment === null || comment === undefined) {
      return;
    }
    this.dormitoriesService
      .addCommentRequest(comment, dormitoryId, questionId)
      .then((response) =>
        response.subscribe((responseData) => {
          this.map.remove();
          this.getDormitoryDetail();
          this.comment = [];
        })
      );
  };

  removeCommentAction = (
    dormitoryId: number,
    questionId: number,
    commentId: number
  ) => {
    this.dormitoriesService
      .removeCommentRequest(dormitoryId, questionId, commentId)
      .then((response) => {
        response.subscribe((responseData) => {
          this.map.remove();
          this.getDormitoryDetail();
        });
      });
  };

  reserveAction = (dormitoryId: number, roomId: number) => {
    const roomSlot: number = parseInt(this.roomSlot);
    this.loadingService.createNewLoading('Creating reservation please wait...');
    this.dormitoriesService
      .createRoomReservationRequest(dormitoryId, roomId, roomSlot)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            this.map.remove();
            this.getDormitoryDetail();
            this.reserveToggle = [false];
            this.loadingService.dismissLoading();
          },
          (error) => {
            this.errorMessage = error['error'].msg;
            this.loadingService.dismissLoading();
            if (this.errorMessage !== '') {
              setTimeout(() => {
                this.errorMessage = '';
              }, 5000);
            }
          }
        );
      });
  };

  removeReservationAction = (
    dormitoryId: number,
    roomId: number,
    reservationId: number
  ) => {
    this.loadingService.createNewLoading(
      'Canceling reservation please wait...'
    );
    this.dormitoriesService
      .removerRoomReservationRequest(dormitoryId, roomId, reservationId)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            this.map.remove();
            this.getDormitoryDetail();

            this.reserveToggle = [false];
            this.loadingService.dismissLoading();
          },
          (err) => {
            this.loadingService.dismissLoading();
          }
        );
      });
  };

  filterReservationAction = (
    dormitoryId: number,
    isActive: boolean,
    isAccepted: boolean,
    isPending: boolean
  ) => {
    this.dormitoriesService
      .filterReservationRequest(dormitoryId, isActive, isPending, isAccepted)
      .then((response) => {
        response.subscribe((responseData) => {
          this.filteredReservation = responseData['filteredReservation'];
        });
      });
  };

  dormitoryRatingAction = (dormitoryId: number) => {
    this.dormitoriesService
      .addDormitoryRatingRequest(dormitoryId, this.dormitoryRating)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            this.map.remove();
            this.getDormitoryDetail();
            this.rateToggle = false;
          },
          (err) => {}
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
