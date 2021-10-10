import { DormitoriesService } from './../../services/dormitories.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { api, mapApi } from 'src/api';
import { ImagePage } from '../image/image.page';
import { ModalController } from '@ionic/angular';
import { AuthGuard } from 'src/app/guards/auth.guard';
import * as L from 'leaflet';
import { DormitoryModel } from 'src/app/models/dormitoryModel';
import { UserModel } from 'src/app/models/userModel';

@Component({
  selector: 'app-dormitory-detail',
  templateUrl: './dormitory-detail.page.html',
  styleUrls: ['./dormitory-detail.page.scss'],
})
export class DormitoryDetailPage implements OnInit {
  dormId: number;

  dormitoryData: DormitoryModel;
  userData: UserModel;
  amenitiesData = [];
  dormImagesData = [];
  roomsData = [];

  url = api.url;
  dormitoryStatus: boolean;
  currentDormitoryStatus: string;
  errorMessage: string;
  userRole: string;

  constructor(
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private dormitoriesService: DormitoriesService,
    private router: Router,
    private authGuard: AuthGuard
  ) {}

  async openPreview(Images) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      cssClass: 'transparent-modal',
      componentProps: {
        value: `/assets/images/${Images}.jpg`,
      },
    });
    modal.present();
  }

  ngOnInit = () => {};

  ionViewDidEnter = () => {
    this.getUserRole();
    this.getDormitoryDetail();
    this.getMap();
  };

  getUserRole = () => {
    const role = this.authGuard.userRole;
    if (role === 'owner') {
      this.userRole = 'owner';
    } else if (role === 'tenant') {
      this.userRole = 'tenant';
    } else if (role === null) {
      this.userRole = null;
    }
  };

  getMap = () => {
    const actualMap = L.map('map2').setView(
      [13.7543236494, 121.054866447],
      12.5
    );
    console.log(actualMap);

    mapApi(actualMap);

    actualMap.whenReady(() => {
      setInterval(() => {
        actualMap.invalidateSize();
      }, 0);
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
    this.errorMessage = '';
    this.router.navigate(['owner-tabs/dormitory-list']);
  };

  getDormitoryDetail = () => {
    this.activatedRoute.paramMap.subscribe((params) => {
      console.log(params);
      const id = params['params'].id;
      return this.dormitoriesService
        .getDormitoryDetails(id)
        .subscribe((dormitoryData) => {
          //Array
          console.log(dormitoryData['dormitory']['Amenities']);
          const amenities = dormitoryData['dormitory']['Amenities'];
          const dormImages = dormitoryData['dormitory']['DormImages'];
          const dormRatings = dormitoryData['dormitory']['DormRatings'];
          const landmarks = dormitoryData['dormitory']['Landmarks'];
          const reservations = dormitoryData['dormitory']['Reservations'];
          const rooms = dormitoryData['dormitory']['Rooms'];
          //Objects
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

          const status = this.dormitoryData.isAccepting;
          this.dormitoryStatus = status;
          if (status === true) {
            this.currentDormitoryStatus = 'Active';
          } else {
            this.currentDormitoryStatus = 'Not Active';
          }
        });
    });
  };

  sliderOpts = {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 10,
  };
}
