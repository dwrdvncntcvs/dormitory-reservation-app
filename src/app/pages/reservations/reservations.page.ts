import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {
  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private dormitoriesService: DormitoriesService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  errorMessage: string = '';
  dormitoryId: number;
  roomId: number;
  reservationId: number;

  roomDetailData: any;
  reservationDetailData: any;

  public ownerMessage: string = '';
  rejectToggle: boolean = false;

  ngOnInit() {
    this.getNavParamsValue();
    this.getReservationDetails();
    this.getRoomDetail();
  }

  changeMessage = (event) => {
    this.ownerMessage = event.target.value;
  };

  closeModal = (dormitoryId: number) => {
    if (this.rejectToggle === true) {
      this.rejectToggle = false;
      return;
    }
    this.modalController.dismiss();
  };

  openRejectToggle = () => {
    this.rejectToggle = !this.rejectToggle;
  };

  removeErrorMessage = () => {
    setTimeout(() => {
      this.errorMessage = '';
    }, 5000);
  };

  getNavParamsValue = () => {
    const reservationId = this.navParams.get('reservationId');
    const roomId = this.navParams.get('roomId');
    const dormitoryId = this.navParams.get('dormitoryId');

    this.dormitoryId = dormitoryId;
    this.roomId = roomId;
    this.reservationId = reservationId;
  };

  getReservationDetails = () => {
    this.dormitoriesService
      .getReservationDetailRequest(
        this.roomId,
        this.reservationId,
        this.dormitoryId
      )
      .then((response) => {
        response.subscribe((responseData) => {
          this.reservationDetailData = responseData['reservationDetail'];
        });
      });
  };

  getRoomDetail = () => {
    this.loadingService.createNewLoading(
      'Getting tenant reservation details...'
    );
    this.dormitoriesService
      .getRoomDetailRequest(this.dormitoryId, this.roomId)
      .then((response) => {
        response.subscribe((responseData) => {
          this.roomDetailData = responseData['roomDetail'];
          this.loadingService.dismissLoading();
        });
      });
  };

  acceptTenantReservation = (
    dormitoryId: number,
    roomId: number,
    reservationId: number
  ) => {
    this.loadingService.createNewLoading(
      'Accepting tenant reservation please wait...'
    );
    this.dormitoriesService
      .acceptTenantReservationRequest(dormitoryId, roomId, reservationId)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            this.getReservationDetails();
            this.getRoomDetail();
            this.loadingService.dismissLoading();
            this.router.navigate([`dormitory-detail-resolve/${dormitoryId}`]);
            this.modalController.dismiss();
          },
          (err) => {
            this.errorMessage = err['error'].msg;
            this.loadingService.dismissLoading();
            this.removeErrorMessage();
          }
        );
      });
  };

  rejectTenantReservationAction = (
    dormitoryId: number,
    roomId: number,
    reservationId: number
  ) => {
    const message = this.ownerMessage;
    this.loadingService.createNewLoading('Rejecting tenant please wait...');
    this.dormitoriesService
      .rejectTenantReservationRequest(
        dormitoryId,
        roomId,
        reservationId,
        message
      )
      .then((response) => {
        response.subscribe(
          (responseData) => {
            this.getReservationDetails();
            this.getRoomDetail();
            this.loadingService.dismissLoading();
            this.router.navigate([`dormitory-detail-resolve/${dormitoryId}`]);
            this.modalController.dismiss();
          },
          (err) => {
            this.errorMessage = err['error'].msg;
            this.loadingService.dismissLoading();
            this.removeErrorMessage();
          }
        );
      });
  };

  addUserAsActiveTenantAction = (
    dormitoryId: number,
    roomId: number,
    reservationId: number
  ) => {
    this.loadingService.createNewLoading(
      'Making tenant as active tenant please wait...'
    );
    this.dormitoriesService
      .addUserAsActiveTenantRequest(dormitoryId, roomId, reservationId)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            this.getReservationDetails();
            this.getRoomDetail();
            this.loadingService.dismissLoading();
            this.router.navigate([`dormitory-detail-resolve/${dormitoryId}`]);
            this.modalController.dismiss();
          },
          (err) => {
            this.errorMessage = err['error'].msg;
            this.loadingService.dismissLoading();
            this.removeErrorMessage();
          }
        );
      });
  };

  removeUserAsActiveTenantAction = (
    dormitoryId: number,
    roomId: number,
    reservationId: number
  ) => {
    this.loadingService.createNewLoading('Removing tenant please wait...');
    this.dormitoriesService
      .removeUserAsActiveTenantRequest(dormitoryId, roomId, reservationId)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            this.getReservationDetails();
            this.getRoomDetail();
            this.loadingService.dismissLoading();
            this.router.navigate([`dormitory-detail-resolve/${dormitoryId}`]);
            this.modalController.dismiss();
          },
          (error) => {
            this.errorMessage = error['error'].msg;
            this.loadingService.dismissLoading();
            this.removeErrorMessage();
          }
        );
      });
  };
}
