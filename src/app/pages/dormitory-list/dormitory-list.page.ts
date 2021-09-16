import { Component, OnInit } from '@angular/core';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { api } from 'src/api';

@Component({
  selector: 'app-dormitory-list',
  templateUrl: './dormitory-list.page.html',
  styleUrls: ['./dormitory-list.page.scss'],
})
export class DormitoryListPage implements OnInit {
  dormitoryData: any;

  constructor(private dormitoriesService: DormitoriesService) {
    this.getAllUserDormitories();
  }

  url = api.url;

  ngOnInit() {}

  getAllUserDormitories() {
    this.dormitoriesService.getAllUserDormitoriesRequest().then((response) => {
      response.subscribe((data) => {
        this.dormitoryData = data['userDormitories'];
        console.log(this.dormitoryData);
      });
    });
  }
}
