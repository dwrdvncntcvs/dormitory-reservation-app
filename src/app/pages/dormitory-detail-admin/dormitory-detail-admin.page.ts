import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { api } from 'src/api';
import { DormitoryModel } from 'src/app/models/dormitoryModel';
import { DormitoryProfileImageModel } from 'src/app/models/dormitoryProfileImageModel';
import { UserModel } from 'src/app/models/userModel';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { ImagePage } from '../image/image.page';
import { ModalController } from '@ionic/angular';

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
  dormitoryPayment;

  buttons = [
    {
      name: 'Accept',
      condition: (dormitoryDocument) => {
        return this.buttonDisableCondition(dormitoryDocument);
      },
      color: 'success',
      toDo: (dormitoryId, userId) => {
        this.verifyDormitoryAction(dormitoryId, userId);
      },
    },
    {
      name: 'Deny',
      condition: (dormitoryDocument) => {
        return this.buttonDisableCondition(dormitoryDocument);
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
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController
  ) {}

  async openPreview(document, dir) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      cssClass: 'transparent-modal',
      componentProps: {
        value: `${this.url}/image/${dir}/${document}`,
      },
    });
    modal.present();
    console.log(document);
  }

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

  verifyPaymentAction = () => {
    const userId = this.userData.id;
    const dormitoryId = this.dormitoryDetailData.id;
    const paymentId = this.dormitoryPayment.id;

    this.dormitoriesService
      .verifyDormitoryPaymentRequest(userId, dormitoryId, paymentId)
      .then((response) => {
        response.subscribe((responseData) => {
          console.log(responseData);
          this.getDormitoryDetail(dormitoryId);
        });
      });
  };

  denyPaymentAction = () => {
    const userId = this.userData.id;
    const dormitoryId = this.dormitoryDetailData.id;
    const paymentId = this.dormitoryPayment.id;

    this.dormitoriesService
      .denyDormitoryPaymentRequest(userId, dormitoryId, paymentId)
      .then((response) => {
        response.subscribe((responseData) => {
          console.log(responseData);
          this.getDormitoryDetail(dormitoryId);
        });
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
            const dormitoryPayment = dormitoryDetail['payment'];
            console.log('Dormitory Payment Details: ', dormitoryPayment);
            this.previousPage = `administrator/dormitories/${dormitoryDetailData.allowedGender}/isVerified/${dormitoryDetailData.isVerified}`;
            this.dormitoryDetailData = new DormitoryModel(dormitoryDetailData);
            this.userData = new UserModel(userData);
            this.dormitoryPayment = dormitoryPayment;
            console.log(dormitoryPayment);
            if (dormitoryProfileImage === null) {
              this.dormitoryProfileImage = null;
              this.imageUrl = null;
            } else {
              this.dormitoryProfileImage = new DormitoryProfileImageModel(
                dormitoryProfileImage
              );
              this.imageUrl = dormitoryProfileImage?.filepath;
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
