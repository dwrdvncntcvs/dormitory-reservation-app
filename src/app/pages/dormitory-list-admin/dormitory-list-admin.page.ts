import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DormitoryData } from 'src/app/models/dormitoryData';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dormitory-list-admin',
  templateUrl: './dormitory-list-admin.page.html',
  styleUrls: ['./dormitory-list-admin.page.scss'],
})
export class DormitoryListAdminPage implements OnInit {
  dormitoryData: any = [];
  genderToDisplay: string;
  isVerifiedDisplay: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dormitoriesService: DormitoriesService
  ) {}

  ngOnInit() {}

  ionViewDidEnter = () => {
    this.getParamsValue();
  };

  getParamsValue = () => {
    this.activatedRoute.paramMap.subscribe((params) => {
      console.log(params);
      const gender = params['params'].gender;
      let isVerified = params['params'].isVerified;
      if (isVerified === 'true') {
        isVerified = true;
      } else if (isVerified === 'false') {
        isVerified = false;
      }
      this.toDisplayIsVerified(isVerified);
      this.getAllDormitories(isVerified, gender);
    });
  };

  toDisplayIsVerified = (isVerified) => {
    if (isVerified === true) {
      this.isVerifiedDisplay = 'Verified';
    } else if (isVerified === false) {
      this.isVerifiedDisplay = 'Not Verified';
    }
  };

  goToDormitoryDetail = (dormitoryId) => {
    console.log('Going to Dormitory Detail with ID ' + dormitoryId);
    this.router.navigate([
      `administrator/dormitory-detail-admin/dormitory/${dormitoryId}`,
    ]);
  };

  getAllDormitories = (filter, gender) => {
    this.dormitoriesService
      .getAllDormitoriesAdminRequest(filter)
      .then((response) => {
        response.subscribe(
          (dormitoriesData) => {
            let genderData;
            if (gender === 'both') {
              this.genderToDisplay = 'Both Male and Female Tenants Gender';
              genderData = 'bothDormitories';
            } else if (gender === 'male') {
              this.genderToDisplay = 'Male Tenants Only';
              genderData = 'maleDormitories';
            } else if (gender === 'female') {
              this.genderToDisplay = 'Female Tenants Only';
              genderData = 'femaleDormitories';
            }

            this.dormitoryData = dormitoriesData[genderData];
            console.log(this.dormitoryData);
          },
          (err) => {
            console.log(err);
          }
        );
      });
  };
}
