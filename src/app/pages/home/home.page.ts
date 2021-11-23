import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  searchKey: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.userService.loadStoredToken();
  }

  ngOnInit() {}
  dorm_list = [1, 1, 1, 1];

  searchAction = () => {

    if (this.searchKey === '') {
      return
    } else {
      this.loadingService.createNewLoading('Searching . . .')
      this.router.navigate(['search'], {
        queryParams: { searchKey: this.searchKey },
      });
      this.searchKey = ''
    }
  };
}
