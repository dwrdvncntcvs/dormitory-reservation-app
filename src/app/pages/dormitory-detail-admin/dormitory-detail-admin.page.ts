import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { api } from 'src/api';
import { DormitoryModel } from 'src/app/models/dormitoryModel';
import { DormitoryProfileImageModel } from 'src/app/models/dormitoryProfileImageModel';
import { UserModel } from 'src/app/models/userModel';
import { DormitoriesService } from 'src/app/services/dormitories.service';

const url = api.url;

@Component({
  selector: 'app-dormitory-detail-admin',
  templateUrl: './dormitory-detail-admin.page.html',
  styleUrls: ['./dormitory-detail-admin.page.scss'],
})
export class DormitoryDetailAdminPage implements OnInit {
  url = url;
  dormitoryDetailData: DormitoryModel;
  userData: UserModel;
  dormitoryProfileImage: DormitoryProfileImageModel;
  dormitoryDocuments = [];
  imageUrl: string;
  previousPage: string;
  message: string;

  buttons = [
    {
      name: 'Accept',
      condition: (dormitoryDocument) => {
        this.buttonDisableCondition(dormitoryDocument);
      },
      color: 'success',
      toDo: (dormitoryId, userId) => {
        this.verifyDormitoryAction(dormitoryId, userId);
      },
    },
    {
      name: 'Deny',
      condition: (dormitoryDocument) => {
        this.buttonDisableCondition(dormitoryDocument);
      },
      color: 'danger',
      toDo: (dormitoryId, userId) => {
        this.denyDormitoryVerificationAction(dormitoryId, userId);
      },
    },
  ];

  constructor(
    private dormitoriesService: DormitoriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {}

  ionViewDidEnter = () => {
    this.getParamsValue();
  };

  buttonDisableCondition = (dormitoryDocument) => {
    if (dormitoryDocument.length === 0) {
      return false;
    }
    return true;
  };

  getParamsValue = () => {
    this.activatedRoute.paramMap.subscribe((params) => {
      const dormitoryId = params['params'].dormitoryId;
      console.log('Dormitory ID: ', dormitoryId);
      this.getDormitoryDetail(dormitoryId);
    });
  };

  verifyDormitoryAction = (dormitoryId, userId) => {
    this.dormitoriesService
      .verifyDormitoryRequest(dormitoryId, userId)
      .then((response) => {
        response.subscribe((responseData) => {
          console.log(responseData);
          this.router.navigate(['administrator/admin-home']);
        });
      });
  };

  denyDormitoryVerificationAction = (dormitoryId, userId) => {
    this.dormitoriesService
      .denyDormitoryVerificationRequest(dormitoryId, userId)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            console.log(responseData);
            this.message = responseData['msg'];
            this.getDormitoryDetail(dormitoryId);
            console.log(this.message);
          },
          (err) => {
            console.log(err);
          }
        );
      });
  };

  getDormitoryDetail = (dormitoryId) => {
    this.dormitoriesService
      .getDormitoryDetailsAdminRequest(dormitoryId)
      .then((response) => {
        response.subscribe(
          (dormitoryDetail) => {
            const dormitoryDetailData = dormitoryDetail['dormitory'];
            const userData = dormitoryDetail['dormitory']['User'];
            const dormitoryProfileImage =
              dormitoryDetail['dormitory']['DormProfileImage'];
            const dormitoryDocuments =
              dormitoryDetail['dormitory']['DormDocuments'];

            this.previousPage = `administrator/dormitories/${dormitoryDetailData.allowedGender}/isVerified/${dormitoryDetailData.isVerified}`;
            this.dormitoryDetailData = new DormitoryModel(dormitoryDetailData);
            this.userData = new UserModel(userData);
            if (dormitoryProfileImage === null) {
              this.dormitoryProfileImage = null;
              this.imageUrl = null;
            } else {
              this.dormitoryProfileImage = new DormitoryProfileImageModel(
                dormitoryProfileImage
              );
              this.imageUrl =
                url +
                '/image/dormitoryProfileImage/' +
                dormitoryProfileImage?.filename;
            }
            this.dormitoryDocuments = dormitoryDocuments;
            console.log(this.dormitoryDocuments);
          },
          (err) => {
            console.log(err);
          }
        );
      });
  };
}
