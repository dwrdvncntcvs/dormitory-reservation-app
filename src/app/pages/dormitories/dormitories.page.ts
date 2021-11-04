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
  filterDormitoriesByReservation = [];
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
    console.log(event.target.value);
  }

  ionViewDidEnter = () => {
    this.checkUserRole();
    this.getAllDormitories('all', '?');
  };

  ionViewDidLeave = () => {
    this.reservedDormitoriesToggle = false;
    this.genderToggle = false;
    this.priceToggle = false;
    this.filterDormitoriesByReservation = [];
  };

  checkUserRole = async () => {
    const userRole = await this.userService.checkUserRole();
    this.userRole = userRole;
  };

  openReservedDormitoriesToggle = () => {
    this.priceToggle = false;
    this.genderToggle = false;
    this.reservedDormitoriesToggle = true;
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
        console.log('Response: ', response);
        this.dormitoryData = response['dormitories'];
      });
  }

  getUserDormitoryReservationAction = () => {
    console.log("I'am Being Run");
    this.dormitoriesService
      .getUserDormitoryReservationRequest()
      .then((response) => {
        response.subscribe(
          (responseData) => {
            console.log(responseData);
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

  getDormitoryByReservationIdAction = (reservationId: number) => {
    console.log("Reservation Id: ", reservationId);

  };

  getDormitoriesById = (userReservations: any) => {
    console.log('Reservation List', userReservations);
    let dormitoryArr = [];
    for (let reservation of userReservations) {
      // this.getDormitoryByReservationIdAction(reservation.id);
      this.dormitoriesService
      .getDormitoryByReservationIdRequest(reservation.id)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            const newDormitoryData = responseData['dormitoryData']
            console.log("Dormitory Data: ", newDormitoryData)
            dormitoryArr.push(newDormitoryData)
          },
          (err) => {
            console.log(err);
          }
        );
      });
    }
    console.log("Dormitory Arr: ", dormitoryArr)
    this.filterDormitoriesByReservation = dormitoryArr;
    console.log("Dormitory Arr2: ", this.filterDormitoriesByReservation)
  };

  sliderOpts = {
    slidesPerView: 1.25,
    centeredSlides: false,
    loop: false,
    spaceBetween: 10,
  };
}
