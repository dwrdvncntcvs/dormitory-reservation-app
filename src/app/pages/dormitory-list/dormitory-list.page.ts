import { Component, HostListener, OnInit } from '@angular/core';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { api } from 'src/api';
import { Router } from '@angular/router';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-dormitory-list',
  templateUrl: './dormitory-list.page.html',
  styleUrls: ['./dormitory-list.page.scss'],
})
export class DormitoryListPage implements OnInit {
  dormitoryData: any;
  innerWidth: number;
  map: any;
  mapToggle: boolean = false;


  constructor(
    private dormitoriesService: DormitoriesService,
    private router: Router,
    private mapService: MapService
  ) {}

  url = api.url;

  ngOnInit() {
    this.onResize(event);
  }

  ionViewDidEnter = () => {
    this.router.navigated = true
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
    this.router.navigateByUrl(`owner-tabs/dormitory-detail/${id}`);
  }

  getMap = () => {
    const actualMap = this.mapService.createNewMap(
      'map',
      13.7543236494,
      121.054866447,
      12.5
    );
    this.map = actualMap;

    this.mapService.createNewTile(actualMap);

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
        this.getLatLng(this.dormitoryData);
      });
    });
  }

  getLatLng = (dormitoryData) => {
    for (let dormitory of dormitoryData) {
      let location;
      const dormitoryLocation = dormitory['DormLocation'];
      if (dormitoryLocation !== null) {
        location = dormitoryLocation;
        console.log("LOCATION: ", location);
      } else {
        location = null;
      }
      this.mapService.createNewMarkerObj(this.map, location);
    }
  };
}
