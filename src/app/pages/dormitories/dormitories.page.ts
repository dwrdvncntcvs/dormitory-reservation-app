import { Component, OnInit } from '@angular/core';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { api } from 'src/api';

@Component({
  selector: 'app-dormitories',
  templateUrl: './dormitories.page.html',
  styleUrls: ['./dormitories.page.scss'],
})
export class DormitoriesPage implements OnInit {
  dormitoryData: any;
  url = api.url;

  toggle: Boolean = false;

  constructor(private dormitoriesService: DormitoriesService) {
    this.getAllDormitories();
  }

  ngOnInit() {}

  onToggle() {
    this.toggle = !this.toggle;
  }

  getAllDormitories() {
    this.dormitoriesService.getAllDormitoriesRequest().subscribe((response) => {
      console.log('Response: ', response);
      this.dormitoryData = response['dormitories'];
    });
  }
}
