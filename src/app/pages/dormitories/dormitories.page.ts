import { Component, OnInit } from '@angular/core';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { api } from 'src/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dormitories',
  templateUrl: './dormitories.page.html',
  styleUrls: ['./dormitories.page.scss'],
})
export class DormitoriesPage implements OnInit {
  dormitoryData = [];
  haveDormitories: boolean;

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
    private dormitoriesService: DormitoriesService,
    private router: Router
  ) {}

  ngOnInit() {}

  segmentChange(event){
    console.log(event.target.value)
  }

  ionViewDidEnter = () => {
    this.getAllDormitories('all', '?');
  };

  openGenderToggle = () => {
    if (this.priceToggle === true) this.priceToggle = false;
    this.genderToggle = !this.genderToggle;
  };

  openPriceToggle = () => {
    if (this.genderToggle === true) this.genderToggle = false;
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
    }
    this.dormitoriesService
      .getAllDormitoriesRequest(filter1, filter2)
      .subscribe((response) => {
        console.log('Response: ', response);
        this.dormitoryData = response['dormitories'];
      });
  }

  sliderOpts = {
    slidesPerView: 1.25,
    centeredSlides: false,
    loop: false,
    spaceBetween: 10,
  };
}
