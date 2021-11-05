import { Component, OnInit } from '@angular/core';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { api } from 'src/api';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dormitories',
  templateUrl: './dormitories.page.html',
  styleUrls: ['./dormitories.page.scss'],
})
export class DormitoriesPage implements OnInit {
  userDormitoryReservations: any[];
  dormitoryData = [];
  haveDormitories: boolean;
  userRole: string;

  reservedDormitoriesToggle: boolean = false;

  url = api.url;

  genderToggle: boolean = false;
  priceToggle: boolean = false;

  filter = {
    all: 'all',
    male: 'male',
    female: 'female',
    both: 'both',
    minimumPayment: '',
    maximumPayment: '',
  };

  constructor(
    private userService: UserService,
    private dormitoriesService: DormitoriesService,
    private router: Router
  ) {}

  ngOnInit() {}

  segmentChange(event) {
    // console.log(event.target.value);
  }

  ionViewDidEnter = () => {
    this.checkUserRole();
    this.getAllDormitories('all', '?');
  };

  ionViewDidLeave = () => {
    this.reservedDormitoriesToggle = false;
    this.genderToggle = false;
    this.priceToggle = false;
  };

  checkUserRole = async () => {
    const userRole = await this.userService.checkUserRole();
    this.userRole = userRole;
  };

  openReservedDormitoriesToggle = () => {
    this.getUserDormitoryReservationAction();
  };

  openGenderToggle = () => {
    this.priceToggle = false;
    this.reservedDormitoriesToggle = false;
    this.genderToggle = !this.genderToggle;
  };

  openPriceToggle = () => {
    this.genderToggle = false;
    this.reservedDormitoriesToggle = false;
    this.priceToggle = !this.priceToggle;
  };

  viewDetailsAction(id) {
    this.router.navigate(['dormRes/dormitory-detail', id]);
  }

  getPayment() {
    this.getAllDormitories(
      this.filter.minimumPayment,
      this.filter.maximumPayment
    );
  }

  getAllDormitories(filter1, filter2) {
    if (filter1 === 'all') {
      this.genderToggle = false;
      this.priceToggle = false;
      this.reservedDormitoriesToggle = false;
    }
    this.dormitoriesService
      .getAllDormitoriesRequest(filter1, filter2)
      .subscribe((response) => {
        this.dormitoryData = response['dormitories'];
      });
  }

  getUserDormitoryReservationAction = () => {
    this.reservedDormitoriesToggle = true;
    this.priceToggle = false;
    this.genderToggle = false;
    this.dormitoriesService
      .getUserDormitoryReservationRequest()
      .then((response) => {
        response.subscribe(
          (responseData) => {
            const userDormitoryReservation = responseData['userReservation'];
            this.userDormitoryReservations = userDormitoryReservation;
            this.getDormitoriesById(userDormitoryReservation);
          },
          (err) => {
            console.log(err);
          }
        );
      });
  };

  getDormitoriesById = (userReservations: any) => {
    let dormitoryArr = [];
    for (let reservation of userReservations) {
      this.dormitoriesService
      .getDormitoryByReservationIdRequest(reservation.id)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            const newDormitoryData = responseData['dormitoryData']
            dormitoryArr.push(newDormitoryData)
          },
          (err) => {
            console.log(err);
          }
        );
      });
    }
    this.dormitoryData = dormitoryArr;
  };

  sliderOpts = {
    slidesPerView: 1.25,
    centeredSlides: false,
    loop: false,
    spaceBetween: 10,
  };
}
