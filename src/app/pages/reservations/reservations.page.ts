import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { DormitoriesService } from 'src/app/services/dormitories.service';

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
    private router: Router
  ) {}

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
  }

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

  getNavParamsValue = () => {
    const reservationId = this.navParams.get('reservationId');
    const roomId = this.navParams.get('roomId');
    const dormitoryId = this.navParams.get('dormitoryId');

    this.dormitoryId = dormitoryId;
    this.roomId = roomId;
    this.reservationId = reservationId;
  };

  getReservationDetails = () => {
    console.log('Reservation ID: ', this.reservationId);
    console.log('Room ID: ', this.roomId);
    console.log('Dormitory ID: ', this.dormitoryId);

    this.dormitoriesService
      .getReservationDetailRequest(
        this.roomId,
        this.reservationId,
        this.dormitoryId
      )
      .then((response) => {
        response.subscribe(
          (responseData) => {
            console.log('reservation ', responseData);
            this.reservationDetailData = responseData['reservationDetail'];
          },
          (err) => console.log(err)
        );
      });
  };

  getRoomDetail = () => {
    this.dormitoriesService
      .getRoomDetailRequest(this.dormitoryId, this.roomId)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            console.log('room ', responseData);
            this.roomDetailData = responseData['roomDetail'];
          },
          (err) => console.log(err)
        );
      });
  };

  acceptTenantReservation = (
    dormitoryId: number,
    roomId: number,
    reservationId: number
  ) => {
    this.dormitoriesService
      .acceptTenantReservationRequest(dormitoryId, roomId, reservationId)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            console.log(responseData);
            this.getReservationDetails();
            this.getRoomDetail();
            this.router.navigate([`dormitory-detail-resolve/${dormitoryId}`]);
            this.modalController.dismiss();
          },
          (err) => {
            console.log(err);
          }
        );
      });
  };

  rejectTenantReservationAction = (
    dormitoryId: number,
    roomId: number,
    reservationId: number
  ) => {
    console.log('Message: ', this.ownerMessage);
    console.log('Room ID: ', roomId);
    const message = this.ownerMessage;
    this.dormitoriesService
      .rejectTenantReservationRequest(dormitoryId, roomId, reservationId, message)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            console.log(responseData);
            this.getReservationDetails();
            this.getRoomDetail();
            this.router.navigate([`dormitory-detail-resolve/${dormitoryId}`]);
            this.modalController.dismiss();
          },
          (err) => {
            console.log(err);
          }
        );
      });
  };

  addUserAsActiveTenantAction = (
    dormitoryId: number,
    roomId: number,
    reservationId: number
  ) => {
    this.dormitoriesService
      .addUserAsActiveTenantRequest(dormitoryId, roomId, reservationId)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            console.log(responseData);
            this.getReservationDetails();
            this.getRoomDetail();
            this.router.navigate([`dormitory-detail-resolve/${dormitoryId}`]);
            this.modalController.dismiss();
          },
          (err) => {
            console.log(err);
          }
        );
      });
  };

  removeUserAsActiveTenantAction = (
    dormitoryId: number,
    roomId: number,
    reservationId: number
  ) => {
    this.dormitoriesService
      .removeUserAsActiveTenantRequest(dormitoryId, roomId, reservationId)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            console.log(responseData);
            this.getReservationDetails();
            this.getRoomDetail();
            this.router.navigate([`dormitory-detail-resolve/${dormitoryId}`]);
            this.modalController.dismiss();
          },
          (error) => {
            console.log(error);
          }
        );
      });
  };
}
