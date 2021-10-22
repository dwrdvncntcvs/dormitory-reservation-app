import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { UserService } from 'src/app/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { api } from 'src/api';
import { MapService } from 'src/app/services/map.service';
import { Map } from 'leaflet';

const helper = new JwtHelperService();

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
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
    private mapService: MapService
  ) {}

  ngOnInit() {}

  ionViewDidEnter = () => {
    this.initialSearchAction();
  };

  ionViewWillLeave = () => {
    this.searchResults = null;
    this.searchKey = '';
  };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth);
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
  };

  goBack = async () => {
    const token = await this.userService.loadStoredToken();
    console.log(token);
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

  mapOnToggle = () => {
    this.mapToggle = !this.mapToggle;
  };

  newSearchAction = () => {
    if (this.searchKey === '') {
      this.searchResults.length = 0;
    }
    this.location.replaceState('search', `?searchKey=${this.searchKey}`);
    this.dormitoriesService
      .searchDormitoryRequest(this.searchKey)
      .then((response) => {
        response.subscribe((searchResult) => {
          console.log(searchResult);
          this.map.remove();
          this.getSearchResults(searchResult);
        });
      });
  };

  initialSearchAction = () => {
    this.route.queryParams.subscribe((params) => {
      this.searchKey = params.searchKey;
      this.dormitoriesService
        .searchDormitoryRequest(this.searchKey)
        .then((response) => {
          response.subscribe((searchResult) => {
            console.log(searchResult);
            this.getSearchResults(searchResult);
          });
        });
    });
  };

  getLatLng = (dormitoryData) => {
    for (let dormitory of dormitoryData) {
      console.log(dormitory);
      const dormLocation = dormitory['DormLocation'];
      let location;
      if (dormLocation !== null) {
        console.log('Dorm Location: ', dormLocation);
        location = dormLocation;
      } else {
        location = null;
      }
      this.mapService.createNewMarkerObj(this.map, location);
    }
  };

  getSearchResults = (searchResult: any) => {
    this.getMap();
    this.searchResults = searchResult['dormitoryResults'];
    console.log(this.searchResults);
    this.getLatLng(this.searchResults);
  };
}
