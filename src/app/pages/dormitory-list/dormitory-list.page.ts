import { Component, HostListener, OnInit } from '@angular/core';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { api } from 'src/api';
import { Router } from '@angular/router';
import { MapService } from 'src/app/services/map.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-dormitory-list',
  templateUrl: './dormitory-list.page.html',
  styleUrls: ['./dormitory-list.page.scss'],
})
export class DormitoryListPage implements OnInit {
  totalRating: any[];
  dormitoryData: any[];
  innerWidth: number;
  map: any;
  mapToggle: boolean = false;

  constructor(
    private dormitoriesService: DormitoriesService,
    private router: Router,
    private mapService: MapService,
    private loadingService: LoadingService
  ) {}

  url = api.url;

  ngOnInit() {}

  ionViewDidEnter = () => {
    this.loadingService.dismissLoading();
    this.onResize(event);
    this.router.navigated = true;
    this.getAllUserDormitories();

    this.getMap();
  };

  ionViewDidLeave = () => {
    console.log("I'm leaving");
  };

  // doRefresh(event) {
  //   console.log('Begin async operation');
  //   this.ionViewDidEnter();
  //   setTimeout(() => {
  //     console.log('Async operation has ended');
  //     event.target.complete();
  //   }, 2000);
  // }

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
    this.map.remove();
    this.router.navigateByUrl(`owner-tabs/dormitory-detail/${id}`);
  }

  getMap = () => {
    const actualMap = this.mapService.createNewMap(
      'map',
      13.7543236494,
      121.054866447,
      13.4
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
        const dormitoryData = data['userDormitories'];
        console.log('Dormitories for list: ', dormitoryData.length);
        if (dormitoryData.length === 0) {
          console.log('I have no value');
          this.dormitoryData = null;
          return;
        }
        this.dormitoryData = dormitoryData;
        this.extractDormitoryObjects(this.dormitoryData);
        this.getLatLng(this.dormitoryData);
      });
    });
  }

  extractDormitoryObjects = (dormitoryData: any[]) => {
    console.log("Dormitory Data: ", dormitoryData);
    const totalRatingArr = [];
    for (let dormitory of dormitoryData) {
      console.log("Dormitory Object: ", dormitory);
      const dormitoryRating = dormitory.DormRatings;
      console.log("Ratings Array", dormitoryRating)
      const averageRating = this.getAverageRating(dormitoryRating);
      totalRatingArr.push(averageRating)
    }
    console.log("Average Ratings Array: ", totalRatingArr);
    this.totalRating = totalRatingArr;
  };

  getAverageRating = (ratingArr: any[]) => {
    const ratingCompilation = [];
    console.log(ratingArr);
    const rating = ratingArr.map((rating) => {
      console.log(rating.rating);
      const newRating = rating.rating;
      ratingCompilation.push(newRating);
    });
    console.log('Compilation: ', ratingCompilation);

    const totalRating = ratingCompilation.reduce((a, b) => a + b, 0);
    console.log('Total rating: ', totalRating);
    let averageOfRatings = totalRating / ratingArr.length;
    console.log('Average of ratings: ', averageOfRatings);
    if (ratingCompilation.length === 0) {
      averageOfRatings = 0;
    }
    return averageOfRatings.toFixed(1);
  };

  getLatLng = (dormitoryData) => {
    for (let dormitory of dormitoryData) {
      let location;
      const dormitoryLocation = dormitory['DormLocation'];
      if (dormitoryLocation !== null) {
        location = dormitoryLocation;
        console.log('LOCATION: ', location);
      } else {
        location = null;
      }
      this.mapService.createNewMarkerObj(this.map, location);
    }
  };

  createDormitoryAction = () => {
    this.router.navigate(['owner-tabs/create-dormitory']);
  };
}
