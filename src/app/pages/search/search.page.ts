import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { UserService } from 'src/app/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { api } from 'src/api';

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

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private dormitoriesService: DormitoriesService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initialSearchAction();
  }

  ionViewWillLeave = () => {
    this.searchResults = null;
    this.searchKey = '';
  };

  goBack = async () => {
    const token = await this.userService.loadStoredToken();
    console.log(token);
    if (token === null) {
      this.router.navigate(['dormRes']);
    } else {
      const decoded_token = helper.decodeToken(token);
      if (decoded_token.role === 'tenant') {
        this.router.navigate(['tenant-tabs']);
      }
    }
  };

  viewDetailsAction = async (id) => {
    // this.map.remove();
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

  newSearchAction = () => {
    this.location.replaceState('search', `?searchKey=${this.searchKey}`);
    this.dormitoriesService
      .searchDormitoryRequest(this.searchKey)
      .then((response) => {
        response.subscribe((searchResult) => {
          console.log(searchResult);
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

  getSearchResults = (searchResult: any) => {
    this.searchPhrase = this.searchKey;
    this.searchResults = searchResult['dormitoryResults'];
    console.log(this.searchResults);
  };
}
