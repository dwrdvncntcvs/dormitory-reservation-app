import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { api } from 'src/api';

@Component({
  selector: 'app-dormitory-detail',
  templateUrl: './dormitory-detail.page.html',
  styleUrls: ['./dormitory-detail.page.scss'],
})
export class DormitoryDetailPage implements OnInit {
  dormId: number;
  dormitoryData: any;
  url = api.url;
  dormitoryStatus: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dormitoriesService: DormitoriesService,
    private router: Router
  ) {
    this.getDormitoryDetail();
  }

  ngOnInit = () => {};

  goBackToHome = () => {
    this.router.navigate(['owner-tabs/dormitory-list'])
  };

  getDormitoryDetail = () => {
    this.activatedRoute.paramMap.subscribe((params) => {
      console.log(params);
      const id = params['params'].id;
      return this.dormitoriesService
        .getDormitoryDetails(id)
        .subscribe((dormitoryData) => {
          console.log(dormitoryData);
          this.dormitoryData = dormitoryData['dormitory'];
          const status = this.dormitoryData.isAccepting;
          if (status === true) {
            this.dormitoryStatus = 'Active'
          } else {
            this.dormitoryStatus = 'Not Active'
          }
        });
    });
  };
}
