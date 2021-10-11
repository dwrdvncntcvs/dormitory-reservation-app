import { Component, HostListener, OnInit } from '@angular/core';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { api, mapApi } from 'src/api';
import { Router } from '@angular/router';
import { map, tileLayer } from 'leaflet';

@Component({
  selector: 'app-dormitory-list',
  templateUrl: './dormitory-list.page.html',
  styleUrls: ['./dormitory-list.page.scss'],
})
export class DormitoryListPage implements OnInit {
  dormitoryData: any;
  innerWidth: number;
  mapToggle: boolean = false;

 
  constructor(
    private dormitoriesService: DormitoriesService,
    private router: Router
  ) {}

  url = api.url;

  ngOnInit() {
    this.onResize(event);
  }

  ionViewDidEnter = () => {
    this.getAllUserDormitories();
    this.getMap();
  };

  mapToggleAction = () => {
    this.mapToggle = !this.mapToggle;
    console.log('maps status', this.mapToggle);
  };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth);
  }

  viewDetailsAction(id) {
    this.router.navigate(['owner-tabs/dormitory-detail', id]);
  }

  getMap = () => {
    const actualMap = map('map').setView([13.7543236494, 121.054866447], 12.5);

    mapApi(actualMap);

    actualMap.whenReady(() => {
      setInterval(() => {
        actualMap.invalidateSize();
      }, 0);
    });

    return actualMap;
  };

  getAllUserDormitories() {
    this.dormitoriesService.getAllUserDormitoriesRequest().then((response) => {
      response.subscribe((data) => {
        this.dormitoryData = data['userDormitories'];
        console.log(this.dormitoryData);
      });
    });
  }
}
