import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { UserService } from 'src/app/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { api } from 'src/api';
import { MapService } from 'src/app/services/map.service';
import { Map } from 'leaflet';
import { LoadingService } from 'src/app/services/loading.service';

const helper = new JwtHelperService();

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  totalRating: any[];
  searchKey: string;
  searchPhrase: string;
  searchResults: any;
  url = api.url;
  innerWidth: number;
  map: Map;
  isSearched: boolean = false;
  mapToggle: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private dormitoriesService: DormitoriesService,
    private userService: UserService,
    private router: Router,
    private mapService: MapService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {}

  ionViewDidEnter = () => {
    this.onResize(event);
    this.initialSearchAction();
  };

  ionViewWillLeave = () => {
    this.searchResults = null;
    this.searchKey = '';
  };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  getMap = () => {
    const actualMap = this.mapService.createNewMap(
      'map4',
      13.7543236494,
      121.054866447,
      12
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

  goBack = async () => {
    const token = await this.userService.loadStoredToken();

    if (token === null) {
      this.map.remove();
      this.router.navigate(['dormRes']);
    } else {
      const decoded_token = helper.decodeToken(token);
      if (decoded_token.role === 'tenant') {
        this.map.remove();
        this.router.navigate(['tenant-tabs']);
      }
    }
  };

  viewDetailsAction = async (id) => {
    this.map.remove();
    const token = await this.userService.loadStoredToken();
    if (token === null) {
      this.router.navigate([`dormRes/dormitory-detail/${id}`]);
    } else {
      const decoded_token = helper.decodeToken(token);
      if (decoded_token.role === 'tenant') {
        this.router.navigate([`tenant-tabs/dormitory-detail/${id}`]);
      }
    }
  };

  mapToggleAction = () => {
    this.mapToggle = !this.mapToggle;
    if (this.mapToggle === true) {
      this.newSearchAction();
    }
  };

  newSearchAction = () => {
    this.loadingService.createNewLoading('Searching . . .');
    this.location.replaceState('search', `?searchKey=${this.searchKey}`);
    this.dormitoriesService
      .searchDormitoryRequest(this.searchKey)
      .then((response) => {
        response.subscribe((searchResult) => {
          this.map.remove();
          this.getSearchResults(searchResult);
          this.loadingService.dismissLoading();
        });
      });
  };

  initialSearchAction = () => {
    this.route.queryParams.subscribe((params) => {
      this.searchKey = params.searchKey;
      if (this.searchKey === '') {
        this.searchResults = [];
        this.getMap();
      }
      this.dormitoriesService
        .searchDormitoryRequest(this.searchKey)
        .then((response) => {
          response.subscribe((searchResult) => {
            this.getSearchResults(searchResult);
            this.loadingService.dismissLoading();
          });
        });
    });
  };

  getLatLng = (dormitoryData) => {
    for (let dormitory of dormitoryData) {
      const dormLocation = dormitory['DormLocation'];
      let location;
      if (dormLocation !== null) {
        location = dormLocation;
      } else {
        location = null;
      }
      this.mapService.createNewMarkerObj(this.map, location).bindTooltip(
        `
         <div style="display:flex; width: auto; height:auto; flex-direction: column;">
           <h5 style="text-align: center; font-weight: bold;">${location.dormitoryName}</h5>
           <p style="text-align: center; margin: 0px 0px 0px 0px;">${location.address}</p>
         </div>
         `
      );
    }
  };

  getSearchResults = (searchResult: any) => {
    this.getMap();
    this.searchResults = searchResult['dormitoryResults'];

    this.extractDormitoryObjects(this.searchResults);
    this.getLatLng(this.searchResults);
  };

  extractDormitoryObjects = (dormitoryData: any[]) => {
    const totalRatingArr = [];
    for (let dormitory of dormitoryData) {
      const dormitoryRating = dormitory.DormRatings;

      const averageRating = this.getAverageRating(dormitoryRating);
      totalRatingArr.push(averageRating);
    }

    this.totalRating = totalRatingArr;
  };

  getAverageRating = (ratingArr: any[]) => {
    const ratingCompilation = [];

    const rating = ratingArr.map((rating) => {
      const newRating = rating.rating;
      ratingCompilation.push(newRating);
    });

    const totalRating = ratingCompilation.reduce((a, b) => a + b, 0);

    let averageOfRatings = totalRating / ratingArr.length;

    if (ratingCompilation.length === 0) {
      averageOfRatings = 0;
    }
    return averageOfRatings.toFixed(1);
  };
}
