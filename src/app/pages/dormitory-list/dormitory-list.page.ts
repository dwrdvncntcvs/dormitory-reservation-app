import { Component, HostListener, OnInit } from '@angular/core';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { api } from 'src/api';
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

    tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZHdyZHZuY250Y3ZzIiwiYSI6ImNrdWk3bHIzaTA3NnoycG82ZGpoNXcwbWQifQ.95bfWfAbp2yXB3dNL06Urw',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token',
      }
    ).addTo(actualMap);

    actualMap.whenReady(() => {
      setInterval(() => {
        actualMap.invalidateSize();
      }, 0);
    });
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
