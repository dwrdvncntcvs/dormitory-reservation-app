import { DormitoriesService } from './../../services/dormitories.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { api } from 'src/api';
import { ImagePage } from '../image/image.page';
import { ModalController } from '@ionic/angular';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { DormitoryModel } from 'src/app/models/dormitoryModel';
import { UserModel } from 'src/app/models/userModel';
import { MapService } from 'src/app/services/map.service';
import { LocationModel } from 'src/app/models/locationModel';

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

  url = api.url;
  dormitoryStatus: boolean;
  currentDormitoryStatus: string;
  errorMessage: string;
  userRole: string;

  comments: any[] = [
    {
      profile: 'https://biographymask.com/wp-content/uploads/2020/12/Cong-TV-Youtuber.jpg',
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
      profile:'https://www.tvguidetime.com/wp-content/webp-express/webp-images/uploads/2021/03/Boss-Keng.png.webp',
      username: 'BOSS KENG',
      email: 'qwerty@gmail.com',
      comment:
        'A dormitory (originated from the Latin word dormitorium often abbreviated to dorm) is a building primarily providing sleeping and residential quarters for large numbers of people such as boarding school',
    },
    {
      profile:'https://pbs.twimg.com/media/EYd_Qn-UEAESsd0?format=jpg&name=medium',
      username: 'MAVIE',
      email: 'qwerty@gmail.com',
      comment:
        'A dormitory (originated from the Latin word dormitorium often abbreviated to dorm) is a building primarily providing sleeping and residential quarters for large numbers of people such as boarding school',
    },
    {
      profile:'https://pbs.twimg.com/profile_images/1285130736878497792/8loWWNQr_400x400.jpg',
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
    private authGuard: AuthGuard,
    private mapService: MapService
  ) {}

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
    this.getDormitoryDetail();
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

  getMap = (lat, lng) => {
    let latitude = lat;
    let longitude = lng;
    if (latitude === undefined && longitude === undefined) {
      latitude = 13.7543236494;
      longitude = 121.054866447;
    }
    const actualMap = this.mapService.createNewMap(
      'map2',
      latitude,
      longitude,
      12.5
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
          this.dormitoryLocationData = new LocationModel(dormLocation);
          console.log(this.dormitoryLocationData);
          this.getMap(
            this.dormitoryLocationData.lat,
            this.dormitoryLocationData.lng
          );
          this.mapService.createNewMarkerObj(this.map, dormLocation);

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
    slidesPerView: 1.25,
    centeredSlides: false,
    loop: false,
    spaceBetween: 10,
  };
}
