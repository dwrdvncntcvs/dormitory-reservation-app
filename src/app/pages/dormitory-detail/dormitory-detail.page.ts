import { DormitoriesService } from './../../services/dormitories.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  dormitoryStatus: boolean;
  currentDormitoryStatus: string;
  errorMessage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dormitoriesService: DormitoriesService,
    private router: Router
  ) {
    this.getDormitoryDetail();
  }

  ngOnInit = () => {};

  dormitorySwitchAction = (status, dormId) => {
    console.log('Current Dormitory Status: ' + status);
    console.log('Dormitory ID: ', dormId);
    const changed_status = !status;
    this.dormitoriesService
      .dormitorySwitchRequest(changed_status, dormId)
      .then((response) => {
        console.log(response);
        response.subscribe(
          (data) => {
            console.log(data);
            this.dormitoryStatus = !status;
            this.getDormitoryDetail();
          },
          (err) => {
            console.log(err);
            if (err) {
              this.errorMessage = err['error'].msg
            }
          }
        );
      });
  };

  goBackToHome = () => {
    this.errorMessage = ''
    this.router.navigate(['owner-tabs/dormitory-list']);
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
          this.dormitoryStatus = status;
          if (status === true) {
            this.currentDormitoryStatus = 'Active';
          } else {
            this.currentDormitoryStatus = 'Not Active';
          }
        });
    });
  };

  sliderOpts ={
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 10,
  };
}
