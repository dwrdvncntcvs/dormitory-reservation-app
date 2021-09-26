import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DormitoriesService } from 'src/app/services/dormitories.service';

@Component({
  selector: 'app-dormitory-detail',
  templateUrl: './dormitory-detail.page.html',
  styleUrls: ['./dormitory-detail.page.scss'],
})
export class DormitoryDetailPage implements OnInit {
  dormId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dormitoriesService: DormitoriesService
  ) {
    this.getDormitoryDetail();
  }

  ngOnInit = () => {};

  getDormitoryDetail = () => {
    this.activatedRoute.paramMap.subscribe((params) => {
      console.log(params);
      const id = params['params'].id;
      return this.dormitoriesService
        .getDormitoryDetails(id)
        .subscribe((dormitoryData) => {
          console.log(dormitoryData);
        });
    });
  };
}
