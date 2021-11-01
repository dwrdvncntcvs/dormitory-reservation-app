import { Component, OnInit } from '@angular/core';
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
    private dormitoriesService: DormitoriesService
  ) {}

  dormitoryId: number;
  roomId: number;
  reservationId: number;

  roomDetailData: any;
  reservationDetailData: any;

  ngOnInit() {
    this.getNavParamsValue();
    this.getReservationDetails();
    this.getRoomDetail();
  }

  closeModal = () => {
    this.modalController.dismiss();
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
          },
          (err) => {
            console.log(err);
          }
        );
      });
  };
}
