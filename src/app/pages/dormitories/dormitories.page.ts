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
  haveDormitories: boolean

  url = api.url;

  toggle: Boolean = false;

  filter = {
    all: 'all',
    male: 'male',
    female: 'female',
    both: 'both',
    minimumPayment: '',
    maximumPayment: '',
  };

  constructor(private dormitoriesService: DormitoriesService, private router: Router) {
    this.getAllDormitories('all', '?');
    this.onToggle();
  }

  ngOnInit() {}

  onToggle() {
    this.toggle = !this.toggle;
  }

  viewDetailsAction(id) {
    this.router.navigate(['owner-tabs/dormitory-detail', id]);
  }

  getPayment() {
    this.getAllDormitories(
      this.filter.minimumPayment,
      this.filter.maximumPayment
    );
  }

  getAllDormitories(filter1, filter2) {
    this.toggle = !this.toggle;
    this.dormitoriesService
      .getAllDormitoriesRequest(filter1, filter2)
      .subscribe((response) => {
        console.log('Response: ', response);
        this.dormitoryData = response['dormitories'];
      });
  }
}
