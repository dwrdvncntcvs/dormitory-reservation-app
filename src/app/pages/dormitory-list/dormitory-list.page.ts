import { Component, OnInit } from '@angular/core';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { api } from 'src/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dormitory-list',
  templateUrl: './dormitory-list.page.html',
  styleUrls: ['./dormitory-list.page.scss'],
})
export class DormitoryListPage implements OnInit {
  dormitoryData: any;

  constructor(private dormitoriesService: DormitoriesService, private router: Router) {
    this.getAllUserDormitories();
  }

  url = api.url;

  ngOnInit() {}

  viewDetailsAction(id) {
    this.router.navigate(['owner-tabs/dormitory-detail', id])
  }

  getAllUserDormitories() {
    this.dormitoriesService.getAllUserDormitoriesRequest().then((response) => {
      response.subscribe((data) => {
        this.dormitoryData = data['userDormitories'];
        console.log(this.dormitoryData);
      });
    });
  }
}
